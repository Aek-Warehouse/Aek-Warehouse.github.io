const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const lightbox = document.getElementById('photo-lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('button');

if (lightbox && lightboxImage && lightboxClose) {
  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.removeAttribute('src');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.deca-gallery img, .retirement-gallery img').forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt}. Expand photo`);
    const openLightbox = () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    };
    image.addEventListener('click', openLightbox);
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox();
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll('.projects-section .project-row').forEach((row) => {
  const destination = row.querySelector('.text-link');
  if (!destination) return;

  row.tabIndex = 0;
  row.setAttribute('role', 'link');
  row.addEventListener('click', (event) => {
    if (!event.target.closest('a')) window.location.href = destination.href;
  });
  row.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.location.href = destination.href;
    }
  });
});

const writeupList = document.getElementById('writeup-list');
const writeups = Array.isArray(window.ctfWriteups) ? window.ctfWriteups : [];

if (writeupList) {
  writeupList.replaceChildren();
  if (!writeups.length) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'placeholder-message';
    emptyMessage.textContent = '[ADD CTF WRITEUPS IN ctf-writeups.js]';
    writeupList.append(emptyMessage);
  } else {
    writeups.forEach((writeup) => {
      const entry = document.createElement('article');
      entry.className = 'writeup-entry';
      const title = document.createElement('h3');
      title.textContent = writeup.challenge;
      const meta = document.createElement('p');
      meta.className = 'writeup-meta';
      meta.textContent = [writeup.competition, writeup.category, writeup.date].filter(Boolean).join(' · ');
      const summary = document.createElement('p');
      summary.textContent = writeup.summary;
      const reference = document.createElement(writeup.url ? 'a' : 'span');
      reference.textContent = writeup.url ? 'Read GitHub writeup' : '[ADD GITHUB MARKDOWN WRITEUP LINK]';
      if (writeup.url) { reference.href = writeup.url; reference.target = '_blank'; reference.rel = 'noreferrer'; }
      entry.append(title, meta, summary, reference);
      writeupList.append(entry);
    });
  }
}
