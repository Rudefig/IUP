import { IUP } from "/System/Environment/-asset/Initialization.js";
export const Metadata = {
  Title: "Favicon",
  Desc: "Flag the tab's favicon with a color or symbol.",
  Icon: "f02c",
};
/*
ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█        🙢  FLAG PAGE  🙠       █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ Control the icons of tabs.
▓ ❖ Action
▓   ◇ Apply_Page_Flag: Identify the page's favicon icon and replace the original node.
▓   ◇ Animate_Favicon: Animate the favicon and overlay a badge using Favico.js.
▓ ❖ Query
▓   ◇ Get_Icon_Path
▓ ❖ State
▓   ◇ node: The favicon node that sets the icon of a tab
▓   ◇ favico_obj: Save the Favico.js script object
▓   ◇ original_favicon: Save the tab's original favicon URL
▓   ◇ Get_Icon_Path: Get the file path of an icon
▓ ❖ Constant
▓   ◇ TAG_ID
▓   ◇ ASSET_PATH
▓   ◇ FAVICON_SELECTOR
▓   ◇ INDEX (Ribbons/Icons)
▓ ❖ Setting
▓   ◇ new_tab_unread_badge: Show an unread badge on tabs that haven't been seen.
▓
▓ ❖ TODO
▓   ◇ Persistent: If true, any links opened will set icon to the same one
▓     ⬥ Some icons have special "propogated" versions (i.e. ribbon with just outline)
▓   ◇ More VFX - B&W filter
▓ ❖ ROADMAP
▓   ◇ Replace Favico.js library with in-house system
▓   ◇ Implement in data organization tools
▓     ⬥ Color tagging
▓     ⬥ Read/unread
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */

/*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ ACTIONS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
export const Action = {
  Engage: function() {
    console.log("<Favicon> Engaged");
    State.favicon_node;
    // ❖ Build context menu
    _.each(Constant.FLAG_INDEX.Ribbons, function(Name, item) {
      const Icon = IUP.Icon.Generate.Generate_Icon(
        Query.Get_Icon_Path(Name) || "fa-tags fas"
      );
      Context.ItemList[0].Submenu.push({
        ID: `flagPage-${Name}`,
        Title: Name,
        Icon: Icon,
        onUse(T) {
          console.log(`<Favicon> Flagging page with "${Name}" flag.`);
          Action.Apply_Page_Flag(Name);
        },
      });
    });

    // ❖ Unread Tabs
    if (document.visibilityState == "hidden") {
      Action.Animate_Favicon({ badge: true });
      const onFocus = function(e) {
        Action.Animate_Favicon();
        window.removeEventListener("focus", onFocus);
      };
      window.addEventListener("focus", onFocus);
    }
  },
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Apply_Page_Flag() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓             Locate the favicon icon and replace the original node.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓   ◇ flag (STRING) - Name of flag graphic to apply.
▓   ◇ target (TAB) - Target
▓                                                                               */
  Apply_Page_Flag: function(flag) {
    const { FLAG_INDEX, FAVICON_SELECTOR } = Constant;
    flag = flag.toLowerCase();

    // ❖ Locate flag in index
    var flagPath = _.find(FLAG_INDEX, (item) => item[flag])[flag];
    if (!flagPath) throw new Error(`IUP:Favicon couldn't find a flag named "${flag}".`); // prettier-ignore

    // ❖ If flag found, perform operations
    var url = Query.Get_Icon_Path(flagPath);
    if (State.favicon_node) State.favicon_node.href = url;
    else {
      State.original_favicon.set();
      if (State.favicon_node) State.favicon_node.remove(); // remove original favicon
      document.head.insertAdjacentHTML("beforeEnd", `<link id="${Constant.TAG_ID}" rel="icon" href="${url}">`); // prettier-ignore
    }
  },
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Animate_Favicon() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓            Animate the favicon and overlay a badge using Favico.js.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ NOTES ❖
▓   ◇ DOCS: http://lab.ejci.net/favico.js/
▓   ◇ Shares {arg} data with Favico.js.
▓
▓ ❖ PARAMETERS ❖
▓  arg = null   ⬥ Restore original favicon.
▓  arg = {
▓ (ACTION OPTIONS ◇ Choose One)
▓   ◇ .badge   ⬥ ("string"|true) Number or character to display on favicon badge. True for blank badge.
▓   ◇ .image   ⬥ (element) Image element to set as favicon.
▓   ◇ .video   ⬥ (element) Video element to set as favicon.
▓ (FAVICO.JS OPTIONS ◇ Optional)
▓   ◇ .bgColor    ⬥ Badge background color
▓   ◇ .textColor  ⬥ Badge text color
▓   ◇ .fontFamily ⬥ Text font family (Arial, Verdana, Times New Roman, serif, sans-serif, ...)
▓   ◇ .fontStyle  ⬥ Font style (normal, italic, oblique, bold, bolder, lighter, 100, 200, 300, 400, 500, 600, 700, 800, 900)
▓   ◇ .type       ⬥ Badge shape (circle, rectangle)
▓   ◇ .position   ⬥ Badge position (up, down, left, upleft)
▓   ◇ .animation  ⬥ Badge animation type (slide, fade, pop, popFade, none)
▓                                                                               */
  Animate_Favicon: function(arg) {
    if (!arg) {
      self.Var.favico.reset();
      self.Var.favico = null;
      return;
    }
    // if (!self.Var.favico) self.Var.original_favicon.set(); // save original favicon
    /*
█ ❖ Parse Data                                                                   */
    var { badge, image, video, webcam } = arg;
    arg = _.omit(arg, [badge, image, video, webcam]);
    if (badge === true) badge = " ";
    if (badge[0] == "\\") arg.fontFamily == "FontAwesome";
    _.defaults(arg, { animation: "popFade", bgColor: "#F00" });
    delete arg.badge;
    State.favico = new Favico(arg);
    /*
█ ❖ Run Favico command                                                                   */
    if (badge) State.favico.badge(badge);
    if (image) State.favico.image(image);
    if (video) State.favico.video(video);
    if (webcam) State.favico.webcam(webcam);
    if (video === false) State.favico.video("stop");
    if (webcam === false) State.favico.webcam("stop");
  },
};

export const Query = {
  /*
█ ❖ Get_Icon_Path() ⬥ Get the file path of an icon                                                                   */
  Get_Icon_Path(name) {
    name = String(name).replace(" ", "_");
    var path = browser.runtime.getURL(Constant.ASSET_PATH + name + ".png");
    return path;
  },
};

/*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ STATE ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                      */
export const State = {
  favicon_node: null,
  favico: null, // Save the Favico.js object
  /*
█ ❖ original_favicon ⬥ Save the tab's original favicon URL                                                                   */
  original_favicon: {
    val: null,
    // persistent: false,
    set() {
      var faviconNode = State.favicon_node;
      if (!faviconNode)
        faviconNode = document.querySelector(Constant.FAVICON_SELECTOR);
      this.val = faviconNode ? faviconNode.href : location.origin + "/favicon.ico"; // prettier-ignore
      //TODO: Menu item 'Restore Original' is disabled initially, enable it here
    },
    restore() {
      const url = this.val;
      if (url) document.getElementById(self.Con.TAG_ID).href = url;
    },
  },
};

/*
█ ❖ CONSTANTS                                                                   */

export const Constant = {
  TAG_ID: "IUP-FlagPage",
  ASSET_PATH: "/System/Windowing/-asset/Favicon/",
  FAVICON_SELECTOR: `link[rel='shortcut icon'], link[rel='icon shortcut'], link[rel='icon']`, // prettier-ignore
  FLAG_INDEX: {
    Ribbons: {
      red: "Red",
      orange: "Orange",
      yellow: "Yellow",
      green: "Green",
      blue: "Blue",
      purple: "Purple",
      gray: "Gray",
    },
    Icons: {
      star: "Star",
      checkmark: "Checkmark",
      "x-mark": "X",
      "thumbs-up": "Thumbs Up",
      "thumbs-down": "Thumbs Down",
      exclamation: "Exclamation",
    },
  },
};

/*
█ ❖ CONTEXT MENU                                                                   */
export const Context = {
  Selector: "global",
  ItemList: [
    {
      ID: "flagPage",
      Title: "Flag Page",
      Icon: "fa-flag fas",
      Submenu: [],
    },
  ],
};

/*
█ ❖ SETTINGS                                                                   */
export const Setting = {
  new_tab_unread_badge: {
    title: "New Tab Unread Badge",
    desc: "Show an unread badge on tabs that haven't been seen.",
    type: "bool",
    default: true,
  },
};
