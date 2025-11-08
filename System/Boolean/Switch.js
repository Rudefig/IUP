import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Switch",
  Title: "Switch Part",
  Desc: "Turn the switch on and off.",
  Typing: "B",
  System: "Boolean",
};
export const Module = function(dat) {
  const _class = "Part-Switch",
    { ID, label } = dat,
    switchLabel = label ? `<span class="${_class}__label">${label}</span>` : "",
    Val = dat.Value ? " checked" : "",
    html = `<label class="${_class}__wrap"><input class="${_class}__input" type="checkbox" id="${ID}"${Val}><span class="${_class}__button"></span>${switchLabel}</label>`;

  // ❖ BUILD NODE
  const Node = document.createElement("div");
  Node.IUP = {};
  Node.className = _class;
  Node.innerHTML = html;
  const Input = Node.querySelector("input");

  // ❖ EVENTS
  Input.onchange = (e) => Node.IUP.onEdit(e.target.checked, e);
  Node.IUP.onEdit = function(val, e, target = dat.target) {
    if (dat.onEdit) dat.onEdit(val, e, dat.target);
    Node.dispatchEvent(IUP.Item.Trigger.Edit);
  };

  // ❖ GET/SET VALUE
  Object.defineProperties(Node, {
    Value: {
      get: () => !!Input.checked,
      set: (val) => (Input.checked = !!val),
    },
  });

  return Node;
};
