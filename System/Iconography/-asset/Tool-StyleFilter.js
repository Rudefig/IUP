/*
ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  STYLE FILTER TOOL  🙠    █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓▓ ❖ Action
▓   ◇ Set_Style_Filter
▓   ◇ Clear_Style_Filter
▓
▓                                                                               */
export var Module = new function() {
  const self = this;

  this.Meta = {
    title: "Style Filter Tool",
    icon: "",
    desc: "Apply a CSS style filter to a graphic or element."
  };

  this.Constant = {
    FilterIndex: [
      "blur",
      "brightness",
      "contrast",
      "drop-shadow",
      "grayscale",
      "hue-rotate",
      "invert",
      "opacity",
      "sepia",
      "saturate"
    ]
  };

  this.Action = {
    /*
█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Rebuild_Preferences() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓           Build user preferences, or rebuild if a reset is needed.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ {scope} =
▓ - null = Rebuild everything
▓ - "global" = Rebuild global platform settings
▓ - "module" = Rebuild settings for all modules
▓                                                                               */
    Rebuild_Preferences: function(scope, Plat) {}
  };
}();
