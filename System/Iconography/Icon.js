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
  Generate_Icon: function(Icon = "diamond", addClass = "") {
    if (addClass) addClass += " ";
    return `<i class="${addClass}Icon fa-${Icon} fa-solid fa-fw"></i>`;
  },
};
