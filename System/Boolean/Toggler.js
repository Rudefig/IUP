import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Toggler",
  Title: "Toggler Part",
  Desc: "Toggle the button on and off.",
  Typing: "B",
  System: "Boolean",
};
export const Module = function(dat) {
  const _class = "Part-Toggler",
    { ID, Value, Label = "" } = dat,
    checked = Value ? " checked" : "",
    html = `<label class="${_class}__wrap"><input class="${_class}__input" type="checkbox" id="${ID}"${checked}><span class="${_class}__button">${Label}</span></label>`;
  console.log("dat = ", dat);
  // ❖ BUILD NODE
  const Node = document.createElement("div");
  Node.IUP = { Value };
  Node.className = _class;
  Node.innerHTML = html;
  const Input = Node.querySelector("input");

  // ❖ EVENTS
  Input.onchange = (e) => Node.IUP.onEdit(e.target.checked, e);
  Node.IUP.onEdit = function(val, e, target = dat.target) {
    Node.IUP.Value = val;
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
