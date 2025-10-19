export const Metadata = {
  Title: "Icon Button",
  Desc: "Clickable icon for an Item.",
  Keyname: "Icon",
  System: "Iconography",
  Parent: "Type",
  Typing: "Media",
};

/*


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Icon_Button() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓     Build an icon for an item and insert it into the next available position.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓  ❖ LAYERS ❖
▓    ◇ __overlay = Image icons are placed here.
▓    ◇ __mask    = Icon shown when item is active/hovered.
▓    ◇ __content = Base layer for icons.
▓
▓  ❖ PARAMETERS ❖
▓    ◇ {ItemNode}    = Item to insert icon into.
▓  arg = {
▓    ◇ .val          = An image URL, SVG node, or text character.
▓    ◇ .pos          = Icon position in the item, 0-3(?).
▓    ◇ .minPos       =
▓    ◇ .replace      =
▓    ◇ .contentLayer = (true|false)  Insert icon into content layer.
▓    ◇ .maskLayer    = (true|false)  Insert icon into mask layer.
▓    ◇ .animate      = (string) Name of animation for icon. Sets {.animateMask}.
▓    ◇ .animateContent = (string) Name of animation for content layer.
▓    ◇ .animateMask = (string) Name of animation for mask layer.
▓
▓  ❖ OUTPUT ❖
▓  DataObj = {
▓    ◇ .val          = (str)  Icon data.
▓    ◇ .format       = ("text|image|group")  Icon type - character string, image, or SVG group.
▓    ◇ .pos          = (int)  Icon position inside the item.
▓    ◇ .contentLayer = <element>  Icon node inside the content layer.
▓    ◇ .maskLayer    = <element>  Icon node inside the mask layer.
▓
▓  ❖ TODO ❖
▓    ◇
▓
▓                                                                               */
export const Module = function(ItemNode, arg) {
  // ❖ Prep Data
  if (typeof arg == "string") arg = { val: arg };
  _.defaults(arg, {
    pos: ItemNode.IUP.icons.length,
    minPos: 0,
    replace: true,
    contentLayer: true,
    maskLayer: true,
    animateContent: false,
    animateMask: arg.animate || false,
  });
  if (arg.pos < arg.minPos) arg.pos = arg.minPos;

  var { val, pos, animate, contentLayer, maskLayer, onUse } = arg,
    __mask = ItemNode.querySelector(".Item__Mask"),
    __content = ItemNode.querySelector(".Item__Content"),
    __overlay = ItemNode.querySelector(".Item__Overlay");

  // ❖ Replace existing icon
  const current = ItemNode.IUP.icons[pos];
  if (current) {
    if (!arg.replace) return;
    contentIcon = __content.querySelector(`.-pos${pos}`);
    maskIcon = __mask.querySelector(`.-pos${pos}`);
    if (contentIcon) contentIcon.remove();
    if (maskIcon) maskIcon.remove();
  }

  // ❖ Insert new icon
  var format, contentLayer, maskLayer;
  if (["jpg", "png", "gif"].includes(val.slice(-3))) {
    // ◇ IMAGE
    format = "image";
    insertIntoLayer(__overlay, `<image ${genClasses(arg.animateContent)} href="${val}"></image>`); // prettier-ignore
  } else if (val[0] == "<") {
    // ◇ GROUP
    format = "group";
    if (contentLayer) insertIntoLayer(__content, `<rect ${genClasses(arg.animateContent, "-hitbox")} width="24" height="24" />`); // prettier-ignore
    if (maskLayer) insertIntoLayer(__mask, `<g ${genClasses(arg.animateMask)}>${val}</text>`); // prettier-ignore
  } else {
    // ◇ TEXT
    format = "text";
    if (val.length == 4) val = `&#x${val};`;
    if (contentLayer) insertIntoLayer(__content, `<text ${genClasses(arg.animateContent)}>${val}</text>`); // prettier-ignore
    if (maskLayer) insertIntoLayer(__mask, `<text ${genClasses(arg.animateMask)}>${val}</text>`); // prettier-ignore
  }

  // ❖ genClasses() ⬥ Generate a class for an icon node.
  function genClasses(animateLayer, extra) {
    const classList = ["Item__Icon", `-${format}`, `-pos${pos}`];
    if (animateLayer) classList.push(`-animate-${animateLayer}`);
    if (extra) classList.push(extra);
    return `class="${classList.join(" ")}"`;
  }

  // ❖ insertIntoLayer() ⬥ Insert HTML {code} into layer {layer}. Return the node.
  function insertIntoLayer(layer, code) {
    if (!contentLayer && (layer == __content || layer == __overlay)) return; // prettier-ignore
    else if (layer == __mask && !maskLayer) return;
    layer.innerHTML += code;
    return layer.querySelector(`.-pos${pos}`);
  }

  contentLayer = ItemNode.querySelector(`.Item__Content .-pos${pos}`);
  maskLayer = ItemNode.querySelector(`.Item__Mask .-pos${pos}`);

  if (onUse) {
    if (contentLayer) contentLayer.onclick = onUse;
    if (maskLayer) maskLayer.onclick = onUse;
    if (contentLayer && !maskLayer) contentLayer.classList.add("-contentBtn"); // prettier-ignore
  }

  // ❖ Output
  const DataObj = { val, format, pos, animate, contentLayer, maskLayer };
  ItemNode.IUP.icons[pos] = DataObj;
  return ItemNode.IUP.icons[pos];
};
