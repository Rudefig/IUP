/*
 ‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅     ∽ P-Item Part ∼      ⟆▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                                ...
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ FEATURES ❖
▓ Type Format: ELEMENT
▓
▓ State:
▓  ◇ submenu active
▓  ◇ disabled
▓  ◇ hidden
▓  ◇ highlighted
▓  ◇ hover disabled
▓  ◇ user hovering
▓  ◇ user holding
▓  ◇ user held
▓ Action:
▓  ◇ Build_Item
▓ Trigger:
▓  ◇ Item Clicked
▓  ◇ Item Held Down
▓  ◇ Item Hovered
▓
▓ ❖ TODO ❖
▓  ◇ Subtypes
▓     ⬥ Button Item (card form) - Clickable button w/ icon and/or text
▓     ⬥ Menu Item (bar form)
▓                                                                              */
export var Type = function ItemType(arg) {
  const self = this;
  this.Meta = {
    title: "Item Part",
    icon: "f09c",
    desc: "",
  };
  this.Action = {
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ buildItem() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                       Create a live node for an item.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓  ❖ NOTES ❖
▓    ◇ Returns the menu item node, which must be inserted manually.
▓
▓  ❖ ARGUMENTS ❖
▓    ◇ {M}  Menu item data.
▓    ◇ {P}  Parent item data.
▓    ◇ {id}  Recursive ID for submenus. Each menu item ID inherits its parent ID.
▓    ◇ {target}  For scripts with a target variable to pass on.
▓
▓  ❖ MENU ITEM 〜 PARAMETERS ❖
▓  item = {
▓    ◇ .id         = (str)  Unique ID for item. (recommended)
▓    ◇ .title*     = (str)  Print title.
▓    ◇ .tooltip    = (str)  Tooltip description.
▓    ◇ .icon       = (str)  Item icon.
▓    ◇ .type       = 🚧("normal|checkbox|radio|separator")  Special menu item type.
▓    ◇ .closeOnUse = (true|false)  Close menu when onUse() is activated. (Custom 'use' event must be captured.)
▓
▓  ⯁ STATES ⯁
▓  Item state property can be a literal or a function. Multiple states can be active at once.
▓    ◇ .hidden|hidden()      = (false|true)  Item is hidden. Cannot be interacted with, though scripts are still active.
▓    ◇ .disabled|disabled()  = (false|true|"string")  Item is grayed, can't be interacted with. Optionally, return string for reason disabled.
▓    ◇ 🚧.deact|deact()      = (false|true)  Item is hidden with all event scripts disabled. Overrides other states.
▓
▓  ⯁ EVENTS ⯁
▓    ◇ .onCreate()      = Item is constructed.
▓    ◇ .onUse()         = Item is used.
▓  "Click" Trigger ❗❗INTEGRATED BY MOUSE TRIGGER
▓    ◇ .onClick()       = Item clicked.
▓    ◇ .onDoubleClick() = Item double-clicked.
▓    ◇ .onRightClick()  = Item right-clicked.
▓  "Hover" Trigger ❗❗INTEGRATED BY MOUSE TRIGGER
▓    ◇ .onHoverIn()     = Hover over item.
▓    ◇ .onHoverOut()    = Hover off item.
▓  "Hold" Trigger ❗❗INTEGRATED BY MOUSE TRIGGER
▓    ◇ .onHoldStart()   = Click and hold item. (Release or hover-out will cancel hold.)
▓    ◇ .onHoldCancel()  = Item released before timer expires, cancel hold.
▓    ◇ .onHoldEnd()     = Timer expired and item is still held.
▓    ◇ .onHoldRelease() = Item successfully released from hold.
▓
▓  ⯁ EXTRA FEATURES ⯁
▓    ◇ .submenu    = [items] Array of items for a submenu. ❗❗CREATE NEW MENU MODULE
▓    ◇ .dropmenu   = [items] Array of items for a dropmenu. ❗❗CREATE NEW MENU MODULE
▓    ◇ .input      = {input}  Data object passed to buildInput()
▓
▓  ❖ TODO ❖
▓    ◇ PREVIEW: "Items are a fundamental building block of the user interface."
▓    ◇ SMART SUBMENU TIMEOUT: After submenu opens, the farther the user moves the cursor from the menu item, the shorter the timeout until it closes.
▓    ◇ BUTTONS - SPACE:
▓      ⬥ Buttons are placed on the right side (default).
▓      ⬥ If icons can't fit, collapse into one icon.
▓      ⬥ Button color: None (black), Flashing (color), Solid (color)
▓    ◇ BUTTONS - PRESETS:
▓      ⬥ Submenu: Always takes up Position 1.
▓      ⬥ Dropmenu: Hamburger icon with dropmenu.
▓      ⬥ Inline Input:
▓      ⬥ Badge: Number badge.
▓      ⬥ Mark: Marked with an asterisk icon.
▓      ⬥ Exclamation: Red (!) icon with tooltip.
▓      ⬥ Warning: Yellow warning icon with tooltip.
▓      ⬥ Check: Green checkmark icon with tooltip.
▓    ◇ PIN MENU: Pin a menu/submenu to stop it from closing. "Close" button appears.
▓
▓█═─═🙦 ITEM =
{
.id:    "string",
.title: "string",
.icon:  null|"string",
.desc|desc(): null|"string",
//.hidden|hidden(): false|true,
//.deact|deact(): false|true,
//.disabled|disabled(): false|true|"string",
//.warning|warning(): null|"string",
}
█═─────══─────═🙦                                                                 */
    buildItem: function(M, P = {}, id, target = null) {
      _.defaults(M, {
        id: typeof M.title == "string" ? M.title.replace(/\s|\./g, "_") : _.uniqueId(), // prettier-ignore
        type: "normal",
        holdTimer: 1.5,
        closeOnUse: true,
      });
      const idFull = (id ? id + "-" : "") + M.id;

      /*
█ ❖ ITEM STATES                                                                   */
      const funcParams = ["title", "icon", "disabled", "marked", "hidden", "warning"]; // prettier-ignore
      funcParams.forEach((param) => {
        if (typeof M[param] == "function") {
          const func = M[param];
          M[param] = func(target);
        }
      });
      const classList = ["menu-item"],
        _submenuActive = "-submenu-active",
        _disabled = "-is-disabled",
        _hidden = "-is-hidden",
        _highlighted = "-is-highlighted",
        _nohover = "-no-hover",
        _hovering = "-is-hovering",
        _holding = "-is-holding",
        _held = "-is-held";
      if (M.disabled) classList.push(_disabled);
      if (M.hidden) classList.push(_hidden);
      if (M.noHover) classList.push(_nohover);

      /*
█ ❖ GENERATE HTML                                                                   */
      const ItemNode = document.createElement("div");
      ItemNode.IUP = {};
      ItemNode.classList.add(...classList);
      ItemNode.id = idFull;
      ItemNode.innerHTML = `
<svg class="item__svg">
<defs>
<mask id="item__mask-${idFull}" class="item__mask"></mask>
</defs>
<g class="item__overlay"></g>
<rect class="item__fill" mask="url(#item__mask-${idFull})" />
<g class="item__content"></g>
</svg>`;
      const __mask = ItemNode.querySelector(".item__mask"),
        __content = ItemNode.querySelector(".item__content"),
        __overlay = ItemNode.querySelector(".item__overlay");
      /*
█ ❖ BUILD SVG NODES                                                                   */
      // SUBMENU: &#xf105;
      // INPUT: 
      // DROPMENU: <path d="M3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L3.5,7 Z M3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L3.5,12 Z M3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L3.5,17 Z"/>

      // ❖ Title
      if (M.title !== false) {
        let html = `<text class="item__title">${M.title || ""}</text>`;
        __content.innerHTML += html;
        __mask.innerHTML += html;
        Object.defineProperty(ItemNode.IUP, "title", {
          get: () => __content.querySelector(".item__title").innerHTML,
          set(val) {
            __content.querySelector(".item__title").innerHTML = val;
            __mask.querySelector(".item__title").innerHTML = val;
          },
        });
      }

      // ❖ Icon (Main)
      ItemNode.IUP.icons = [];
      var icon = M.icon || (P && P.icon) || "";
      if (!icon) classList.push("-no-icon");
      UILib.cmd.Build_Icon(ItemNode, icon);

      /*
█ ❖ SUBMENU                                                                   */
      const SUBMENU_WIDTH_ADJUST = 82;
      var SubNode = false;
      if (typeof M.submenu == "function") M.submenu = M.submenu([]);
      if (M.submenu && M.submenu.length) {
        UILib.cmd.Build_Icon(ItemNode, "f105");
        SubNode = self2.cmd.buildMenu(M.submenu, M, idFull, target);
        ItemNode.appendChild(SubNode);
        ItemNode.IUP.hasSubmenu = true;
        ItemNode.IUP.submenuNode = SubNode;
        SubNode.IUP.parentMenuNode = ItemNode;

        // ❖ SubNode.closeAllSubmenus()
        SubNode.IUP.closeAllSubmenus = function(exceptThis = true) {
          const closeAll = (SN) => {
            if (SN != SubNode) SN.IUP.closeSubmenu();
          };
          ItemNode.querySelectorAll(`.menu-item[id$=${id}]`).forEach(closeAll);
        };

        // ❖ SubNode.openSubmenu()
        SubNode.IUP.openSubmenu = function() {
          SubNode.IUP.submenuActive = true;
          // const submenuWidth = _.max(SubNode.querySelectorAll(".item__title"), node => node.clientWidth).clientWidth, // prettier-ignore
          const submenuWidth = SubNode.IUP.setSVGWidth(),
            right = ItemNode.getBoundingClientRect().right;
          // __B(submenuWidth + SUBMENU_WIDTH_ADJUST + "px");
          // SubNode.iuCSS("--svg-width", submenuWidth + SUBMENU_WIDTH_ADJUST + "px"); // prettier-ignore
          if (submenuWidth + right > document.documentElement.clientWidth) {
            SubNode.classList.add("-overflow-right");
          } else SubNode.classList.remove("-overflow-right");
          SubNode.style.opacity = 1;
        };

        // ❖ SubNode.closeSubmenu()
        SubNode.IUP.closeSubmenu = function() {
          SubNode.IUP.submenuActive = false;
          SubNode.style.opacity = 0.44;
        };

        // ❖ Auto-close submenu on mouseout
        SubNode.IUP.closeTimeout = function() {
          setTimeout(() => {
            if (ItemNode.classList.contains(_hovering) || SubNode.classList.contains(_hovering)) return; // prettier-ignore
            SubNode.IUP.closeSubmenu();
          }, 1000);
        };

        // ❖ Hover In/Out Submenu
        SubNode.onmouseenter = (e) => SubNode.classList.add(_hovering);
        SubNode.onmouseleave = (e) => {
          SubNode.classList.remove(_hovering);
          SubNode.IUP.closeTimeout();
        };
      } else if (M.submenu && !M.submenu.length) {
        ItemNode.classList.add(_disabled);
      }

      /*
█ ❖ DROPMENU                                                                   */
      if (M.dropmenu) {
        // M.dropmenu.parent =
        if (M.dropmenu.button === true) {
          const dropIconHTML = `<path d="M3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L3.5,7 Z M3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L3.5,12 Z M3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L3.5,17 Z"/>`,
            dropIcon = UILib.cmd.Build_Icon(ItemNode, dropIconHTML);
          M.dropmenu.button = dropIcon.contentLayer;
        } else if (!M.dropmenu.button) {
          M.dropmenu.btnMouse = "right";
          M.dropmenu.button = ItemNode;
        }
        if (!M.dropmenu.passive) UILib.cmd.UI_Dropmenu(M.dropmenu);
        else {
          M.dropmenu.button.onclick = function(e) {
            const Dropmenu = UILib.cmd.UI_Dropmenu(M.dropmenu);
            Dropmenu.open(e);
            e.preventDefault();
            e.stopPropagation();
          };
        }
      }

      /*
█ ❖ INPUT                                                                   */
      if (M.input) {
        M.input.size = "sm";
        if (target) M.input.target = target;

        const InputWrapNode = document.createElement("div"),
          InputNode = buildInput(M.input),
          classes = ["item__input", "-centered"];

        if (M.input.inline) {
          const _inputActive = "-inputActive",
            inputIcon = UILib.cmd.Build_Icon(ItemNode, {
              val: "",
              animate: "spin",
            });
          classes.push("-inner");
          M.input.submit = true;
          ItemNode.IUP.disableUseEvent = true;
          M.onUse = function() {
            ItemNode.classList.add(_inputActive);
            InputNode.IUP.focus();
          };

          // ❖ SUBMIT BUTTON
          const SubmitNode = ElementLib.var.build_element(`<a class="InputText__enter">ENTER</a>`); // prettier-ignore
          InputWrapNode.append(SubmitNode);
          InputNode.onkeydown = function(e) {
            if (e.keyCode == 13) InputNode.IUP.onSubmit(e);
            else if (e.keyCode == 27) InputNode.IUP.onCancel(e);
            e.stopPropagation();
          };
          SubmitNode.onclick = function(e) {
            InputNode.IUP.onSubmit(e);
          };
          InputNode.IUP.onSubmit = function(e, val = InputNode.val) {
            if (M.input.onSubmit) M.input.onSubmit(InputNode.val);
            InputWrapNode.classList.remove(_inputActive);
            ItemNode.dispatchEvent(ItemNode.IUP.useEvent);
          };
          InputNode.IUP.onCancel = function(e, val = InputNode.val) {
            if (M.input.onCancel) M.input.onCancel(InputNode.val);
            InputWrapNode.classList.remove(_inputActive);
          };
        } else classes.push("-outer");

        InputWrapNode.classList.add(...classes);
        InputWrapNode.appendChild(InputNode);
        ItemNode.appendChild(InputWrapNode);
      }

      /*
█ ❖ ITEM EVENTS                                                                   */
      // ❖ Click
      ItemNode.IUP.useEvent = new Event("use", { bubbles: true });
      ItemNode.IUP.useEvent.closeMenuOnUse = M.closeOnUse;
      ItemNode.IUP.onUse = function(e) {
        if (ItemNode.classList.contains(_disabled) || ItemNode.classList.contains(_holding)) return; // prettier-ignore
        if (M.onUse) M.onUse(target, ItemNode, M);
        e.stopPropagation();
        if (ItemNode.IUP.disableUseEvent) return;
        ItemNode.dispatchEvent(ItemNode.IUP.useEvent);
      };
      ItemNode.onclick = function(e) {
        if (typeof M.onUse === "function") ItemNode.IUP.onUse(e);
      };

      // ❖ Hold & Release
      if (M.onHoldRelease || M.onHoldEnd) {
        ItemNode.onmousedown = function(e) {
          ItemNode.classList.add(_holding);
          if (M.onHoldStart) M.onHoldStart();
          setTimeout(() => {
            const holdEnded = ItemNode.classList.contains(_holding) && ItemNode.classList.contains(_hovering); // prettier-ignore
            if (holdEnded) {
              ItemNode.classList.replace(_holding, _held);
              if (M.onHoldEnd) M.onHoldEnd();
            } else ItemNode.classList.remove(_holding);
          }, M.holdTimer * 1000);
        };
        ItemNode.onmouseup = function(e) {
          if (ItemNode.classList.contains(_held)) {
            if (M.onHoldRelease) M.onHoldRelease();
            ItemNode.classList.remove(_held);
          } else if (ItemNode.classList.contains(_holding)) {
            if (M.onHoldCancel) M.onHoldCancel();
            ItemNode.classList.remove(_holding);
          }
        };
      }

      // ❖ Hover In/Out
      ItemNode.onmouseenter = function(e) {
        ItemNode.classList.add(_hovering);
        if (M.onHoverIn) M.onHoverIn();
        if (SubNode && !SubNode.IUP.submenuActive) SubNode.IUP.openSubmenu();
        e.stopPropagation();
      };
      ItemNode.onmouseleave = function(e) {
        ItemNode.classList.remove(_hovering, _holding, _held);
        if (M.onHoverOut) M.onHoverOut();
        if (SubNode) SubNode.IUP.closeTimeout();
        e.stopPropagation();
      };

      /*
█ ❖ TODO                                                                   */
      if (M.snapTo) {
      }
      /*
█ ❖ OUTPUT                                                                   */
      if (!M.onUse && !M.onHoverIn && !M.onHoverOut) classList.push(_nohover);
      _.defer(() => {
        if (M.onCreate) M.onCreate(ItemNode, M);
      });
      return ItemNode;
    },

    /*


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Build_Icon() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓   Build an icon for an item and insert it into the next available position.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
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
    Build_Icon: function(ItemNode, arg) {
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
        __mask = ItemNode.querySelector(".item__mask"),
        __content = ItemNode.querySelector(".item__content"),
        __overlay = ItemNode.querySelector(".item__overlay");

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
        insertIntoLayer(__overlay, `<image ${makeClass(arg.animateContent)} href="${val}"></image>`); // prettier-ignore
      } else if (val[0] == "<") {
        // ◇ GROUP
        format = "group";
        if (contentLayer) insertIntoLayer(__content, `<rect ${makeClass(arg.animateContent, "-hitbox")} width="24" height="24" />`); // prettier-ignore
        if (maskLayer) insertIntoLayer(__mask, `<g ${makeClass(arg.animateMask)}>${val}</text>`); // prettier-ignore
      } else {
        // ◇ TEXT
        format = "text";
        if (val.length == 4) val = `&#x${val};`;
        if (contentLayer) insertIntoLayer(__content, `<text ${makeClass(arg.animateContent)}>${val}</text>`); // prettier-ignore
        if (maskLayer) insertIntoLayer(__mask, `<text ${makeClass(arg.animateMask)}>${val}</text>`); // prettier-ignore
      }

      // ❖ makeClass() ⬥ Make a class for an icon node.
      function makeClass(animateLayer, extra) {
        const classList = ["item__icon", `-${format}`, `-pos${pos}`];
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

      contentLayer = ItemNode.querySelector(`.item__content .-pos${pos}`);
      maskLayer = ItemNode.querySelector(`.item__mask .-pos${pos}`);

      if (onUse) {
        if (contentLayer) contentLayer.onclick = onUse;
        if (maskLayer) maskLayer.onclick = onUse;
        if (contentLayer && !maskLayer) contentLayer.classList.add("-contentBtn"); // prettier-ignore
      }

      // ❖ Output
      const DataObj = { val, format, pos, animate, contentLayer, maskLayer };
      ItemNode.IUP.icons[pos] = DataObj;
      return ItemNode.IUP.icons[pos];
    },
  };
};
