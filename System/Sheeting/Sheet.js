/*
 ‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅      ∽ Sheet Type ∼      ⟆▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                    Represents an internal Platform window.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ SUBTYPES ❖
▓  ◇ Sheet - Large draggable window
▓  ◇ Card Sheet - Small draggable/modal window or panel
▓  ◇ Bar Sheet - Wide bar attached to top or bottom
▓  ◇ Flap Sheet - Tall sidebar attached to left or right
▓
▓ ❖ TODO ❖
▓  ◇
▓     ⬥
▓                                                                              */
export var Type = function ItemType(arg) {
  const self = this;
  this.Meta = {
    title: "Sheet Window Type",
    icon: "",
    desc: "",
  };
  this.Action = {};
};
