import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Title: "Metadata Module",
  Desc: "The metadata properties of a module.",
  Keyname: "Metadata",
  Child: ["Title", "Desc"],
  System: "Namespace",
};

export const Card = {
  // ❖ <Card-Titling-Metadata> - Generates a page header for a module from [Metadata] data.
  Titling: function(Metadata = {}, content) {
    const Item = document.createElement("div");
    Item.className = "Layout-Titling";
    // Node = document.createElement("div");
    var Title = Metadata.Title || "Unknown Module",
      Desc = Metadata.Desc || "This module could not be identified.",
      Icon = Metadata.Icon
        ? IUP.Icon.Order.Generate_Icon(Metadata.Icon, "page-icon fa-xl")
        : "";

    Item.innerHTML = `${Icon}<h2>${Title}</h2><h3>${Desc}</h3>`;
    return Item;
  },
};
