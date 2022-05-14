let running = false;
let time = 40;
let warn = 30;
let current;
let timeout;

function onClick() {

    if (running) {

        console.log("turn timer off");
        clearTimeout(timeout);
        running = false;
        browser.browserAction.setBadgeBackgroundColor({color: "green"});
        browser.browserAction.setBadgeText({text: "" });
        updatePage(null);
    } else {
        console.log("turn timer on");
        running = true;
        current = time;
        updateTimer();                
    }
}

function updateTimer() {

    current--;
    browser.browserAction.setBadgeText({text: current.toString() });
    
    /* determine color based on current time */
    let color = "green";
    if (current == 0) {
        color = "red";
    } else if (current <= warn) {        
        color = "orange";        
    }
    updatePage(color);
    browser.browserAction.setBadgeBackgroundColor({color: color });

    if (running && current > 0) {
        timeout = setTimeout(updateTimer, 1000);
    }
}

function updatePage(color) {

    if (color != null) {
        let code = "document.body.style.border = \"10px solid " + color + "\"";
        console.log("updatePage: code=" + code);
        browser.tabs.executeScript({
            code: code
        });
    } else {
        console.log("reset page");
        let code = "document.body.style.border = \"initial\"";
        browser.tabs.executeScript({
            code: code
        });
    }
}

browser.browserAction.onClicked.addListener(onClick);
