export const Metadata = {
  Keyname: "Modifier",
  Title: "Modifier Type",
  Desc: "A modifier key held down in a keybind.",
  System: "Keymapping",
  Parent: "Bind",
  Format: "Bool",
  Child: ["CTRL", "SHIFT", "ALT", "WIN"],
};

export const Index = {
  Modifier_Table: {
    Title: "Standard Modifier Table",
    Desc: "The standard modifier keys used by Mac & Windows operating systems.",
    Columns: Metadata.Child,
    Value: {
      Windows: {
        CTRL: {
          Name: "Control",
          Shorthand: "Ctrl",
          Glyph: "^",
        },
        SHIFT: {
          Name: "Shift",
          Shorthand: "Shift",
          Glyph: "⇧",
        },
        ALT: {
          Name: "Alt",
          Shorthand: "Alt",
          Glyph: "⎇",
        },
        WIN: {
          Name: "Windows",
          Shorthand: "Win",
          Glyph: "❖",
        },
      },
      Mac: {
        CTRL: {
          Name: "Command",
          Shorthand: "Cmd",
          Glyph: "^",
        },
        SHIFT: {
          Name: "Shift",
          Shorthand: "Shift",
          Glyph: "⇧",
        },
        ALT: {
          Name: "Option",
          Shorthand: "Opt",
          Glyph: "⎇",
        },
        WIN: {
          Name: "Control",
          Shorthand: "Ctrl",
          Glyph: "^",
        },
      },
    },
  },
};
