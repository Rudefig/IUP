import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Title: "Menu Type",
  Desc: "A menu containing Items.",
  Keyname: "Menu",
  System: "Construction",
  Parent: "Type",
  Typing: "P",
  // Format: ["Element"],
};

export const Generate = {
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Construct_Menu() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                      Generate a live node for a menu.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓  ❖ PARAMETERS ❖
▓    ◇ {menuData} Data object of menu & items.
▓    ◇ {parent} Parent menu.
▓    ◇ {id}  Recursive ID for submenus. Each menu item ID inherits its parent ID.
▓    ◇ {target}  For scripts with a target variable to pass on.
▓
▓  menuData = {
▓    ◇ .id           = (str) Unique ID for dropmenu. (default = auto-generated)
▓    ◇ .items*       = [array] Array of menu items.
▓    ◇ .group        = (str) Assign to group. Only one menu in group is open at once.
▓    ◇ .side         = ("right|left") Open on left or right side.
▓    ◇ .passive      = (false|true) Wait to generate menu until user opens it.
▓  *required
▓                                                                               */
  Construct_Menu(menuData, parent = {}, id, target = null) {
    const isElement = parent.constructor.name.endsWith("Element"),
      MenuNode = isElement ? parent : document.createElement("div");
    if (menuData.ItemList) {
      parent = menuData;
      menuData = parent.ItemList;
    }
    MenuNode.classList.add(parent.submenu ? "submenu-wrap" : "menu-wrap");
    menuData.forEach((itemData) => {
      const ItemNode = IUP.Item.Generate.Construct_Item(
        itemData,
        parent,
        id,
        target
      );
      MenuNode.appendChild(ItemNode);
    });
    return MenuNode;
  },

  /*


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Construct_Submenu() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓   Build a dropdown submenu for an item.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓
▓  ❖ PARAMETERS ❖
▓    ◇ {ItemNode}    = Parent item to insert submenu into.
▓    ◇ {ItemNode}    = Parent item to insert submenu into.
▓  arg = {
▓    ◇ .val          = An image URL, SVG node, or text character.
▓
▓  ❖ OUTPUT ❖
▓  DataObj = {
▓    ◇ .val          = (str)  Icon data.
▓
▓  ❖ TODO ❖
▓    ◇
▓
▓                                                                               */
  Construct_Submenu: function(ItemNode, MenuNode) {
    const SUBMENU_WIDTH_ADJUST = 82;
    var SubNode;
    if (typeof M.submenu == "function") M.submenu = M.submenu([]);
    if (M.submenu && M.submenu.length) {
      UILib.cmd.buildIcon(ItemNode, "f105");
      SubNode = Generate.Construct_Menu(M.submenu, M, idFull, target);
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
    } else if (M.submenu && !M.submenu.length) {
      ItemNode.classList.add(_disabled);
    }
  },
};
