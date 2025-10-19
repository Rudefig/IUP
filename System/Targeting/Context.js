import { IUP } from "/System/Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Context",
  Title: "Context",
  Desc: "Supplement or replace the browser's context menu.",
  Icon: "f039",
  System: "Targeting",
};

export const Registry = [];
export const State = {
  Node: {},
  is_context_menu_open: false,
  genContextSettings(data) {
    var settings = { name: "Context Menu", enabled: true, groups: data };
    return settings;
  },
};

export const Index = {
  Selector: {
    Global: ["global"],
    Selection: ["selection"],
    Link: ["a"],
    Image: ["img", "svg"],
    Video: ["video"],
    Audio: ["audio"],
    Input: ["input", "textarea"],
  },
};

export const Context = [
  {
    Selector: "global",
    ItemList: [
      {
        Title: "Change page title...",
        Input: {
          inline: true,
          type: "text",
          val: document.title,
          onSubmit: (val) => (document.title = val),
        },
      },
      {
        Title: "Toggle design mode",
        Icon: "",
        Desc: "Toggle the document's design mode, allowing it to be edited.",
        onUse(T) {
          if (document.designMode == "off") document.designMode = "on";
          else document.designMode = "off";
        },
      },
    ],
  },
  {
    Selector: "selection",
    ItemList: [
      {
        Title: "Test Menu Item",
        Submenu: [
          {
            Title: "Test Submenu Item",
          },
        ],
      },
    ],
  },
];

export const Action = {
  /*
▓█═─────══─────═🙦   Engage_Context_Menu()   🙤═─────══─────═❖
▓ Inject event listeners for activating the context menu.                                                                     */
  Engage_Context_Menu: function() {
    //TODO: Setting for activation method
    const method = "ctrl"; //self.settings.activation_input.val;
    document.addEventListener("contextmenu", contextmenuEvent);
    document.addEventListener("click", clickEvent);
    /*
█ ❖ CONTEXTMENU ⬥ Open the context menu.                                                                   */
    function contextmenuEvent(e) {
      // TODO: Indicator or something if user clicks RMB and nothing happens
      // TODO: If user right-clicks context menu, don't close it
      const ctrlMethod = method == "ctrl" && e.ctrlKey,
        altMethod = method == "alt" && e.altKey,
        isOpen = State.is_context_menu_open;
      if (ctrlMethod || altMethod) {
        e.preventDefault();
        Action.Open_Context_Menu(e);
      } else if (isOpen) {
        Action.Close_Context_Menu();
      }
    } /*
█ ❖ CLICK ⬥ If user clicks outside context menu, close it.                     */
    function clickEvent(e) {
      const menuIsOpen = State.is_context_menu_open,
        menu = State.Node.Host;
      if (menuIsOpen && !e.target.isEqualNode(menu)) {
        Action.Close_Context_Menu();
      }
    }
  },

  /*
▓█═─────══─────═🙦   Open Context Menu   🙤═─────══─────═❖
▓ Open the context menu; extract data, determine context and show matching menu items.                                                                     */
  Open_Context_Menu: function(e = {}) {
    // ❖ Variables
    var ContextList = makeList("target"),
       target = e.target || e || "global",
      keyword = target.tagName ? target.tagName.toLowerCase() : "global"; // prettier-ignore
    /*
█ ❖ makeList()
▓ Make a template obj for context lists & their menu items.                                                                   */
    function makeList(context) {
      return { [context]: [] };
    }
    /*
█ ❖ "SELECTION" CONTEXT
▓ If user has text selected, change context to "selection".                                                                 */
    // TODO: If user didn't click inside selection's parent, don't use selection?
    if (window.getSelection().type == "Range") {
      ContextList = makeList("selection");
      target = window.getSelection();
      keyword = "selection";
    }

    /*
█ ❖ FIND MENUS
▓ Find menus matching context. If no menus found, switch to "global" context and try again.                                                                  */
    Registry.forEach(parseContextMenus);
    var firstContext = Object.keys(ContextList)[0];
    console.log("ContextList", ContextList, firstContext);
    if (!ContextList[firstContext].length) {
      console.log(
        "target = global",
        ContextList[firstContext],
        ContextList[firstContext].length
      );
      ContextList = makeList("global");
      target = "global";
      Registry.forEach(parseContextMenus); // call parseContextMenus() on each menu (with global context)
      if (!ContextList[Object.keys(ContextList)[0]].length) throw new Error("IUP:Open_Context_Menu couldn't open because no menus were found."); // prettier-ignore
    }

    /*
█ ❖ BUILD MENUS
▓ Attach shadow DOM, insert code, generate context menus.                                                                   */
    var extLink = browser.runtime.getURL("/System/Targeting/-asset/Context/Context.css"),
      html = `<div class="iuCM__container wrap-box -shadow"></div><link rel="stylesheet" href="${extLink}">`; // prettier-ignore
    Action.Close_Context_Menu();
    State.is_context_menu_open = true;
    State.Node = IUP.Shadow.Action.Spawn_Shadow_Page({
      ID: "IUP-Context",
      html,
      // appendTo: document.body,
    });
    var { Body, Box } = State.Node;
    Body.addEventListener("use", (e) => Action.Close_Context_Menu());

    for (var ID in ContextList) {
      Generate.Construct_Context_Menu(ContextList[ID], target, keyword);
    }

    /*
█ ❖ FINALIZE PLACEMENT                                                                  */
    _.defer(function() {
      if (e.pageX) State.coords = [e.pageX - 4, e.pageY - 24];
      var coords = State.coords;

      // ❖ If menu overflows screen, reposition it.
      const rightEdgePos = coords[0] + 195,
        bodyWidth = document.body.clientWidth;
      if (rightEdgePos > bodyWidth) {
        coords[0] -= rightEdgePos - bodyWidth;
        Box.classList.add("-overflow-x");
      }

      // ❖ Set Position
      // coords[0] -= 4;
      // coords[1] -= 24;
      Box.style.left = coords[0] + "px";
      Box.style.top = coords[1] + "px";

      // ❖ Trigger open animation
      _.defer(() => Box.classList.add("-is-shown"));
    });

    // ❖ Show target lines
    // if (target.constructor.name.endsWith("Element"))
    //   State.TargetLine.createTargetLine(target);
    /*
█ ❖ parseContextMenus()
▓ Parse a single menu {M}'s data and check if it matches context.                                                                */
    function parseContextMenus(M) {
      if (!M || !M.Selector || !M.ItemList) return false;
      // TODO: Generate native Chrome context menu
      /*if (M.type == "native") {
            // "all", "page", "frame", "selection", "link", "editable", "image", "video", "audio", "launcher", "browser_action", or "page_action"
          }*/
      // ❖ Loop through each context and collect matching menus.
      var matchedElements = document.querySelectorAll(M.Selector);
      for (var selector in ContextList) {
        let contextMatches = false;
        // ❖ Special keywords: "global" and "selection" that dont have element targets
        if (["global", "selection"].includes(selector)) {
          const selectors = M.Selector.split(",").map((s) => s.trim());
          contextMatches = selectors.includes(selector); // check for exact match of context keyword
        } else {
          // ❖ Check if menu's selector matches context target directly, or if any parent element matches the menu's parentSelector
          for (let i = 0; i < matchedElements.length; i++) {
            if (matchedElements[i] == target) {
              contextMatches = true;
              break;
            }
          }
          var parent = target.parentElement;
          while (parent && parent !== document.body) {
            if (M.parentSelector && parent.matches(M.parentSelector)) {
              contextMatches = true;
              break;
            }
            parent = parent.parentElement;
          }
        }
        // ❖ If menu matches context, add to context's list
        if (contextMatches) ContextList[selector].push(M);
      }
    }
  },
  /*
▓█═─────══─────═🙦   Close Context Menu   🙤═─────══─────═❖
▓ Close the context menu. Destroy it with {destroy}, or just clear it for a new context.                                                                     */
  Close_Context_Menu: function(destroy = true) {
    if (!State.Node.Host) return;
    // State.TargetLine.eject();
    if (destroy) {
      IUP.Shadow.Action.Despawn_Shadow_Page({ ID: "IUP-Context" });
      console.log("is_context_menu_open = false");
      State.is_context_menu_open = false;
      State.coords = null;
    } else {
      State.Node.Box.innerHTML = "";
    }
  },
};

export const Generate = {
  /*
▓█═─────══─────═🙦   Construct_Context_Menu()   🙤═─────══─────═❖
▓ Build a context menu from {contextData} targeting {target} with context keyword {key}.                                                                     */
  Construct_Context_Menu: function(contextData, target, key) {
    const { Box } = State.Node,
      KeywordIndex = {
        Global: ["global"],
        Selection: ["selection"],
        Link: ["a"],
        Image: ["img"],
        Video: ["video"],
        Audio: ["audio"],
        Input: ["input", "textarea"],
      };
    // console.dir(State.node.box);
    // console.dir(box);
    key = _.findKey(Index.Selector, (K) => K.includes(key)) || "Global";
    // key = "Global";
    var icon = browser.runtime.getURL(
      `/System/Targeting/-asset/Context/${key}.svg`
    );
    icon = `<img class="iuCM__targ-icon" src="${icon}">`;

    // ❖ Insert selector box
    const selector = "";
    // const selector = ElementLib.var.get_selector(target) || "";
    if (typeof key != "string") key = selector;
    const html = `
<div class="iuCM__targ">
  <div class="iuCM__targ-name">${icon}${key}</div>
  <div class="iuCM__targ-options">${selector}<span class="item-icon">  </span></div>
</div>
<div class="iuCM__items"></div>`;
    Box.insertAdjacentHTML("beforeEnd", html);
    const __items = Box.querySelector(".iuCM__items");
    // Click selector box to switch to global context
    Box.querySelector(".iuCM__targ").onclick = function(e) {
      Action.Close_Context_Menu(false);
      Action.Open_Context_Menu();
    };

    // ❖ Generate Menu Items
    contextData.forEach((data) => {
      const menu = IUP.Menu.Generate.Construct_Menu(
        data,
        __items,
        null,
        target
      );
      __items.insertAdjacentHTML("beforeEnd",`<div class="divider"></div>`); // prettier-ignore
      // ◇ Hide last divider
      // var child = __items.lastChild.previousElementSibling;
      // while (child && child.classList.contains("-is-hidden")) {
      //   child = child.previousElementSibling;
      //   if (child && child.classList.contains("divider")) {
      //     child.classList.add("-is-hidden");
      //     break;
      //   }
      // }
    });
  },
};
