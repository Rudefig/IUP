console.log("Injector.js loaded", IUP);
$(document).ready(function() {
  // Import_Module_Data().then((IUP) => {
  //   console.log("<IUP> Loaded IUP data:", IUP);
  // });
  // Import_Module_Settings().then((IUP) => {
  //   console.log("<IUP> Loaded IUP data:", IUP);
  // });
  console.log("Injecting...");
  Import_Module_Data().then((IUP) => {
    Import_Module_Settings(IUP).then((IUP) => {
      console.log("<IUP> Loaded IUP data:", IUP);
      IUP.Context.Action.Engage_Context_Menu();
    });
  });
});
function injectInlineModule({ code, id = `inline-mod-${Date.now()}` } = {}) {
  if (!code) throw new Error("injectInlineModule: 'code' required");
  // Avoid duplicate
  if (id && document.getElementById(id)) return document.getElementById(id);

  const script = document.createElement("script");
  script.type = "module";
  script.id = id;
  script.textContent = code;

  (document.head || document.documentElement).appendChild(script);
  return script;
}
