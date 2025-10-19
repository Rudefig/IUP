/*
ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█       🙢  PREVIEW.JS  🙠       █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ DESCRIPTION ❖
▓   ◇ Utility Previews allows the user to preview, learn 🙵 customize a utility.
▓
▓ ❖ FUNCTIONALITY ❖
▓   ◇ Ⅰ. Run IUP init scripts.
▓   ◇ Ⅱ. Get utility from URL.
▓   ◇ Ⅲ. Import preview data.
▓   ◇ Ⅳ. Load utility, run onLoad() script.
▓   ◇ Ⅴ. Load CommandBars, inject preview bar.
▓
▓ ❖ PREVIEW DATA ❖
▓  Preview data for utilities are stored in their own JS & CSS files.
▓  preview = {
▓   ◇ .css:      CSS injected into shadow DOM.
▓   ◇ .html:     HTML injected into shadow DOM.
▓   ◇ .onLoad(): Run this script after utility is loaded.
▓   ◇ .cmdBar[]: Command bar buttons for preview UI control.
▓
▓ ❖ TODO ❖
▓   ◇
▓
▓═──────────────────────────────═🙦ⸯ⟅ ∽ 🎕 ∼ ⟆🙤═─────────────────────────────═ǁ */

/*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ INITIALIZATION ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
const getUrlParam = new URLSearchParams(window.location.search),
  U = getUrlParam.get("q"),
  dataFile = chrome.runtime.getURL(`/preview/${U}.js`),
  wrap = document.querySelector("#wrap-box"),
  nodeTitle = document.querySelector("#title"),
  nodeDesc = document.querySelector("#desc"),
  nodeActivate = document.querySelector("#activate");
ExecutiveLib.var.getSettings(s => {
  FileLib.cmd.getScript(["css", "jqu"]);
  LayoutLib.cmd.injectCSS();

  if (!U) errorMsg("ERROR", "No utility was specified.");
  else {
    /*


█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ IMPORT DATA ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
    import(dataFile).then(
      data => {
        /*
█ ❖ IMPORT & LOAD ⬥ Import preview data from file; inject CSS; load utility data.                                                                  */
        const { html, onPreviewInit, onPreviewLoad, onLoad, onInit, onActivate, onDeact, props, meta } = data.preview, // prettier-ignore
          { lab = false, propStyle = true } = data.preview.meta; // prettier-ignore
        cssFile = propStyle && !lab ? "@import url(prop-style.css);" : ""; // prettier-ignore
        var css = `<style>${cssFile}@import url("${U}.css");</style>`,
          DOC;
        if (!lab) ExecutiveLib.cmd.loadUtility(U, onUtilityLoad);
        else onUtilityLoad(data.preview);
        function onUtilityLoad(self) {
          const { title = self.title, desc = self.desc, activate = true, targ } = data.preview.meta; // prettier-ignore
          /*
█ ❖ SETUP PAGE                                                                   */
          if (lab) document.body.classList.add("lab");
          nodeTitle.iuData("text", `🞘 ${title} 🞘`);
          if (desc) nodeDesc.innerHTML = desc;
          else nodeDesc.remove();
          if (activate && !lab) null;
          else nodeActivate.remove();
          if (targ) {
            const targHTML = `<style>#targ-overlay{ visibility: visible; --o-top:${targ.top}px; --o-left:${targ.left}px; --o-width:${targ.width}px; --o-height:${targ.height}px; }</style>`; // prettier-ignore
            document.head.insertAdjacentHTML("beforeEnd", targHTML);
          }

          /*
█ ❖ SETUP DEMO AREA                                                                   */
          if (propStyle && !lab) {
            const rangeOpacity = [0.48, 0.78],
              rangeBlur = [0.25, 0.75];
            // css += FileLib.cmd.getScript(["fontawesome-all.css"]);
            DOC = wrap.attachShadow({ mode: "open" });
            DOC.innerHTML = `<div id="head">${css}</div><div id="body">${html}</div>`;
          } else {
            DOC = document;
            DOC.head.insertAdjacentHTML("beforeEnd", css);
            wrap.innerHTML = html;
          }

          // ❖ ACTIVATION SWITCH
          if (activate) {
            const injectBtn = buildInput({
              id: "activate-btn",
              type: "bool",
              component: "switch",
              size: "lg",
              label: "INJECT",
              onEdit(e, activating) {
                if (activating) {
                  if (onLoad) onLoad(self, DOC, props);
                  else if (self.onLoad) self.onLoad();
                  if (onActivate) onActivate(self, DOC, props);
                  else if (onInit) /*❌*/ onInit(self, DOC, props);
                  else if (self.onActivate) self.onActivate();
                  else if (self.onInit) /*❌*/ self.onInit();
                } else {
                  if (onDeact) onDeact(self, DOC, props);
                  else if (self.onDeact) self.onDeact();
                }
              }
            });
            nodeActivate.appendChild(injectBtn);
          }
          if (onPreviewInit) onPreviewInit(self, DOC, props);
          // __B(onPreviewLoad);
          // if (onPreviewLoad) {
          //   window.onload = function() {
          //     __G("LOADED");
          //     onPreviewLoad(self, DOC, props);
          //   };
          // }
        }
      },
      fail => errorMsg("ERROR", `Couldn't locate script for utility "${U}".`)
    );
  }
});

/*
█
▓═─────══─────═🙦   errorMsg()   🙤═─────══─────═❖
▓ Show an error message instead of a preview.                                                                          */
function errorMsg(title, desc) {
  // document.querySelector("#title").iuData("text", title);
  // document.querySelector("#desc").innerHTML = desc;
  // document.querySelector("#wrap-inner").remove();
}
