/*ⸯ                     ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  PASSWORD FEATURES  🙠   █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓                                                                                */
export var con = {
  shadowID: "IUP-UP",
  targClass: "IUP-UP-target",
  cssPropsToClone: ["width", "height", "border", "padding", "box-sizing"],

  /*
█ ❖ revTemplate() ⬥ Reveal Password template node.                                                                   */
  get revTemplate() {
    var node = document.createElement("span");
    node.classList.add("btn-reveal");
    node.title =
      " ❖ Click to toggle password visibility.\n ❖ Shift-click to disable on this site.\n ❖ Alt-click to fix positioning.";
    node.innerHTML = `<i class="fas fa-eye" aria-hidden="true"></i>`;
    return node;
  },

  /*
█ ❖ capsTemplate() ⬥ CAPSLOCK Indicator template node.                                                                   */
  get capsTemplate() {
    var node = document.createElement("span"),
      iconURL = chrome.runtime.getURL("utility/CAPSLOCK.svg");
    node.classList.add("btn-caps");
    node.title = "CAPSLOCK is enabled.";
    node.innerHTML = `<object type="image/svg+xml" data="${iconURL}">`;
    // node.querySelector("object").onload = function(e) {
    //   console.log(this, this.getSVGDocument(), this.contentDocument, "aaa");
    // };
    return node;
  }
};
