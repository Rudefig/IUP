/*
 ‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅    ∽ N-Angle Number ∼    ⟆▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                                ...
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ FEATURES ❖
▓ Format:
▓  ◇ ELEMENT
▓ Properties:
▓  ◇
▓ Components:
▓  ◇ Angle Number Field
▓  ◇ Angle Dial
▓
▓ ❖ TODO ❖
▓  ◇ Subtypes
▓     ⬥ Button Item (card form) - Clickable button w/ icon and/or text
▓     ⬥ Menu Item (bar form)
▓                                                                              */

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Rotate_Element() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                Rotate transformation on a target element.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .val            = {value}
▓   ◇ .target         = target selector
▓   ◇ .operation      =
▓     ⬥ "reset" - Remove the transform style
▓     ⬥ "set" - Set rotation to {value}
▓     ⬥ "change" - Increase/decrease rotation by {value}
▓     ⬥ "clockwise|cw" - Rotate 90° clockwise
▓     ⬥ "counterclockwise|ccw" - Rotate 90° counterclockwise
▓     ⬥ TODO "flip horizontal|fliph" - Flip horizontally
▓     ⬥ TODO "flip vertical|flipv" - Flip vertically
▓   ◇ .maintainLayout = {value}
▓ ❖ TODO ❖
▓   ◇ Move degrees operations to its own data type in Types.js
▓   ◇ Rotate element without disrupting the layout: Position element absolute, insert dummy <div> behind with same size */
export var Subtype = function() {
  const self = this;

  this.Meta = {
    title: "Angle",
    desc: "",
    format: ["INTEGER", "FLOAT"]
  };
  this.Process = {
    Validate: function(V) {
      V = V.match(/(\d+)(°|deg)/)[1];
    },
    Outtake: function(V) {
      // Perform %360 operation
      // Add unit (deg)
    }
  };

  /*



  */
  const { target, operation = "set" } = arg;
  var val = arg.val;
  //TODO: Detect if target has data-transform-id, use that as addClass ID, if not generate a unique ID for it
  // ❖ Extract current degree value
  var data = LayoutLib.var.css_prop_to_data(target, "transform");
  var degree = data.rotate ? data.rotate[0] : 0;
  if (operation == "reset") {
    // ❖ Reset rotation
    degree = 0;
  } else {
    // ❖ Calculate new rotation
    if (operation == "clockwise" || operation == "cw") {
      degree = degree + 90;
    } else if (operation == "counterclockwise" || operation == "ccw") {
      degree = degree - 90;
      if (degree <= 90) degree = 360 - (90 - degree);
      else degree -= 90;
    } else if (operation == "change") degree = degree + val;
    else degree = val;

    data.rotate = [degree, "deg"];
    delete data.matrix;
    var prop = LayoutLib.var.css_data_to_prop(data);
    LayoutLib.cmd.Node_Style({ target, id: "transform", css: prop });
    // ❖ Apply transformation
    // var code = `.IUP-rotate-target { transform: rotate(${degree}deg); }`;
    // existingNode = document.querySelector(".IUP-rotate-target");
    // if (existingNode) existingNode.classList.remove("IUP-rotate-target");
    // target.classList.add("IUP-rotate-target");
  }
};
