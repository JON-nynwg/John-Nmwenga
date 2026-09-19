document.getElementById('year').textContent = new Date().getFullYear();

// mobile nav toggle
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { navLinks.classList.remove('open'); });
  });
}

// contact form: submit via Web3Forms without leaving the page
(function () {
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var submitBtn = form.querySelector('button[type="submit"]');
    var data = new FormData(form);
    if (data.get('botcheck')) return; // honeypot tripped, silently ignore

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';

    fetch(form.action, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
      .then(function (res) { return res.json(); })
      .then(function (json) {
        if (json.success) {
          status.textContent = 'Message sent — thanks, I\'ll get back to you soon.';
          status.classList.add('is-success');
          form.reset();
        } else {
          status.textContent = 'Something went wrong. Please email nmwengajohn@gmail.com directly.';
          status.classList.add('is-error');
        }
      })
      .catch(function () {
        status.textContent = 'Something went wrong. Please email nmwengajohn@gmail.com directly.';
        status.classList.add('is-error');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      });
  });
})();

// experience marquee: pause on tap for touch devices, and when tab is hidden
(function () {
  var marquee = document.querySelector('.marquee');
  if (!marquee) return;
  var track = marquee.querySelector('.marquee-track');
  if (!track) return;

  // duplicate the card set once so the loop is seamless
  if (!track.dataset.duplicated) {
    var clone = track.innerHTML;
    track.innerHTML = clone + clone;
    track.dataset.duplicated = 'true';
  }

  document.addEventListener('visibilitychange', function () {
    marquee.classList.toggle('is-paused', document.hidden);
  });

  marquee.addEventListener('click', function () {
    marquee.classList.toggle('is-paused');
  });
})();
