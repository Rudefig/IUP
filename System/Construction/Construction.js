export const Metadata = {
  Keyname: "Construction",
  Title: "Construction System",
  Desc: "Constructs UI components for building interfaces.",
  Icon: "light-switch-on",
  Utility: ["Interface"],
  Status: "Standby",
  Cover:
    "Activate to gain access to UI components for building user interface.<ul><li>Supports input and output components for data types</li><li>Customizable appearance with [Theme]-specific variations</li><li>Check out [Arrangement System] for arranging components, or [Sheeting System] for displaying them in windows</li></ul>",
};
export const Registry = {
  Part: {
    Title: "Part Registry",
    Desc: "Aggregates [Parts] from across the platform.",
    Index: function(Query) {
      var output = {};
      for (const Mod in IUP) {
        if (IUP[Mod].Part) output[Mod] = IUP[Mod].Part;
      }
      return output;
    },
  },
};

export const Config = {
  Title: "Construction Config",
  Keyname: "Construction",
  SettingList: {
    UI_Size: {
      Title: "UI Size",
      Desc: "The size of UI components and the UI.",
      Type: "List",
      Part: "Dropdown",
      Default: "MD",
      ChoiceList: {
        XS: { Title: "Extra Small" },
        SM: { Title: "Small" },
        MD: { Title: "Medium" },
        LG: { Title: "Large" },
        XL: { Title: "Extra Large" },
      },
    },
  },
};
