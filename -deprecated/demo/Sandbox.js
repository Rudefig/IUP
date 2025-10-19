/*ⸯ                     ༿─────────═🙦 🇵🇷🇪🇻🇮🇪🇼 🙤═─────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█         🙢  SANDBOX  🙠        █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓                                                                                */
FileLib.cmd.getScript(["css", "jqu"]);
LayoutLib.cmd.injectCSS();

const build = {
  Bars: {
    title: "Device Lab",
    menu: {
      New: 0,
      Edit: 0,
      Window: 0,
      Help: 0
    }
  },
  Cards: {
    NodeBox: 0,
    StyleProperties: 0,
    Minimap: 0,
    LayoutTree: 0,
    Toolset: 0,
    AssetLibrary: 0,
    ComponentLibrary: 0
  }
};

var win = document.querySelector(".Window");
var titleBar = document.querySelector(".Window__bar.-title");
injectDragging({ target: win, handle: titleBar });
// $("#drag").draggable();
// document.addEventListener("click", e => {
//   N.classList.toggle("-collapsed");
// });
document.querySelectorAll(".Card__title").forEach(N => {
  N.addEventListener("click", e => N.classList.toggle("-collapsed"));
});

/*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ DRAG ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */

function injectDragging(opt) {
  const { target, handle, container } = opt;
  if (!handle) handle = target;
  handle.classList.add("-drag-handle");
  function repositionTarget(e) {}
  // target.addEventListener("mousedown")
  //  On mouse move, set target CSS "top" and "left" to mouse distance from target's 0,0
}

/*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ RULER ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
var ruler = generateRuler(100);
document
  .querySelector(".Viewport__ruler.-horizontal")
  .insertAdjacentHTML("beforeEnd", ruler);
document
  .querySelector(".Viewport__ruler.-vertical")
  .insertAdjacentHTML("beforeEnd", ruler);

function generateRuler(segment) {
  const maxlength = 4000;
  var pos = 0;
  var output_positive = "";
  // var output_negative = "";
  while (pos < maxlength) {
    output_positive += `<div class="Ruler__segment">${pos}<div class="Ruler__divider -half"></div><div class="Ruler__divider -fourth"></div></div>`;
    // output_negative += `<div class="Ruler__segment">${pos * -1}</div>`;
    pos += segment;
  }
  return `<div class="Ruler" style="--Ruler__segment:${segment}px">${output_positive}</div>`;
}
