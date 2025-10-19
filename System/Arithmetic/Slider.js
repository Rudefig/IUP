import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Slider",
  Title: "Slider Part",
  Desc: "Choose a number from a slider.",
  Typing: "P",
  System: "Arithmetic",
};
export const Module = function(dat) {
  var _class = "Part-Slider",
    {
      ID,
      Node = document.createElement("div"),
      Part = "Slider",
      Value = 0,
      min = 0,
      max = 100,
      step = 1,
      allowedUnits = undefined,
      target,
    } = dat;

  /*
█ ❖ BUILD NODE                                                                   */
  const textHTML = `<input type="text" class="${_class}__text" value="${Value}">`,
    TextNode = IUP.Item.Convert.HTML_To_Node(textHTML);
  Node.className = `${_class} -${Part}`;
  Node.IUP = {
    textNode: TextNode,
    SliderNode: null,
    dialNode: null,
    lastUsedUnit: null,
  };

  /*

█ ❖ PREP DATA                                                                   */
  // var [val, unit = ""] = LayoutLib.var.parse_css_val(val);
  var unit;
  // ❖ Detect Unit
  if (unit || allowedUnits) {
    if (unit && allowedUnits == undefined) allowedUnits = unit;
    if (!Array.isArray(allowedUnits)) allowedUnits = [allowedUnits];
    if (!unit) unit = allowedUnits[0];
    Node.IUP.lastUsedUnit = unit;
  }

  // ❖ Slider & Dial Components
  var SliderNode, DialNode;
  if (Part == "Slider") {
    const sliderHTML = `<input type="range" class="${_class}__range" value="${Value}" min="${min}" max="${max}" step="${step}">`; // prettier-ignore
    SliderNode = IUP.Item.Convert.HTML_To_Node(sliderHTML);
    Node.appendChild(SliderNode);
    Node.IUP.SliderNode = SliderNode;
    // } else if (Part == "Dial") {
    //   const dialHTML = `<div class="${_class}__dial"></div>`;
    //   DialNode = IUP.Item.Convert.HTML_To_Node(dialHTML);
    //   Node.IUP.dialNode = DialNode;
  }
  Node.appendChild(TextNode);

  /*

█ ❖ METHODS                                                                   */

  // ❖ spinVal() - Spin the value up or down by step, within min/max range.
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
  // TextNode.onkeydown = function(e) {
  //   const value = TextNode.value;
  //   if (e.keyCode == 13) {
  //     TextNode.value = Node.IUP.validate(value);
  //     if (TextNode.value != value) e.stopPropagation();
  //   }
  //   } else if (e.keyCode == 38) Node.IUP.spinVal(value, true);
  //   else if (e.keyCode == 40) Node.IUP.spinVal(value, false);
  // };

  // ❖ onwheel() ⬥ Spin value up/down when mouse wheel is used while hovering over field.
  TextNode.onwheel = onwheel;
  function onwheel(e) {
    e.target.focus();
    const scrollUp = e.deltaY < 0;
    Node.IUP.onSpin(e, scrollUp);
    e.preventDefault();
    return false;
  }

  // ❖ SLIDER EVENTS ⬥ oninput() & onwheel()
  if (Part == "Slider") {
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
    var Value = Node.IUP.spinVal(TextNode.value, spinUp);
    if (dat.onSpin) Value = dat.onSpin(Value, spinUp) || Value;
    if (Part == "Slider") SliderNode.value = Value;
    TextNode.value = Value;
    Node.IUP.onEdit(Value, e, target);
  };

  // ❖ onEdit()
  Node.IUP.onEdit = function(Value = TextNode.value, e, targ = target) {
    if (dat.onEdit) dat.onEdit(Value, e, targ);
    Node.dispatchEvent(IUP.Item.Trigger.Edit);
  };

  /*
█ ❖ GET/SET VALUE                                                                   */
  Object.defineProperties(Node, {
    Value: {
      get: () => TextNode.value,
      set: (Val) => {
        TextNode.value = Val;
        SliderNode.value = Val;
      },
    },
  });

  return Node;
};
