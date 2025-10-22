// LEGAL NOTICE: This prototype and software design concept is the intellectual property of Ian McNeill. Any attempt to rip it off will result in legal action.

/*
 
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ IMPORT MODULE DATA ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓  Retrieve all module data from the background page.
▓                                                                                                   */
import {
  Import_Module_Data,
  Import_Module_Settings,
} from "/System/Environment/-asset/Initialization.js";
var IUP = await Import_Module_Data();
IUP = await Import_Module_Settings(IUP);
const ModIndex = { ...IUP.Module.Index.Module },
  SysIndex = { ...IUP.System.Index.System },
  UtilIndex = { ...IUP.Utility.Index.Utility };

/*

▓═─────══─────═🙦   Initialize Script  🙤═─────══─────═❖
▓                                                                               */
const URLParams = new URLSearchParams(window.location.search);
var Module = URLParams.get("Module") || "Platform",
  Theme = URLParams.get("Theme") || IUP.Cosmetic.Setting.Theme || "Websafe";
// Set theme
const themeNode = document.querySelector("#Theme-Style");
themeNode.href = `/System/Cosmetic/-asset/Style-${Theme}.css`;

/*
 
▓═─────══─────═🙦   Identify Module Hierarchy  🙤═─────══─────═❖
▓ Identify the selected module's Utility and System.                                                                              */
var selUtil, selSys, selMod;
if (!Module) Module == "Platform";
if (Module in UtilIndex) selUtil = Module;
else if (Module in SysIndex) {
  selSys = Module;
  selUtil = IUP[selSys].Metadata.Utility[0]; // Select System's first Utility
} else {
  for (const S in ModIndex) {
    if (Module in ModIndex[S]) {
      selMod = Module;
      selSys = S;
      selUtil = IUP[selSys].Metadata.Utility[0];
    }
  }
}

//Generate Utility menu HTML
var utilMenu = "";
for (const Util in UtilIndex) {
  let isSelected = Util == selUtil ? "selected" : ""; //If utility is selected, add CSS class
  utilMenu += IUP.Keyname.Order.Generate.Keylink(
    Util,
    `<div>${Util}</div>`,
    isSelected
  ); //Insert menu button
}
document.querySelector(".Menu-Utility").innerHTML = utilMenu;
//Generate breadbar HTML
var breadbar = IUP.Utility.Strip.Breadbar(selUtil, selSys, selMod);
document.querySelector(".window-header").after(breadbar);

/*
  
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ CONSTRUCT MODULE PAGE ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓  Construct page for a module depending on which is selected.
▓   ◇ If Module = "Platform", show the platform introduction page.
▓   ◇ If Module = Utility, display its list of Systems.
▓   ◇ If Module = System, show System info and list of modules.
▓   ◇ If Module = any other module, show generic module information.
▓                                                                                                   */
const bodyNode = document.querySelector(".window-body");
var bodyContent;

if (selMod == "Platform") bodyContent = IUP.Platform.Sheet.Cover();
else if (selUtil && !selSys) bodyContent = IUP.Utility.Sheet.Utility(selUtil);
else if (selSys && !selMod) bodyContent = IUP.System.Sheet.System(selSys);
else if (selMod) bodyContent = IUP.Module.Sheet.Cover(selMod);
else bodyContent = IUP.Metadata.Card.Titling();
if (typeof bodyContent === "string") bodyNode.innerHTML = bodyContent;
else bodyNode.appendChild(bodyContent);
IUP.Context.Action.Engage_Context_Menu();
IUP.Coloristic.Action.Initialize(IUP);
