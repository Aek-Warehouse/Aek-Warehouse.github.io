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

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
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
      meta.textContent = `${writeup.competition} · ${writeup.category} · ${writeup.date}`;
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
