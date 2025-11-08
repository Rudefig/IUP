import { IUP } from "../Environment/-asset/Initialization.js";
/*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ UTILITY MODULE ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓  ❖ Layout
▓    ◇ Module
▓    ◇ Utility
▓    ◇ Breadbar
▓  ❖ Part
▓  ❖ Index
▓    ◇ Utility Index
▓                                                                                    */
export const Metadata = {
  Title: "Utility Division",
  Desc: "Organizes modules into 12 categories of software.",
  Keyname: "Utility",
  Alt: "Util",
  System: "Encapsulation",
  Parent: "Division",
  Child: [
    "Executive",
    "Storage",
    "Knowledge",
    "Automation",
    "Mathematic",
    "Linguistic",
    "Runtime",
    "Browsing",
    "Interface",
    "Aesthetic",
    "Multimedia",
    "Community",
  ],
};

export const Index = {
  Utility: {
    Executive: "Establishes and manages the software architecture.",
    Storage: "Structures and stores mixed data.",
    Knowledge: "Analyzes and presents information.",
    Automation: "Automates the software's operations'.",
    Mathematic: "Number crunching and visualization.",
    Linguistic: "Text processing and language analysis.",
    Runtime: "Runtime environment and 3rd party integration.",
    Browsing: "Internet and content browsing.",
    Interface: "Design and control the user interface.",
    Aesthetic: "Customize the interface's look and feel.",
    Multimedia: "Consume and produce media in mixed formats.",
    Community: "Interact and collaborate with other users.",
  },
};

export const Sheet = {
  /*
▓═───────═🙦  <Utility Cover> Page for the Utility module.                                                          */
  Cover: function() {
    var html = `<style>
      .table { display: grid; grid-template-columns: auto auto; gap: 1px; background: #FFF; border: 1px #FFF solid; } 
      .table > div { background: #000; padding: 2px 6px; } </style>`;
    html += "Here's a table of the Utilities.";
    for (var U in Index.Utility) {
      html += `<div><a href="?Module=${U}">${U}</a></div><div>${
        Index.Utility[U]
      }</div>`;
    }
    return `<div class="table"><div>Utility Name</div><div>Description</div>${html}</div>`;
  },

  /*
▓═───────═🙦  <Utility Sheet> Page Node for a specific Utility                                                          */
  Utility: function(Util) {
    const Item = document.createElement("div"),
      SysIndex = IUP.System.Index.System;
    // TODO: Brief intro to Utility before listing System Cards
    var Metadata = { Title: `${Util} Utility`, Desc: Index.Utility[Util] };
    Item.className = "Layout-Utility";
    Item.appendChild(IUP.Metadata.Card.Titling(Metadata));
    // Prepare data for each System
    for (const Sys in SysIndex) {
      if (IUP[Sys].Metadata.Utility.includes(Util)) {
        let Layout = IUP.System.Card.System(Sys);
        Item.appendChild(Layout);
      }
    }
    return Item;
  },
};

export const Strip = {
  /*
▓═───────═🙦  <Breadbar Layout> HTML for a module breadbar                                                          */
  Breadbar: function(Util, Sys, Mod) {
    const Item = document.createElement("div");
    Item.className = "Layout-Breadbar";
    //Generate breadbar HTML
    let html = "<span></span><a href='?Module=Platform'>Platform</a>";
    if (Util)
      html +=
        "<span></span>" +
        IUP.Keyname.Order.Generate.Keylink(Util, `${Util} Utility`);
    if (Sys)
      html +=
        "<span></span>" +
        IUP.Keyname.Order.Generate.Keylink(Sys, `${Sys} System`);
    if (Mod)
      html +=
        "<span></span>" +
        IUP.Keyname.Order.Generate.Keylink(Mod, `${Mod} Module`);
    Item.innerHTML = `<div>${html}</div>`;
    return Item;
  },
};

export const Part = {
  Bar: {
    Utility: {
      Title: "Utility Menu",
      Desc: "Displays a menu for the 12 Utilities.",
    },
  },
};
