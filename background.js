let running = false;

/* set some defaults for time and warn time in case the storage does not work */
let time = 60;
let warn = 10;
let current;
let timeout;

function getValueFromStorage(key, defaultValue, updateFunction) {

    function onGot(item) {
        if (item[key] == undefined) {
            console.log(`value not found in storage: ${key}, using default: ${defaultValue}`);
            item[key] = defaultValue;
        }
        updateFunction(item[key]);
    }
    function onError(error) {
        console.log(`Error: ${error}`);
    }
    let getting = browser.storage.local.get(key);
    getting.then(onGot, onError);
}

function updateValuesFromStorage(callback) {

    getValueFromStorage("starttime", time, function(value) {
        time = value;
        console.log(`start time from storage: ${time}`)

        getValueFromStorage("warntime", warn, function(value) {
            warn = value;
            console.log(`warn time from storage: ${warn}`)

            callback();
        });
    });
    
}

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
        updateValuesFromStorage(function() {
            running = true;
            current = time;
            updateTimer();                
        });        
    }
}

/**
 * Sets the badge text to the current timer value.
 * Updates the current timer value.
 * Updates the badge's background color and 
 * updates the page.
 * Schedules the next update in a second.
 */
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

/**
 * Indicates the current timer's status on the page.
 * Shows a border in green, orange or red.
 */
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
