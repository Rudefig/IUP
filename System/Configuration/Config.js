import { IUP } from "../Environment/-asset/Initialization.js"; /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Config Module ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓ ❖ Metadata
▓ ❖ Action
▓   ◇ Reset_Config
▓   ◇ Change Setting
▓   ◇ Open Options Page
▓ ❖ Process
▓   ◇ Validate_Setting
▓ ❖ Query
▓   ◇ Retrieve_Settings
▓ ❖ Layout
▓   ◇ Cover
▓   ◇ Config
▓                                                                                    */
export const Metadata = {
  Keyname: "Config",
  Title: "Config Structure",
  Desc: "A group of configurable settings.",
  Format: "Array",
  Type: "Setting",
  Typing: "S",
  System: "Configuration",
};

export const Variable = {
  Retrieved_Settings: null,
};

export const Registry = {
  Config: {
    Title: "Config Registry",
    Desc: "Aggregates configuration settings from across the Platform.",
    Index: function() {
      var output = {};
      for (const Mod in IUP) {
        if (IUP[Mod].Config) {
          output[Mod] = IUP[Mod].Config;
        }
      }
      return output;
    },
  },
};

export const Action = {
  /*
█
▓█═─────══─────═🙦   Reset_Config   🙤═─────══─────═❖
▓  Reset configuration for {Config} to its defaults.   
▓ {Config} =
▓ - null     = Reset settings for all modules
▓ - Module   = Reset settings for a specific module
▓                                                                               */
  Reset_Config: function(Scope = "Global", datIUP) {
    // this.Metadata = { Title: "Reset Config", Description: "Reset configuration for {Config} to its defaults." };
    var storedData = {};

    // Determine which modules are reset
    if (Scope == "Global" || !Scope) Scope = Object.keys(IUP);
    else if (typeof Scope == "string") Scope = [Scope];

    // Locate config for each module and set to default
    for (const Mod of Scope) {
      if (IUP[Mod].Config) {
        storedData[Mod] = {};
        for (const Set in IUP[Mod].Config.SettingList) {
          storedData[Mod][Set] = IUP[Mod].Config.SettingList[Set].Default;
        }
      }
    }
    // Push settings to storage
    browser.storage.local.set(storedData, (msg) => {
      // console.log(
      //   "<IUP> Reset_Config: Platform settings set to defaults",
      //   storedData
      // );
    });
  },

  /*
█
▓█═─────══─────═🙦   Open_Options_Page   🙤═─────══─────═❖
▓  Open the browser extension's dedicated options page.                                                                     */
  Open_Options_Page: function() {
    browser.runtime.Open_Options_Page();
  },
};
export const Process = {
  /*
█
▓█═─────══─────═🙦   Prep_Setting   🙤═─────══─────═❖
▓  Prepare setting value                                                                        */
  Prep_Setting: function(Setting) {
    if (Setting.type == "header" || !Setting.default) return;
    let Val = Setting.default;
    if (Setting.choices) Val = Setting.choices[Val];
    if (Setting.toStorage) Val = Setting.toStorage(Val);
    // Val.id = Setting.default;
    return Val;
  },
};
export const Query = {
  /*
█
▓█═─────══─────═🙦   Retrieve Config   🙤═─────══─────═❖
▓  Retrieve settings from storage and return in callback.                                                                       */
  Retrieve_Config: function(scope = null, callback) {
    browser.storage.local.get(scope, initSettings).then(
      (data) => {
        //return settings?
        callback();
      },
      (fail) => {
        console.error(fail);
        callback();
      }
    );
    function initSettings(data) {
      const SettingsData = DEFAULT_SETTINGS;
      UserData = data.Global || {}; // ❖ Extract data

      for (var Set in SettingsData) {
        let Value = UserData[Set];
        if (typeof Value == "undefined") Value = SettingsData[Set].Default;
        // if (typeof Value == "object") Value.id = S;
        SettingsData[Set].Value = Value;
      }
      return SettingsData;
    }
  },
};

export const Sheet = {
  /*
█
▓█═─────══─────═🙦   <Config Cover>   🙤═─────══─────═❖
▓  Sheet for the Config module.                                                                       */
  Cover: function() {
    const ConfigList = Registry.Config.Index();
    var Item = document.createElement("div");
    for (const Config in ConfigList) {
      Item.appendChild(Layout.Config(ConfigList[Config]));
    }
    return Item;
  },
};
export const Card = {
  /*
█
▓█═─────══─────═🙦   <Config Card>   🙤═─────══─────═❖
▓  Generate a layout of user preferences based on Config Type.                                                                       */
  Config: function(Config, callback) {
    const Item = document.createElement("div"),
      { Title = "Untitled Config", Keyname, SettingList = {} } = Config;
    Item.className = "Layout-Config";
    // Item.innerHTML = `<div class="s-header"><h4>${Title}</h4></div>`;

    if (SettingList.length == 0) {
      Item.innerHTML += "Error: This config contains no settings.";
      return Item;
    }
    // ❖ Loop Through Settings
    for (const Setting in SettingList) {
      const dat = SettingList[Setting],
        { Title, Desc, Status, Type } = dat;
      dat.ID = Setting;
      dat.Value = IUP[Keyname].Setting[Setting];

      // Process data
      var classList = ["Setting-label"];
      if (Status == "Disabled") classList.push("Disabled");
      // if (props.toDisplay) Setting.Value = props.toDisplay(Set.Value);
      classList = classList.join(" ");

      // Build setting node
      const inputItem = IUP.Item.Generate.Construct_Input(dat);
      //TODO: Integrate Event/Trigger module
      inputItem.addEventListener("Edit", (e) => {
        var Value = inputItem.Value;
        IUP.Setting.Action.Change_Setting(Keyname, Setting, Value);
      });

      // ❖ Inject HTML
      const rowHTML = `<div class="${classList}" title="${Desc}"><span>${Title}</span></div>
<div id="${Setting}-node" class="Setting-field"></div>`;
      Item.insertAdjacentHTML("beforeEnd", rowHTML);
      Item.querySelector(`#${Setting}-node`).prepend(inputItem);
    }
    return Item;
  },
};
