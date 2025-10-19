import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Radio",
  Title: "Radio Part",
  Desc: "Choose a value from a radio list.",
  Typing: "P",
  System: "Structuring",
};
export const Module = function(dat) {
  const _class = "Part-Radio",
    { ID, Part = "Radio", label } = dat;
  var html = "";
  const Node = document.createElement("div");
  Node.IUP = {};
  Node.className = `${_class}`;

  // ❖ BUILD NODE
  for (const Choice in dat.ChoiceList) {
    let { Title, Value } = dat.ChoiceList[Choice],
      checked = dat.Value == Choice ? " checked" : "",
      html = `<label for="${Choice}"><input name="${ID}" type="radio" id="${Choice}" value="${Choice}"${checked}>${Title}</label>`,
      LabelNode = IUP.Item.Convert.HTML_To_Node(html),
      InputNode = LabelNode.querySelector("input");
    Node.appendChild(LabelNode);
    InputNode.onchange = (e) =>
      Node.IUP.onEdit(dat.ChoiceList[e.target.value], e);
  }

  // ❖ EVENTS
  Node.IUP.onEdit = function(val, e, target = dat.target) {
    if (dat.onEdit) dat.onEdit(val, e, dat.target);
    Node.dispatchEvent(IUP.Item.Trigger.Edit);
  };

  // ❖ GET/SET VALUE
  Object.defineProperties(Node, {
    Value: {
      get: () => Node.querySelector(`input[name="${ID}"]:checked`).value,
      set: (Val) =>
        (Node.querySelector(`input[value="${Val}"]`).checked = true),
    },
  });

  return Node;
};
