export const Metadata = {
  Title: "Icon Type",
  Desc: "An icon graphic.",
  Keyname: "Icon",
  System: "Iconography",
  Parent: "Type",
  Typing: "Media",
  Format: ["String", "Code", "Image"],
};
export const Generate = {
  /*

 █
 ▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Generate_Icon ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
 ▓ Generate an icon element from an icon name or URL.
 ▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 ▓  ❖ PARAMETERS ❖
 ▓  ◇ Icon (STRING) - Name or URL of icon to generate.
 ▓    ◇ Font Awesome code - Starts with "fa-""
 ▓    ◇ URL Icon - Starts with "http" or "moz-extension"
 ▓  ◇ width (NUMBER) - Width of icon in pixels. (default = 16)
 ▓  ◇ addClass (STRING) - Additional classes to add to icon node.
 ▓                                                                                   */
  Generate_Icon: function(Icon = "diamond", width = 16, addClass = "") {
    if (addClass) addClass += " ";
    if (Icon.startsWith("http") || Icon.startsWith("moz-extension")) {
      return `<img class="${addClass}Icon" src="${Icon}" alt="icon" style="width:${width}px;height:auto;">`;
    } else if (Icon.startsWith("fa-")) {
      return `<i class="${addClass}Icon ${Icon} fa-solid fa-fw"></i>`;
    } else {
      return Icon;
    }
  },
};
