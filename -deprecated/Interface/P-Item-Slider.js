/*




ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█         🙢  NUMBER  🙠         █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMPONENTS ❖
▓   ◇ "spinner"
▓   ◇ "slider"
▓   ◇ "dial"🚧
▓
▓ ❖ ARGUMENTS ❖
▓   ◇ min: (number) Minimum number range.
▓   ◇ max: (number) Maximum number range.
▓   ◇ step: (number) Increase/decrease step value.
▓   ◇ allowedUnits: ("str"|[arr]) Unit of measurement allowed after number. ("px", "%", "sec")
▓     ⬥ Defaults to value auto-detected from {val}.
▓     ⬥ Blank or no unit is represented as "".
▓   ◇ target: Pass a target to events.
▓
▓ ❖ TODO ❖
▓   ◇ CONTROLS:
▓     ⬥ KEYBIND: Change value with up/down arrow keys.
▓     ⬥ CHANGE UNIT: Convert unit type from right-click dropmenu.
▓     ⬥ SELECT RANGE: Select a number range. (2 values at once)
▓     ⬥ FIELD CALCULATIONS: Enter math calculation, change to result.
▓       ⬦ Square Root:
▓       ⬦ Absolute Value: |n|
▓       ⬦ Trig Functions: cos(n) (if value is an angle)
▓     ⬥ CONSTANT SYMBOLS: Symbol representing a constant value, used in field calculations.
▓       ⬦ Pi: Type in "pi" to replace with the symbol. Convert symbol to number for calculations.
▓   ◇ APPEARANCE:
▓     ⬥ LABEL: Add a label inside or outside of the textbox, left or right side.
▓     ⬥ RULER: Generate a ruler for sliders & dials.
▓     ⬥ UNIT PLACEMENT: Some components may want the unit separate from the textbox.
▓                                                                               */
function InputNumber(arg) {
  var _class = "InputNumber",
    {
      ID,
      Node = document.createElement("div"),
      component = "spinner",
      val = 0,
      min = 0,
      max = 100,
      step = 1,
      allowedUnits = undefined,
      target,
    } = arg;

  /*
█ ❖ BUILD NODE                                                                   */
  const textHTML = `<input type="text" id="${ID}" class="${_class}__text" value="${val}">`,
    TextNode = ElementLib.var.build_element(textHTML);
  Node.className = `-${component}`;
  Node.appendChild(TextNode);
  Node.IUP = {
    textNode: TextNode,
    sliderNode: null,
    dialNode: null,
    lastUsedUnit: null,
  };

  /*

█ ❖ PREP DATA                                                                   */
  var [val, unit = ""] = LayoutLib.var.parse_css_val(val);
  // ❖ Detect Unit
  if (unit || allowedUnits) {
    if (unit && allowedUnits == undefined) allowedUnits = unit;
    if (!Array.isArray(allowedUnits)) allowedUnits = [allowedUnits];
    if (!unit) unit = allowedUnits[0];
    Node.IUP.lastUsedUnit = unit;
  }

  // ❖ Slider & Dial Components
  var SliderNode, DialNode;
  if (component == "slider") {
    const sliderHTML = `<input type="range" id="${ID}-range" class="${_class}__range" value="${val}" min="${min}" max="${max}" step="${step}">`; // prettier-ignore
    SliderNode = ElementLib.var.build_element(sliderHTML);
    Node.insertBefore(SliderNode, TextNode);
    Node.IUP.sliderNode = SliderNode;
  } else if (component == "dial") {
    const dialHTML = `<div class="${_class}__dial"></div>`;
    DialNode = ElementLib.var.build_element(dialHTML);
    Node.IUP.dialNode = DialNode;
  }

  /*

█ ❖ METHODS                                                                   */

  // ❖ validate() ⬥ Perform field calculation & validate the unit.
  Node.IUP.validate = (fullVal) => {
    const lastUnit = Node.IUP.lastUsedUnit || allowedUnits[0];
    fullVal = InputLib.var.string_calculation(fullVal);
    var [value, thisUnit] = LayoutLib.var.parse_css_val(fullVal);
    if (!thisUnit && lastUnit) value += lastUnit;
    else if (thisUnit) {
      if (allowedUnits.includes(thisUnit)) {
        value += thisUnit;
        Node.IUP.lastUnit = thisUnit;
      }
    }
    return value;
  };

  // ❖ spinVal()
  Node.IUP.spinVal = (V, spinUp) => {
    if (typeof spinUp !== "undefined") {
      if (spinUp && V < max) V = V + step;
      if (!spinUp && V > min) V = V - step;
    }
    if (V > max) V = max;
    if (V < min) V = min;
    return V;
  };

  /*

█ ❖ EVENTS                                                                   */
  // ❖ onkeydown() ⬥ Validate when enter is pressed, prevent further action if value changes.
  TextNode.onkeydown = function(e) {
    const value = TextNode.value;
    if (e.keyCode == 13) {
      TextNode.value = Node.IUP.validate(value);
      if (TextNode.value != value) e.stopPropagation();
    } else if (e.keyCode == 38) Node.IUP.spinVal(value, true);
    else if (e.keyCode == 40) Node.IUP.spinVal(value, false);
  };

  // ❖ onwheel()
  TextNode.onwheel = onwheel;
  function onwheel(e) {
    e.target.focus();
    const scrollUp = Boolean(e.wheelDeltaY > 0);
    Node.IUP.onSpin(e, scrollUp);
    e.preventDefault();
  }

  // ❖ SLIDER ⬥ oninput() / onwheel()
  if (component == "slider") {
    SliderNode.onwheel = onwheel;
    SliderNode.addEventListener("input", (e) => {
      TextNode.value = SliderNode.value;
      Node.IUP.onEdit(SliderNode.value, e);
    });
  }

  /*
█ ❖ EVENTS ⬥ CUSTOM                                                                   */
  // ❖ onSpin()
  Node.IUP.onSpin = function(e, spinUp) {
    var val = LayoutLib.var.parse_css_val(TextNode.value, V => Node.IUP.spinVal(V, spinUp)); // prettier-ignore
    if (arg.onSpin) val = arg.onSpin(val, spinUp) || val;
    if (component == "dial") DialNode.iuCSS(`--${_class}-dial-val`);
    else if (component == "slider") SliderNode.value = val;
    TextNode.value = val;
    Node.IUP.onEdit(val, e, target);
  };

  // ❖ onEdit()
  Node.IUP.onEdit = function(val = TextNode.value, e, targ = target) {
    if (arg.onEdit) arg.onEdit(val, e, targ);
    // Node.dispatchEvent(editEvent);
  };

  /*
█ ❖ GET/SET VALUE                                                                   */
  Object.defineProperties(Node, {
    val: {
      get: () => TextNode.value,
      set: (val) => (TextNode.value = val),
    },
  });

  return Node;
}
