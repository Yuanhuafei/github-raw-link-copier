function insertCopyRawLinkButton() {
  const rawButton = document.querySelector('a[data-testid="raw-button"]');
  if (!rawButton) return;

  const buttonGroup = rawButton.closest('div[class*="ButtonGroup"]');
  if (!buttonGroup) return;

  if (document.querySelector('#copy-true-raw-link-btn')) return;

  const githubRawUrl = rawButton.href;
  const trueRawUrl = githubRawUrl
      .replace('https://github.com/', 'https://raw.githubusercontent.com/')
      .replace('/raw/', '/');

  const copyBtn = document.createElement('button');
  copyBtn.id = 'copy-true-raw-link-btn';
  copyBtn.setAttribute('type', 'button');
  copyBtn.setAttribute('title', 'Copy raw.githubusercontent link');
  copyBtn.setAttribute('data-testid', 'copy-true-raw-link-button');
  copyBtn.setAttribute('data-component', 'IconButton');
  copyBtn.setAttribute('data-loading', 'false');
  copyBtn.setAttribute('data-no-visuals', 'true');
  copyBtn.setAttribute('data-size', 'small');
  copyBtn.setAttribute('data-variant', 'default');
  copyBtn.className = 'prc-Button-ButtonBase-c50BI prc-Button-IconButton-szpyj BtnGroup-item tooltipped tooltipped-n';
  copyBtn.setAttribute('aria-label', 'Copy raw.githubusercontent link');
  copyBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
  <!-- Clipboard outline -->
  <path d="M16 2H15.17C14.58 1.42 13.84 1 13 1H11C10.16 1 9.42 1.42 8.83 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2ZM11 3H13V5H11V3ZM16 20H8V4H9V6H15V4H16V20Z"/>
  <!-- Enlarged chain link -->
  <path d="M8.5 14a2 2 0 0 1 0-2.83l2.12-2.12a2 2 0 0 1 2.83 0l.88.88a1 1 0 1 1-1.42 1.42l-.88-.88-2.12 2.12a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l2.12-2.12a2 2 0 0 1 2.83 0l.88.88a2 2 0 0 1 0 2.83l-2.12 2.12a2 2 0 0 1-2.83 0l-.88-.88a1 1 0 1 1 1.42-1.42l.88.88 2.12-2.12a1 1 0 0 0 0-1.42 1 1 0 0 0-1.42 0l-2.12 2.12A2 2 0 0 1 8.5 14z"/>
</svg>
  `;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(trueRawUrl).then(() => {
      copyBtn.setAttribute('aria-label', 'Copied ✅');
      copyBtn.classList.add('tooltipped', 'tooltipped-n');
      setTimeout(() => {
        copyBtn.setAttribute('aria-label', 'Copy raw.githubusercontent link');
      }, 2000);
    }).catch(err => {
      console.error('Copy failed:', err);
      alert('Copy failed, please copy manually:\n' + trueRawUrl);
    });
  });

  buttonGroup.appendChild(copyBtn);
}

const observer = new MutationObserver(() => {
  insertCopyRawLinkButton();
});
observer.observe(document.body, { childList: true, subtree: true });