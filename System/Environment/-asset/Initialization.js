export var IUP = {};

function onError(msg) {
  console.trace("Async Error:", msg);
}

/*

 █
 ▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Import_Module_Data ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
 ▓ Retrieve module index, import module data, and load onto global IUP variable.
 ▓                                                                                   */
export async function Import_Module_Data() {
  IUP = {};

  const SystemPath = browser.runtime.getURL("/System/Encapsulation/System.js"),
    SystemIndex = await import(SystemPath).then((dat) => dat.Index.System),
    ModulePath = browser.runtime.getURL("/System/Encapsulation/Module.js"),
    ModuleIndex = await import(ModulePath).then((dat) => dat.Index.Module);

  // ❖ Initialize Systems
  for (const Sys in SystemIndex) {
    if (SystemIndex[Sys] === true) {
      await import(`/System/${Sys}/${Sys}.js`).then((result) => {
        let Key = result.Metadata.Keyname;
        IUP[Key] = { ...result };
      }, onError);
    } else {
      IUP[Sys] = { Metadata: SystemIndex[Sys], ...SystemIndex[Sys] };
    }
  }

  // ❖ Initialize Modules
  for (const Sys in ModuleIndex) {
    for (const Mod in ModuleIndex[Sys]) {
      let dat = ModuleIndex[Sys][Mod];
      if (dat === true) {
        if (dat && dat === true) dat = Mod + ".js";
        await import(`/System/${Sys}/${dat}`).then((result) => {
          IUP[Mod] = { ...IUP[Mod], ...result };
          IUP[Mod].Metadata = { ...IUP[Mod].Metadata, ...dat };
          // Combine subtypes then types
          IUP[Mod].Action = {
            ...IUP[Mod].Action,
            ...IUP[Mod].Execute,
            ...IUP[Mod].Initialize,
            ...IUP[Mod].Reset,
            ...IUP[Mod].Transmit,
          };
          IUP[Mod].Process = {
            ...IUP[Mod].Process,
            ...IUP[Mod].Convert,
            ...IUP[Mod].Validate,
            ...IUP[Mod].Calculate,
          };
          IUP[Mod].Query = {
            ...IUP[Mod].Query,
            ...IUP[Mod].Generate,
          };
          IUP[Mod].Order = {
            ...IUP[Mod].Order,
            ...IUP[Mod].Action,
            ...IUP[Mod].Process,
            ...IUP[Mod].Query,
          };
        }, onError);
      }
    }
  }

  console.trace("IUP Context Registry 2", IUP.Context.Registry);
  // IUP.Context.Registry = [];
  for (const Mod in IUP) {
    if (IUP[Mod].Action?.Engage) IUP[Mod].Action.Engage();
    if (IUP[Mod].Context) {
      if (Array.isArray(IUP[Mod].Context))
        IUP.Context.Registry.push(...IUP[Mod].Context);
      else IUP.Context.Registry.push(IUP[Mod].Context);
    }
  }

  // ❖ Initialize Utilities
  for (const Util of IUP.Utility.Metadata.Child) {
    IUP[Util] = {
      Metadata: {
        Title: Util + " Utility",
        Desc: IUP.Utility.Index.Utility[Util],
        Parent: "Utility",
      },
    };
  }

  // console.log("<IUP> Import_Module_Data() Modules imported:", IUP);
  return IUP;
}
/*

 █
 ▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Import_Module_Settings ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
 ▓ Retrieve settings from storage and load onto global IUP variable.
 ▓                                                                                   */
export async function Import_Module_Settings() {
  const result = await browser.storage.local.get(null);
  for (const Mod in result) {
    IUP[Mod].Setting = result[Mod];
  }
  console.trace("<IUP> Settings imported", IUP);
  return IUP;
}

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Initialize Platform ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓     Build the settings DB and save to storage. Call to reset the extension.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓  ◇ Build global settings from defaults.
▓  ◇ Build utility meta settings from defaults.
▓  ◇ Save settings & default sections to local storage.
▓                                                                                   */
export async function Initialize_Platform() {
  await Import_Module_Data().then((val) => {
    IUP.Config.Action.Reset_Config(null, val);
    // console.log("<IUP> Settings reset");
  }, onError);
  await Import_Module_Settings();
  console.log("<IUP> Installation complete", IUP);
}

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽  ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓     
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓  ◇ 
▓                                                                                   */

// window.addEventListener("IUP_Request", function(e) {
//   window.dispatchEvent(
//     new CustomEvent("IUP_Response", {
//       detail: { IUP, Import_Module_Data, Import_Module_Settings },
//     })
//   );
// });
// (async () => {
//   await Import_Module_Data();
//   await Import_Module_Settings();
//   console.log("IUP initialized in page context", IUP);
//   // window.IUP = IUP;
// })();
