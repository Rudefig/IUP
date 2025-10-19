import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Field",
  Title: "Field Part",
  Desc: "Enter text into a text field.",
  Typing: "P",
  System: "Textual",
};
export const Module = function(dat) {
  const _class = "Part-Field",
    { ID, Part = "Field", Value = "", label } = dat,
    switchLabel = label ? `<span class="${_class}__label">${label}</span>` : "",
    btnLabel =
      Part == "button" ? `<span class="${_class}__label">${label}</span>` : "",
    html = `<label class="${_class}__wrap"><input class="${_class}__input" type="text" id="${ID}" value="${Value}"><span class="${_class}__button">${btnLabel}</span>${switchLabel}</label>`;

  // ❖ BUILD NODE
  const Node = document.createElement("div");
  Node.IUP = {};
  Node.className = _class;
  Node.innerHTML = html;
  const InputNode = Node.querySelector("input");

  // ❖ EVENTS
  InputNode.onchange = (e) => Node.IUP.onEdit(e.target.value, e);
  Node.IUP.onEdit = function(val, e, target = dat.target) {
    if (dat.onEdit) dat.onEdit(val, e, dat.target);
    Node.dispatchEvent(IUP.Item.Trigger.Edit);
  };

  // ❖ GET/SET VALUE
  Object.defineProperties(Node, {
    Value: {
      get: () => InputNode.value,
      set: (Val) => (InputNode.value = Val),
    },
  });

  return Node;
};
