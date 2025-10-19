import { IUP } from "../Environment/-asset/Initialization.js";
/*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ System Module ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓ ❖ Metadata
▓ ❖ Process
▓   ⬥ String_To_Hypertext Convert Process
▓   ⬥ Keyname Validate Process
▓   ⬥ Keylink Generate Process
▓   ⬥ Multi_Keylink Generate Process
▓                                                                                   */
export const Metadata = {
  Keyname: "Keyname",
  Title: "Keyname Type",
  Desc: "A single keyword representing a module.",
  System: "Namespace",
  Parent: "Type",
  Typing: "K",
  Format: ["String", "Code"],
};

export const Order = {
  Convert: {
    // ❖ Convert String To Hypertext - Convert bracketed [Keys] inside a string into Keylinks.
    String_To_Hypertext: function(Str) {
      var match;
      do {
        match = Str.match(/\[(.*?)\]/i);
        // match = Str.match(/\<(.*?)\>/i);
        if (match)
          Str = Str.replace(match[0], Order.Generate.Keylink(match[1]));
        // else break;
      } while (match);
      return Str;
    },
  },
  Validate: {
    // ❖ Validate Keyname - Format a Keyname based on input.
    Keyname: function(Key) {
      //TODO: Capitalize Key
      //TODO: Singularize Key
      //TODO: Detect space/dash and split into Child/Parent
      //TODO: Check if Key exists
      console.trace(Key);
      if (Key.endsWith("'s")) Key = Key[Key.length - 1];
      if (IUP.Keyname.Status == "Offline") return `[${Title}]`;
      return Key;
    },
  },
  Generate: {
    // ❖ Generate Keylink - Generate a Key Link to a module
    Keylink: function(Key, Title = "", addClass = "") {
      if (!Title) Title = Key;
      if (!Key) Key = Order.Validate.Keyname(Key);
      if (IUP.Keyname.Status == "Offline")
        return `<span class="Keyname">${Title}</span>`;
      Title = Title.replace("_", " ");
      if (addClass) addClass += " ";
      return `<a href="?Module=${Key}" class="${addClass}Keyname">${Title}</a>`;
    },
    // ❖ Generate Multi_Keylink - Generate a list of Key Links
    Multi_Keylink: function(keyList, separator = ", ", addClass = "") {
      if (typeof keyList === "string") return keyList;
      var output = "";
      for (const Key in keyList) {
        output += Order.Generate.Keylink(keyList[Key]) + separator;
      }
      return output.slice(0, -2);
    },
  },
};
