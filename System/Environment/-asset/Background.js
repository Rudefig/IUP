/*                        _‗______🙖⟆∽🎕∼⟅🙐________‗_
ⸯ‗‗‗‗‗༼╯̿ ̿ ̿ ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾̿ ╰༽‗‗‗‗‗‗
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Iɴᴛᴇʀɴᴇᴛ Uᴛɪʟɪᴛɪᴇꜱ Pʟᴀᴛɪɴᴜᴍ ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓⸾░          ̿ ̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿ ̿ ⸯ            ⸯ▓
▓⸾░
▓⸾▒                          ❖  BACKGROUND.JS  ❖
▓⸾▒              Background page for handling the engine API.
▓⸾▒
▓██⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓⸾░﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓⸾░                               ❖ INDEX ❖
▓⸾▒  ❖ ON INSTALL:
▓⸾▒	   ◇ Build utility meta-settings
▓⸾▒	   ◇ Save settings to local storage
▓⸾▒
▓⸾▒  ❖ BROWSER ACTION:
▓⸾▒	   ◇ Open global settings      ⬥ .runtime.openOptionsPage
▓⸾▒
▓⸾▒  ❖ MESSAGING:
▓⸾▒	   ◇ Download_File              ⬥ .download
▓⸾▒	   ◇ Retrieve_Settings          ⬥ .browser.storage.local.get
▓⸾▒	   ◇ Native Context Menu        ⬥ .contextMenus
▓⸾▒	   ◇ Native Notification        ⬥ .notifications
▓⸾▒	   ◇ Prevent Sleep              ⬥ .power
▓⸾▒	   ◇ Reinstall Extension        ⬥ .runtime.oninstalled
▓⸾▒	   ◇ Open Extension Settings    ⬥ .runtime.openOptionsPage / .tabs.sendMessage
▓⸾▒	   ◇ Create New Tab             ⬥ .tabs.create
▓⸾▒	   ◇ Set Active Tab             ⬥ .tabs.query / .tabs.update
▓⸾▒	   ◇ Set Page Zoom              ⬥ .tabs.getZoom / .tabs.setZoom
▓⸾▒	   ◇ Capture Tab                ⬥ .tabs.tabCapture
▓⸾▒
▓██⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓⸾░﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓⸾▒ ❖ NOTE ❖
▓⸾▒   ◇ DEPENDENCIES:
▓⸾▒     ⬥ /settings/SettingData.js  ~
▓⸾▒		           {DEFAULT_SETTINGS}, {defaultSections}, genContext()
▓⸾▒
▓══─────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══─────────────══▓
 ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊⏜⏝⏜⏝⏜⏝⏜﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊             */
// console.log("<IUP> Background script executed");

import {
  IUP,
  Import_Module_Data,
  Import_Module_Settings,
  Initialize_Platform,
} from "../-asset/Initialization.js";
/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ ON INSTALL ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓     Build the settings DB and save to storage. Call to reset the extension.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓  ◇ Build global settings from defaults.
▓  ◇ Build utility meta settings from defaults.
▓  ◇ Save settings & default sections to local storage.
▓                                                                                   */
browser.runtime.onInstalled.addListener(Initialize_Platform);

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ BROWSER ACTION ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓           Open the settings page when the extension icon is clicked.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
browser.action.onClicked.addListener(function() {
  browser.runtime.openOptionsPage();
});

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ MESSAGING ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓             Send and receive browser messages from script files.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */

browser.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  /*

▓═─────══─────═🙦   IMPORT MODULE DATA   🙤═─────══─────═❖
▓                                                                               */
  if ("Fetch_Module_Data" in msg) {
    // console.trace("Fetch_Module_Data()", IUP);
    // sendResponse(IUP);
    // return true;
    Import_Module_Data().then((val) => {
      console.trace("Import_Module_Data()", val);
      sendResponse(JSON.stringify(val));
    }, onError);
    return true;
  }
  /*

▓═─────══─────═🙦   IMPORT MODULE SETTINGS   🙤═─────══─────═❖
▓                                                                               */
  if ("Import_Module_Settings" in msg) {
    Import_Module_Settings().then((val) => {
      sendResponse(val);
    }, onError);
  } /*
▓═─────══─────═🙦   DOWNLOAD FILE   🙤═─────══─────═❖
▓ DOWNLOAD URL: browser.runtime.sendMessage({ downloadFile: "http://" });
▓  arg = {
▓   ◇ .url            ⬥ string (only url is required)
▓   ◇ .filename       ⬥ string
▓   ◇ .conflictAction ⬥ "uniquify|overwrite|prompt"
▓   ◇ .saveAs         ⬥ true|false
▓   ◇ .method         ⬥ GET|POST
▓   ◇ .headers        ⬥ {headers object}
▓   ◇ .body           ⬥ [Post body]
▓ */
  if ("Download_File" in msg) {
    var arg = msg.downloadFile,
      callback = arg.callback || null;
    if (callback) delete msg.downloadFile.callback;
    if (typeof arg == "string") arg = { url: arg };
    _.defaults(arg, {
      conflictAction: "uniquify",
      saveAs: true,
    });
    browser.downloads.download(arg, callback);
  } /*

▓═─────══─────═🙦   NATIVE CONTEXT MENU   🙤═─────══─────═❖
▓ Create items in Chrome's context menu.                                                                              */
  if ("contextMenu" in msg) {
    if (msg.contextMenu === true) {
      msg.contextMenu = {
        id: "iup-context",
        title: "Open context menu...",
        contexts: ["page"],
        onclick: function(e) {
          // msg.IUP
        },
      };
    }
    if (!Array.isArray(msg.contextMenu)) msg.contextMenu = [msg.contextMenu];
    msg.contextMenu.forEach((M) => browser.contextMenus.create(M));
  } /*

▓═─────══─────═🙦   NATIVE NOTIFICATION   🙤═─────══─────═❖
▓ Create a native notification.
▓⸾▒	   ◇ New Tab                 ⬥ .tabs.create
▓⸾▒	   ◇ Set Active Tab          ⬥ .tabs.query / .tabs.update
▓⸾▒	   ◇ Set Page Zoom           ⬥ .tabs.getZoom / .tabs.setZoom
▓⸾▒	   ◇ Capture Tab             ⬥ .tabs.tabCapture
                                                               */
  if ("notification" in msg) {
    const { id, callback } = msg.notification;
    delete msg.notification.id; // extract id
    console.log(id, msg.notification);
    browser.notifications.create(id, msg.notification);
    if (typeof callback === "function") callback();
  } /*

▓═─────══─────═🙦   PREVENT SLEEP   🙤═─────══─────═❖
▓ browser.runtime.sendMessage({ preventSleep: true });                             */
  if ("preventSleep" in msg) {
    if (!msg.preventSleep || msg.preventSleep == "allow") {
      browser.power.releaseKeepAwake();
    } else {
      test = browser.power.requestKeepAwake(msg.preventSleep);
    }
  } /*

▓═─────══─────═🙦   REINSTALL EXTENSION   🙤═─────══─────═❖
▓ browser.runtime.sendMessage({ resetExt: true });                             */
  if ("resetExt" in msg) {
    onInstalled();
    window.location.reload();
    sendResponse();
  } /*

▓═─────══─────═🙦   OPEN EXTENSION SETTINGS   🙤═─────══─────═❖
▓ GLOBAL:   browser.runtime.sendMessage({ openSettings: "global" });
▓ UTILITY:  browser.runtime.sendMessage({ openSettings: UTILITY_ID });               */
  if ("openSettings" in msg) {
    if (msg.openSettings == "global") {
      browser.runtime.openOptionsPage();
    } else {
      getActiveTabID((id) => browser.tabs.sendMessage(id, msg));
    }
  } /*

▓═─────══─────═🙦   CREATE NEW TAB   🙤═─────══─────═❖
▓ NEW TAB:  browser.runtime.sendMessage({ Create_New_Tab: arg });
▓  {arg} =
▓    ⬥ .windowId =     integer
▓    ⬥ .index =        integer
▓    ⬥ .url =          string
▓    ⬥ .active =       boolean
▓    ⬥ .pinned =       boolean
▓    ⬥ .index =        boolean
▓    ⬥ .openerTabId =  integer                                              */
  if ("Create_New_Tab" in msg) {
    var { props, callback } = msg.Create_New_Tab;
    browser.tabs.create(props, (tab) => {
      if (typeof callback === "function") callback(tab);
    });
  } /*

▓═─────══─────═🙦   SET ACTIVE TAB   🙤═─────══─────═❖
▓                                                                               */
  if ("setActiveTab" in msg) {
    const { setActiveTab } = msg;
    browser.tabs.query({ active: true, currentWindow: true }, (activeTab) => {
      if (activeTab.length) {
        var index = activeTab[0].index;
        browser.tabs.query({ currentWindow: true }, (allTabs) => {
          const total = allTabs.length;
          if (setActiveTab == "next" && index + 1 <= total) index++;
          if (setActiveTab == "prev" && index - 1 >= 0) index--;
          if (typeof setActiveTab === "number") index = setActiveTab;
          browser.tabs.query(
            { index: index, currentWindow: true },
            (target) => {
              if (target.length) {
              const id = target[0].id;
              browser.tabs.update(id, { active: true });
            } else throw new Error("setActiveTab() error: could not find target tab."); // prettier-ignore
            }
          );
        });
      }
    });
  } /*

▓═─────══─────═🙦   SET PAGE ZOOM   🙤═─────══─────═❖
▓ browser.runtime.sendMessage({ pageZoom: val });
▓  {val} =
▓    ⬥ GET ZOOM VALUE:  true
▓    ⬥ SET ZOOM VALUE:  integer
▓    ⬥ RESET ZOOM:      false
▓    ⬥ ADD LISTENER:    function()
▓    ⬥ REMOVE LISTENER: "removeListener"                                       */

  if ("pageZoom" in msg) {
    if (msg.pageZoom === true) {
      browser.tabs.getZoom((val) => {
        getActiveTabID((id) => browser.tabs.sendMessage(id, { pageZoom: val }));
      });
    } else if (msg.pageZoom === false) browser.tabs.setZoom(0);
    else if (typeof msg.pageZoom == "function") {
      eventListeners.pageZoom = msg.pageZoom;
      browser.tabs.onZoomChange.addListener(eventListeners.pageZoom);
    } else if (msg.pageZoom == "removeListener") {
      browser.tabs.onZoomChange.removeListener(eventListeners.pageZoom);
    } else browser.tabs.setZoom(pageZoom);
    /*

▓═─────══─────═🙦   CAPTURE TAB   🙤═─────══─────═❖
▓ Capture the visible area of the currently active tab.
▓ browser.runtime.sendMessage({ tabCapture: function(LocalMediaStream){} });                                       */
    if ("tabCapture" in msg) {
      browser.tabCapture.capture({}, msg.captureTab);
    }
  } /*

█                                                                              █
▓══─────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══─────────────══▓*/
});

function getActiveTabID(callback) {
  browser.tabs.query({ active: true, currentWindow: true }, (tab) => {
    callback(tab[0].id);
  });
}
