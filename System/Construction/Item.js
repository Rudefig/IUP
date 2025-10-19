import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Title: "Item Type",
  Desc: "A modular item of the user interface.",
  Keyname: "Item",
  System: "Component",
  Parent: "Type",
  Typing: "P",
  Format: ["Element"],
};
export const Convert = {
  HTML_To_Node: function(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  },
};

/*
█
▓█═─────══─────═🙦   Edit Trigger   🙤═─────══─────═❖
▓  When an input component is edited.                              */
export const Trigger = {
  Edit: new Event("Edit", { bubbles: true }),
};

export const Generate = {
  /*
█
▓█═─────══─────═🙦	 Construct_Input	 🙤═─────══─────═❖
▓  Choose the most appropriate <Part> for a module based on data {dat}.                                                      */
  Construct_Input: function(dat) {
    // If a <Part> is provided, check if it's compatible
    // Otherwise, use <Type> to select a <Part>
    // TODO: Integrate the Part Registry to generate specific Parts
    var Item = document.createElement("div"),
      classes = ["Item-Input"],
      name;
    // Generate input based on Type
    if (!dat.Part) {
      if (dat.Type == "Bool") dat.Part = "Switch";
      if (dat.Type == "Number") dat.Part = "Slider";
      if (dat.Type == "Text") dat.Part = "Field";
      if (dat.Type == "List") dat.Part = "Dropdown";
      if (dat.Type == "Bind") dat.Part = "Binder";
    }
    if (dat.Part == "Switch") Item = IUP.Switch.Module({ ...dat });
    if (dat.Part == "Toggler") Item = IUP.Toggler.Module({ ...dat });
    if (dat.Part == "Slider") Item = IUP.Slider.Module({ ...dat });
    if (dat.Part == "Field") Item = IUP.Field.Module({ ...dat });
    if (dat.Part == "Dropdown") Item = IUP.Dropdown.Module({ ...dat });
    if (dat.Part == "Radio") Item = IUP.Radio.Module({ ...dat });
    if (dat.Part == "Color_Tile") Item = IUP.Color_Tile.Module({ ...dat });
    if (dat.Part == "Binder") Item = IUP.Binder.Module({ ...dat });

    /*
█ ❖ Classes & ID                                                                   */
    var { tooltip, style, genStyle, dropmenu, size = "md" } = dat;
    // classes.push(name, Item.className);
    // Item.className = classes.join(" ");
    // Item.ID = dat.ID;

    /*
█ ❖ Extra Features                                                                   */
    if (dat.tooltip) Item.title = dat.tooltip;
    // if (genStyle) style = genStyle(val, dat.ID);
    // if (style) Item.insertAdjacentHTML("beforeEnd", `<style>${style}</style>`);

    /*
█ ❖ Dropmenu                                                                   */
    // dropmenu = {
    //   id: `${dat.ID}-dropmenu`,
    //   button: Item,
    //   btnMouse: "right",
    //   group: "input",
    //   openAt: "mouse",
    //   items: [
    //     {
    //       title: "Reset to default",
    //       onUse() {
    //         Item.val = dat.default;
    //       },
    //     },
    //     {
    //       title: "Random choice",
    //       disabled: true,
    //     },
    //   ],
    // };
    // Item.dropmenu = UILib.cmd.UI_Dropmenu(dropmenu);
    return Item;
  },

  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Construct_Item() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                    Generate a live node for a menu item.
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
▓    ◇ 🚧.deact|deact()     = (false|true)  Item is hidden with all event scripts disabled. Overrides other states.
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
.ID:    "string",
.Title: "string",
.Icon:  null|"string",
.Desc|Desc(): null|"string",
//.hidden|hidden(): false|true,
//.deact|deact(): false|true,
//.disabled|disabled(): false|true|"string",
//.warning|warning(): null|"string",
}
█═─────══─────═🙦                                                                 */
  Construct_Item: function(M, P = {}, ID, target = null) {
    _.defaults(M, {
      ID:
        typeof M.Title == "string"
          ? M.Title.replace(/\s|\./g, "_")
          : _.uniqueId(),
      type: "normal",
      holdTimer: 1.5,
      closeOnUse: true,
    });
    const idFull = (ID ? ID + "-" : "") + M.ID;

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
      _disabled = "-Is-Disabled",
      _hidden = "-Is-Hidden",
      _highlighted = "-Is-Highlighted",
      _nohover = "-no-hover",
      _hovering = "-is-hovering",
      _holding = "-is-holding",
      _held = "-is-held";
    if (M.Disabled) classList.push(_disabled);
    if (M.Hidden) classList.push(_hidden);
    if (M.noHover) classList.push(_nohover);

    /*
█ ❖ GENERATE HTML                                                                   */
    const ItemNode = document.createElement("div");
    ItemNode.IUP = {};
    ItemNode.classList.add(...classList);
    ItemNode.ID = idFull;
    ItemNode.innerHTML = `<span class="Item__Icon">${M.Icon ||
      ""}</span><span class="Item__Title">${M.Title || ""}</span>`;
    /*
█ ❖ BUILD SVG NODES                                                                   */
    // SUBMENU: &#xf105;
    // INPUT: 
    // DROPMENU: <path d="M3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L3.5,7 Z M3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L3.5,12 Z M3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L3.5,17 Z"/>

    // ❖ Title
    if (M.Title !== false) {
      Object.defineProperty(ItemNode.IUP, "Title", {
        get: () => ItemNode.querySelector(".Item__Title").innerHTML,
        set(val) {
          ItemNode.querySelector(".Item__Title").innerHTML = val;
        },
      });
    }

    // ❖ Icon (Main)
    // ItemNode.IUP.icons = [];
    // var Icon = M.Icon || (P && P.Icon) || "";
    // if (!Icon) classList.push("-no-icon");
    // else IUP.Icon_Button.Module(ItemNode, Icon);

    /*
█ ❖ SUBMENU                                                                   */
    const SUBMENU_WIDTH_ADJUST = 82;
    var SubNode = false;
    if (typeof M.Submenu == "function") M.Submenu = M.Submenu([]);
    if (M.Submenu && M.Submenu.length) {
      // IUP.Icon.Construct.Icon_Button(ItemNode, "f105");
      SubNode = IUP.Menu.Generate.Construct_Menu(M.Submenu, M, idFull, target);
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
          SubNode.classList.add("-sm-left");
        } else SubNode.classList.remove("-sm-left");
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
    } else if (M.Submenu && !M.Submenu.length) {
      ItemNode.classList.add(_disabled);
    }

    /*
█ ❖ DROPMENU                                                                   */
    if (M.dropmenu) {
      // M.dropmenu.parent =
      if (M.dropmenu.button === true) {
        const dropIconHTML = `<path d="M3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L3.5,7 Z M3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L3.5,12 Z M3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L3.5,17 Z"/>`,
          dropIcon = IUP.Icon.Generate.Construct_Icon(ItemNode, dropIconHTML);
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
    // if (M.input) {
    //   M.input.size = "sm";
    //   if (target) M.input.target = target;

    //   const InputWrapNode = document.createElement("div"),
    //     InputNode = buildInput(M.input),
    //     classes = ["item__input", "-centered"];

    //   if (M.input.inline) {
    //     const _inputActive = "-inputActive",
    //       inputIcon = UILib.cmd.buildIcon(ItemNode, {
    //         val: "",
    //         animate: "spin",
    //       });
    //     classes.push("-inner");
    //     M.input.submit = true;
    //     ItemNode.IUP.disableUseEvent = true;
    //     M.onUse = function() {
    //       ItemNode.classList.add(_inputActive);
    //       InputNode.IUP.focus();
    //     };

    //     // ❖ SUBMIT BUTTON
    //     const SubmitNode = ElementLib.var.build_element(`<a class="InputText__enter">ENTER</a>`); // prettier-ignore
    //     InputWrapNode.append(SubmitNode);
    //     InputNode.onkeydown = function(e) {
    //       if (e.keyCode == 13) InputNode.IUP.onSubmit(e);
    //       else if (e.keyCode == 27) InputNode.IUP.onCancel(e);
    //       e.stopPropagation();
    //     };
    //     SubmitNode.onclick = function(e) {
    //       InputNode.IUP.onSubmit(e);
    //     };
    //     InputNode.IUP.onSubmit = function(e, val = InputNode.val) {
    //       if (M.input.onSubmit) M.input.onSubmit(InputNode.val);
    //       InputWrapNode.classList.remove(_inputActive);
    //       ItemNode.dispatchEvent(ItemNode.IUP.useEvent);
    //     };
    //     InputNode.IUP.onCancel = function(e, val = InputNode.val) {
    //       if (M.input.onCancel) M.input.onCancel(InputNode.val);
    //       InputWrapNode.classList.remove(_inputActive);
    //     };
    //   } else classes.push("-outer");

    //   InputWrapNode.classList.add(...classes);
    //   InputWrapNode.appendChild(InputNode);
    //   ItemNode.appendChild(InputWrapNode);
    // }

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
};
