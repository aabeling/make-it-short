function saveOptions(e) {
    console.log("saving options");
    browser.storage.sync.set({
        starttime: document.querySelector("#starttime").value,
        warntime: document.querySelector("#warntime").value
    });
    e.preventDefault();
}

function restoreOptions() {
  
    console.log("restoring options");

    document.querySelector("#starttime").value = 60;
    document.querySelector("#warntime").value = 10;

    var gettingItem = browser.storage.sync.get('starttime');
    gettingItem.then((res) => {
      document.querySelector("#starttime").value = res.starttime || '60';
    });

    gettingItem = browser.storage.sync.get('warntime');
    gettingItem.then((res) => {
      document.querySelector("#warntime").value = res.warntime || '10';
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);