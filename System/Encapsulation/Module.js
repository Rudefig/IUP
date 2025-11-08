import { IUP } from "../Environment/-asset/Initialization.js"; /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Module Module ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓ ❖ Metadata
▓ ❖ Layout
▓   ◇ Module Layout
▓ ❖ Index
▓   ◇ Module Index
▓                                                                                    */
export const Metadata = {
  Keyname: "Module",
  Title: "Module",
  Desc: "A single Platform module.",
  Note:
    "Module is the base Key for the entire Platform, all other modules are descended from it.",
  Variant: "Mod",
  System: "Encapsulation",
};

export const Sheet = {
  // ❖ Default page HTML for a module
  Cover: function(Mod) {
    // TODO: Move module info to separate tab
    console.log("Generating Module Cover for", Mod, IUP, IUP[Mod]);
    const Keylink = IUP.Keyname.Order.Generate.Keylink,
      datMod = IUP[Mod],
      Sys = datMod.Metadata.System,
      datSys = IUP[Sys].Metadata;
    var Item = document.createElement("div");
    Item.className = "Layout-Module";
    var html = "",
      Alt = datMod.alt
        ? typeof datMod.alt === "string"
          ? datMod.alt
          : datMod.alt.join(", ")
        : null,
      UtilityList = IUP.Keyname.Order.Generate.Multi_Keylink(datSys.Utility),
      modContents = "";

    if (datMod.Layout && datMod.Layout.Cover) {
      Item.appendChild(
        IUP.Metadata.Layout.Header(datMod.Metadata),
        datMod.Layout.Cover()
      );
      return Item;
    }
    if (Object.keys(datMod).length == 1)
      modContents = "This module doesn't have any contents.";
    else {
      for (const prop in datMod) modContents += `<li>${Keylink(prop)}</li>`;
      modContents = `<ul>${modContents}</ul>`;
    }
    html += `<div><h5>Module Information:</h5><ul>
<li><span>${Keylink("Status")}:</span> [${Keylink(datSys.Status)}]</li>
<li><span>${Keylink("System")}:</span> ${Keylink(Sys)}</li>
<li><span>${Keylink("Utility")}:</span> ${UtilityList}</li>
${Alt ? `<li><span>${Keylink("Variant")} Keynames:</span> ${Alt}</li>` : ""}
${datMod.Note ? `<li><span>${Keylink("Note")}:</span> ${datMod.Note}</li>` : ""}
</ul></div>
<div><h5>Module Contents:</h5>${modContents}</div>`;

    // TODO: Generate list of integrated modules
    Item.appendChild(IUP.Metadata.Card.Titling(datMod.Metadata));
    Item.innerHTML += html;
    return Item;
  },
};

/*
  
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ MODULE INDEX ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓  Index of every Module on the Platform.
▓   ◇ Modules that aren't yet implemented have their metadata defined here.
▓   ◇ If the System isn't implemented yet, its metadata is defined by System.js.
▓   ◇ Set a Module's value to "true" to fetch data from its own module file.
▓     - Example: "Number: true" will fetch data from "System/Arithmetic/Number.js"
▓                                                                                                   */
export const Index = {
  // ❖ Default page HTML for a module
  Module: {
    Arithmetic: {
      Number: true,
      Integer: {
        Title: "Integer",
        Desc: "An integer number.",
      },
      Float: {
        Title: "N-Number Typing",
        Desc: "A float number with decimals.",
      },
      Range: {
        Title: "N-Number Typing",
        Desc: "A range between 2+ numbers.",
      },
      Slider: true,
    },
    Audiovisual: {
      Player: {
        Title: "Content Player App",
        Desc: "Modular media player interface.",
      },
      Playback_Studio: {
        Title: "Playback Studio App",
        Desc: "App for video and audio editing.",
      },
      Video: {
        Title: "Video Type",
        Desc: "A video file.",
      },
      Playback: {
        Title: "Playback Tool",
        Desc: "Control video and audio playback.",
      },
      Play: {
        Title: "Play Tool",
        Desc: "To start media playback.",
      },
      Pause: {
        Title: "Pause Tool",
        Desc: "To pause media playback.",
      },
      Stop: {
        Title: "Stop Tool",
        Desc: "To stop media playback.",
      },
      Scrubber: {
        Title: "Scrubber Part",
        Desc: "Slider part for setting playback position.",
      },
      Cue: {
        Title: "Cue Tool",
        Desc: "Skip to playback times with hotkeys, via Bookmarking System.",
      },
      Subtitle: {
        Title: "Subtitle Type",
        Desc: "Skip to playback times with hotkeys, via Bookmarking System.",
      },
    },
    Boolean: {
      Bool: true,
      True: {
        Title: "True",
        Desc: "A true value.",
      },
      False: {
        Title: "False",
        Desc: "A false value.",
      },
      Switch: true,
      Checkbox: {
        Title: "Checkbox Item",
        Desc: "Check and uncheck the checkbox.",
      },
      Toggler: true,
    },
    Coloristic: {
      Color: true,
      Gradient: {
        Title: "Gradient Type",
        Desc: "A range between colors.",
      },
      Palette: { Title: "Palette Type", Desc: "A palette of matching colors." },
      Color_Tile: true,
      Color_Wheel: {
        Title: "Color Wheel App",
        Desc: "Interactive color wheel for picking matching colors.",
      },
      Color_Picker: {
        Title: "Color Picker Tool",
        Desc: "Select colors and matching color palettes.",
      },
      Gradient_Picker: {
        Title: "Color Picker Tool",
        Desc: "Configure a gradient's properties.",
      },
      Eyedropper: {
        Title: "Eyedropper Tool",
        Desc: "Sample pixel colors on the screen.",
      },
    },
    Construction: {
      Part_Catalog: {
        Title: "Part Catalog",
        Variant: "App-Part_Catalog",
        Desc:
          "View all the UI components available for building interfaces. Aggregates [Parts] from across all modules.",
      },
      // Part: true,
      Item: true,
      Menu: true,
      Button: true,
      Shadow: true,
      Modal: true,
      Notification: true,
      Element: { Title: "Element Type", Desc: "An HTML element object." },
      Slot: { Title: "Slot Type", Desc: "An open slot that fits a [Part]." },
      Component_Lab: {
        Title: "Component Lab",
        Desc: "Developer app for designing UI parts.",
      },
    },
    Configuration: {
      Preference: {
        Title: "Preferences App",
        Desc: "Customize the Platform's user preferences.",
      },
      Setting: true,
      Config: true,
      Global_Settings: {
        Title: "Global Settings Index",
      },
      Default: {
        Title: "Default Value Subtype",
        Desc: "A default value for a setting or parameter.",
      },
      Reset: { Title: "Reset", Desc: "To reset values to their defaults." },
      "Registry-Config": {
        Title: "Config Registry",
        Desc: "Aggregates settings from across the Platform.",
      },
      "Layout-Config": {
        Title: "Config Layout",
        Desc: "Displays a group of settings.",
      },
    },
    Cosmetic: {
      Lookbook: {
        Title: "Lookbook App",
        Desc: "Browse the Platform's offering of UI themes.",
      },
      Theme: {
        Title: "The,e Type",
        Desc: "A theme for the user interface.",
      },
      Look: {
        Title: "Look Type",
        Desc: "A customized look for a theme.",
      },
      Detail: {
        Title: "Detail Type",
        Desc: "A customizable detail of the interface.",
      },
      Decoration: {
        Title: "Decoration Division",
        Desc: "Organizes themes and decorative assets into categories.",
      },
      Decorative: {
        Title: "Decorative Repository",
        Desc: "Assets used by themes to decorate the UI.",
      },
      Websafe: {
        Title: "Websafe Theme",
        Desc: "The default UI without any theme applied.",
      },
      Skyline: {
        Title: "Skyline Theme",
        Desc: "Impress with a clean and presentable theme for professionals.",
      },
      Imperial: {
        Title: "Imperial Theme",
        Desc: "Browse in first class with a luxurious neoclassical theme.",
      },
      Electronaut: {
        Title: "Electronaut Theme",
        Desc: "Take over the net with a high-tech cyberpunk theme.",
      },
    },
    Encapsulation: {
      Platform: true,
      Module: true,
      Division: true,
      Utility: true,
      System: true,
    },
    Iconography: {
      Icon: true,
      Icon_Vault: {
        Title: "Icon Vault",
        Desc: "App for organizing your icon library.",
      },
      Icon_Picker: {
        Title: "Icon Picker",
        Desc: "Tool for picking out an icon.",
      },
      Icon_Repository: {
        Title: "Icon Repository",
        Desc: "The built in collection of icons.",
      },
    },
    Keymapping: {
      Bind: true,
      Binder: true,
      Modifier: {
        Title: "Modifier",
        Desc:
          "An input modifier that's held down. Includes table of standardized modifier keys for PC & Mac.",
      },
      Keyboard_Eventkit: {
        Title: "Keyboard Eventkit",
        Desc: "Triggers for [Press], [Release], and [Hold] keys.",
      },
      Mouse_Eventkit: {
        Title: "Mouse Eventkit",
        Desc: "Triggers for [Click], [Release], [Hold], [Drag], and [Scroll].",
      },
    },
    Namespace: {
      Keyname: true,
      Parent: {
        Title: "Parent Keyname",
        Desc: "The parent Keyname of a module.",
      },
      Child: {
        Title: "Child Keyname",
        Desc: "The child Keynames of a module.",
      },
      Metadata: true,
      Title: {
        Title: "Title Metadata",
        Desc: "The display title for a module.",
        Info: "Usually its default Keyname pairing.",
      },
      Desc: {
        Title: "Description Metadata",
        Desc: "A brief description of a module.",
        Info: "Used as a module subtitle or displayed in module tables.",
      },
      Variant: {
        Title: "Variant Metadata",
        Desc: "An alternate Keyname usable as a substitute.",
        Info: "Themes can use Variants as the default to fit the theme.",
      },
      Identifier: true,
      Keychain_Viewer: {
        Title: "Keychain Viewer App",
        Desc: "Visualize and navigate the Keychain structure.",
      },
    },
    Programming: {
      Order: {
        Title: "O-Order Typing",
        Desc: "A programming order for executing code.",
      },
      Action: {
        Title: "Action Type",
        Desc: "A function that inputs data and executes code.",
      },
      Process: {
        Title: "Process Type",
        Desc: "A function that inputs, processes, and outputs data.",
      },
      Query: {
        Title: "Query Type",
        Desc: "A function that queries and outputs data.",
      },
      Macro: {
        Title: "Macro Type",
        Desc:
          "An executable macro following a Trigger/Condition/Action pattern.",
      },
    },
    Structuring: {
      Structure: {
        Title: "S-Structure Type",
        Desc: "Represents data structures.",
      },
      List: true,
      Set: {
        Title: "List Type",
        Desc: "A unique set of data values.",
      },
      Tree: {
        Title: "Tree Type",
        Desc: "A branching data set.",
      },
      Mapping: {
        Title: "Mapping Type",
        Desc: "A set of keys mapped to an array of values.",
      },
      Dropdown: true,
      Radio: true,
      x2js: {
        Title: "'x2js' Plugin",
        Desc: "Converts between XML and JavaScript objects.",
      },
    },
    Targeting: {
      Context: true,
      Context_Manager: {
        Title: "Context Manager App",
        Desc: "Manage context menu items and selectors.",
      },
      Context_Menu: {
        Title: "Context Menu Tool",
        Desc: "Upgrade the context menu with Platform integration.",
      },
      Smart_Pointer: {
        Title: "Smart Pointer Tool",
        Desc:
          "Enhance the cursor graphic with a contextual icon and support for modifier keys.",
      }, // Context_Registry: {
      // Via: {
      //   Title: "Via",
      //   Desc: "A module integration from another Sector.",
      // },
      // Cover: {
      //   Title: "Cover Card",
      //   Variant: "P-Part-Card-Cover",
      //   Desc: "A cover for a System introducing its features.",
      // },
      //   Title: "Context Registry",
      //   Desc: "Register contexts and associated menu items.",
      // },
      Cursor: {
        Title: "Cursor",
        Variant: "G-Graphic-Cursor, M-Icon-Cursor",
        Desc:
          "A mouse cursor graphic with an optional icon, via Iconography System.",
      },
      Default_Cursor_Table: {
        Title: "Default Cursor Index",
        Desc: "List of all the built-in cursors.",
      },
      Cursor_Editor: {
        Title: "Cursor Editor App",
        Desc: "Edit the mouse cursor graphic.",
      },
    },
    Textual: {
      Text: {
        Title: "Text Type",
        Desc: "A string of text data, formatted or unformatted.",
      },
      String: {
        Title: "String Type",
        Desc: "A string of unformatted text data.",
      },
      Rich: {
        Title: "Rich Type",
        Desc: "A string of rich formatted text data.",
      },
      Text_Editor: {
        Title: "Text Editor App",
        Desc: "Simple text editing app.",
      },
      Field: true,
      Bold: {
        Title: "Bold Style",
        Desc: "Bolded text style.",
      },
      Italic: {
        Title: "Italic Style",
        Desc: "Italicized text style.",
      },
      Underline: {
        Title: "Underline Style",
        Desc: "Underlined text style.",
      },
      Strikethrough: {
        Title: "Strikethrough Style",
        Desc: "Strikethroughed text style.",
      },
    },
    Typography: {
      Font_Library: {
        Title: "Font Library",
        Desc:
          "View your collection of fonts from the Platform, your PC, or the cloud.",
      },
      Font: {
        Title: "Font Type",
        Desc: "A style of text characters.",
      },
      Typeface: {
        Title: "Typeface Subtype",
        Desc: "Represents a configured font family.",
      },
      Typesetting_Lab: {
        Title: "Typesetting Lab",
        Desc: "Developer tool for font configuration and scheming.",
      },
      OpenType_Plugin: {
        Title: "OpenType.js Plugin",
        Desc: "JS library for handling font files.",
      },
      Font_Vault: {
        Title: "Font Vault",
        Desc: "The built-in collection of fonts.",
      },
      Font_Service: {
        Title: "Font Service",
        Desc: "Includes fonts from the cloud in your font library.",
      },
    },
    Windowing: {
      Tab: true,
      Window: {
        Title: "Window Type",
        Desc: "A window that can be opened in the Platform.",
      },
      Sheet: {
        Title: "Sheet Type",
        Desc: "A sheet that can be opened in the Platform.",
      },
      Window_Manager: {
        Title: "Window Manager",
        Desc: "Manage open windows and tabs.",
      },
      Favicon: true,
      Favico_Plugin: {
        Title: "Favico.js Plugin",
        Desc: "Manage open windows and tabs.",
      },
    },
  },
};
