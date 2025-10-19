import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Coloristic",
  Title: "Coloristic System",
  Note: "Alt names: Chromatic, Prismatic",
  Desc: "Handling colors, gradients, and color schemes.",
  Icon: "palette",
  Utility: ["Aesthetic"],
  Status: "Standby",
};

export const Layout = {
  Cover: function() {
    return "Activate this System to colorize your Platform!<ul><li>Unlock color customization for UI themes</li><li>Comes with standard color palettes as well as matching colors for Themes</li></ul>";
  },
};
export const Action = {
  Initialize: function(IUP) {
    const Theme = IUP.Cosmetic.Setting.Theme || "Websafe",
      ColorChoice = IUP.Coloristic.Setting.Primary_Color;
    const Color =
      IUP.Coloristic.Index.PaletteList[Theme].ColorList[ColorChoice].Value;
    Config.SettingList.Primary_Color.ChoiceList = Index.PaletteList[Theme];
    if (Theme == "Websafe") {
      document.documentElement.style.setProperty("--IUP-Color-FG", Color);
    } else if (Theme == "Imperial") {
      document.documentElement.style.setProperty("--IUP-Color-Primary", Color);
    }
  },
};

export const Index = {
  PaletteList: {
    Highlight: {
      Title: "Highlight Colors",
      Default: "red",
      ColorList: {
        red: { Title: "Red", Value: "#F00" },
        yellow: { Title: "Yellow", Value: "#f3c200" },
        green: { Title: "Green", Value: "#00B100" },
        cyan: { Title: "Cyan", Value: "#00D1FF" },
        magenta: { Title: "Magenta", Value: "#F0F" },
      },
    },
    Websafe: {
      Title: "Websafe Theme Colors",
      Default: "white",
      ColorList: {
        white: { Title: "White", Value: "#FFF" },
        green: { Title: "Green", Value: "#5AD55A" },
        red: { Title: "Red", Value: "#FF6464" },
      },
    },
    Imperial: {
      Title: "Imperial Theme Colors",
      Default: "blue",
      ColorList: {
        blue: { Title: "Navy", Value: "#001b38" },
        blue2: { Title: "Charcoal Blue", Value: "#1b2837" },
        teal: { Title: "Teal", Value: "#01424A" },
        purple: { Title: "Violet", Value: "#1D0C24" },
        yellow: { Title: "Mustard", Value: "#403601" },
        green: { Title: "Green", Value: "#1c2c1d" },
        pink: { Title: "Fuchsia", Value: "#711422" },
        red: { Title: "Wine", Value: "#481516" },
        orange: { Title: "Amber", Value: "#521D00" },
        brown1: { Title: "Leather", Value: "#381603" },
        brown2: { Title: "Light Brown", Value: "#3D3122" },
        brown3: { Title: "Dark Brown", Value: "#211C1B" },
        gray: { Title: "Charcoal", Value: "#181818" },
        black: { Title: "Black", Value: "#000" },
      },
    },
  },
};

export const Config = {
  Title: "Coloring Config",
  Keyname: "Coloristic",
  SettingList: {
    Primary_Color: {
      Title: "Primary color",
      Desc: "The primary theme color in the UI.",
      Type: "List",
      Part: "Color_Tile",
      Default: "white",
      ChoiceList: Index.PaletteList.Websafe.ColorList,
      // ❖ onEdit() ⬥ Animate theme color changing.
      onEdit(dat) {
        console.log("Primary color set to", dat);
        // IUP.Coloristic.Action.Initialize(IUP);
        document.documentElement.style.setProperty("--IUP-Color-FG", dat.Value);
      },
      // Highlight_Color: {
      //   Title: "Highlight color",
      //   Desc: "A highlight color in the UI that stands out.",
      //   Type: "List",
      //   Part: "Radio",
      //   Subpart: "Color Tile",
      //   Default: "blue",
      //   ChoiceList: Index.PaletteList.Highlight,
      //   onEdit(val) {
      //     // setDocProp("--Color-primary", val.Value);
      //     // const speed = IUP.S.animationSpeed * 3500,
      //     //   htmlClass = document.documentElement.classList;
      //     // setDocProp("--iup-color-theme-temp", val.color);
      //     // setDocProp("--iup-window-width", document.body.scrollWidth + "px");
      //     // htmlClass.add("swap-color");
      //     // setTimeout(() => {
      //     //   htmlClass.remove("swap-color");
      //     //   setDocProp("--iup-color-theme", val.color);
      //     // }, speed);
      //   },
    },
  },
};
