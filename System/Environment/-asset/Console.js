/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ CONSOLE HELPERS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓             Provides helper functions for colored console output.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ HELPER INDEX ❖
▓   ◇ console.color()                                      ⬥ Formatted console output w/ icon and colored background.
▓     ⬥ color:  Background color of title.
▓     ⬥ icon:   Icon inside title.
▓     ⬥ style:  Label CSS. Set to false for default.
▓     ⬥ trace:  Perform a stack trace.
▓     ⬥ Str:    Label text. If not a string, push onto ...val.
▓     ⬥ ...val: Variables separated by commas (like the default console function).
▓   ◇ console.verbose()                                    ⬥ Only output if verbose mode is on.🚧
▓   ◇ ___R(), ___G(), ___Y(), ___B()                       ⬥ Output in red/green/yellow/blue with stack trace
▓   ◇ __R(), __O(), __Y(), __G(), __B(), __P(), __C()      ⬥ Output in red/orange/.../purple without stack trace
▓   ◇ _1(), _2(), _3(), _4(), _5(), _6(), _7(), _8(), _9() ⬥ Output in red/green/yellow/blue.
▓
▓ ❖ NOTES ❖
▓   ◇ Icons: 🛑✅⚠️🌐
▓                                                                                   */
console.color = function(color, icon, style, trace, Str, ...val) {
  if (!style)
    style = `color: white;
padding: 3px 0;
font-weight: bold;
border-bottom: 1px #444 solid;
background-image: linear-gradient(
  to bottom,
  rgba(255, 255, 255, 0.18) 0%,
  rgba(255, 255, 255, 0) 100%
);`;
  // Only use [Str] as a label if it's a string
  if (typeof Str !== "string") {
    val.unshift(Str); // add Str to start of ...val
    Str = ""; // default val
  }
  const param1 = `%c ${String(Str)} `,
    param2 = `background-color: ${color};` + (style || css);
  if (trace) console.trace(param1, param2, ...val);
  else console.log(param1, param2, ...val);
};

console.verbose = function(Str, ...val) {
  const css = `color: #000;
border: 1px #AAA solid;
padding: 3px;
font-family: Avenir Next, Segoe UI Emoji;
font-weight: 600;
background: transparent;`;
  console.color("#CCC", "", css, false, Str, ...val);
};

function ___R(Str, ...val) {
  console.color("#F03A17", "🛑", false, true, Str, ...val);
}
function ___G(Str, ...val) {
  console.color("#2C973E", "✅", false, true, Str, ...val);
}
function ___Y(Str, ...val) {
  console.color("#DEB640", "⚠️", false, true, Str, ...val);
}
function ___B(Str, ...val) {
  console.color("#404BCD", "🔵", false, true, Str, ...val);
}

function __R(Str, ...val) {
  console.color("#F03A17", "🛑", false, false, Str, ...val);
}
function __O(Str, ...val) {
  console.color("#DE7A16", "🛑", false, false, Str, ...val);
}
function __Y(Str, ...val) {
  console.color("#DEB640", "⚠️", false, false, Str, ...val);
}
function __G(Str, ...val) {
  console.color("#2C973E", "✅", false, false, Str, ...val);
}
function __B(Str, ...val) {
  console.color("#404BCD", "🔵", false, false, Str, ...val);
}
function __P(Str, ...val) {
  console.color("#7D16DE", "🔵", false, false, Str, ...val);
}
function __C(Str, ...val) {
  const css = `text-shadow: ${"0px 0px 1px #EEE,".repeat(99)} 0px 0px 1px #EEE;
color: #DE1D16; font-size: 16px; font-weight: 800; padding: 2px 10px 2px 8px; border: 2px #AAA solid; font-family: "Proxima Nova";
background-image: repeating-linear-gradient(45deg, #ffff00 0px,#ffff00 4px,#000000 5px,#000000 10px);`;
  console.color("#7D16DE", "🚧 ", css, false, Str, ...val);
}

function _1(...val) {
  console.color("#ea311a", "1️⃣", false, true, "1", ...val);
}
function _2(...val) {
  console.color("#f28622", "2️⃣", false, true, "2", ...val);
}
function _3(...val) {
  console.color("#edac28", "3️⃣", false, true, "3", ...val);
}
function _4(...val) {
  console.color("#35906b", "4️⃣", false, true, "4", ...val);
}
function _5(...val) {
  console.color("#0f7d99", "5️⃣", false, true, "5", ...val);
}
function _6(...val) {
  console.color("#7E547F", "6️⃣", false, true, "6", ...val);
}
function _7(...val) {
  console.color("#7E547F", "6️⃣", false, true, "7", ...val);
}
function _8(...val) {
  console.color("#7E547F", "6️⃣", false, true, "8", ...val);
}
function _9(...val) {
  console.color("#7E547F", "6️⃣", false, true, "9", ...val);
}

function _A(...val) {
  console.color("#ea311a", "🔵", false, false, "A", ...val);
}
function _B(...val) {
  console.color("#f28622", "🔵", false, false, "B", ...val);
}
function _C(...val) {
  console.color("#edac28", "🔵", false, false, "C", ...val);
}
function _D(...val) {
  console.color("#35906b", "🔵", false, false, "D", ...val);
}
function _E(...val) {
  console.color("#0f7d99", "🔵", false, false, "E", ...val);
}
function _F(...val) {
  console.color("#7E547F", "🔵", false, false, "F", ...val);
}
