import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Bind",
  Title: "Bind Type",
  Desc: "A user input binding.",
  System: "Keymapping",
};

export const Value = {
  Keystroke: "",
  Modifier: {
    CTRL: false,
    SHIFT: false,
    ALT: false,
  },
};

export const Trigger = {};

export const Convert = {
  String_to_Bind: function(String, Os = "Windows") {
    var Bind = { Keystroke, Modifier: {} },
      StringArr = String.split(" "), // TODO: Detect string "Ctrl + Alt + F" or "Cmd + Opt + F" or "COMMAND OPTION F"
      ModifierArr = IUP.Modifier.Metadata.Child;
    for (const Modifier of ModifierArr) {
      let Name = IUP.Modifier.Index.Modifier_Table.Value[Os][Modifier];
      Bind.Modifier[Modifier] = StringArr.includes(Name) ? true : false;
    }
    Bind.Keystroke = StringArr.at(-1);
    return Bind;
  },
  Bind_to_String: function(Bind, separator = " ", Os = "Windows") {
    var StringArr = [];
    for (const Modifier in Bind.Modifier) {
      if (Bind.Modifier[Modifier] != true) continue;
      let Name = IUP.Modifier.Index.Modifier_Table.Value[Os][Modifier];
      StringArr.push(Name);
    }
    StringArr.push(Bind.Keystroke);
    return StringArr.join(Separator);
  },
};
export const Process = {
  Intake: function(data) {
    // Need to create Symbol type for holding string variations of modifier keys, integrates with RegEx.
    // Variations are stored in a Table structure, used to customize UI component as well as detect data.
  },
};

/*
‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅    ∽ Bind Subtype ∼   ⟆▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                      An input binding with modifiers.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ TODO ❖
▓   ◇ Binding is mapped to an Action. An app's keyboard shortcuts are a set of Bindings mapped to a set of Actions.
▓   ◇ Use input component to record binding and toggle modifiers
▓   ◇ Output component displays binding hint (Ex: [F] Pay Respects)
▓
▓ ❖ DATA STRUCTURE ❖
▓  ⮚ QUERY:
▓    ◇ "Build Keypress String" = Returns a string for <keypress.js>.
▓    ◇ .setMod()    = Set modifier key on or off. (toggle by default)
▓    ◇ .gui()       = Output <input> code.
▓
▓ ❖ TODO ❖
▓   ◇ Support setting to switch ctrl/cmd for mac.
▓   ◇ Move item description tooltips to (?) icon.
▓   ◇ Separate item categories into individual collapsable tables. Tables besides main start collapsed. (Remember state?) Replaces Advanced toggle.
▓   ◇ UI:
▓     ⬥ 4 toggle buttons on the left for modifiers: ctrl/cmd, alt/arg, shift, and win/ctrl
▓     ⬥ Input field for key (When user focuses it, it records any key press)
▓     ⬥ Button to record key/confirm key
▓     ⬥ Press esc to cancel selection
▓                                                                                */
export var Type = function BindingType(arg) {
  /*
█
▓█═─────══─────═🙦   .setMod()   🙤═─────══─────═❖
▓ ⮚ Set modifier key {key} to {val}. Leave {val} blank to toggle.                                                                          */
  this.setMod = function(key, val = "toggle") {
    if (val == "toggle") {
      this.Value.modifier[key] = this[key] ? false : true;
    } else {
      this.Value.modifier[key] = Boolean(val);
    }
  };
};
