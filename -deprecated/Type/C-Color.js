/*
 ‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅      ∽ Color Type ∼       ⟆▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                       A color coordinate or hex code.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ FEATURES ❖
▓   ◇ Format:
▓     ⬥ HEX (CODE)
▓     ⬥ RGB (BYTE COORD)
▓     ⬥ HSL (BYTE COORD)
▓   ◇ Properties:
▓     ⬥ Opacity (PERCENT)
▓   ◇ Outtake Process:
▓     ⬥ HEX
▓     ⬥ rgb, rgba
▓     ⬥ hsl, hsla
▓
▓ ❖ TODO ❖
▓   ◇ lab() format - more closely resembles human sight
▓   ◇ lch() format - equivalent of HSL for lab()
▓   ◇ COLOR MAP structures
▓                                                                              */
export var Type = function ColorType(arg) {
  const self = this;
  this.Meta = {
    title: "Color",
    desc: "A color coordinate or hex code."
  };
  this.Value;
  this.Format = {
    // NOTE: Formats must know how to identify themselves for intake
    RGB: { R, G, B },
    HSL: { H, S, L },
    //CMYK: { C, M, Y, K }
    HEX: "STRING"
  };

  /*
█ ❖ INTAKE (VALIDATION) */
  this.Process = {
    Intake: function(data) {
      const str = {
        1: data.substr(0, 1),
        3: data.substr(0, 3),
        4: data.substr(0, 4)
      };
      if (data.indexOf("#") == 0 && (data.length == 7 || data.length == 4)) {
        if (data.length == 7) {
          var R = data.substr(1, 2),
            G = data.substr(3, 4),
            B = data.substr(5, 6);
        } else if (data.length == 4) {
          var R = data.substr(1, 1),
            G = data.substr(2, 2),
            B = data.substr(3, 3);
        }
      } else {
        if (data.substr(3, 4) == "a") {
          // var A =
        }
      }
    }
  };

  /*
█ ❖ OUTTAKE */
  this.outtake = function(data = self.value, type = "rgba") {
    const { R, G, B, A } = data;
    var output;
    switch (type) {
      case "hex":
        //output = `#`;
        break;
      case "rgba":
        output = `rgba(${R},${G},${B},${A})`;
        break;
      case "rgb":
        output = `rgb(${R},${G},${B})`;
        break;
      case "hsla":
        //output = `hsla(${H},${S},${L},${A})`;
        break;
      case "hsl":
        //output = `hsla(${H},${S},${L})`;
        break;
    }
  };
  this.palette = {
    enabled: arg.palette.enabled || true,
    colors: arg.palette.colors || [],
    showDefault: arg.palette.showDefault || true
  };
  setColor(arg.value);
};
