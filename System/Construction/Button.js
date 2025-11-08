import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Title: "Button Part",
  Desc: "A clickable button.",
  Keyname: "Button",
  System: "Construction",
  Parent: "Part",
  Typing: "P",
};
export const Module = function(dat) {
  const _class = "Part-Button",
    { ID, Label, onUse } = dat,
    Val = dat.Value ? " checked" : "",
    html = `<div class="${_class}__button"><span class="${_class}__label">${Label}</span></div>`;

  // ❖ BUILD NODE
  const Node = document.createElement("div");
  Node.IUP = {};
  Node.className = _class;
  Node.innerHTML = html;
  const Button = Node.querySelector(`.${_class}__button`);

  Button.onclick = (e) => onUse(e);

  return Node;
};
