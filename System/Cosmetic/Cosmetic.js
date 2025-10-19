export const Metadata = {
  Keyname: "Cosmetic",
  Title: "Cosmetic System",
  Desc: "Decorate the user interface with cosmetic themes.",
  Icon: "hat-cowboy-side",
  Utility: ["Aesthetic"],
  Status: "Online",
};

export const Layout = {
  // ❖ <Layout-Cosmetic-Cover>
  Cover: function() {
    var html = `Transform the Platform's appearance with a single click!<ul>
    <li>The selection of [Themes] provides an immersive, content-rich experience that caters to every taste</li>
    <li>Give the interface a clean professional look for business, or a sleek cyberpunk look for entertainment</li>
    <li>Turn on more [Systems] to unlock more customization options</li></ul>`;
    return html;
  },
};
export const Config = {
  Title: "Cosmetic Config",
  Keyname: "Cosmetic",
  SettingList: {
    Theme: {
      Title: "Theme",
      Desc: "The user interface's theme.",
      Type: "List",
      Part: "Dropdown",
      Default: "Websafe",
      ChoiceList: {
        // Default: "white",
        Websafe: { Title: "Websafe" },
        Imperial: { Title: "Imperial" },
        Electronaut: { Title: "Electronaut" },
      },
    },
  },
};
