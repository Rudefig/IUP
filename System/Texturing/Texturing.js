export const Metadata = {
  Keyname: "Texturing",
  Title: "Texturing System",
  Desc: "Providing the interface with patterns and textures.",
  Icon: "fa-paint-roller",
  Utility: ["Aesthetic"],
  Status: "Online",
  Cover: () =>
    "Activate this System to add textures to the UI.<ul><li>Comes with patterns and gradients</li></ul>",
};
export const Config = {
  Title: "Texturing Config",
  Keyname: "Texturing",
  SettingList: {
    Theme_Pattern: {
      Title: "Theme Pattern",
      Desc: "Theme background pattern.",
      Type: "List",
      Part: "Radio",
      Subpart: "Pattern Tile",
      Default: "none",
      ChoiceList: {
        none: { Title: "None" },
        diamond: { Title: "Diamond", size: 120 },
        "paisley-1": { Title: "Paisley A", size: 240 },
        "stripes-1": { Title: "Stripes", size: 240 },
        "paisley-2": { Title: "Paisley B", size: 240 },
        arabesque: { Title: "Arabesque", size: 300 },
        "paisley-3": { Title: "Paisley C", size: 240 },
        "logo-sans": { Title: "Logo Sans", size: 250 },
        blueprints: { Title: "Blueprints" },
        vignette: {
          Title: "Vignette",
          css: `radial-gradient(circle, #5B595A 0%, #000 100%)`,
        },
      },
    },
  },
};
