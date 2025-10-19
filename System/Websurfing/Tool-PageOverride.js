/*
Override a webpage blocking user input or obscuring content.
	§ User Input
		▫ Text selection
		▫ Mouse input
		▫ Copy & paste
	§ Obscured Content
		▫ Blur filter
		▫ Hidden overflow
*/
export var App = function() {
  const self = this;

  this.Meta = {
    title: "Page Override",
    icon: "",
    desc: "Override a webpage blocking input or obscuring content.",
  };

  this.Constant = {
    EVENT_LIST: {
      MOUSE: ["contextmenu", "mousedown", "mouseup", "dragstart"],
      CLIPBOARD: ["copy", "cut", "paste"],
      get ALL() { return this.MOUSE.concat(this.CLIPBOARD); } // prettier-ignore
    },
  };

  this.Action = {
    /*
▓█═─────══─────═🙦   Selection_Override()   🙤═─────══─────═❖
▓ Override CSS that disables user text selection.                                                                    */
    Selection_Override: function(DOC = document) {
      var code = `<style>\n* {\n\tuser-select: text !important;\n}\n</style>`;
      DOC.iuDOM.head.insertAdjacentHTML("beforeEnd", code);
    },
    /*
▓█═─────══─────═🙦   Event_Override()   🙤═─────══─────═❖
▓ Override events the webpage has taken control of.                                                                    */
    Event_Override: function(eventList) {
      (function(w) {
        for (var i = 0, x; (x = eventList[i]); i++) {
          if (w["on" + x]) w["on" + x] = null; // overwrite window.on{event}
          w.addEventListener(x, (e) => e.stopPropagation(), true);
        }
        for (var j = 0, f; (f = w.frames[j]); j++) {
          try {
            arguments.callee(f);
          } catch (e) {}
        }
      })(window);
    },
    //Source: https://stackoverflow.com/questions/2961964/how-to-re-enable-the-context-menu-in-this-case
  };
};

/*



ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█       🙢  FORCE INPUT  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓                                                                                 */
var App2 = function() {
  const self = this;
  this.title = "X Force Input";
  this.sect = "content";
  this.icon = ""; //"fas fa-mouse-pointer";
  this.desc = "";
  this.preview = true;
  this.onUse = function() {
    self.cmd.Activate_All();
    UILib.cmd.UI_Notification({
      message: "Force input activated.",
      icon: "",
      type: "modal",
    });
  };
  this.cmd = {
    /*
█
▓█═─────══─────═🙦   Activate_All()   🙤═─────══─────═❖
▓ Activate all Force Input methods at once.                                                                   */
    Activate_All: function(DOC = document) {
      const allEvents = [
        "contextmenu",
        "mousedown",
        "mouseup",
        "dragstart",
        "copy",
        "cut",
        "paste",
      ];
      self.cmd.Enable_Text_Selection(DOC);
      self.cmd.Overwrite_Events(allEvents);
    },
    /*
█
▓█═─────══─────═🙦   Enable_Text_Selection()   🙤═─────══─────═❖
▓ Override CSS that disables user text.                                                                    */
    Enable_Text_Selection: function(DOC = document) {
      var code = `<style>\n* {\n\tuser-select: text !important;\n}\n</style>`;
      DOC.iuDOM.head.insertAdjacentHTML("beforeEnd", code);
    },
    /*
█
▓█═─────══─────═🙦   Overwrite_Events()   🙤═─────══─────═❖
▓ Override events the page has taken control of.                                                                    */
    Overwrite_Events: function(eventList) {
      //Source: https://stackoverflow.com/questions/2961964/how-to-re-enable-the-context-menu-in-this-case
      (function(w) {
        for (var i = 0, x; (x = eventList[i]); i++) {
          if (w["on" + x]) w["on" + x] = null; // overwrite window.on{event}
          w.addEventListener(x, (e) => e.stopPropagation(), true);
        }
        for (var j = 0, f; (f = w.frames[j]); j++) {
          try {
            arguments.callee(f);
          } catch (e) {}
        }
      })(window);
    },
  };
  /*
█ ❖ SUBMENU                                                                   */
  this.submenu = [
    {
      id: "textSelection",
      title: "Text Selection",
      desc: "Force-enable text selection.",
      onUse(T) {
        self.cmd.Enable_Text_Selection();
      },
    },
    {
      id: "mouseEvents",
      title: "Mouse Events",
      desc: "Force-enable mouse clicking, right-clicking, and dragging.",
      onUse(T) {
        self.cmd.Overwrite_Events([
          "contextmenu",
          "mousedown",
          "mouseup",
          "dragstart",
        ]);
      },
    },
    {
      id: "copyPaste",
      title: "Copy/Paste",
      desc: "Force-enable copying, cutting, and pasting.",
      onUse(T) {
        self.cmd.Overwrite_Events(["copy", "cut", "paste"]);
      },
    },
  ];
  /*
█ ❖ CONTEXT MENU                                                                   */
  this.context = {
    Selector: "global",
    ItemList: [
      {
        id: "forceInput",
        title: "Force all input",
        onUse(T) {
          self.cmd.Activate_All();
        },
      },
    ],
  };
  /*
█ ❖ META                                                                   */
  this.meta = {
    info: {
      howItWorks:
        "Force Input uses a couple different techniques. Text selection is forced by overriding the page's stylesheets, the other methods intercept input events before they're picked up by the page.",
    },
  };
};
/*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯
*/
