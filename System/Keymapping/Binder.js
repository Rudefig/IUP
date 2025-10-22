import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Binder",
  Title: "Binder Part",
  Desc: "Set a keybind.",
  // Typing: "P",
  System: "Keymapping",
};
export const Module = function(dat) {
  var _class = "Part-Binder",
    { ID, Value = IUP.Bind.Value } = dat;

  // ❖ BUILD NODE
  const Node = document.createElement("div");
  Node.IUP = { Value };
  Node.className = `${_class}`;
  Node.innerHTML = `<div class="${_class}__mods"></div>`;
  const ModifierNode = Node.querySelector(`.${_class}__mods`);
  console.log("Binder dat =", dat.Value);
  for (const Modifier in Value.Modifier) {
    const ModPart = IUP.Toggler.Module({
      Label: Modifier,
      Value: Value.Modifier[Modifier],
      onEdit: (val) => {
        Node.IUP.Value.Modifier[Modifier] = val;
        console.log("Modifier changed:", Modifier, val);
      },
    });
    ModifierNode.appendChild(ModPart);
  }
  const InputNode = IUP.Field.Module({
    Value: Value.Keystroke,
    onEdit: (val) => {
      Node.IUP.Value.Keystroke = val;
      console.log("Keystroke changed:", val);
    },
  });
  Node.appendChild(InputNode);

  return Node;
};
