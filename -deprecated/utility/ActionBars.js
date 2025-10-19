/*ⸯ                     ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  COMMAND BARS  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ INDEX ❖
▓   ◇ constants
▓     ⬥ shadowClass
▓     ⬥ cssClass
▓     ⬥ animationClass
▓     ⬥ defaultBars
▓
▓══─────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══─────────────══▓  */
export var con = {
  shadowClass: "IUP-ab",
  cssClass: "btn-style",
  defaultBars: {
    /*
█
▓═─────══─────═🙦   BAR: FULL SCREEN NAVIGATION   🙤═─────═❖
▓                                                                            */
    fullScreenNav: {
      title: "Full Screen Navigation",
      desc: "Navigate history and tabs while in full screen.",
      toggleOnFullScreen: true,
      scope: "global",
      disabledIf: () => !history.length,
      buttons: [
        {
          id: "back",
          title: "Go back",
          icon: "fas fa-arrow-circle-left",
          grayedIf: () => !(window.history.length - 1),
          onUse: function() {
            window.history.back();
          },
          onUseCtrl: function() {
            WindowLib.cmd.Navigate_History("first");
          }
        },
        {
          id: "forward",
          title: "Go forward",
          icon: "fas fa-arrow-circle-right",
          grayedIf: () => !(window.history.length - 1),
          onUse() {
            window.history.forward();
          }
        },
        {
          id: "refresh",
          title: "Reload page",
          icon: "fas fa-redo",
          onUse() {
            window.location.reload();
          },
          onHoldEnd() {
            window.location.reload(true);
          }
        },
        {
          id: "home",
          title: "Back to index",
          icon: "fas fa-home",
          onUse: function() {
            window.location.reload();
          },
          onContext: function(btn) {}
        },
        {
          id: "prevTab",
          title: "Previous Tab\n(Ctrl+Shift+Tab/Ctrl+PgUp)",
          icon: "",
          onUse: function() {
            chrome.runtime.sendMessage({ setActiveTab: "prev" });
          }
        },
        {
          id: "nextTab",
          title: "Next Tab\n(Ctrl+Tab/Ctrl+PgDn)",
          icon: "",
          onUse: function() {
            chrome.runtime.sendMessage({ setActiveTab: "next" });
          }
        }
      ]
    }
    /*
█
▓═─────══─────═🙦   BAR: COMIC READER   🙤═─────═❖
▓ TODO: Enhance utility functionality to support this, or make its own utility                                                                           */
    /*,
    comicReader: {
      title: "Comic Reader",
      desc:
        "Back, forward, and refresh buttons that appear while in full screen.",
      toggleOnFullScreen: true,
      scope: { set: "global" }
      buttons: [
        {
          id: "back",
          title: "Click to go back",
          icon: "fas fa-arrow-circle-left",
          grayedIf: function() {
            return history.length <= 1;
          },
          onUse: function() {
            window.history.back();
          }
        },
        {
          id: "forward",
          title: "Click to go forward",
          icon: "fas fa-arrow-circle-right",
          onUse: function() {
            window.history.forward();
          }
        },
        {
          id: "home",
          title: "Return home",
          icon: "fas fa-home",
          onUse: function() {
            window.location.reload();
          }
        },
        {
          id: "prevTab",
          title: "Next Tab",
          icon: "fas fa-angle-double-left",
          onUse: function() {
            chrome.runtime.sendMessage({ setActiveTab: "next" });
          }
        },
        {
          id: "nextTab",
          title: "Next Tab",
          icon: "fas fa-angle-double-right",
          onUse: function() {
            chrome.runtime.sendMessage({ setActiveTab: "prev" });
          }
        }
      ]
    }*/
    //▊END DEFAULT BARS▊
  },
  /*
█
▓═─────══─────═🙦   SHADOW DOM HTML   🙤═─────═❖
▓                                                                            */
  shadowHTML: `<div class="wrap-box"></div>`
};
