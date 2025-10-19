import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Configuration",
  Title: "Configuration System",
  Desc: "Implements configurable settings for modules.",
  Icon: "gear",
  Utility: ["Storage"],
  Status: "Online",
  Cover:
    "Activate to start customizing preferences and configuring Platform modules.<ul><li>Gathers settings from across the Platform so they're all in one place</li><li>Provides UI components for changing settings</li></ul>",
};

export const Config = {
  Title: "Configuration Testing",
  Keyname: "Configuration",
  SettingList: {
    Switch_Test: {
      Title: "Switch example",
      Desc: "",
      Type: "Bool",
      Part: "Switch",
      Default: true,
    },
    Toggler_Test: {
      Title: "Toggler example",
      Desc: "",
      Type: "Bool",
      Part: "Toggler",
      Default: true,
      Label: "Label",
    },
    Field_Test: {
      Title: "Field example",
      Desc: "",
      Type: "Text",
      Part: "Field",
      Default: "Text",
    },
    Slider_Test: {
      Title: "Slider example",
      Desc: "",
      Type: "Number",
      Part: "Slider",
      Default: 100,
      Unit: "%",
      Min: 0,
      Max: 100,
    },
    Dropdown_Test: {
      Title: "Dropdown example",
      Desc: "",
      Type: "List",
      Part: "Dropdown",
      Default: "Choice1",
      ChoiceList: {
        Choice1: { Title: "Choice 1" },
        Choice2: { Title: "Choice 2" },
        Choice3: { Title: "Choice 3" },
      },
    },
    Radio_Test: {
      Title: "Radio example",
      Desc: "",
      Type: "List",
      Part: "Radio",
      Default: "Choice1",
      ChoiceList: {
        Choice1: { Title: "Choice 1" },
        Choice2: { Title: "Choice 2" },
        Choice3: { Title: "Choice 3" },
      },
    },
    Color_Tile_Test: {
      Title: "Color Tile example",
      Desc: "",
      Type: "List",
      Part: "Color_Tile",
      Default: "white",
      ChoiceList: IUP.Coloristic.Index.PaletteList.Websafe.ColorList,
    },
    Binder_Test: {
      Title: "Binder example",
      Desc: "",
      Type: "Bind",
      Part: "Binder",
      Default: {
        Keystroke: "F",
        Modifier: { CTRL: true, SHIFT: false, ALT: false },
      },
    },
  },
};
