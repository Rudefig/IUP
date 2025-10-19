/*                        _‗______🙖⟆∽🎕∼⟅🙐________‗_
ⸯ‗‗‗‗‗༼╯̿ ̿ ̿ ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾̿ ╰༽‗‗‗‗‗‗
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Iɴᴛᴇʀɴᴇᴛ Uᴛɪʟɪᴛɪᴇꜱ Pʟᴀᴛɪɴᴜᴍ ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓⸾░          ̿ ̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿ ̿ ⸯ            ⸯ▓
▓⸾░
▓⸾░                              UTILITIES.JS
▓⸾░
▓██⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓⸾░﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓⸾░  ❖ DESCRIPTION ❖
▓⸾░   ◇ Index of utility modules that perform a utility. Most data is stored
▓⸾░     here, but lengthier data is stored in external files. (see /utility/)
▓⸾░
▓══─────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══─────────────══▓
 ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊⏜⏝⏜⏝⏜⏝⏜﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊    */

var UtilityData = {
  /*


ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  ACTION BARS  🙠       █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ TODO:
▓   ◇ Animation: Flip upwards with perspective.
▓   ◇ Add mouseover buffer around bar to prevent accidental mouseout
▓     ⬥ 10px around bar, and 3px at the top of page extending wider than bar
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
  ActionBars: [
    function() {
      const self = this;
      this.title = "Action Bars";
      this.sect = "executive";
      this.icon = "";
      this.module = "ActionBars.js";
      this.desc = "Custom toolbars to run actions and display information";
      /*
█ ❖ onInstall()                                                                   */
      this.onInstall = function() {
        self.settings.userBars.default();
        self.cmd.Init_Action_Bars();
      };
      /*
█ ❖ onInit()                                                                   */
      this.onInit = function() {
        self.cmd.Init_Action_Bars();
      };
      /*
█ ❖ CONSTANTS                                                                   */
      this.con = {
        //TODO: Figure out how to pass functions from data file to constructor
        defaultBarsTemp: {
          fullScreenNav: {
            title: "Full Screen Navigation",
            desc: "Navigate history and tabs while in full screen.",
            toggleOnFullScreen: true,
            scope: "global",
            disabled: () => !history.length,
            buttons: [
              {
                id: "back",
                desc: "Go back",
                icon: "",
                disabled: () => !(window.history.length - 1),
                onUse: () => window.history.back,
                onHold: () => WindowLib.cmd.Navigate_History("first"),
              },
              {
                id: "forward",
                desc: "Go forward",
                icon: "",
                disabled: () => !(window.history.length - 1),
                onUse: () => window.history.forward,
                // onHold: () => WindowLib.cmd.Navigate_History("first")
              },
              {
                id: "refresh",
                desc: "Reload page",
                icon: "",
                onUse: () => window.location.reload,
                onHoldEnd: () => window.location.reload(true),
              },
              {
                id: "home",
                desc: "Back to index",
                icon: "",
                disabled: true,
                // onUse: () => window.location.reload,
                // onContext: function(btn) {}
              },
              {
                id: "prevTab",
                desc: "Previous Tab\n(Ctrl+Shift+Tab/Ctrl+PgUp)",
                icon: "",
                onUse() {
                  chrome.runtime.sendMessage({ setActiveTab: "prev" });
                },
              },
              {
                id: "nextTab",
                desc: "Next Tab\n(Ctrl+Tab/Ctrl+PgDn)",
                icon: "",
                onUse() {
                  chrome.runtime.sendMessage({ setActiveTab: "next" });
                },
              },
            ],
          },
        },
      };
      /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                      */
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   Build_Action_Bar()   🙤═─────══─────═❖
▓ Build a new action bar using the constructor.                                                                     */
        Build_Action_Bar: function(arg, id) {
          return new ActionBar(arg, id);
          self.var.tempBarData[id] = buttons;
        },
        /*
█
▓█═─────══─────═🙦   Init_Action_Bars()   🙤═─────══─────═❖
▓ Build user's action bars and store in temp variable.                                                                 */
        Init_Action_Bars: function() {
          // const barData = self.settings.userBars.val;
          const barData = self.con.defaultBars; // TEMP
          for (var B in barData) {
            let arg = barData[B];
            // scope = new Scope(arg.scope);
            //TODO Fix scope
            //if (!arg.enabled || !scope.match(window.location.href)) continue;

            // ❖ Construct bar 🙵 add to temp data
            let bar = self.var.temp_bars.add(B, arg);
            // ❖ Init full screen enabled bars
            if (bar.settings.toggleOnFullScreen) {
              if (window.screen.height == window.innerHeight) {
                self.cmd.Show_Action_Bar(B);
              }
              window.addEventListener("f11change", function() {
                if (window.f11) self.cmd.Show_Action_Bar(B);
                else self.cmd.Hide_Action_Bar();
              });
              break;
            }
          }
        },
        /*
█
▓█═─────══─────═🙦   Show_Action_Bar()   🙤═─────══─────═❖
▓ (string) ⮚ Show bar from temp data with ID {bar}.
▓ (object) ⮚ Show bar from raw bar data {bar}.                                                                */
        Show_Action_Bar: function(bar) {
          const B = typeof bar == "object" ? bar : self.var.temp_bars.val[bar],
            disabled = typeof B.disabled === "function" ? !B.disabled() : false;
          if (B && !disabled) B.inject();
          else {
            throw new Error(`IUP:Show_Action_Bar couldn't find action bar "${name}".`); // prettier-ignore
          }
        },
        /*
█
▓█═─────══─────═🙦   Hide_Action_Bar()   🙤═─────══─────═❖
▓ Hide the active action bar.                                                              */
        Hide_Action_Bar: function() {
          const B = self.var.active_bar;
          if (B) return B.deact();
        },
        /*
█
▓█═─────══─────═🙦   buildPanel()   🙤═─────══─────═❖
▓ Build the action bar manager panel.                                                              */
        buildPanel: function(Panel) {
          const panelData = self.settings.userBars.val,
            columns = {
              checkbox,
              name: { title: "name" },
              scope: { title: "scope", width: "80px" },
              count: { title: "# btn", width: "50px" },
            };
          /*
█ ❖ Generate Table Data                                                                   */
          var tableData = [];
          for (var ID in panelData) {
            let { title, scope, buttons } = panelData[ID];
            tableData.push({
              checkbox: "checkbox",
              name: title,
              scope: scope,
              count: buttons.length,
            });
          }
          var table = LayoutLib.cmd.Generate_Table({
            data: tableData,
            columns: columns,
          });
          /*
█ ❖ Build Panel                                                                   */
          Panel.node.content.appendChild(table.node);
          //
          //TODO:
          // - Show table of user's action bars ordered by scope
          //    - name, desc, scope
        },
      };
      /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
      this.var = {
        temp_bars: {
          val: {},
          add: function(id, arg) {
            this.val[id] = new ActionBar(arg, id);
            return this.val[id];
          },
        },
        active_bar: null,
        get bar_is_shown() {
          return Boolean(this.active_bar);
        },
      };
      /*
█ ❖ SUBMENU                                                                   */
      // this.submenu = [
      //   //TODO Let user select a action bar to display matching scope.
      // ];
      /*
█ ❖ SETTINGS                                                                   */
      this.settings = {
        userBars: {
          isPrivate: true,
          val: null,
          default: function() {
            this.val = self.con.defaultBars;
            return this.val;
          },
        },
      };
      /*
█ ❖ PANEL                                                                   */
      this.panel = {
        id: "manager",
        title: "Action Bar Manager",
        tabName: "Manage",
        footer: `<a class="btn" id="btn-newMenu">NEW BAR</a>`,
        onLoad: self.cmd.buildPanel,
      };

      /*



▓‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅     ∽ ActionBar() ∼     ⟆▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ DESC: Construct for action bars.
▓ ❖ PROPERTIES:
▓   ◇ .id = arg.id | randomly generated ID
▓   ◇ .buttons
▓   ◇ .settings = {
▓     ⬥ .enabled = (bool) Inject() script won't work if bar is disabled.
▓     ⬥ .title = (str) Name of the bar in the panel.
▓     ⬥ .desc = (str) Description of the bar in the panel.
▓     ⬥ .side = ("top|left|bottom|right|center") Which side of the screen to show on.
▓     ⬥ .btnSize = (int)
▓     ⬥ .iconSize = (int)
▓     ⬥ .scope = (scope): Only show bar within scope.
▓     ⬥ .animationSpeed = (time)
▓     ⬥ .toggleOnFullScreen = (bool)
▓     ⬥ TODO...
▓   ◇ .node = {
▓     ⬥ .shadow = The outer wrapper inserted into <body> with the shadow dom attached.
▓     ⬥ .innerWrap = The styled inner wrapper inside the shadow DOM.
▓ ❖ METHODS:
▓   ◇ .inject() = Show the bar, inserting it into the DOM.
▓   ◇ .refreshCSS() = Refresh all the customizable CSS, if any were changed. Called on init.
▓   ◇ .deact() = Hide the bar, erasing it from the DOM.
▓ ❖ TODO:
▓   ◇ SCOPE: Test current url with self.settings.scope
▓   ◇ DROPMENU:
▓     ⬥ Hide on this page
▓     ⬥ Move side (start with top/right/bottom/left)
▓                                                                                 */
      function ActionBar(arg = {}, id) {
        const self2 = this,
          PRE = "iuAB";

        _.defaults(arg, {
          id: id || _.uniqueId(PRE),
          enabled: true,
          title: "",
          desc: "No description",
          skin: "default",
          side: "top",
          distance: 0,
          btnSize: 50,
          iconSize: 13,
          scope: new Scope(arg.scope || "global"),
          animationSpeed: "var(--iup-trans-fast)",
          toggleOnFullScreen: false,
          onInject: false,
          onEject: false,
          // BEHAVIOR ON MOUSEOUT:
          // - peek bottom of screen
          // - hide bottom of screen
          // - fade to partial transparency
          // - fade to partial, full after 5 seconds
        });

        this.id = arg.id;
        this.selector = () => `${PRE}-${self.id}`;
        this.node = {};
        this.settings = arg;
        this.buttons = arg.buttons;

        /*
█
▓█═─────══─────═🙦   .inject()   🙤═─────══─────═❖
▓ Display the action bar, injecting it into the DOM.                                                                            */
        this.inject = function() {
          if (!self2.settings.enabled) return false;
          self.var.active_bar = this;

          /*
█ ❖ BUILD SHADOW DOM                                                                   */
          const ID = self2.id,
            script = { file: "ActionBars.css" },
            html = self.con.shadowHTML;
          self2.node = LayoutLib.cmd.buildShadowDOM({ ID, PRE, script, html });
          self2.node.body.classList.add("-skin-" + self2.settings.skin);
          self2.node.box.innerHTML = "";
          self2.refreshCSS();

          // Short delay until user can interact
          setTimeout(function() {
            self2.node.body.classList.add("-is-shown");
            _.defer(() => {
              if (self2.settings.toggleOnFullScreen) self2.node.box.classList.add("show-hover"); // prettier-ignore
            });
          }, 300);

          /*
█ ❖ GENERATE BUTTONS                                                                   */
          // const barData = self.var.temp_bars.btnData[self2.id];
          //TODO get rid of this workaround:
          const barData = self.con.defaultBarsTemp[self2.id];
          UILib.cmd.buildMenu(barData.buttons, self2.node.box);
          insertDivider = N => N.insertAdjacentHTML("afterEnd", `<div class="divider"></div>`); // prettier-ignore
          self2.node.box.querySelectorAll(".menu-item").forEach(insertDivider);
          //           barData.buttons.forEach((B, I) => {
          //             const { id, title, icon, onUse, onUseCtrl, onUseShift } = B,
          //               btnData = B,
          //               disabled = btnData.disabled ? btnData.disabled() : null,
          //               classes = B.disabled || disabled ? ` class="disabled"` : "",
          //               btnHTML = `
          // <div id="${id}" title="${title}"${classes}>
          //   <i class="${icon}" aria-hidden="true"></i>
          // </div>
          // <div class="divider"></div>`;
          //             self2.node.box.insertAdjacentHTML("beforeEnd", btnHTML);
          //             var btn = self2.node.dom.getElementById(id);
          //             btn.onclick = function(e) {
          //               if (e.ctrlKey && onUseCtrl) onUseCtrl();
          //               else if (e.shiftKey && onUseShift) onUseShift();
          //               else onUse(e);
          //             };
          //           });

          /*
█ ❖ Activate action                                                                   */
          if (self2.settings.onInject) self2.settings.onInject();
        };
        /*
█
▓█═─────══─────═🙦   .refreshCSS()   🙤═─────══─────═❖
▓ Refresh all the customizable CSS, if any were changed. Called on init.                                                                            */
        this.refreshCSS = function() {
          const { btnSize, iconSize, animationSpeed, side, distance } = self2.settings, // prettier-ignore
            axis =
              side == "left" || side == "right"
                ? "width: 1px; height: 36vh; margin: 32vh auto;"
                : "width: 36vw; height: 1px; margin: auto 32vw;";
          self2.node.style.innerHTML = `
#body {
  --ab-btnSize: ${btnSize}px;
  --ab-iconSize: ${iconSize}px;
  ${side}: 0;
  ${axis}
}
.wrap-box {
  ${side}: 6px;
}`;
        };

        /*
█
▓█═─────══─────═🙦   .deact()   🙤═─────══─────═❖
▓ Hide the action bar, erasing it from the DOM.                                                                            */
        this.deact = function() {
          var { host, wrap } = self2.node.host;
          if (!host || !wrap || !self.var.bar_is_shown) return false;

          if (self2.settings.onEject) self2.settings.onEject();

          // finish animation
          wrap.classList.add("removing"); // trigger animation
          setTimeout(function() {
            host.remove();
            self.var.active_bar = null;
          }, self.var.active_bar.animationSpeed || 10);
        };
      } //▊END ActionBar()▊
    },
  ],

  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──       ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯










ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  CONTEXT MENU  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ UI STRUCTURE ❖
▓   ◇ SELECTOR BOX: At the top of each menu. Contains the menu's selector.
▓     ⬥ Keyword:       Display name for selector w/ icon. (ex: "global", "link", "image")
▓     ⬥ Full Selector: Selector generated by ElementLib.var.get_selector().
▓   ◇ MENU:         The context menu's body, containing menu items.
▓
▓ ❖ NOTE ❖
▓   ◇ SPECIAL CONTEXTS:
▓     ⬥ GLOBAL:     Target is the page.
▓     ⬥ SELECTION:  Target is selected text.
▓     ⬥ OTHER:      Target is the given selector.
▓   ◇ Mouse Event Button Codes: LMB = 0, MMB = 1, RMB = 2
▓
▓ ❖ TODO ❖
▓   ◇ Finish making DropMenu constructor and use as a base for context menu
▓   ◇ Integrate native context menu: https://developer.chrome.com/extensions/contextMenus
▓   ◇ Context_Menu_Editor(): Create custom context menus.
▓   ◇ Move genMenu & genMenuItem to their own self.cmd method
▓   ◇ Multi-Context Menu:
▓     ⬥ Show one normal context menu and other contexts collapsed
▓     ⬥ User can add their own context selectors
▓     ⬥ Click + on the top most selector bar to add a new selector
▓     ⬥ Right click for preset menu with ancestor tree, history, and more
▓  */
  ContextMenus: [
    function() {
      const self = this;
      this.title = "Context Menus";
      this.sect = "executive";
      this.icon = "f039";
      this.desc = "Supplement or replace the browser's context menu";
      this.onInit = function() {
        self.cmd.Init_Context_Menu();
      };
      this.con = {
        PRE: "iuCM",
        ITEM_PADDING: 20,
        ITEM_SCREEN_MARGIN: 195,
      };
      /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                                  */
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   buildPanel()   🙤═─────══─────═❖
▓ Panel listing all the registered context menus.                                                                     */
        buildPanel: function(Panel) {
          const panelData = window.IUP.MM.data.context,
            columns = {
              checkbox: true,
              name: "name",
              items: ["# items", 50],
            };

          // ❖ Build Table Data
          var tableData = [];
          panelData.forEach((M) => {
            var title = window.IUP.U[M.id].title,
              count = M.items.length;
            tableData.push({
              checkbox: "checkbox",
              name: title,
              count: count,
            });
          });

          // ❖ Build Table
          var table = LayoutLib.cmd.Generate_Table({
            data: tableData,
            columns: columns,
          });

          // ❖ Build Panel
          Panel.node.content.appendChild(table.node);
          self.var.panel = Panel;
        },
        /*
█
▓█═─────══─────═🙦   Init_Context_Menu()   🙤═─────══─────═❖
▓ Inject event listeners.                                                                     */
        Init_Context_Menu: function() {
          self.var.TargetLine = UILib.cmd.UI_TargetLine("ContextMenus");
          //TODO: Setting for activation method
          const method = "ctrl"; //self.settings.activationMethod.val;
          // ExecutiveLib.cmd.sendBackgroundMessage({ contextMenu: true });
          document.addEventListener("contextmenu", contextmenuEvent);
          document.addEventListener("click", clickEvent);
          if (method == "hold") {
            document.addEventListener("mousedown", mousedownEvent);
            document.addEventListener("mouseup", mouseupEvent);
          }
          /*
█ ❖ CONTEXTMENU ⬥ Open the context menu.                                                                   */
          function contextmenuEvent(e) {
            // TODO: Indicator or something if user clicks RMB and nothing happens
            // TODO: If user right-clicks context menu, don't close it
            const ctrlMethod = method == "ctrl" && e.ctrlKey,
              altMethod = method == "alt" && e.altKey;
            if (method == "hold") {
              if (!self.var.mouseTimeout && self.var.context_menu_open) {
                e.preventDefault();
                return;
              }
            } else if (ctrlMethod || altMethod) {
              e.preventDefault();
              self.cmd.Open_Context_Menu(e);
            } else if (self.var.context_menu_open) {
              self.cmd.Close_Context_Menu();
            }
          } /*
█ ❖ CLICK ⬥ If user clicks outside context menu, close it.                     */
          function clickEvent(e) {
            const menuIsOpen = self.var.context_menu_open,
              menu = self.var.node.host;
            if (menuIsOpen && !e.target.isEqualNode(menu)) {
              self.cmd.Close_Context_Menu();
            }
          }
          /*
█ ❖ MOUSEDOWN 🙵 MOUSEUP ⬥ Open when user holds mouse button, cancel if released before timeout expires.                                                                   */
          function mousedownEvent(e) {
            if (e.button == 2) {
              self.var.mouseTimeout = setTimeout(() => {
                self.cmd.Open_Context_Menu(e);
              }, 1000);
            }
          }
          function mouseupEvent(e) {
            window.clearTimeout(self.var.mouseTimeout);
            self.var.mouseTimeout = null;
          }
        },

        /*
█
▓█═─────══─────═🙦   Open_Context_Menu()   🙤═─────══─────═❖
▓ Open the context menu; extract data, determine context 🙵 show matching menu items.                                                                     */
        Open_Context_Menu: function(e = {}) {
          // ❖ Variables
          self.var.context_menu_open = true;
          const menuRegistry = window.IUP.MM.data.context;
          var ContextList = makeList("target"),
            target = e.target || e || "global",
            keyword = target.tagName ? target.tagName.toLowerCase() : "global"; // prettier-ignore

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
          menuRegistry.forEach(parseMenus);
          // __B(menuRegistry, ContextList);
          var firstContext = Object.keys(ContextList)[0];
          if (!ContextList[firstContext].length) {
            ContextList = makeList("global");
            target = "global";
            menuRegistry.forEach(parseMenus); // call parseMenus() on each menu (with global context)
            if (!ContextList[Object.keys(ContextList)[0]].length) throw new Error("IUP:Open_Context_Menu couldn't open because no menus were found."); // prettier-ignore
          }

          /*
█ ❖ BUILD MENUS
▓ Attach shadow DOM, insert code, generate context menus.                                                                   */
          const { PRE, ITEM_PADDING, ITEM_SCREEN_MARGIN } = self.con,
            script = { file: "ContextMenu.css" },
            html = `<div class="iuCM__container wrap-box -shadow"></div>`,
            scrollHeight = LayoutLib.var.get_page_height();
          self.cmd.Close_Context_Menu(false);
          self.var.node = LayoutLib.cmd.buildShadowDOM({ PRE, script, html });
          var { host, dom, head, body, box } = self.var.node;
          box.addEventListener("use", (e) => self.cmd.Close_Context_Menu());

          for (var ID in ContextList) {
            self.cmd.buildContextMenu(ContextList[ID], target, keyword);
          }

          /*
█ ❖ FINALIZE APPEARANCE                                                                  */
          _.defer(function() {
            if (e.pageX) self.var.coords = [e.pageX - 4, e.pageY - 24];
            var coords = self.var.coords;

            // ❖ If menu overflows screen, reposition it.
            const rightEdgePos = coords[0] + ITEM_SCREEN_MARGIN,
              bodyWidth = document.body.clientWidth;
            if (rightEdgePos > bodyWidth) {
              coords[0] -= rightEdgePos - bodyWidth;
              box.classList.add("-overflow-x");
            }

            // ❖ Set Position
            // coords[0] -= 4;
            // coords[1] -= 24;
            box.style.left = coords[0] + "px";
            box.style.top = coords[1] + "px";
            const getMaxWidth = _.max(box.querySelectorAll(".item-title"), N => N.clientWidth); // prettier-ignore
            __G(getMaxWidth, box.querySelectorAll(".item-title"));
            if (getMaxWidth.clientWidth) {
              const maxWidth = getMaxWidth.clientWidth + ITEM_PADDING + "px";
              body.iuCSS("--svg-width", maxWidth);
            }

            // ❖ Trigger open animation
            _.defer(() => box.classList.add("-is-shown"));
          });

          // ❖ Show target lines
          // if (target.constructor.name.endsWith("Element"))
          //   self.var.TargetLine.createTargetLine(target);
          /*
█ ❖ parseMenus()
▓ Parse a single menu {M}'s data.                                                                */
          function parseMenus(M) {
            if (!M || !M.selector || !M.items) return false;
            // TODO: Generate native Chrome context menu
            /*if (M.type == "native") {
              // "all", "page", "frame", "selection", "link", "editable", "image", "video", "audio", "launcher", "browser_action", or "page_action"
            }*/
            // ❖ Loop through each context and collect matching menus.
            var matchedElements = document.querySelectorAll(M.selector);
            for (var ID in ContextList) {
              let contextMatches = false;
              // ❖ Special keywords: "global" 🙵 "selection"
              if (["global", "selection"].includes(ID)) {
                let regex = new RegExp("(^|\\s|,)" + ID + "($|\\s|,)");
                contextMatches = M.selector.search(regex) + 1; // see if menu selector contains special keywords
              } else {
                // ❖ See if menu's selector matches context target
                for (let i = 0; i < matchedElements.length; i++) {
                  if (matchedElements[i] == target) {
                    contextMatches = true;
                    i = matchedElements.length;
                  }
                }
                var checkParent = target.parentElement;
                while (checkParent && checkParent !== document.body) {
                  if (checkParent.matches(M.parentSelector)) {
                    contextMatches = true;
                    break;
                  }
                  checkParent = checkParent.parentElement;
                }
              }
              // ❖ If menu matches context, add to context's list
              if (contextMatches) ContextList[ID].push(M);
            }
          }
          /*
█ ❖ makeList()
▓ Make a template obj for context lists & their menu items.                                                                   */
          function makeList(context) {
            return { [context]: [] };
          }
        },
        /*
█
▓█═─────══─────═🙦   Close_Context_Menu()   🙤═─────══─────═❖
▓ Close the context menu. Destroy it with {destroy}, or just clear it for a new context.                                                                     */
        Close_Context_Menu: function(destroy = true) {
          if (!self.var.node.host) return;
          self.var.TargetLine.eject();
          if (destroy) {
            self.var.node.destroy();
            self.var.context_menu_open = false;
            self.var.coords = null;
          } else {
            self.var.node.box.innerHTML = "";
          }
        },

        /*
█
▓█═─────══─────═🙦   buildContextMenu()   🙤═─────══─────═❖
▓ Build a context menu from {contextData} targeting {target} with context keyword {key}.                                                                     */
        buildContextMenu: function(contextData, target, key) {
          const box = self.var.node.box,
            KeywordIndex = {
              Global: ["global"],
              Selection: ["selection"],
              Link: ["a"],
              Image: ["img"],
              Video: ["video"],
              Audio: ["audio"],
              Input: ["input", "textarea"],
            };
          // console.dir(self.var.node.box);
          // console.dir(box);
          key = _.findKey(KeywordIndex, (K) => K.includes(key)) || "global";
          var icon = FileLib.cmd.getURL(`/utility/ContextMenus/${key}.svg`);
          icon = `<img class="iuCM__targ-icon" src="${icon}">`;

          // ❖ Insert selector box
          const selector = ElementLib.var.get_selector(target) || "";
          if (typeof key == "string") key = s.capitalize(key);
          else key = selector;
          const html = `
<div class="iuCM__targ">
  <div class="iuCM__targ-name">${icon}${key}</div>
  <div class="iuCM__targ-options">${selector}<span class="item-icon">  </span></div>
</div>
<div class="iuCM__items"></div>`;
          box.insertAdjacentHTML("beforeEnd", html);
          const __items = box.querySelector(".iuCM__items");
          // Click selector box to switch to global context
          box.querySelector(".iuCM__targ").onclick = function(e) {
            self.cmd.Close_Context_Menu(false);
            self.cmd.Open_Context_Menu();
          };

          // ❖ Generate Menu Items
          contextData.forEach((data) => {
            const menu = UILib.cmd.buildMenu(data, __items, null, target);
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
      }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                      */
      this.var = {
        node: {},
        TargetLine: null,
        context_menu_open: false,
        mouseTimeout: null,
        genContextSettings(data) {
          var settings = { name: "Context Menu", enabled: true, groups: data };
          return settings;
        },
      };
      /*
█ ❖ SETTINGS                                                                   */
      this.settings = {
        activationMethod: {
          title: "Menu Activation Method",
          desc: "How to activate the menu.",
          type: "list",
          component: "dropdown",
          choices: {
            ctrl: { title: "Ctrl-Click" },
            alt: { title: "Alt-Click" },
            hold: { title: "Hold 1 second" },
          },
          default: "ctrl",
        },
        showTargetLine: {
          title: "Show Target Lines",
          desc: "Indicate what the context menu is targeting.",
          type: "bool",
          default: true,
        },
      };
      /*
█ ❖ PANEL                                                                   */
      this.panel = {
        id: "manager",
        title: "Context Menu Manager",
        tabName: "Manage",
        footer: `<a class="btn" id="btn-newMenu">NEW MENU</a>`,
        onLoad: self.cmd.buildPanel,
      };
      /*
█ ❖ META                                                                   */
      this.meta = {
        info: {
          howItWorks:
            "Utilities register their individual menus with Context Menus. When the context menu activates, the registry is searched for matching contexts and any menus found are displayed.",
        },
      };
    },
  ],
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──       █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯







ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█   🙢  LAYOUT LIB SERVICE  🙠   █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓*/
  LayoutLibService: [
    function() {
      const self = this;
      this.title = "Layout Library Service";
      this.sect = "executive";
      this.hidden = true;
      this.icon = "";
      this.desc = "Scripts for managing the layout & appearance of the page.";
      this.onInit = function() {
        LayoutLib.cmd.trackFullScreen();
        LayoutLib.cmd.trackDocumentResize();
        LayoutLib.cmd.slimScrollbars();
      };
      // this.context = [
      //   {
      //     selector: "global",
      //     items: [
      //       {
      //         id: "test-notification",
      //         title: "Test Notification",
      //         icon: "",
      //         onUse: function(T) {
      //           UILib.cmd.UI_Notification({ message: "TEST" });
      //         }
      //       }
      //     ]
      //   }
      // ];
    },
  ],
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                      ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯













ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█     🙢  PREVENT SLEEP  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓ */
  PreventSleep: [
    function() {
      const self = this;
      this.title = "Prevent Sleep";
      this.sect = "content";
      this.icon = "f0f4"; //"fas fa-coffee";
      this.desc = "Prevent your computer from sleeping.";
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   Prevent_Sleep_Panel   🙤═─────══─────═❖
▓ Open panel with config settings.                                                                             */
        buildPanel: function(Panel) {
          const nodes = {
            sleepLevel: {
              type: "list",
              component: "radio",
              val: "System",
              // label: "Sleep Level",
              choices: ["System", "Display"],
            },
            timerExpires: { type: "spinner", label: "Timer:" },
            windowClosed: {
              type: "bool",
              component: "checkbox",
              label: "Window Closed",
            },
            browserClosed: {
              type: "bool",
              component: "checkbox",
              label: "Browser Closed",
            },
            downloadsFinished: {
              type: "bool",
              component: "checkbox",
              label: "Downloads Finished",
            },
            submit: {
              type: "button",
              label: "Submit",
              onUse: function() {
                self.cmd.Prevent_Sleep;
              },
            },
          };

          for (var ID in nodes) {
            Panel.node.content.append(buildInput(nodes[ID], ID));
          }

          // Panel.node.content.innerHTML = panelContent;
        },
        /*
█
▓█═─────══─────═🙦   Prevent_Sleep   🙤═─────══─────═❖
▓ Prevent or allow the system or display from sleeping.                                                                     */
        Prevent_Sleep: function(action, timer = 0) {
          action = action.toLowerCase();
          if (["system", "display"].includes(action)) {
            self.var.sleep_is_prevented.val = true;
            if (timer) self.var.time_left.val = timer;
          } else if (action === false || action == "allow") {
            self.var.sleep_is_prevented.val = false;
            self.var.time_left.val = false;
          } else return;
          chrome.runtime.sendMessage({ preventSleep: action });
        },
      };
      this.var = {
        sleep_is_prevented: {
          val: false,
        },
        time_left: {
          val: false,
        },
      };
      /*
█ ❖ PANEL                                                                   */
      this.panel = {
        id: "panel",
        title: "Prevent Sleep Panel",
        tabName: "Panel",
        size: "sm",
        onLoad: self.cmd.buildPanel,
      };
      /*
█ ❖ META                                                                   */
      this.meta = {
        info: {
          howItWorks: "Utilizes Chrome's Power API to request control over your computer's power management.",
        },
      };
    },
  ],
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯







ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  AUTO SCROLL  🙠       █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ *MACRO
▓ ❖ TODO:
▓   ◇ Progress bar on notification for {end_timeout}.
▓   ◇ Give the user 5 seconds to restart scroll if stopped.
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
  AutoScroll: [
    function() {
      const self = this;
      this.title = "M Auto Scroll";
      this.sect = "content";
      this.icon = "";
      this.desc = "Keep scrolling down for lazy load content.";
      this.con = {
        SCROLL_TIMEOUT: 2000,
        FINISHED_TIMEOUT: 10000,
        ON_USER_SCROLL: (e) => {
          if (!self.var.is_scrolling) return;
          self.var.scroll_tick--;
          if (self.var.scroll_tick == 0) {
            self.cmd.Pause_Scrolling();
          }
        },
      };
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   Inject_Scrolling   🙤═─────══─────═❖
▓                                                                           */
        Inject_Scrolling: function() {
          const FREQUENCY = self.settings.frequency.val,
            { ON_USER_SCROLL, SCROLL_TIMEOUT, FINISHED_TIMEOUT } = self.con;

          self.cmd.Reset_Auto_Scroll(); // reset everything
          self.var.is_scrolling = true;

          // ❖ Set scrolling interval
          self.var.scroll_interval = window.setInterval(scrollPage, FREQUENCY);
          function scrollPage() {
            const pageHeight = document.documentElement.scrollHeight;
            if (pageHeight == self.var.last_height && self.var.is_scrolling) {
              self.var.finished_timeout = window.setTimeout(self.cmd.Pause_Scrolling, FINISHED_TIMEOUT); // prettier-ignore
            }
            window.scrollTo(0, pageHeight);
            self.var.last_height = pageHeight;
          }

          // ❖ Pause if user scrolls
          setTimeout(() => {
            document.addEventListener("scroll", ON_USER_SCROLL);
          }, SCROLL_TIMEOUT);

          // ❖ Show notification
          if (!self.var.Notification) {
            self.var.Notification = UILib.cmd.UI_Notification({
              ID: "AutoScroll",
              icon: "",
              size: "sm",
              item: {
                noHover: true,
                onUse: () => self.cmd.Eject_Scrolling(),
                dropmenu: {
                  title: "Auto-Scroll Settings",
                  button: true,
                  items: [{ title: "Timer", type: "number", val: 8 }],
                },
              },
              onEject: () => self.cmd.Eject_Scrolling(),
              onDestroy: () => (self.var.Notification = null),
            });
          }
          self.var.Notification.title = "Scrolling...";
          self.var.Notification.icon = { val: "", animateContent: "flash" };
          self.var.Notification.timer = 0;
        },
        /*
█
▓█═─────══─────═🙦   Pause_Scrolling   🙤═─────══─────═❖
▓                                                                          */
        Pause_Scrolling: function(timer = self.settings.endTimer.val) {
          self.cmd.Reset_Auto_Scroll();

          // ❖ Update notification
          self.var.Notification.title = "Scroll ended.";
          self.var.Notification.icon = {
            val: "",
            animateContent: null,
            onUse: () => self.cmd.Inject_Scrolling(),
          };
          self.var.Notification.timer = timer;
        },
        /*
█
▓█═─────══─────═🙦   Eject_Scrolling   🙤═─────══─────═❖
▓                                                                          */
        Eject_Scrolling: function() {
          self.cmd.Reset_Auto_Scroll();
          if (self.var.Notification) self.var.Notification.destroy();
        },
        /*
█
▓█═─────══─────═🙦   Eject_Scrolling   🙤═─────══─────═❖
▓                                                                          */
        Reset_Auto_Scroll: function() {
          self.var.is_scrolling = false;
          self.var.finished_timeout = null;
          window.clearTimeout(self.var.finished_timeout);
          document.removeEventListener("scroll", self.con.ON_USER_SCROLL);
          self.var.scroll_tick = 2;
          clearInterval(self.var.scroll_interval);
        },
      };
      /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                      */
      this.var = {
        Notification: null,
        is_scrolling: false,
        last_height: 0,
        scroll_tick: 2,
        scroll_interval: null,
        finished_timeout: null,
      };
      this.settings = {
        endTimer: {
          title: "End Timer",
          type: "number",
          default: 4500,
        },
        frequency: {
          title: "Frequency",
          desc: "How often ",
          type: "number",
          default: 100,
        },
      };
      this.context = {
        selector: "global",
        items: [
          {
            id: "scrollDown",
            // title: "Activate auto-scroll",
            title: () => (self.var.scroll_interval ? "Stop" : "Begin") + " auto scroll", // prettier-ignore
            onUse(menuNode) {
              if (!self.var.scroll_interval) self.cmd.Inject_Scrolling();
              else self.cmd.Eject_Scrolling();
            },
          },
        ],
      };
    },
  ],
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                      ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯








ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  MEDIA LIB SERVICE  🙠   █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓*/
  MediaLibService: [
    function() {
      const self = this;
      this.title = "Media Library Service";
      this.sect = "media";
      this.icon = "";
      this.desc = "Scripts for identifying, controlling, and editing media.";
      this.hidden = true;
      this.onInit = function() {
        MediaLib.cmd.videoStatusBadge();
        MediaLib.cmd.doubleClickImageToOpen();
        window.addEventListener("play", (e) => {
          IUP.L.media.lastPlayedVideo = e.target;
        });
      };
      this.context = [
        // {
        //   selector: ".iuML__viewingMedia",
        //   items: MediaLib.con.MenuMediaFit
        // },
        {
          selector: "img",
          items: [
            {
              id: "openImgInTab",
              title: "Open image in this tab",
              icon: "",
              hidden: (T) => window.location.href == T.src,
              onUse(T) {
                window.location.assign(T.src);
              },
            },
          ],
        },
        {
          selector: "video",
          items: [
            {
              icon: "",
              title: "Open video in this tab",
              hidden: (T) => window.location.href == T.currentSrc,
              onUse(T) {
                window.location.assign(T.currentSrc);
              },
            },
          ],
        },
        // {
        //   // selector: MediaLib.con.EmbedMedia.FileTypes.map(F => `a[href$=.${F}]`).join(","), // prettier-ignore
        //   selector: "a", // prettier-ignore
        //   items: [
        //     {
        //       title: "Embed Media",
        //       onUse: MediaLib.cmd.Embed_Box
        //     }
        //   ]
        // },
        // {
        //   selector: "div[class='IUP-EmbeddedMedia']",
        //   items: [
        //     {
        //       title: "Sticky Embed",
        //       icon: "fas fa-thumbtack",
        //       onUse(T) {
        //         //if (target)
        //       }
        //     },
        //     {
        //       title: "Close Embed",
        //       icon: "far fa-window-close",
        //       onUse(T) {
        //         T.remove();
        //       }
        //     }
        //   ]
        // }
      ];
    },
  ],
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯













ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█     🙢  DOWNLOAD MEDIA  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓ */
  DownloadMedia: [
    function() {
      const self = this;
      this.title = "Download Media";
      this.sect = "media";
      this.icon = "f019"; //"fas fa-download";
      this.desc = function() {
        const src = self.var.media_node.source,
          detected = src ? `\n\n(Detected URL: ${src})` : "";
        return "Download the media on screen." + detected;
      };
      /*
█ ❖ warning()                                                                   */
      this.warning = function() {
        const { found, is_blob } = self.var.media_node;
        if (is_blob) return "Media is a blob url and can't be accessed directly.";  // prettier-ignore
        else if (!found) return "No media was found on the page.";
        return false;
      };
      /*
█ ❖ onInit()                                                                   */
      this.onInit = function() {
        self.var.media_node.set();
      };
      /*
█ ❖ onHover()                                                                   */
      this.onHoverIn = function() {
        if (!self.var.media_node.found) return;
        var target = UILib.cmd.UI_TargetLine({
          target: "." + self.con.videoClass,
          name: "downloadMedia",
        });
      };
      this.onHoverOut = function() {
        if (!self.var.media_node.found) return;
        var target = UILib.cmd.UI_TargetLine({
          name: "downloadMedia",
          destroy: true,
        });
      };
      /*
█ ❖ onUse()                                                                   */
      this.onUse = function() {
        if (!self.var.media_node.found) {
          var url = window.prompt("Enter a URL:");
          const saveMethod = self.settings.saveMethod.val,
            saveAs = saveMethod == "Open save dialog" ? true : false;
          chrome.runtime.sendMessage({
            downloadFile: { url: url, saveAs: saveAs },
          });
          return;
        }
        var pref = self.settings.menuAction.val;
        if (pref == "Open") self.cmd.Open_Media();
        else if (pref == "Copy URL") self.cmd.Copy_Media_Source();
        else self.cmd.Download_Media();
        window.IUP.MM.close();
      };
      this.con = {
        videoClass: "IUP-dm-vid",
      };
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   Download_Media   🙤═─────══─────═❖
▓                                                                      */
        Download_Media: function(element) {
          const url = self.var.media_node.set(element).currentSrc,
            saveMethod = self.settings.saveMethod.val,
            saveAs = saveMethod == "Open save dialog" ? true : false;
          FileLib.cmd.Download_File({ url, saveAs });
        },
        /*
█
▓█═─────══─────═🙦   Open_Media   🙤═─────══─────═❖
▓                                                                      */
        Open_Media: function(element) {
          console.trace();
          const vid = self.var.media_node.set(element);
          window.open(vid.currentSrc);
        },
        /*
█
▓█═─────══─────═🙦   Copy_Media_Source   🙤═─────══─────═❖
▓ Executes copy command, event listener intercepts and injects URL.                                                                     */
        Copy_Media_Source: function(element) {
          const vid = self.var.media_node.set(element),
            url = vid.currentSrc;
          return InputLib.var.access_clipboard(url);
        },
      };
      this.var = {
        media_node: {
          set source(element) {
            if (!element) return null;
            this.set(element);
            return element.currentSrc;
          },
          get source() {
            return this.val ? this.val.currentSrc : null;
          },
          get found() {
            return !!this.val;
          },
          is_blob: false,
          val: null,
          set: function(element) {
            if (typeof element === "string") return { currentSrc: element };
            var vid = element || MediaLib.cmd.locateMedia(),
              videoClass = self.con.videoClass,
              allVideos = document.getElementsByClassName(videoClass);
            if (vid && vid != "blob") {
              this.val = vid;
              // de-register any existing videos
              if (allVideos.length) {
                deregister = (N) => N[0].classList.remove(videoClass);
                Array(allVideos).forEach(deregister);
              }
              vid.classList.add(videoClass);
              return vid;
            } else if (vid == "blob") {
              this.is_blob = true;
            }
            return false;
          },
        },
      };
      this.settings = {
        saveMethod: {
          title: "Save Method",
          desc: "How the file is saved.",
          type: "list",
          component: "dropdown",
          default: "Open save dialog",
          choices: {
            dialog: { title: "Open save dialog" },
            download: { title: "Save to downloads folder" },
          },
        },
        // includeVideo: {
        //   title: "Download Video",
        //   desc: "Search for videos.",
        //   type: "dropdown",
        //   default: true
        // },
        // includeAudio: {
        //   title: "Download Audio",
        //   desc: "Search for videos.",
        //   type: "dropdown",
        //   default: true
        // },
        menuAction: {
          title: "Menu Action",
          desc: "What action the menu takes when clicked.",
          type: "list",
          component: "dropdown",
          default: "download",
          choices: {
            download: { title: "Download" },
            open: { title: "Open" },
            copy: { title: "Copy URL" },
          },
        },
      };
      /*
█ ❖ SUBMENU                                                                   */
      this.submenu = [
        {
          id: "download",
          title: "Download",
          desc: "Save media to hard drive.",
          icon: "",
          disabled: () => !self.var.media_node.found,
          onUse: self.cmd.Download_Media,
        },
        {
          id: "open",
          title: "Open",
          desc: "Open media in new tab.",
          icon: "",
          disabled: () => !self.var.media_node.found,
          onUse: self.cmd.Open_Media,
        },
        {
          id: "copy",
          title: "Copy Source",
          desc: "Copy source URL to clipboard.",
          icon: "",
          disabled: () => !self.var.media_node.found,
          onUse: self.cmd.Copy_Media_Source,
        },
        {
          id: "downloadLink",
          title: "Download From Link...",
          desc: "Direct download a URL.",
          icon: "",
          onUse(t) {
            const url = window.prompt("URL:", "http://");
            FileLib.cmd.Download_File({ url });
          },
        },
      ];
      /*
█ ❖ CONTEXT MENU                                                                   */
      this.context = [
        {
          selector: "img",
          items: [
            {
              title: "Save as...",
              icon: "",
              onUse(T) {
                const url = T.src;
                var filename = window.location.pathname.split("/").pop().split(".").slice(0, -1)[0]; // prettier-ignore
                FileLib.cmd.Download_File({ url, filename, saveAs: false });

                // FileLib.cmd.Download_File({ url });
              },
              // submenu: [
              //   {
              //     title: "Use URL as filename",
              //     onUse(T) {
              //       const url = T.src;
              //       var filename = window.location.pathname.split("/").pop().split(".").slice(0, -1)[0]; // prettier-ignore
              //       FileLib.cmd.Download_File({ url, filename });
              //     }
              //   }
              // ]
            },
            {
              title: "Save as JPG",
              icon: "",
              onUse(T) {
                MediaLib.cmd.Convert_Image({ T, type: "jpg", action: "replace" }); // prettier-ignore
              },
            },
          ],
        },
        {
          selector: "video",
          items: [
            {
              title: "Download media...",
              icon: "",
              onUse: self.cmd.Download_Media,
            },
            {
              title: "Open media",
              icon: "",
              onUse: self.cmd.Open_Media,
            },
            {
              id: "copyMediaSource",
              title: "Copy media source",
              icon: "",
              onUse: self.cmd.Copy_Media_Source,
            },
          ],
        },
      ];
    },
  ],
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯







ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█       🙢  EDIT MEDIA  🙠       █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ TODO ❖
▓   ◇ Filter Media
▓     ⬥ Color Filter: Overlay canvas of video with a color filter. Set hue, filter mode, transparency.
▓     ⬥ Auto Color/Contrast: Analyze a frame or all frames of a video and auto set color or contrast. [FIND AN ALGORITHM ONLINE]
▓   ◇ Detect Saturation/Brightness:
▓     ⬥  Analyze media and get % values for sat/brightness.
▓     ⬥  Use values in number inputs.
▓ */
  EditMedia: [
    function() {
      const self = this;
      this.title = "Edit Media";
      this.sect = "media";
      this.icon = "f03e"; //"far fa-image";
      this.desc = "Perform basic transformations on media.";
      this.onUse = function() {}; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   Filter_Media   🙤═─────══─────═❖
▓ Apply the filter {filter} with value {val} on target {T}.                                                                            */
        Filter_Media: function(T, val, filter) {
          if (!T) throw new Error("IUP:Filter_Media wasn't given a target."); // prettier-ignore
          // TODO: Support multiple filters on one target
          // TODO: Detect and include filters already on target
          if (filter == "clear") return LayoutLib.cmd.Node_Style({ target: T, id: "filter", action: "delete" }); // prettier-ignore
          const baseWidth = 1280,
            filterClass = self.con.filterClass,
            scaleBlur = self.settings.scaleBlur.val,
            existingData = LayoutLib.var.css_prop_to_data(T, "filter");

          [val] = LayoutLib.var.parse_css_val(val);

          /*
█ ❖ (If blurring a video) scale blur on full screen                                                                   */
          if (T.tagName == "VIDEO" && filter == "blur" && scaleBlur) {
            var saveVal = val;
            if (T.clientWidth > T.clientHeight) {
              val *= T.clientWidth / baseWidth;
            } else {
              val *= T.clientHeight / baseWidth;
            }
            T.onwebkitfullscreenchange = function() {
              self.cmd.Filter_Media(T, saveVal, "blur");
            };
          }
          /*
█ ❖ Generate CSS filter value                                                                   */
          //TODO: Detect unit type in {val}, check that it's listed in {filterDataTypes}.
          const filterDataTypes = {
            blur: "px",
            brightness: "%",
            contrast: "%",
            grayscale: "%",
            "hue-rotate": "deg",
            invert: "%",
            opacity: "%",
            saturate: "%",
            sepia: "%",
          };
          existingData[filter] = [val, filterDataTypes[filter]];
          newData = LayoutLib.var.css_data_to_prop(existingData);
          LayoutLib.cmd.Node_Style({ target: T, id: "filter", css: newData });

          if (typeof T === "string") {
            document.querySelector(T).classList.add(filterClass);
          } else if (_.isElement(T)) T.classList.add(filterClass);
          else console.error("IUP Filter_Media: Invalid target =", T);
        },
      }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                      */
      this.var = {
        filter_type: {
          val: null,
          find: function(T) {
            var css = T.style.filter,
              end = css.indexOf("("),
              filterType = css.substr(0, end);
            this.val = filterType;
            return filterType;
          },
        },
      };
      /*
█ ❖ CONSTANTS                                                                   */
      this.con = {
        filterClass: "IUP-tm-filterImg",
      };
      /*
█ ❖ SETTINGS                                                                   */
      this.settings = {
        scaleBlur: {
          title: "Scale Blur Filter",
          desc: "Scale the blur filter for consistency between different sized media.",
          type: "bool",
          default: true,
        },
      };
      /*
█ ❖ CONTEXT MENU                                                                   */
      this.context = {
        selector: "img, video",
        items: [
          {
            id: "fullSize",
            title: "Full size",
            desc: "Set the target media's size to 100%.",
            hidden: T => T.naturalWidth == T.clientWidth && T.naturalHeight == T.clientHeight, // prettier-ignore
            onUse(T) {
              const attrSaved = "iup-data-savedStyle";
              if (T.hasAttribute(attrSaved)) {
                T.setAttribute("style", T.getAttribute(attrSaved));
                T.removeAttribute(attrSaved);
              } else {
                const originalStyle = T.getAttribute("style"),
                  props = ["width", "height", "min-width", "min-height", "max-width", "max-height", "transform"], // prettier-ignore
                  statement = ": initial !important;";
                T.setAttribute(attrSaved, originalStyle);
                T.setAttribute("style", props.join(statement) + statement);
              }
            },
          },
          {
            id: "filter",
            title: "Filter Media",
            icon: "",
            submenu: [
              {
                id: "blur",
                title: "Blur",
                icon: "",
                input: {
                  type: "number",
                  val: "0px",
                  onEdit(val, e, T) {
                    self.cmd.Filter_Media(T, val, "blur");
                  },
                },
              },
              {
                title: "Brightness",
                icon: "",
                input: {
                  type: "number",
                  val: "100%",
                  max: 250,
                  step: 5,
                  onEdit(val, e, T) {
                    self.cmd.Filter_Media(T, val, "brightness");
                  },
                },
              },
              {
                title: "Contrast",
                icon: "",
                input: {
                  type: "number",
                  val: "100%",
                  max: 250,
                  step: 5,
                  onEdit(val, e, T) {
                    self.cmd.Filter_Media(T, val, "contrast");
                  },
                },
              },
              {
                title: "Saturation",
                icon: "",
                input: {
                  type: "number",
                  val: "100%",
                  max: 250,
                  step: 5,
                  onEdit(val, e, T) {
                    self.cmd.Filter_Media(T, val, "saturate");
                  },
                },
              },
              {
                id: "clearAll",
                title: "Clear all",
                icon: "",
                onUse(T) {
                  self.cmd.Filter_Media(T, null, "clear");
                },
              },
            ],
          },
          {
            id: "transform",
            title: "Transform Media",
            icon: "",
            submenu: [
              {
                title: "Rotate",
                icon: "",
                input: {
                  type: "number",
                  val: "180°",
                  max: 360,
                  step: 45,
                  onEdit(val, e, target) {
                    ElementLib.cmd.Rotate_Element({ target, val });
                  },
                },
              },
              {
                title: "Scale",
                icon: "",
                input: {
                  type: "number",
                  val: 1,
                  max: 10,
                  step: 0.05,
                  onEdit(val, e, target) {
                    _B(target);
                    const css = LayoutLib.var.css_prop_to_data(target, "transform"); // prettier-ignore
                    css.scale = [val];
                    delete css.matrix;
                    LayoutLib.cmd.Node_Style({
                      target,
                      id: "transform-media",
                      css: LayoutLib.var.css_data_to_prop(css),
                    });
                  },
                },
              },
              {
                id: "rotate180",
                title: "Rotate 180°",
                onUse(T) {
                  T.style.transform = `rotate(180deg)`;
                },
              },
              {
                id: "rotateScaleDown",
                title: "Rotate 90° & scale down",
                onUse(T) {
                  T.style.transform = `rotate(90deg) scale(.6)`;
                  // var data = LayoutLib.var.css_prop_to_data(T, "transform");
                  // data["rotate"] = [90, "deg"];
                  // data["scale"] = [0.6, ""];
                  // LayoutLib.var.css_data_to_prop(data, T);
                },
              },
              {
                id: "rotateScaleUp",
                title: "Rotate 90° & scale up",
                onUse(T) {
                  T.style.transform = `rotate(90deg) scale(1.6)`;
                  // var data = LayoutLib.var.css_prop_to_data(T, "filter");
                  // data["rotate"] = [90, "deg"];
                  // data["scale"] = [1.6, ""];
                  // LayoutLib.var.css_data_to_prop(data, T);
                },
              },
              {
                id: "clearAll",
                title: "Clear all",
                icon: "",
                onUse(target) {
                  LayoutLib.cmd.Node_Style({ target, id: "transform-media", action: "delete" }); // prettier-ignore
                },
              },
            ],
          },
        ], //▊END MENU ITEMS▊
      };
    }, //▊END EDIT MEDIA▊
  ],
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯







ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█       🙢  FULL SCREEN  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ TODO
▓   ◇ Implement Command Bar controls:
▓     ◇ Exit full screen
▓     ◇ Set zoom mode (contain, cover, fit horizontally, fit vertically)
▓     ◇ Change background (black/66%/transparent/average/mirror)
▓       ⬥ Average takes the average color of the media.
▓       ⬥ Mirror takes a canvas screenshot each frame, blurs it, mirrors it behind media. For vertical videos, but compatible with anything.
▓         ⬦ If media covers 100% horizontally or vertically, mirror two screenshots to each side. Otherwise, fill the screen.
▓   ◇ Add keybinds ❓
▓   ◇ Take action if user goes native fullscreen with a video (alert w/ don't show again, block it)
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
  FullScreen: [
    function() {
      const self = this;
      this.title = "Full Screen";
      this.sect = "media";
      this.icon = "f065";
      this.desc = "Go full screen on anything.";
      /*
█ ❖ onInit()                                                                   */
      this.onInit = () => self.cmd.Init_Full_Screen();
      this.onLoad = function() {
        var browsedMediaFile = MediaLib.var.is_browsing_media_file();
        if (browsedMediaFile && self.settings.mediaFit.val !== "auto") {
          self.var.target = browsedMediaFile;
          self.cmd.fitMedia();
        }
      };
      /*
█ ❖ onUse()                                                                   */
      this.onUse = function() {
        self.cmd.Toggle_Full_Screen();
        window.IUP.MM.close();
      };
      /*
█ ❖ CONSTANTS                                                                   */
      this.con = {
        PRE: "iuFS",
        sizeClasses: ["-fit-h", "-fit-v", "-fit-both"],
        ActionBarData: {
          title: "Item Size",
          desc: "",
          // side: "bottom",
          // scope: "global",
          items: [
            {
              id: "actual",
              desc: "Actual Size",
              icon: "",
              onUse() {
                self.var.target.classList.remove(self.con.sizeClasses);
              },
            },
            {
              id: "horizontal",
              desc: "Fit horizontally",
              icon: "",
              onUse() {
                self.var.target.classList.remove(self.con.sizeClasses);
                self.var.target.classList.add("-fit-h");
              },
            },
            {
              id: "vertical",
              desc: "Fit vertically",
              icon: "",
              onUse() {
                self.var.target.classList.remove(self.con.sizeClasses);
                self.var.target.classList.add("-fit-v");
              },
            },
            {
              id: "both",
              desc: "Fit Screen",
              icon: "",
              onUse() {
                self.var.target.classList.remove(self.con.sizeClasses);
                self.var.target.classList.add("-fit-both");
              },
            },
          ],
        },
      };
      /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                      */
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   Init_Full_Screen   🙤═─────══─────═❖
▓ Toggle full screen OFF if it's ON & vice versa.                                                                          */
        Init_Full_Screen: function() {
          if (self.settings.autoEnableOnF11.val == true) {
            window.addEventListener("f11change", (e) => {
              // if (e.f11 && !MediaLib.var.is_browsing_media_file()) {
              if (e.f11) {
                var target = MediaLib.cmd.locateMedia({
                  mediaType: "*",
                  allowBlob: true,
                });
                self.cmd.Inject_Full_Screen(target);
              } else {
                // self.cmd.Eject_Full_Screen();
              }
            });
          }
        },
        /*
█
▓█═─────══─────═🙦   Toggle_Full_Screen   🙤═─────══─────═❖
▓ Toggle full screen OFF if it's ON & vice versa.                                                                          */
        Toggle_Full_Screen: function(target, action = "toggle") {
          const isActive = self.var.is_active;
          if (["toggle", "activate"].includes(action) && !isActive) {
            self.cmd.Inject_Full_Screen(target);
          } else if (["toggle", "deactivate"].includes(action) && isActive) {
            self.cmd.Eject_Full_Screen();
          }
          if (!isActive) return;
        },
        /*
█
▓█═─────══─────═🙦   Inject_Full_Screen   🙤═─────══─────═❖
▓ Turn full screen mode on.                                                                          */
        Inject_Full_Screen: function(target = "auto", extractVideo = false) {
          if (self.var.is_active) return false;
          self.var.is_active = true;
          const { PRE } = self.con;

          // ❖ Prepare Target
          if (target == "auto") {
            if (IUP.L.media.lastPlayedVideo) target = IUP.L.media.lastPlayedVideo; // prettier-ignore
            else target = MediaLib.cmd.locateMedia();
          }
          if (!target) throw new Error("IUP:Inject_Full_Screen couldn't find a target."); // prettier-ignore
          const type = (target && target.tagName) ? target.tagName.toLowerCase() : "unknown"; // prettier-ignore
          self.var.keybind = InputLib.var.build_keybind("escape", () => self.cmd.Eject_Full_Screen()); // prettier-ignore
          target.classList.add(`${PRE}__target`);
          self.var.target_parent = target.parentElement;
          self.var.target = target;

          // ❖ Build & Inject HTML
          //🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧
          const body = document.createElement("div");
          body.id = "body";
          self.var.script = FileLib.cmd.getScript({ID: PRE, file: "FullScreen.css" }); // prettier-ignore
          self.var.node = { body };
          body.appendChild(target);
          document.body.appendChild(body);
          //🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧
          // const script = { file: "LayoutLib_SimpleModal.css" };
          // self.var.node = LayoutLib.cmd.buildShadowDOM({PRE, script}); // prettier-ignore
          // const { body } = self.var.node;
          // const Wrapper = document.createElement("div");

          // ❖ Control Menu TODO
          // const barData = self.con.ActionBarData,
          //   bar = IUP.U.ActionBars.cmd.Build_Action_Bar(barData);
          // IUP.U.ActionBars.cmd.Show_Action_Bar(bar);
          // const dropmenuData = self.con.ActionBarData;
          // dropmenuData.button = target;
          // dropmenuData.btnMouse = "right";
          // self.var.dropmenu = UILib.cmd.UI_Dropmenu(dropmenuData);

          // ❖ Video Functionality
          if (type == "video") {
            var videoState = "remember";
            if (videoState == "remember") videoState = target.paused; // true = pause, false = play
            _.defer(() => {
              if (videoState) target.pause();
              else target.play();
            });
            target.loop = true;
            self.var.has_controls = target.controls;
            if (!target.controls) target.controls = true;
          }

          // ❖ Image Functionality
          if (type == "img") {
            target.iuCSS({ width: "max-content" });
            target.onclick = self.cmd.Eject_Full_Screen;
          }
        },
        /*
█
▓█═─────══─────═🙦   Eject_Full_Screen   🙤═─────══─────═❖
▓ Turn full screen mode off.                                                                          */
        Eject_Full_Screen: function() {
          if (!self.var.is_active) return false;
          self.var.is_active = false;

          const { PRE } = self.con,
            target = self.var.target;
          target.classList.remove(`${PRE}__target`);
          self.var.script.eject();

          self.var.target_parent.append(target);
          self.var.keybind.destroy();

          // ❖ Video-Specific Functionality
          if (target.tagName) {
            if (!self.var.has_controls) target.controls = false; // restore video controls state
          }
        },
        /*
█
▓█═─────══─────═🙦   fitMedia   🙤═─────══─────═❖
▓                                                                          */
        fitMedia: function(target = self.var.target, keyword = self.settings.mediaFit.val) {
          var css;
          if (keyword == "auto") css = "";
          if (keyword == "full-size") css = "width: auto; height: auto;";
          if (keyword == "fit-page") css = "object-fit: contain; width: 100%; height: 100%;";
          if (keyword == "fit-h") css = "min-width: 100%; height: auto;";
          if (keyword == "fit-v") css = "min-height: 100%; width: auto;";
          LayoutLib.cmd.Node_Style({ target, css });
          ExecutiveLib.cmd.changeSetting("FullScreen", "mediaFit", keyword);
        },
      }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                      */
      this.var = {
        script: null,
        keybind: null,
        is_active: false,
        target: null,
        target_parent: null,
        set set_target_fit(val) {
          this.target_fit = val.id;
          delete val.id;
          this.target.iuCSS(val);
        },
        target_fit: null,
        has_controls: false,
      };
      /*
█ ❖ SETTINGS                                                                   */
      this.settings = {
        mediaFit: {
          title: "Auto-fit Media File",
          desc: "",
          type: "text",
          default: null,
        },
        enableVideoControls: {
          title: "Enable Video Controls",
          desc: "Enable built-in controls for videos in full screen.",
          type: "bool",
          default: true,
        },
        autoEnableOnF11: {
          title: "Auto Activate On Native Full Screen (F11)",
          desc: "Automatically activate and deactivate when full screen (F11) is toggled.",
          type: "bool",
          default: true,
        },
        videoStatePaused: {
          title: "Video State After Activating",
          desc: "Automatically play and pause the media when toggled.",
          type: "list",
          component: "dropdown",
          default: "remember",
          choices: {
            remember: { title: "Remember", val: "remember" },
            play: { title: "Play", val: false },
            pause: { title: "Pause", val: true },
          },
        },
        hide: {
          title: "Hold To Hide",
          desc: "Hold to quickly hide the full screen layer.",
          type: "keybind",
          default: new Keybind("h"),
        },
      };
      /*
█ ❖ CONTEXT MENU                                                                   */
      this.context = [
        {
          selector: "img, video, object, embed, iframe, canvas",
          items: [
            {
              id: "fullScreen",
              title: "Toggle full screen",
              onUse(T) {
                self.cmd.Toggle_Full_Screen(T);
              },
            },
          ],
        },
        {
          selector: "global",
          items: [
            {
              title: () => (self.var.is_active ? "Dea" : "A") + "ctivate full screen",
              // hidden: T => self.var.is_active,
              onUse() {
                self.cmd.Toggle_Full_Screen();
              },
            },
          ],
        },
      ];
      /*
█ ❖ META                                                                   */
      this.meta = {
        info: {
          howItWorks: "Full Screen manipulates the style of an element to overlay it on top of other content.",
        },
      };
    },
  ],
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯














ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  VIDEO CONTROLLER  🙠    █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMMANDS ❖
▓   ◇ Init_Controller
▓   ◇ Inject_Controller
▓   ◇ Inject_Player
▓   ◇ Media_Playback
▓   ◇ Set_Cue
▓   ◇ Call_Cue
▓   ◇ secsToString
▓
▓ ❖ NOTES ❖
▓   ◇ VC = Video Controller
▓
▓ ❖ TODO ❖
▓   ◇ Attempt to create a new <video> element with same URL. If that fails, extract current <video>.
▓   ◇ Don't load this utility if no videos are on the page?
▓   ◇ SAVE DATA TO NOTES: Save video VC data to Notes, restore on page open: on change / on manual save / off
▓   ◇ Change properties on a curve, the farther it goes the faster (video time) or slower (video speed) it goes
▓   ◇ CONTROLS:
▓     ⬥ When dragging mouse, display a range input under it.
▓     ⬥ HOME/END: Press HOME to skip to video start, END to skip to end.
▓   ◇ VIDEO:
▓     ⬥ Auto-Detect Size: Scan the video for black regions and resize to fit.
▓     ⬥ Drag & Resize Mode: Activate to freely reposition & scale the video with LMB/wheel.
▓   ◇ AUDIO:
▓     ⬥ Offset Audio: Shift the audio backwards or forwards relative to video (scale too?)
▓   ◇ CUE POINTS:
▓     ⬥ Commands for Next Cue Point/Previous Cue Point.
▓     ⬥ Hold down two cues at once to skip between them.
▓   ◇ NOTIFICATION:
▓     ⬥ Adjust infobox drop shadow based on image capture of region behind it.
▓     ⬥ When current time is displayed in notification, live update it until it fades.
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
  VideoController: [
    function() {
      const self = this;
      this.title = "Media Player";
      this.sect = "media";
      this.icon = "f03d";
      this.module = "Player.js";
      this.desc = "Extract a video into a customized player.";
      this.preview = true;
      /*
█ ❖ onInit()                                                                   */
      this.onInit = function(doc) {
        self.cmd.Init_Controller(doc);
      }; /*
      /*
█ ❖ onInit()                                                                   */
      this.onDeact = function(doc) {
        self.cmd.Deact_Controller(doc);
      }; /*
█ ❖ onLoad()                                                                   */
      this.onLoad = function() {
        var V = document.querySelector("video");
        if (!V) return;
        if (!V.duration) V.addEventListener("loadedmetadata", e => self.cmd.Inject_Controller(V));  // prettier-ignore
        else self.cmd.Inject_Controller(V);
      }; /*
█ ❖ onUse()                                                                   */
      this.onUse = function() {
        // self.cmd.Test_Video_Panel();
      };
      this.con = {
        pre: "vc",
        notification: {
          ID: "VideoController",
          type: "infobox",
          onEject: function() {
            if (self.var.time_interval) clearInterval(self.var.time_interval);
          },
        },
      };
      /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
      this.cmd = {
        /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Init_Controller() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓    Initialize controllers with CSS, event listeners, and prototype injections.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓  ❖ FUNCTIONALITY ❖
▓    ◇ Inject CSS: Inject video controller CSS.
▓    ◇ Auto-Inject VC: Listen for the play event and inject controller into video.
▓    ◇ Auto-Pause: Auto-pause videos when tab is switched.
▓    ◇ Set Keybinds:
▓      ⬥ Cues (1-9, alt 1-9)
▓      ⬥ Arrow Keys (<-, ->)
▓    ◇ HTMLMediaElement.iuStepProp(): Step a video property back or forward based on presets.
▓    ◇ HTMLMediaElement.iuSpeed: Set or retrieve the video playback rate.
▓      ⬥ If set below minimum, pause video.
▓      ⬥ If set above maximum, set to maximum.
▓      ⬥ Lower volume relative to playback rate.
▓  ❖ NOTE ❖
▓    ◇ Inject_Controller() injects the actual VC into videos. This just preps the page.
*/
        Init_Controller: function(doc = document) {
          const { CSS, notification, numDefaultCues, DOC_EVENT_INDEX } = self.con, // prettier-ignore
            visibilitychange = DOC_EVENT_INDEX.visibilitychange.bind(doc, self),
            contextmenu = DOC_EVENT_INDEX.contextmenu.bind(doc, self);

          LayoutLib.cmd.Inject_Styles("VideoController", CSS); // ❖ Inject CSS
          doc.addEventListener("play", self.cmd.Inject_Controller, true); // ❖ Auto inject VC when video is played
          doc.addEventListener("visibilitychange", visibilitychange); // ❖ Auto-pause on tab switch
          doc.addEventListener("contextmenu", contextmenu);
          self.var.Notification = UILib.cmd.UI_Notification(notification);

          /*
█ ❖ CUE KEYBINDS                                                                   */
          var keyListener = new window.keypress.Listener(),
            combos = [];
          for (var i = 1; i <= numDefaultCues; i++) {
            let N = i;
            // ❖ CALL: Generate keybind to call Cue {N}. (if {N} is set)
            combos.push({
              keys: `${N}`,
              is_exclusive: true,
              prevent_repeat: true,
              on_keyup: function() {
                const V = self.var.active_video;
                if (V) self.cmd.Call_Cue(V, N);
              },
            });
            // ❖ SET: Generate keybind to set Cue {N}.
            combos.push({
              keys: `alt ${N}`,
              is_exclusive: true,
              prevent_repeat: true,
              on_keyup: function() {
                const V = self.var.active_video;
                if (V) self.cmd.Set_Cue(V, [N, V.currentTime]);
              },
            });
          }
          /*
█ ❖ ARROW KEYBINDS                                                                   */
          var ArrowIndex = {
            right: [false, 25],
            "shift right": [false, 100],
            "alt right": [false, 500],
            left: [true, 25],
            "shift left": [true, 100],
            "alt left": [true, 500],
          };
          for (var key in ArrowIndex) {
            let [reverse, mod] = ArrowIndex[key];
            combos.push({
              keys: key,
              is_exclusive: true,
              prevent_repeat: true,
              on_keyup: function() {
                const V = self.var.active_video;
                if (V) V.iuStepProp("currenttime", reverse, mod);
              },
            });
          }
          // ❖ Register to keypress.js 🙵 save to temp data
          keyListener.register_many(combos);
          if (self.var.keybinds) self.var.keybinds.destroy();
          self.var.keybinds = keyListener;
          /*
█ ❖ .iuStepProp()
▓ Iterate a video property {prop} by a predefined step.
▓  ⬥ {stepBack}: If true, step backwards instead of forwards.
▓  ⬥ {mod}:      Multiply the step by this much.                                                           */
          HTMLMediaElement.prototype.iuStepProp = function(prop, stepBack = false, mod = 1) {
            prop = prop.toLowerCase().replace(/\s/g, "");
            const self2 = this,
              s = stepBack ? -1 : 1,
              Index = self.con.VideoPropIndex;
            var result = Index[prop].script(self2, stepBack ? -mod : mod),
              msg = ("output" in Index[prop]) ? Index[prop].output(result) : result; // prettier-ignore

            // ❖ Change time
            if (prop == "currenttime") {
              // var time = msg;
              // self.var.Notification.settings.onEject = function() {
              //   self.var.Notification.settings.onEject = null;
              //   clearInterval(self.var.time_interval);
              // };
              // self.var.time_interval = setInterval(() => {
              //   time += 0.1;
              //   self.var.Notification.title = self.cmd.secsToString(time);
              // }, 100);
              self.var.Notification.title = self.cmd.secsToString(msg);
            } else self.var.Notification.title = msg;
            self.var.Notification.startTimer();
          };
          /*
█ ❖ .iuSpeed()
▓ Special 'playbackRate' property with auto-pause and volume control.                                                                   */
          Object.defineProperty(HTMLMediaElement.prototype, "iuSpeed", {
            get() {
              return this.playbackRate;
            },
            set(val) {
              if (typeof val != "number") return console.warn("iuSpeed: Invalid number provided =", val, typeof val); // prettier-ignore
              const minPlayback = self.con.VideoPropIndex.playbackrate.min,
                maxPlayback = 16,
                attr = self.con.prefix + "pausedPlaybackMin";
              if (val <= minPlayback) {
                val = minPlayback;
                this.pause();
                this.iuData(attr, true);
              } else {
                if (val > maxPlayback) val = maxPlayback;
                if (this.paused && this.iuData(attr)) {
                  this.play();
                  this.iuData(attr, null, true);
                }
              }
              this.playbackRate = val;
              this.volume = val < 1 ? val ** 4 : this.volume;
            },
          });
          /*
█ 🚧 .freezeFrame()
▓ Capture a frame of the video.                                                                   */
          Object.defineProperties(HTMLVideoElement.prototype, {
            freezeFrame: function() {
              this.pause();
              const canvas = document.createElement("canvas"),
                context = canvas.getContext("2d");
              var data;
              canvas.width = this.videoWidth;
              canvas.height = this.videoHeight;
              context.drawImage(this, 0, 0);
              canvas.toBlob((blob) => data.push(blob), "image/jpeg");
            },
          });
        },
        /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Inject_Controller() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓   Inject VC into video {V}. Initialize controller data & add event listeners.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ FUNCTIONALITY ❖
▓   ◇ If controller already injected, return data.
▓   ◇ If metadata isn't loaded, wait for it and rerun command.
▓   ◇ Set controller data attribute to defaults.
▓   ◇ Add event listeners in video event index. (con.VidEventIndex)
▓   ◇ Add event listeners in document event index. (con.DOC_EVENT_INDEX)
▓
▓ ❖ DATA STRUCTURE ❖
▓  data-iup-vc = {
▓   ◇ start: Video start time.
▓   ◇ end:   Video end time.
▓   ◇ TODO...
▓
▓ ❖ TODO ❖
▓   ◇ Detect Y axis (separate property)
▓     ⬥ wait 3(?) pixels before determining if drag is X or Y
▓     ⬥ keep recalculating, change if the avg drag distance is more than 2/3 towards the other axis
▓   ◇ Detect Y axis (same property)
▓     ⬥ If user drags up diagonally, step property higher/faster
▓     ⬥ If user drags down diagonally, step property lower/slower
▓
*/
        Inject_Controller: function(V) {
          if (V.target) V = V.target;
          if (!V) throw new Error("IUP:Inject_Controller wasn't given a video."); // prettier-ignore
          if (V.tagName != "VIDEO") throw new Error("IUP:Inject_Controller wasn't provided a valid video."); // prettier-ignore
          self.var.active_video = V;
          // ❖ Abort if already injected; return controller data
          var data = V.iuData(self.con.pre);
          if (data) return data;

          // ❖ Wait For Metadata ⬥ If metadata isn't loaded, listen for it and try again.
          if (!V.duration) {
            V.addEventListener("metadataloaded", self.cmd.Inject_Controller);
            return;
          }

          V.iuData(self.con.pre, { start: 0, end: V.duration }); // ❖ Set default controller data
          self.cmd.Set_Cue(V, "defaults"); // ❖ Set default cues

          // ❖ Event Listeners ⬥ Add event listeners in index to video, storing references for later removal.
          const eventHandlers = self.con.VidEventIndex;
          var eventRefs = {};
          for (var L in eventHandlers) {
            eventRefs[L] = eventHandlers[L].bind(V, self);
            V.addEventListener(L, eventRefs[L]);
          }
          V.pEventRefs = eventRefs;

          // ❖ If user has been dragging for longer than the timeout, don't show context menu
          // TODO Only need one event listener for the doc, not for each vid
        },
        /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Media_Playback() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓       Control where the media starts, ends, and more for video {V}.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓   {action} =
▓    ◇ "set":   Set data property {prop} to {val}.
▓    ◇ "call":  Call time property {prop}.
▓    ◇ "clear":   Clear property {prop}, or null to clear all playback modifications.
▓    ◇ 🚧"reverse": Play video backwards once it ends.
▓   {prop} =
▓    ◇ "start":   Video start time
▓    ◇ "end":     Video end time
▓                                                                                  */
        Media_Playback: function(V, action, prop = null, val = null) {
          var data = self.cmd.Inject_Controller(V), // initialize or acquire data
            cueData = V.iuData("cue");
          if (!data) throw new error("IUP:Media_Playback wasn't given any data."); // prettier-ignore
          if (!action) console.warn("IUP:Media_Playback wasn't given an action. Only the controller was injected."); // prettier-ignore
          /*
█ ❖ Clear playback mods                                                                   */
          if (action == "clear") {
            if (prop) {
              data[prop] = null;
            } else {
              V.removeData(self.con.pre);
              for (var L in self.con.VidEventIndex) {
                V.removeEventListener(L, self.con.VidEventIndex[L]);
              }
            }
            return true;
          }
          /*
█ ❖ Set start/end point                                                                   */
          if (action == "set") {
            data[prop] = val || V.currentTime;
            V.iuData(self.con.pre, data);
            // if using default cues, refresh cue times
            if (cueData.usingDefault) self.cmd.Set_Cue(V, "defaults");
          }
          /*
█ ❖ Call start/end point                                                                   */
          if (action == "call") {
            V.currentTime = data[prop];
          }

          /*🚧if (action == "reverse")🚧 { setAttr(set); } else { V.onended = null; }*/
          // MediaStreamTrack.getSettings().frameRate
          /*function rewind(vid) {
            const frameRate = 30;
            const vidStart = vid.getAttribute(startAttr) || 0;
            console.log("REWIND CALLED");
            vid.pause();
            vid.playbackRate = 1.0;
            vid.videoTracks[0];
            var rewind = setInterval(function() {
              if (vid.currentTime <= vidStart) {
                vid.play();
              } else {
                vid.currentTime -= 0.1;
              }
            }, 100);
            vid.onplay = function() {
              console.log("CLEARING INTERVAL:", rewind);
              clearInterval(rewind);
              console.log("INTERVAL CLEARED:", rewind);
              vid.onplay = null;
            };
          🚧}🚧*/
        }, //▊END Media_Playback▊
        /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Set_Cue() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓       Set or call cue points on the video which change the current time.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓   {V} = video
▓   {action} =
▓    ◇ [cue, time]: Set cue {cue} to time {time}.
▓    ◇ [cue]:       Call cue {cue} and change video time.
▓    ◇ "init":      Initialize the keybinds.
▓    ◇ "defaults":  Initialize with default cues set.
▓    ◇ "clear":     Clear all cues from the video.
▓  //TODO Add event listener if video changes source/duration to clear/recalculate cues
▓  //TODO Convert to {arg} system
▓                                                                                  */
        Set_Cue: function(V, action) {
          if (!V) throw new Error("IUP:Set_Cue wasn't provided a video."); // prettier-ignore
          if (V && V.tagName != "VIDEO") throw new Error("IUP:Set_Cue wasn't provided a valid video."); // prettier-ignore
          const numDefaultCues = self.con.numDefaultCues, // TODO Move to setting
            playData = V.iuData(self.con.pre) || {},
            startTime = playData.start || 0,
            endTime = V.duration, //playData.end || V.duration,
            duration = endTime - startTime;
          var CueData = V.iuData("cue") || {};

          /*
█ ❖ Init Cues (register cues w/ blank data)                                                                   */
          if (action == "init") {
            CueData = {};
            registerCue();
            /*
█ ❖ Init Cues w/ Defaults (register default cues, spaced evenly along vid time)                                                                 */
          } else if (action == "defaults") {
            CueData = { usingDefault: true, 1: startTime };
            for (var i = 2; i <= numDefaultCues; i++) {
              CueData[i] = duration * ((i - 1) / numDefaultCues) + startTime;
            }
            registerCue();
            /*
█ ❖ Call Cue (set video time to cue # {action})                                                                  */
          } else if (CueData[action]) {
            V.currentTime = CueData[action];
            /*
█ ❖ Clear All Cues                                                                   */
          } else if (action == "clear") {
            V.removeData("cue");
            if (self.var.keybinds) self.var.keybinds.destroy();
            /*
█ ❖ Set Cue Point                                                                    */
          } else if (typeof action === "object") {
            const [num, setTime] = action;
            registerCue(num, setTime);
            self.var.Notification.title = `CUE ${num} SET`;

            // UILib.cmd.UI_Notification({
            //   ID: "VideoController",
            //   subtype: "infobox",
            //   message: `CUE ${num} SET`, // `CUE ${N} = ${timeStr}`,
            //   timer: 1800
            // });
          }
          /*
█ ❖ registerCue() - set cue {num} to time {setTime} and activate keybinds                                                                   */
          function registerCue(num = null, setTime = null) {
            if (CueData.usingDefault) {
              CueData.resetCuesNext = true;
            } else if (CueData.resetCuesNext) {
              CueData = {};
              delete CueData.resetCuesNext;
              delete CueData.usingDefault;
            }
            if (typeof num == "number") CueData[num] = setTime;

            if (num !== "temp") V.iuData("cue", JSON.stringify(CueData));
          }
        },
        /*
█
▓█═─────══─────═🙦   Call_Cue()   🙤═─────══─────═❖
▓                                                                           */
        Call_Cue: function(V, N) {
          const CueData = V.iuData("cue") || {};
          if (CueData[N] || CueData[N] === 0) V.currentTime = CueData[N];
        },
        /*
█
▓█═─────══─────═🙦   secsToString()   🙤═─────══─────═❖
▓ Convert seconds into MM:SS:SS format.                                                                          */
        secsToString: function(secs) {
          var DateObj = new Date(secs * 1000).toUTCString(),
            timeStr = DateObj.match(/(\d\d:\d\d:\d\d)/)[0], // hh:mm:ss
            ms = String(Math.floor((secs * 1000) % 60))[0];
          timeStr = timeStr.replace(/(00:)/, ""); // trim off empty hours
          timeStr = `${timeStr}:${ms}`; // add ms
          // timeStr = timeStr + ":" + ms + (ms.length == 1 ? "0" : ""); // add ms
          return timeStr;
        },
        /*
█
▓█═─────══─────═🙦   Deact_Controller()   🙤═─────══─────═❖
▓                                                                           */
        Remove_Controller(V) {
          if (V.target) V = V.target;
          if (!V) throw new Error("IUP:Remove_Controller wasn't given a video."); // prettier-ignore
          if (V.tag != "video") throw new Error("IUP:Remove_Controller wasn't provided a valid video."); // prettier-ignore
          V.iuData(self.con.pre, null, true);
          V.iuData("cue", null, true);
          const eventHandlers = self.con.VidEventIndex;
          for (var L in eventHandlers) {
            V.removeEventListener(L, V.pEventRefs[L]);
          }
          delete V.pEventRefs;
        },
        /*
█
▓█═─────══─────═🙦   Deact_Controller()   🙤═─────══─────═❖
▓                                                                           */
        Deact_Controller: function(doc = document) {
          doc.removeEventListener("play", self.cmd.Inject_Controller);
          doc.removeEventListener("visibilitychange", self.con.DOC_EVENT_INDEX.visibilitychange); // prettier-ignore
          self.var.keybinds.destroy();
          doc.querySelectorAll("video").forEach(self.cmd.Remove_Controller);
        },
        Extract_Video: function(target = "auto") {},
      }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
      this.var = {
        active_video: null, // The last video played. Currently being controlled.
        keybinds: null,
        notification: null,
        apply_mod: (e, val = 1) => {
          const mods = {
            alt: 0.25,
            ctrl: 4,
            shift: 1,
          };
          return e.altKey ? val * 0.25 : e.ctrlKey ? val * 4 : val;
        },
        // prop = "start|end|cue#"
        getTimeProp: function(V, prop) {
          const pre = "data-iup-";
          if (!V) return null;
          if (["start", "end"].includes(prop)) {
            return V.iuData(prop);
          }
          if (typeof prop == "number") {
            return V.iuData("cue")[prop] || null;
          }
          return null;
        },
      };
      /*
█ ❖ SETTINGS                                                                   */
      this.settings = {
        fadeUnderPlaybackRate: {
          title: "Mute Videos Under Playback Rate",
          desc: "Fade out the volume of videos under this playback rate.",
          type: "number",
          default: 0.6,
        },
        mouseWheelControl: {
          title: "Mouse Wheel Control",
          desc: "Control this property on a video when you scroll with the mouse over it.",
          type: "list",
          component: "dropdown",
          default: "time",
          choices: {
            playbackRate: { title: "Playback Rate" },
            time: { title: "Time" },
            volume: { title: "Volume" },
          },
          preprocess: (val) => val.replace(/\s/g, "").toLowerCase(),
        },
        rightMouseControl: {
          title: "RMB Drag Control",
          desc: "Control this property on a video when right-click and drag left or right.",
          type: "list",
          component: "dropdown",
          default: "playbackRate",
          choices: {
            playbackRate: { title: "Playback Rate" },
            time: { title: "Time" },
            volume: { title: "Volume" },
          },
          preprocess: (val) => val.replace(/\s/g, "").toLowerCase(),
        },
      };
      /*
█ ❖ CONTEXT                                                                   */
      this.context = {
        selector: "video",
        parentSelector: "video",
        items: [
          {
            id: "mediaPlayback",
            title: "Media Playback",
            submenu: [
              {
                id: "setStart",
                title: "Set start point",
                icon: "",
                marked: (V) => V.iuData(self.con.pre, false).start !== 0,
                onUse(T) {
                  self.cmd.Media_Playback(T, "set", "start");
                },
              },
              {
                id: "setEnd",
                title: "Set end point",
                icon: "",
                marked: (V) => V.iuData(self.con.pre, false).end !== V.duration,
                onUse(T) {
                  self.cmd.Media_Playback(T, "set", "end");
                },
              },
              {
                id: "speed",
                icon: "",
                title: "Playback Speed",
                input: {
                  type: "number",
                  val: 1,
                  //default: V => V.iuSpeed,
                  min: 0,
                  max: 1,
                  step: 0.05,
                  onEdit(val, e, V) {
                    V.iuSpeed = parseFloat(val);
                  },
                },
              },
              // {
              //   id: "loopReverse",
              //   icon: "",
              //   title: "Loop With Reverse",
              //   disabled: true,
              //   onUse(V) {
              //     self.cmd.Media_Playback(V, "set", "reverse");
              //   }
              // }
            ],
          },
        ],
      };
      const cueContextItems = {
        id: "cuePoints",
        title: "Cue Points",
        submenu: [],
      };
      for (var i = 1; i <= 6; i++) {
        cueContextItems.submenu.push({
          id: `cue` + i,
          icon: `${i}`,
          title: "Set Cue " + i,
          marked: T => T.iuData("cue") && T.iuData("cue")[i] && !T.iuData("cue").usingDefault, // prettier-ignore
          onUse(T) {
            self.cmd.Set_Cue(T, [i, T.currentTime]);
          },
        });
      }
      this.context.items.push(cueContextItems);
      this.context.items.push({
        id: "clearAll",
        title: "Clear playback mods",
        icon: "",
        onUse(T) {
          var arg = { start: false, end: false, reverse: false };
          T.playbackRate = 1;
          self.cmd.Media_Playback(T, "clear");
          self.cmd.Set_Cue(T, "clear");
        },
      });
      /*
█ ❖ META                                                                   */
      this.meta = {
        info: {
          howItWorks: "Locates and extracts the video from a site's player, replacing it with a custom UI.",
        },
      };
    },
  ],
  /*
█
▓══────────────────══🙦⟅             ∽ 🎕 ∼             ⟆🙤══────────────────══█
▓










ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█        🙢  WAVEFORM  🙠        █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓*/
  Waveform: [
    function() {
      const self = this;
      this.title = "Waveform";
      this.sect = "media";
      this.icon = "f1fe"; //"fas fa-chart-area";
      this.desc = "Generate a waveform for an audio file (or a video's audio).";
      this.disabled = true;
      this.onUse = function() {};
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   Insert_Waveform()   🙤═─────══─────═❖
▓                                                                      */
        Insert_Waveform: function(file) {
          //https://wavesurfer-js.org/docs/
          if (!document.getElementById("IUP-wf-script")) {
            document.head.insertAdjacentHTML( "beforeEnd", this.con.injectScript ); // prettier-ignore
          }
          var instance = self.var.WaveSurfer_Instance.val;
          instance = WaveSurfer.create({
            container: "#waveform",
            waveColor: "violet",
            progressColor: "purple",
          });
          instance.load(file);
        },
      };
      this.var = {
        WaveSurfer_Instance: { val: null },
      };
      this.con = {
        injectScript:
          '<script id="IUP-wf-script" src="' + FileLib.cmd.getURL("vendor/wavesurfer.min.js") + '"></script>',
      };
    },
  ],
  // ▊END SECTION▊
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯











ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█         DRAWING BOARD          █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓ */
  DrawingBoard: [
    function() {
      const self = this;
      this.title = "Drawing Board";
      this.sect = "notes";
      this.icon = "f1fc"; //"fas fa-paint-brush";
      this.desc = "Draw on the page.";
      this.disabled = true;
      this.onInit = function() {
        // self.cmd.Init_Drawing_Board();
      };
      this.onUse = function() {};
      /*
█ ❖ CONSTANTS                                                                   */
      this.con = {
        html: `<div class="wrap">
  <div class="border"></div>
  <canvas width="2000" height="4000">
</div>`,
      };
      /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   Init_Drawing_Board()   🙤═─────══─────═❖
▓                                                                           */
        Init_Drawing_Board: function() {
          keybind = new window.keypress.Listener();
          keybind.simple_combo("alt b", function() {
            self.cmd.Inject_Drawing_Board();
          });
        },
        /*
█
▓█═─────══─────═🙦   Inject_Drawing_Board()   🙤═─────══─────═❖
▓                                                                           */
        Inject_Drawing_Board: function() {
          const ID = "IUP-db",
            shadowWrapHTML = `<div id="${ID}"></div>`,
            atramentScript = `<script src="` + FileLib.cmd.getURL("/vendor/atrament.js") + `"></script>`; // prettier-ignore
          var shadow = document.getElementById(ID);
          if (shadow) shadow.remove();
          document.body.insertAdjacentHTML("beforeEnd", shadowWrapHTML);
          shadow = document.getElementById(ID);

          /*
█ ❖ Inject HTML                                                                   */
          var shadowRoot = shadow.attachShadow({ mode: "open" });
          shadowRoot.innerHTML = self.con.html;
          FileLib.cmd.getScript({
            file: "DrawingBoard.css",
            doc: shadowRoot,
            ID,
          });

          const canvas = shadowRoot.querySelector("canvas"),
            board = atrament(canvas),
            KeybindIndex = {
              "alt b": function() {
                self.cmd.Toggle_Drawing();
              },
              esc: function() {
                self.cmd.Toggle_Drawing("deactivate");
              },
              "alt c": function() {
                self.var.board.clear();
              },
              "alt z": function() {
                if (!self.var.eraseMode) {
                  self.var.board.mode = "erase";
                  self.var.board.weight = 20;
                  self.var.eraseMode = true;
                  var url = FileLib.cmd.getURL("/utility/DrawingBoard/eraser.svg"); // prettier-ignore
                  self.var.node.canvas.style.cursor = `url(${url}) -4 -4, not-allowed`;
                } else {
                  self.var.board.mode = "draw";
                  self.var.board.weight = 3;
                  self.var.eraseMode = false;
                  self.var.node.canvas.style.cursor = "crosshair";
                }
              },
            };
          for (var KEY in KeybindIndex) {
            keybind.simple_combo(KEY, KeybindIndex[KEY]);
          }
          board.color = "#F00";
          board.weight = 1;

          /*
█ ❖ Setup Keybinds                                                                   */
          keybind = new window.keypress.Listener();
          keybind.simple_combo("alt b", function() {
            self.cmd.Toggle_Drawing();
          });
          keybind.simple_combo("esc", function() {
            self.cmd.Toggle_Drawing("deactivate");
          });
          keybind.simple_combo("alt c", function() {
            self.var.board.clear();
          });
          keybind.simple_combo("alt z", function() {
            if (!self.var.eraseMode) {
              self.var.board.mode = "erase";
              self.var.board.weight = 20;
              self.var.eraseMode = true;
              var url = FileLib.cmd.getURL("/utility/DrawingBoard/eraser.svg"); // prettier-ignore
              self.var.node.canvas.style.cursor = `url(${url}) -4 -4, not-allowed`;
            } else {
              self.var.board.mode = "draw";
              self.var.board.weight = 3;
              self.var.eraseMode = false;
              self.var.node.canvas.style.cursor = "crosshair";
            }
          });

          /*
█ ❖ Save Vars                                                                   */
          self.var.keybind = keybind;
          self.var.board = board;
          self.var.node = {
            shadow: shadow,
            wrap: shadowRoot.querySelector(".wrap"),
            canvas: shadowRoot.querySelector("canvas"),
          };
        },
        /*
█
▓█═─────══─────═🙦   Toggle_Drawing()   🙤═─────══─────═❖
▓                                                                           */
        Toggle_Drawing: function(action = "toggle") {
          const activate = action == "activate" || (action == "toggle" && !self.var.active),  // prettier-ignore
            deactivate = action == "deactivate" || (action == "toggle" && self.var.active); // prettier-ignore
          if (activate) {
            self.var.node.wrap.classList.add("is-active");
            self.var.active = true;
          } else if (deactivate) {
            self.var.node.wrap.classList.remove("is-active");
            self.var.active = false;
          }
        },
      };
      this.var = {
        active: false,
        eraseMode: false,
        node: {
          shadow: null,
          wrap: null,
          canvas: null,
        },
        board: null,
        keybind: null,
      };
      // this.context = [
      //   {
      //     selector: "global",
      //     items: [
      //       {
      //         id: "",
      //         title: "",
      //         icon: "",
      //         onUse(T) {}
      //       }
      //     ]
      //   }
      // ];
    },
  ],
  /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                      ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯











ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  PAGE METADATA  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ DATA STRUCTURE:
▓   ◇ {data} gets an ARRAY of all instances of the metadata (in case there's more than one of a meta tag)
▓   ◇ In each ARRAY is an object:
▓     ⬥ data.code is the HTML tag used to obtain data, or the object property
▓     ⬥ data.dataFields is an array of names of the fields the tag uses (optional, if there are multiple fields)
▓     ⬥ data.val is the value, or an array of values if there are multiple fields
▓ ❖ TODO:
▓   ◇ Move item description tooltips to (?) icon
▓   ◇ Separate item categories into individual collapsable tables. Tables besides main start collapsed. (Remember state?) Replaces Advanced toggle.
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
  pageMetadata: [
    function() {
      const self = this;
      this.title = "Page Metadata";
      this.sect = "page";
      this.icon = "f2d0"; //"far fa-window-maximize";
      this.module = "PageMetadata.js";
      this.desc = "View and edit the page's metadata.";
      /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
      this.cmd = {
        /*
█
▓█═─────══─────═🙦   buildPanel()   🙤═─────══─────═❖
▓                                                                      */
        buildPanel: function(Panel) {
          var tableHTML = "";
          FileLib.cmd.getScript({ file: "PageMetadata.css", doc: Panel.node.content }); // prettier-ignore
          for (var M in self.con.metaIndex) {
            let { title, desc, value, advanced } = self.con.metaIndex[M];
            advanced = advanced ? " advanced" : "";
            /*
█ ❖ Generate HTML from data                                                                   */
            data = value();
            if (data === undefined || (!data.val && !data.attrNames)) {
              continue;
            } else {
              desc = data.code ? desc + "\nSource: " + data.code : desc;
              tableHTML += `<div class="item-label${advanced}" title="${desc}">${title}:</div><div class="cell${advanced}">`;

              if (data.val !== undefined) {
                tableHTML += `<div title="${desc}">${data.val}</div>`;
              } else if (data.values[0] !== undefined) {
                let numAttr = data.attrNames.length;
                tableHTML += `<div class="attr-grid" style="grid-template-columns:repeat(${numAttr}, auto)">`;
                // generate rows from each node
                data.values.forEach((node) => {
                  let code = _.escape(node.code),
                    count = 0;
                  // generate a cell for each node attribute
                  node.val.forEach((val) => {
                    var title = data.attrNames[count];
                    tableHTML += `<div class="sub-cell" title="${title}: ${code}">${val}</div>`;
                    count++;
                  });
                });
                tableHTML += `</div>`;
              }
              tableHTML += `</div>`;
            }
          }
          Panel.node.content.innerHTML = `<div class="metadata-table">${tableHTML}</div>`;
        },
        /*
█
▓█═─────══─────═🙦   Change_Metadata()   🙤═─────══─────═❖
▓ Change metadata item {id} via its edit() method. If multiple items of the same type are found, specify optional {iteration}.                                                                     */
        Change_Metadata: function(id, attr = 0, iteration = 0) {
          var data = self.con.metaIndex[id];
          if (!data || typeof data.value != "function") {
            console.error(`IUP Change_Metadata Error: Problem accessing item ${id}.`);
            return false;
          }
          if (typeof data.edit != "function") {
            console.error(`IUP Change_Metadata Error: Item ${id} can't be edited.`);
            return false;
          }
          var val = data ? data.value().val : "",
            prompt = UILib.cmd.buildDialog({ preset: "textbox", val });
          // prompt = window.prompt("New value:", val);
          if (prompt) data.edit(prompt);
        },
      }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
      this.var = {};
      /*
█ ❖ SUBMENU                                                                   */
      this.submenu = [
        {
          title: "Change Favicon",
          onUse(t) {
            self.cmd.Change_Metadata("favicon");
          },
        },
        {
          title: "Change Title",
          onUse(t) {
            self.cmd.Change_Metadata("title");
          },
        },
      ];
      /*
█ ❖ CONTEXT MENU                                                                   */
      this.context = {
        selector: "global",
        items: [
          {
            title: "Change page title...",
            input: {
              inline: true,
              type: "text",
              val: document.title,
              onSubmit: (val) => (document.title = val),
            },
          },
          {
            title: "Toggle design mode",
            icon: "",
            desc: "Toggle the document's design mode, allowing it to be edited.",
            onUse(T) {
              if (document.designMode == "off") document.designMode = "on";
              else document.designMode = "off";
            },
          },
        ],
      };
      /*
█ ❖ PANEL                                                                   */
      this.panel = {
        id: "panel",
        title: "Page Metadata",
        tabName: "Panel",
        onLoad: self.cmd.buildPanel,
      };
    },
  ],
};
/*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯








































/*





ⸯ   				            ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█     🙢  OTHER FUNCTIONS  🙠    █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▒                                ▒﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊█
▓ ❖ GENERAL:
▓   ◇ getDomain()
▓   ◇ lightDark()*/

// █═─────══─────═🙦   lightDark()   🙤═─────══─────═❖
// ⮚ Check if color is light or dark. Light = true, dark = false.
// src: https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area
function lightDark(color) {
  // ❖ Extract RGB values from color
  if (color.substr(0, 1) == "#") {
    var [r, g, b] = [1, 3, 5].map((n) => parseInt(color.substr(n, 2), 16));
  } else if (color.substr(0, 3) == "rgba") {
    var [r, g, b] = color.substr(5, color.length - 2).split(",");
  } else if (color.substr(0, 3) == "rgb") {
    var [r, g, b] = color
      .substr(4, color.length - 2)
      .split(",")
      .map((n) => parseInt(n));
  }

  // ❖ Calculate brightness value
  return (r * 299 + g * 587 + b * 114) / 1000 >= 128;
}
