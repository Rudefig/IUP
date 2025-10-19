import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Dropdown",
  Title: "Dropdown Part",
  Desc: "Choose from a dropdown list.",
  Typing: "P",
  System: "Structuring",
};
export const Module = function(dat) {
  const _class = "Part-Dropdown",
    { ID, Part = "Dropdown", label } = dat;
  var html = "";

  for (const Choice in dat.ChoiceList) {
    let Title = dat.ChoiceList[Choice].Title,
      selected = dat.Value == Choice ? " selected" : "";
    html += `<option value="${Choice}"${selected}>${Title}</option>`;
  }
  html = `<select class="${_class}__select" id="${ID}">${html}</select>`;

  // ❖ BUILD NODE
  const Node = document.createElement("div");
  Node.IUP = {};
  Node.className = `-${Part}`;
  Node.innerHTML = html;
  const SelectNode = Node.querySelector("select");

  // ❖ EVENTS
  SelectNode.onchange = (e) => Node.IUP.onEdit(e.target.value, e);
  Node.IUP.onEdit = function(val, e, target = dat.target) {
    if (dat.onEdit) dat.onEdit(val, e, dat.target);
    Node.dispatchEvent(IUP.Item.Trigger.Edit);
  };

  // ❖ GET/SET VALUE
  Object.defineProperties(Node, {
    Value: {
      get: () => SelectNode.value,
      set: (Val) => (SelectNode.value = Val),
    },
  });

  return Node;
};
