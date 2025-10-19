/*
ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█  🙢  CONFIGURATION SYSTEM  🙠  █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓▓ ❖ Action
▓   ◇ Build_Settings()
▓   ◇ Open_Settings_Page()
▓▓ ❖ Generate
▓   ◇ buildSettingsGrid()
▓   ◇ Change_Setting()
▓
▓                                                                               */

export const Meta = {
  title: "Configuration System",
  icon: "fa-gear-complex",
  desc:
    "Configuration System implements Platform Settings, allowing the user to customize modules.",
};

export const Setting = {
  testSetting: {
    title: "Test Setting",
    desc: "Test setting desc.",
    Type: "Bool",
    Part: "Switch",
    default: false,
  },
};

export const Action = {
  /*
█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Build_Settings() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓           Build platform settings, or rebuild if a reset is needed.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ {scope} =
▓ - null = Rebuild everything
▓ - "global" = Rebuild global platform settings
▓ - "module" = Rebuild settings for every module
▓                                                                               */
  Build_Settings: function(scope, Plat) {
    // ❖ GLOBAL SETTINGS
    if (scope == "global" || !scope) {
      var globalSettings = {};
      for (var S in DEFAULT_SETTINGS) {
        globalSettings[S] = buildSetting(DEFAULT_SETTINGS[S]);
      }
      browser.storage.local.set({ Global: globalSettings }, function() {
        console.log("IUP: Global settings set to defaults.");
      });
    }
    // ❖ MODULE SETTINGS
    if (scope == "module" || !scope) {
      var modSettings = {};
      for (var S in Plat) {
        let setting = Plat[S].Setting;
        if (setting) {
          for (var S in setting) {
            modSettings[S] = buildSetting(setting[S]);
          }
        }
      }
      browser.storage.local.set({ Module: modSettings }, function() {
        console.log("IUP: Module settings set to defaults.");
      });
    }
    function buildSetting(setting) {
      if (setting.type == "header" || !setting.default) return;
      let val = setting.default;
      if (setting.choices) val = setting.choices[val];
      if (setting.toStorage) val = setting.toStorage(val);
      // val.id = setting.default;
      return val;
    }
  },
  /*
█
▓█═─────══─────═🙦   Open_Settings_Page()   🙤═─────══─────═❖
▓ Open the extension's main settings page.                                                                     */
  Open_Settings_Page: function() {
    browser.runtime.sendMessage({ openSettings: "global" });
  },
};
export const Generate = {
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ buildSettingsGrid() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓   Generate all settings for utility {U}. Omit {U} to build global settings.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓                                                                               */
  buildSettingsGrid: function(M, Settings) {
    const Item = document.createElement("div"),
      isGlobal = !M || M == "global";
    Settings = Settings || (isGlobal ? IUP.S : IUP.M[M].Settings);
    delete Settings.meta;
    Item.className = "settings-grid";

    // ❖ No module settings found.
    if (!isGlobal && _.filter(Settings, (set) => !set.isPrivate).length <= 1) {
      Item.innerHTML = "This module doesn't have settings.";
      Item.classList.add("message");
      return Item;
    }
    /*
█ ❖ Loop Through Settings                                                                  */
    _.each(Settings, (Setting, S) => {
      const { title, type, isPrivate } = Setting;
      if (isPrivate || !type || S == "meta") return;

      // ❖ "Header" Type (add a header instead of setting)
      // if (type == "header") {
      // 	const html = `<div class="s-gap"></div><div></div><div class="s-header"><h4>${title}</h4></div><div></div>`;
      // 	Item.insertAdjacentHTML("beforeEnd", html);
      // 	return;
      // }

      // ❖ Process data
      var { desc, disabled = false, development = false, props = {} } = Setting, // prettier-ignore
        classes = ["s-label"];
      if (disabled || development) classes.push("disabled");
      if (development) desc = "*This feature is currently under development.";
      if (props.toDisplay) Setting.val = props.toDisplay(Setting.val);
      classes = classes.join(" ");

      // ❖ Build setting node
      const settingItem = Construct_Input(Setting, S);
      settingItem.addEventListener("Edit", (e) => {
        var val = settingItem.val;
        ExecutiveLib.cmd.Change_Setting(U, S, val);
      });

      // ❖ Inject HTML
      const rowHTML = `<div class="${classes}" title="${desc}"><span>${title}</span></div>
<div id="${S}-node" class="s-field"><span class="s-checkmark" id="${S}-update"></span></div>`;
      Item.insertAdjacentHTML("beforeEnd", rowHTML);
      Item.querySelector(`#${S}-node`).prepend(settingItem);
    });

    // ❖ Output
    return Item;
  },
  /*
█
▓█═─────══─────═🙦   Change_Setting()   🙤═─────══─────═❖
▓ Change {setting} of {module} to {val}.                                              
▓ ❖ PARAMETERS
▓ arg = {
▓   ◇ .module|.M = "global"|Module ID
▓   ◇ .setting|.S = Setting ID
▓   ◇ .val
▓   ◇ .callback()
▓                                                                               */
  Change_Setting: function(M, S, val, callback) {
    const isGlobal = !M || M == "global",
      ID = isGlobal ? "globalSettings" : "wt-" + M,
      DEF = isGlobal ? DEFAULT_SETTINGS[S] : IUP.M[M].settings[S],
      props = DEF.props || {};
    /*
█ ❖ Prepare Data                                                                  */
    if (val === undefined) val = DEF.default;
    else if (props.toStorage) val = props.toStorage(val);
    if (DEF.choices) {
      var optionID = val;
      val = DEF.choices[val];
      val.id = optionID;
    }

    /*
█ ❖ Save settings 🙵 run onEdit() script                                                                   */
    browser.storage.local.get(ID, (storageData) => {
      const data = storageData[ID];
      const current = data[S] ? data[S].val : null;
      data[S] = val;
      browser.storage.local.set({ [ID]: data }, function() {
        if (isGlobal) console.verbose(`⚙ Global setting '${S}' changed to:`, val);  // prettier-ignore
          else {
            IUP.U[U].settings[S].val = val;
            console.verbose(`⚙ Utility '${U}' setting '${S}' changed to:`, val);
          }
        if (callback) callback();
        if (val == current) return; // don't run onEdit() script if setting hasn't changed
        if (typeof DEF.onEdit === "function") DEF.onEdit(val, data);
      });
    });
  },
};
