/*
ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█        🙢  FLAG PAGE  🙠       █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ Control the icons of tabs.
▓ ❖ Action
▓   ◇ Apply_Page_Flag: Identify the page's favicon icon and replace the original node.
▓   ◇ Animate_Favicon: Animate the favicon and overlay a badge using Favico.js.
▓ ❖ Process
▓   ◇
▓ ❖ State
▓   ◇ node: The favicon node that sets the icon of a tab
▓   ◇ favico_obj: Save the Favico.js script object
▓   ◇ original_favicon: Save the tab's original favicon URL
▓   ◇ getIconPath: Get the file path of an icon
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
export var Tool = function() {
  const self = this;

  this.Meta = {
    title: "Flag Page",
    icon: "f02c",
    desc: "Flag the tab's icon with a color or symbol.",
  };

  this.Asset = {
    favico: "/Favicon/favico.min.js",
    // TODO: Favico asset type = JS library script
    // TODO: Add png images to asset list
  };

  /* TODO: This needs to go somewhere else */
  this.Trigger = {
    initialization: function() {
      self.Var.favicon_node;
      // ❖ Build context menu
      _.each(self.Con.FLAG_INDEX.Ribbons, function(index, item) {
        self.Context.items[0].submenu.push({
          id: `flagPage-${index}`,
          title: index,
          icon: self.Var.getIconPath(index) || "fas fa-tags",
          onUse(T) {
            self.Act.Apply_Page_Flag(index);
          },
        });
      });

      // ❖ Unread Tabs
      if (document.visibilityState == "hidden") {
        self.Act.Animate_Favicon({ badge: true });
        const onFocus = function(e) {
          self.Act.Animate_Favicon();
          window.removeEventListener("focus", onFocus);
        };
        window.addEventListener("focus", onFocus);
      }
    },
  };

  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ ACTIONS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.Action = {
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
      const { FLAG_INDEX, FAVICON_SELECTOR } = self.Con;
      flag = flag.toLowerCase();

      // ❖ Locate flag in index
      var flagPath = _.find(FLAG_INDEX, (item) => item[flag])[flag];
      if (!flagPath) throw new Error(`IUP:FlagPage couldn't find a flag named "${flag}".`); // prettier-ignore

      // ❖ If flag found, perform operations
      var url = self.Var.getIconPath(flagPath);
      if (self.Var.favicon_node) self.Var.favicon_node.href = url;
      else {
        self.Var.original_favicon.set();
        if (self.Var.favicon_node) self.Var.favicon_node.remove(); // remove original favicon
        document.head.insertAdjacentHTML("beforeEnd", `<link id="${self.Con.TAG_ID}" rel="icon" href="${url}">`); // prettier-ignore
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
▓   ◇ .badge   ⬥ ("str"|true) Number or character to display on favicon badge. True for blank badge.
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
      self.Var.favico = new Favico(arg);
      /*
█ ❖ Run Favico command                                                                   */
      if (badge) self.Var.favico.badge(badge);
      if (image) self.Var.favico.image(image);
      if (video) self.Var.favico.video(video);
      if (webcam) self.Var.favico.webcam(webcam);
      if (video === false) self.Var.favico.video("stop");
      if (webcam === false) self.Var.favico.webcam("stop");
    },
  }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                      */
  this.Var = {
    favicon_node: null,
    favico: null, // Save the Favico.js object
    /*
█ ❖ original_favicon ⬥ Save the tab's original favicon URL                                                                   */
    original_favicon: {
      val: null,
      // persistent: false,
      set() {
        var faviconNode = self.Var.favicon_node;
        if (!faviconNode)
          faviconNode = document.querySelector(self.Con.FAVICON_SELECTOR);
        this.val = faviconNode ? faviconNode.href : location.origin + "/favicon.ico"; // prettier-ignore
        //TODO: Menu item 'Restore Original' is disabled initially, enable it here
      },
      restore() {
        const url = this.val;
        if (url) document.getElementById(self.Con.TAG_ID).href = url;
      },
    },
    /*
█ ❖ getIconPath() ⬥ Get the file path of an icon                                                                   */
    getIconPath(name) {
      name = String(name).replace(" ", "_");
      var path = FileLib.cmd.getURL(self.Con.ASSET_PATH + name + ".png");
      return path;
    },
  }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ CONSTANTS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█              */
  this.Constant = {
    TAG_ID: "IUP-FlagPage",
    ASSET_PATH: "/System/Windowing/asset/FlagPage/",
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
  this.Context = {
    Selector: "global",
    ItemList: [
      {
        id: "flagPage",
        title: "Flag Page",
        submenu: [],
      },
    ],
  };

  /*
█ ❖ SETTINGS                                                                   */
  this.Setting = {
    new_tab_unread_badge: {
      title: "New Tab Unread Badge",
      desc: "Show an unread badge on tabs that haven't been seen.",
      type: "bool",
      default: true,
    },
  };
};
