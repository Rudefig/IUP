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
  Node.IUP = {};
  Node.className = `${_class}`;
  Node.innerHTML = `<div class="${_class}__mods"></div>`;
  const ModifierNode = Node.querySelector(`.${_class}__mods`),
    InputNode = IUP.Field.Module({ Value: Value.Keystroke });
  console.log("Binder dat =", dat.Value);
  for (const Modifier in Value.Modifier) {
    const ModPart = IUP.Toggler.Module({
      Label: Modifier,
      // IUP.Modifier.Index.Modifier_Table.Value.Windows[Modifier].Shorthand,
      Value: Value.Modifier[Modifier],
    });
    ModifierNode.appendChild(ModPart);
  }
  Node.appendChild(InputNode);

  return Node;
};
