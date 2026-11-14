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
  document.querySelectorAll('[data-dates]').forEach(function (list) {
    var limit = Number(list.getAttribute('data-limit')) || dates.length;
    dates.slice(0, limit).forEach(function (item) {
      var li = document.createElement('li');
      var when = document.createElement('span'); when.className = 'when';
      when.textContent = item.libelle || new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Paris', day: 'numeric', month: 'long', year: 'numeric'
      }).format(new Date(item.date + 'T12:00:00+01:00'));
      var what = document.createElement('span'); what.className = 'what'; what.textContent = item.titre;
      var place = document.createElement('small'); place.textContent = item.lieu; what.appendChild(place);
      var side = document.createElement('span'); side.className = 'side';
      if (item.role) { var tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = item.role; side.appendChild(tag); }
      if (item.url && /^https?:\/\//.test(item.url)) {
        var link = document.createElement('a'); link.className = 'go'; link.href = item.url;
        link.target = '_blank'; link.rel = 'noopener'; link.textContent = 'Réserver →'; side.appendChild(link);
      }
      li.append(when, what, side); list.appendChild(li);
    });
    var empty = list.parentElement.querySelector('.setlist-empty');
    if (empty) empty.hidden = dates.length > 0;
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
