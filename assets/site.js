// Pauk — petits comportements du site (menu mobile, en-tête, dates, copie)
(function () {
  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // Trait sous l'en-tête dès qu'on fait défiler
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Un seul agenda pour toutes les pages, selon la date à Paris.
  var today = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(new Date());
  var dates = ((window.PAUK && window.PAUK.dates) || []).filter(function (item) {
    return /^\d{4}-\d{2}-\d{2}$/.test(item.date) && (item.fin || item.date) >= today;
  }).sort(function (a, b) { return a.date.localeCompare(b.date); });
  function dateRow(item) {
      var li = document.createElement('li');
      var when = document.createElement('span'); when.className = 'when';
      when.textContent = item.libelle || new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Paris', day: 'numeric', month: 'long', year: 'numeric'
      }).format(new Date(item.date + 'T12:00:00+01:00'));
      var what = document.createElement('span'); what.className = 'what'; what.textContent = item.titre;
      var place = document.createElement('small');
      if (item.heure) place.appendChild(document.createTextNode(item.heure + ' · '));
      if (item.salle && item.adresse && /^https?:\/\//.test(item.salleUrl || '')) {
        var venue = document.createElement('a');
        venue.href = item.salleUrl; venue.target = '_blank'; venue.rel = 'noopener';
        venue.textContent = item.salle + ' — ' + item.adresse;
        place.appendChild(venue);
      } else { place.appendChild(document.createTextNode(item.lieu || item.salle || '')); }
      what.appendChild(place);
      if (item.infos) { var info = document.createElement('small'); info.textContent = item.infos; what.appendChild(info); }
      var side = document.createElement('span'); side.className = 'side';
      if (item.role) { var tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = item.role; side.appendChild(tag); }
      if (item.url && /^https?:\/\//.test(item.url)) {
        var link = document.createElement('a'); link.className = 'go'; link.href = item.url;
        link.target = '_blank'; link.rel = 'noopener'; link.textContent = 'Réserve →'; side.appendChild(link);
      }
      li.append(when, what, side); return li;
  }
  document.querySelectorAll('[data-dates]').forEach(function (list) {
    var limit = Number(list.getAttribute('data-limit')) || dates.length;
    dates.slice(0, limit).forEach(function (item) {
      list.appendChild(dateRow(item));
    });
    var empty = list.parentElement.querySelector('.setlist-empty');
    if (empty) empty.hidden = dates.length > 0;
  });

  // Calendrier de l’accueil : même agenda, sélection d’un jour et navigation mensuelle.
  document.querySelectorAll('[data-calendar]').forEach(function (host, calendarIndex) {
    if (!dates.length) return;
    var empty = host.parentElement.querySelector('.setlist-empty');
    if (empty) empty.hidden = true;
    var months = dates.map(function (item) { return item.date.slice(0, 7); });
    var firstMonth = months[0], lastMonth = months[months.length - 1];
    var month = firstMonth, selected = dates[0].date;
    var longDate = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    var monthDate = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', month: 'long', year: 'numeric' });
    function asDate(value) { return new Date(value + 'T12:00:00+01:00'); }
    function shiftMonth(delta) {
      var parts = month.split('-').map(Number);
      var value = new Date(Date.UTC(parts[0], parts[1] - 1 + delta, 1));
      month = value.toISOString().slice(0, 7);
      var next = dates.find(function (item) { return item.date.slice(0, 7) === month; });
      selected = next ? next.date : null;
      render();
    }
    function render() {
      host.replaceChildren(); host.className = 'show-calendar';
      var panel = document.createElement('div'); panel.className = 'calendar-panel';
      var head = document.createElement('div'); head.className = 'calendar-head';
      var heading = document.createElement('h3'); heading.id = 'calendar-month-' + calendarIndex;
      heading.textContent = monthDate.format(asDate(month + '-01'));
      heading.setAttribute('aria-live', 'polite');
      function nav(label, text, delta, disabled) {
        var button = document.createElement('button'); button.type = 'button'; button.textContent = text;
        button.setAttribute('aria-label', label); button.disabled = disabled;
        button.addEventListener('click', function () {
          shiftMonth(delta);
          host.querySelector('[aria-label="' + label + '"]').focus();
        }); return button;
      }
      head.append(nav('Mois précédent', '←', -1, month <= firstMonth), heading, nav('Mois suivant', '→', 1, month >= lastMonth));
      var table = document.createElement('table'); table.className = 'calendar-grid';
      table.setAttribute('aria-labelledby', heading.id);
      var thead = document.createElement('thead'), weekdays = document.createElement('tr');
      ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].forEach(function (name) {
        var th = document.createElement('th'); th.scope = 'col'; th.textContent = name; weekdays.appendChild(th);
      }); thead.appendChild(weekdays); table.appendChild(thead);
      var tbody = document.createElement('tbody');
      var parts = month.split('-').map(Number);
      var offset = (new Date(Date.UTC(parts[0], parts[1] - 1, 1)).getUTCDay() + 6) % 7;
      var count = new Date(Date.UTC(parts[0], parts[1], 0)).getUTCDate();
      var row;
      for (var cell = 0; cell < Math.ceil((offset + count) / 7) * 7; cell++) {
        if (cell % 7 === 0) { row = document.createElement('tr'); tbody.appendChild(row); }
        var td = document.createElement('td'); row.appendChild(td);
        var day = cell - offset + 1;
        if (day < 1 || day > count) continue;
        var key = month + '-' + String(day).padStart(2, '0');
        var events = dates.filter(function (item) { return item.date === key; });
        var dayLabel = longDate.format(asDate(key));
        if (events.length) {
          var button = document.createElement('button'); button.type = 'button'; button.textContent = day;
          button.dataset.calendarDay = key;
          button.setAttribute('aria-pressed', String(key === selected));
          button.setAttribute('aria-label', dayLabel + ' : ' + events.map(function (item) { return item.titre; }).join(', '));
          if (key === today) button.setAttribute('aria-current', 'date');
          button.addEventListener('click', function (event) {
            selected = event.currentTarget.dataset.calendarDay; render();
            host.querySelector('[data-calendar-day="' + selected + '"]').focus();
          }); td.appendChild(button);
        } else {
          var number = document.createElement('span'); number.textContent = day;
          if (key === today) number.setAttribute('aria-current', 'date');
          td.appendChild(number);
        }
      }
      table.appendChild(tbody); panel.append(head, table);
      var legend = document.createElement('p'); legend.className = 'calendar-legend'; legend.textContent = 'Clique sur un jour coloré pour venir me voir.'; panel.appendChild(legend);
      var details = document.createElement('div'); details.className = 'calendar-details'; details.setAttribute('aria-live', 'polite'); details.setAttribute('aria-atomic', 'true');
      var title = document.createElement('h3'); title.textContent = selected ? longDate.format(asDate(selected)) : 'Aucune date ce mois-ci';
      var list = document.createElement('ul'); list.className = 'setlist';
      dates.filter(function (item) { return item.date === selected; }).forEach(function (item) { list.appendChild(dateRow(item)); });
      details.append(title, list); host.append(panel, details);
    }
    render();
  });

  // Vidéo à la demande : ni lecture automatique ni requête vidéo avant le clic.
  document.querySelectorAll('[data-video]').forEach(function (player) {
    var button = player.querySelector('button');
    if (!button) return;
    button.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(player.getAttribute('data-video')) + '?rel=0';
      frame.title = 'Pauk sur scène — extrait du deuxième spectacle';
      frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
      frame.setAttribute('allowfullscreen', '');
      player.replaceChildren(frame);
      frame.focus();
    });
  });
  document.querySelectorAll('.print-sheet').forEach(function (button) {
    button.addEventListener('click', function () { window.print(); });
  });

  // Statistiques datées : chiffres relevés, sans service tiers ni compteur inventé.
  var stats = window.PAUK_STATS;
  if (stats) {
    var number = new Intl.NumberFormat('fr-FR');
    var networks = stats.followers || [];
    var complete = networks.length === 4 && networks.every(function (network) {
      return Number.isInteger(network.count) && network.count >= 0;
    });
    var total = document.querySelector('[data-followers-total]');
    if (total && complete) {
      total.textContent = number.format(networks.reduce(function (sum, network) { return sum + network.count; }, 0));
    }
    var breakdown = document.querySelector('[data-followers-breakdown]');
    if (breakdown) networks.forEach(function (network) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.href = network.url; link.target = '_blank'; link.rel = 'noopener';
      var count = document.createElement('strong'); count.textContent = number.format(network.count);
      var label = document.createElement('span'); label.textContent = network.name;
      link.append(count, label); item.appendChild(link); breakdown.appendChild(item);
    });
    var dateLabel = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' })
      .format(new Date(stats.updatedAt + 'T12:00:00+01:00'));
    document.querySelectorAll('[data-stats-date]').forEach(function (label) {
      label.textContent = 'Abonnements cumulés · relevé du ' + dateLabel + '.';
    });
    document.querySelectorAll('[data-instagram-views]').forEach(function (label) {
      var views = (stats.instagramViews || {})[label.getAttribute('data-instagram-views')];
      if (!views) return;
      label.textContent = (views.approximate ? '≈ ' : '') + (views.label || number.format(views.count)) + (views.label && views.label.endsWith('M') ? ' de vues sur Instagram' : ' vues sur Instagram');
      label.title = 'Chiffre relevé le ' + dateLabel;
      label.hidden = false;
    });
  }

  // Boutons « Copier » (bio presse)
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = document.getElementById(btn.getAttribute('data-copy'));
      if (!src) return;
      var text = src.innerText.trim();
      var done = function () {
        var label = btn.textContent;
        btn.textContent = 'Copié';
        setTimeout(function () { btn.textContent = label; }, 1600);
      };
      var fallback = function () {
        var range = document.createRange();
        range.selectNodeContents(src);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        btn.textContent = 'Texte sélectionné';
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
    });
  });
})();
