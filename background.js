
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendLinks') {
    chrome.storage.local.set({ links: request.links });
  } else if (request.action === 'getLinks') {
    chrome.storage.local.get(['links'], (result) => {
      sendResponse({ links: result.links });
    });
  }
  return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'fetchIpAddress') {
     fetch('https://api.ipify.org?format=json')
       .then((response) => response.json())
       .then((data) => {
         sendResponse('IP: ' + data.ip);
       });
     return true;
  }
 });






