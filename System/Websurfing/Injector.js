console.log("Injector.js loaded", Import_Module_Data);
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
