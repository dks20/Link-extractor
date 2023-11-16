document.addEventListener('DOMContentLoaded', function () {
  // Function to fetch and display live timestamp
  function updateTimestamp() {
    const timestampElement = document.getElementById('timestamp');
    timestampElement.textContent = new Date().toLocaleString();
  }

  document.getElementById('downloadLinks').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'getLinks' }, (response) => {
      const links = response.links;
      const blob = new Blob([JSON.stringify(links, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'external_links.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });

  function fetchIpAddress() {
    chrome.runtime.sendMessage({ type: 'fetchIpAddress' }, function (response) {
       document.getElementById('ipAddress').textContent = response;
    });
   }
   
   fetchIpAddress();

  // Initial update of timestamp when the popup is opened
  updateTimestamp();
  setInterval(updateTimestamp, 1000);
});


