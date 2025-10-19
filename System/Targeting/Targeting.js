export const Metadata = {
  Keyname: "Targeting",
  Title: "Targeting System",
  Desc: "Enhances the context menu and mouse cursor.",
  Note:
    "The Platform's context menu can target data by Type and display multiple menus simultaneously.",
  Icon: "bullseye-pointer",
  Utility: ["Interface", "Automation"],
  Status: "Offline",
};

export const Layout = {
  Cover: () =>
    `Retrofit your mouse cursor with upgrades and enhancements!<ul>
  <li>Context menu can target data by type and switch between them</li>
  <li>Menu items show information, run macros, and embed input components</li>
  <li>Add contextual icon to your cursor depending on what's hovered over</li></ul>`,
};
export const Config = {
  Title: "Targeting Config",
  Keyname: "Targeting",
  SettingList: {
    /*
█
▓█═─────══─────═🙦   Context_menu_keybind   🙤═─────══─────═❖
▓ 
▓ ❖ TODO: Mac/Win OS implementation
▓                                                                               */
    Context_menu_keybind: {
      Title: "Context menu keybind",
      Desc: "Input binding for displaying the context menu.",
      Type: "List",
      Part: "Dropdown",
      Default: "ctrl",
      ChoiceList: {
        ctrl: {
          Title: "Ctrl click",
          Desc: "Hold Ctrl and right-click to display context menu.",
        },
        alt: {
          Title: "Alt click",
          Desc: "Hold Alt and right-click to display context menu.",
        },
        hold: {
          Title: "Click & hold",
          Desc: "Hold right-click for a second to display context menu.",
        },
      },
    },
  },
};
export const Index = {};
export const Action = {
  Inject: function() {},
};
