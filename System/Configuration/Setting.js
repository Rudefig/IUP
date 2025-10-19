import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Title: "Setting Type",
  Alt: "Type-V-Setting",
  Desc: "A single configurable user setting.",
  Typing: "V",
};
export const Action = {
  /*
█
▓█═─────══─────═🙦   Change_Setting   🙤═─────══─────═❖
▓  Change the value of {Setting} for {Mod} to {Value}.                                                                      */
  Change_Setting: function(Mod, Set, Value) {
    var storedData = {};
    if (IUP[Mod] && IUP[Mod].Config) {
      storedData[Mod] = {};
      for (const Setting in IUP[Mod].Config.SettingList) {
        if (Setting == Set) storedData[Mod][Setting] = Value;
        else storedData[Mod][Setting] = IUP[Mod].Setting[Setting];
      }
    }
    // Push settings to storage
    browser.storage.local.set(storedData, function(result) {
      console.log(
        `<IUP> Change_Setting() Setting ${Set} for ${Mod} set to:`,
        storedData
      );
    });
  },
  /*
█
▓█═─────══─────═🙦   Reset_Setting   🙤═─────══─────═❖
▓  Reset the value of {Setting} for {Mod} to defaults.                                                                      */
  Reset_Setting: function(Mod, Set) {
    storedData[Mod] = {};
    for (const Set in IUP[Mod].Config.SettingList) {
      storedData[Mod][Set] = IUP[Mod].Config.SettingList[Set].Default;
    }
    browser.storage.local.set(storedData, function(result) {
      console.log(
        `<IUP> Change_Setting() Setting ${Set} for ${Mod} reset to:`,
        storedData
      );
    });
  },
};
