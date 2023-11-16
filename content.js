// content.js

const port = chrome.runtime.connect({ name: 'content-script' });


const externalLinks = Array.from(document.querySelectorAll('a[href^="http"]'))
  .map(link => link.href);

chrome.runtime.sendMessage({
  action: 'sendLinks',
  links: externalLinks
});



// Listen for messages from the background script
port.onMessage.addListener((msg) => {
  if (msg.action === 'updateData') {
    // Update the content of your extension popup with the received data
    const timestampElement = document.getElementById('timestamp');
    timestampElement.textContent = msg.timestamp;
  }
});
