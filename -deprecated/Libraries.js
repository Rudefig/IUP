/*







ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  EXECUTIVE LIBRARY  🙠   █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ CONSTANTS ❖
▓   ◇ scripts
▓
▓ ❖ COMMANDS ❖
▓   ◇ loadUtility()
▓   ◇ getModuleData()
▓   ◇ Open_Settings_Page()
▓   ◇ buildSettingsGrid()
▓   ◇ changeSetting()
▓   ◇ updateSections()
▓   ◇ rebuildSettings()
▓
▓ ❖ VARIABLES ❖
▓   ◇ getSettings()
▓   ◇ buildGlobalVars()
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
const ExecutiveLib = new function() {
  const self = this;

  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.cmd = {
    /*
█
▓█═─────══─────═🙦   sendBackgroundMessage()   🙤═─────══─────═❖
▓                                                                        */
    //TODO: Support multiple utilities at once
    sendBackgroundMessage: function(data) {
      chrome.runtime.sendMessage({ ...data, IUP, WIN: window });
    },
    /*
█
▓█═─────══─────═🙦   loadUtility()   🙤═─────══─────═❖
▓ Construct utility {U} and return it in {callback}.                                                                       */
    //TODO: Support multiple utilities at once
    loadUtility: function(U, callback) {
      if (!UtilityData) throw new Error("IUP:loadUtility couldn't find utility data."); // prettier-ignore
      if (!UtilityData[U]) throw new Error("IUP:loadUtility couldn't find the utility ID."); // prettier-ignore
      const Constructor = UtilityData[U][0];
      var Tool = new Constructor();
      if (Tool.module) self.cmd.getModuleData(Tool, (data) => callback(data));
      else callback(Tool);
    },
    /*
█
▓█═─────══─────═🙦   getModuleData()   🙤═─────══─────═❖
▓ Merge module data with utility {Tool} data, return in {callback}.                                                                       */
    getModuleData: function(Tool, callback, filename) {
      var file = FileLib.cmd.getURL(`/utility/${Tool.module || filename}`);
      import(file).then(
        (moduleData) => {
          var dataGroups = ["cmd", "var", "con", "meta", "settings", "context"];
          dataGroups.forEach((D) => {
            if (D in moduleData) Tool[D] = { ...Tool[D], ...moduleData[D] };
          });
          callback(Tool);
        },
        (fail) => {
          console.error(fail);
          callback(Tool);
        }
      );
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ buildUtilityPanel ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓   Build & open a utility's panel with tabs for settings, help, and feedback.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓                                                                               */
    buildUtilityPanel: function(U, arg) {
      // const IconRegisty = ["cog.svg"], "award.svg"
      const iconCog = FileLib.cmd.getURL(`/assets/icons/cog.svg`),
        iconAward = FileLib.cmd.getURL(`/assets/icons/award.svg`),
        iconInfo = FileLib.cmd.getURL(`/assets/icons/info-circle.svg`),
        iconComment = FileLib.cmd.getURL(`/assets/icons/comment2.svg`),
        iconEye = FileLib.cmd.getURL(`/assets/icons/eye.svg`),
        // feedback HTML
        htmlFeedback = `
<fieldset class="radio-btn">
  <input name="category" id="problem" value="problem" type="radio">
  <label for="problem">PROBLEM</label>
  <input name="category" id="suggestion" value="suggestion" type="radio">
  <label for="suggestion">SUGGESTION</label>
</fieldset>
<br><br>
<textarea></textarea>
<br>
<button>Submit</button>`,
        // progress HTML
        htmlProgress = `<svg viewBox="0 0 280 24">
<circle fill="#000" cx="12" cy="12" r="12">
    </svg>`;
      var { panel, meta, title, desc, preview } = window.IUP.U[U];
      if (!Array.isArray(panel)) panel = [panel];
      if (typeof arg == "string") arg = { initialTab: arg };
      var Panel = UILib.cmd.UI_Modal({
        id: `panel-${U}`,
        ...arg,
        tabs: [
          ...panel,
          null,
          {
            id: "preview",
            tabName: `<img src="${iconEye}">`,
            hidden: !preview,
            onUse() {
              const url = FileLib.cmd.getURL(`/preview/index.html?q=${U}`);
              window.open(url, "_blank");
            },
          },
          {
            id: "feedback",
            tabName: `<img src="${iconComment}">`,
            title: `Feedback ⬩ ${title}`,
            content: htmlFeedback,
          },
          {
            id: "progress",
            tabName: `<img src="${iconAward}">`,
            title: `Progress ⬩ ${title}`,
            content: htmlProgress,
          },
          {
            id: "info",
            tabName: `<img src="${iconInfo}">`,
            title: `Help ⬩ ${title}`,
            content(node) {
              node.insertAdjacentHTML("beforeEnd", `<p>${desc}</p>`);
              if (meta && meta.info.howItWorks) {
                var code = `<h4>How It Works</h4><p>${meta.info.howItWorks}</p>`; // prettier-ignore
                node.insertAdjacentHTML("beforeEnd", code);
              }
              return node;
            },
          },
          {
            id: "settings",
            tabName: `<img src="${iconCog}">`,
            title: `Settings ⬩ ${title}`,
            style: `@import url(${FileLib.cmd.getURL("/utility/ExecutiveLib_settings.css")})`, // prettier-ignore
            content: node => node.appendChild(ExecutiveLib.cmd.buildSettingsGrid(U)), // prettier-ignore
            footer(node, Modal) {
              const resetBtn = document.createElement("a");
              resetBtn.id = "btn-reset";
              resetBtn.innerHTML = "Reset";
              resetBtn.onclick = function(e) {
                ExecutiveLib.cmd.resetSettings(U, () => {
                  Modal.loadTab("settings");
                });
              };
              node.appendChild(resetBtn);
              return node;
            },
          },
        ],
      });
    },
  };
}();

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                      ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯















ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  ELEMENT LIBRARY  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMMANDS ❖
▓   ◇ Animate_Element
▓   ◇ Rotate_Element
▓   ◇ injectCustomProps
▓
▓ ❖ VARIABLES ❖
▓   ◇ Element_Data
▓     ⬥ get_selector    (T, {mode, showTag, showID, showClass, outputAs})
▓     ⬥ largest_node    (selector, outputAs)
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
const ElementLib = new function() {
  const self = this;
  this.con = {
    customPropPrefix: "data-iup-",
  };

  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                  */
  this.cmd = {
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Extract_Element() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                    Extract an element from the page.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .Target   = <element> Target element.
▓                                                                               */
    Extract_Element: function(arg) {
      const { target } = arg;
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Animate_Element() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                    Execute an IUP animation on an element.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .Target   = <element> Target element.
▓   ◇ .animName = (str) Animation name.
▓                                                                               */
    Animate_Element: function(Target, animName) {
      const PRE = "iuAnimate",
        script = { file: "animate-style.css" };

      const Node = LayoutLib.cmd.buildShadowDOM({ PRE, script }),
        AnimateNode = document.createElement("div"),
        __target = Target.cloneNode(true),
        __background = document.createElement("div"),
        { top, left } = Target.iuPosition,
        { width, height } = Target.getBoundingClientRect();

      const CSSVarIndex = {};
      // ❖ Set positioning variables
      CSSVarIndex[`--${PRE}-page-height`] = LayoutLib.var.get_page_height();
      CSSVarIndex[`--${PRE}-top`] = `${top}px`;
      CSSVarIndex[`--${PRE}-left`] = `${left}px`;
      CSSVarIndex[`--${PRE}-width`] = `${width}px`;
      CSSVarIndex[`--${PRE}-height`] = `${height}px`;
      Node.body.iuCSS(CSSVarIndex);
      Target.iuCSS({ visibility: "hidden", opacity: 0 });

      // ❖ Setup DOM & execute animation
      Node.body.appendChild(AnimateNode);
      AnimateNode.appendChild(__target);
      AnimateNode.appendChild(__background);
      AnimateNode.className = `${PRE} -${animName}`;
      __target.className = `${PRE}__target -${animName}`;
      __background.className = `${PRE}__background -${animName}`;

      // ❖ Cleanup after animation
      __target.addEventListener("animationend", (e) => {
        AnimateNode.remove();
        if (!Node.body.childElementCount) Node.deact();
      });
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Rotate_Element() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                Rotate transformation on a target element.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .val            = {value}
▓   ◇ .target         = target selector
▓   ◇ .operation      =
▓     ⬥ "reset" - Remove the transform style
▓     ⬥ "set" - Set rotation to {value}
▓     ⬥ "change" - Increase/decrease rotation by {value}
▓     ⬥ "clockwise|cw" - Rotate 90° clockwise
▓     ⬥ "counterclockwise|ccw" - Rotate 90° counterclockwise
▓     ⬥ TODO "flip horizontal|fliph" - Flip horizontally
▓     ⬥ TODO "flip vertical|flipv" - Flip vertically
▓   ◇ .maintainLayout = {value}
▓ ❖ TODO ❖
▓   ◇ Move degrees operations to its own data type in Types.js
▓   ◇ Rotate element without disrupting the layout: Position element absolute, insert dummy <div> behind with same size */
    Rotate_Element: function(arg) {
      const { target, operation = "set" } = arg;
      var val = arg.val;
      val = val.match(/(\d+)(°|deg)/)[1];
      //TODO: Detect if target has data-transform-id, use that as addClass ID, if not generate a unique ID for it
      // ❖ Extract current degree value
      var data = LayoutLib.var.css_prop_to_data(target, "transform");
      var degree = data.rotate ? data.rotate[0] : 0;
      if (operation == "reset") {
        // ❖ Reset rotation
        degree = 0;
      } else {
        // ❖ Calculate new rotation
        if (operation == "clockwise" || operation == "cw") {
          if (degree >= 270) degree = degree - 270;
          else degree += 90;
        } else if (operation == "counterclockwise" || operation == "ccw") {
          if (degree <= 90) degree = 360 - (90 - degree);
          else degree -= 90;
        } else if (operation == "change") degree = degree + val;
        else degree = val;

        data.rotate = [degree, "deg"];
        delete data.matrix;
        var prop = LayoutLib.var.css_data_to_prop(data);
        LayoutLib.cmd.Node_Style({ target, id: "transform", css: prop });
        // ❖ Apply transformation
        // var code = `.IUP-rotate-target { transform: rotate(${degree}deg); }`;
        // existingNode = document.querySelector(".IUP-rotate-target");
        // if (existingNode) existingNode.classList.remove("IUP-rotate-target");
        // target.classList.add("IUP-rotate-target");
      }
    },

    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ injectCustomProps() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓        Inject custom properties 🙵 methods into the element prototype.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PROPERTY INDEX ❖
▓
▓ ❖ iuCSS() ❖
▓ Get/set CSS properties, individually or in bulk.
▓  ◇ CSS variables are supported.
▓ {prop, val} =
▓   ⬥ "string"           = Get CSS property {prop}.
▓   ⬥ ["array"]          = Get multiple properties as object {"prop-name": "value"} from array of properties {prop}.
▓   ⬥ "string", "string" = Set CSS property {prop} to {val}.
▓   ⬥ {object}           = Set multiple properties from object {prop} as {"prop-name": "value"}.
node.iuCSS("prop-name")  GET⮚  "prop value"
node.iuCSS(["name-1", "name-2"])  GET⮚  { "name-1": "value 1", "name-2": "value 2" }
node.iuCSS("name", "value")  SET⮚  name = "value"
node.iuCSS({"name-1": "value 1", "name-2": "value 1"}  SET⮚  name-1 = "value 1"; name-2 = "value 2"
█
▓ ❖ iuData() ❖
▓ Get/set custom data attributes.
▓  ◇ If {val} is an object or function, it is automatically converted to & from JSON.
▓  ◇ Attributes are auto-prefixed with "data-iup-".
▓ {prop, val} =
▓   ⬥ "string"           = Retrieve data property {prop}.
▓   ⬥ "string", "string" = Set attribute {prop} to {val}.
▓   ⬥ Remove attribute {prop}.
node.iuData("prop name")  GET⮚  "prop value"
█
▓ ❖ MISC ❖
▓ Retrieve various other properties.
▓   ⬥ .tag            = Get the element tag, lower case.
▓   ⬥ .isHidden       = Returns true depending on these css properties: display, visibility
▓   ⬥ .hasBackground  = Determine if element has a background image or color.
▓   ⬥ .scrollbarSizeX/Y  = Calculate the width/height of the horizontal or vertical scrollbar.
▓                                                                               */
    injectCustomProps: function(WIN = window, Node) {
      if (WIN.constructor.name == "HTMLDocument") {
        WIN = WIN.contentWindow || WIN.defaultView;
      }
      if (WIN.constructor.name == "Window") {
        NodeProto = WIN.Node.prototype;
        ElementProto = WIN.HTMLElement.prototype;
      }
      NodeProto = NodeProto || ElementProto;
      /*

█
▓█═─────══─────═🙦   .css()   🙤═─────══─────═❖
▓ Get or set CSS properties.                                                                           */
      ElementProto.iuCSS = function(prop, val) {
        const style = window.getComputedStyle(this),
          DefaultVals = {
            position: "static",
            "background-color": "rgba(0, 0, 0, 0)",
            "background-image": "none",
            "background-position": "0% 0%",
            "background-size": "auto",
          };
        /*

█ ❖ SET CSS
▓ Set prop {prop} to {val}, or set array of props [prop] to array of [val].                                                                    */
        if (val) {
          if (typeof val == "string") this.style.setProperty(prop, val);
          else if (typeof prop == "object" && typeof val == "object") {
            prop.forEach((K, P) => this.style.setProperty(P, val[K])); // set multiple props from array
          }
        } else if (!Array.isArray(prop) && typeof prop == "object") {
          for (var name in prop) {
            if (name in this.style) this.style[name] = prop[name];
            else this.style.setProperty(name, prop[name]);
          }
        } else {
          /*

█ ❖ GET CSS
▓ Return value of prop {prop} or return object of props from array [prop].                                                                   */
          if (typeof prop == "string") return getCSSProp(prop);
          else if (typeof prop == "object") {
            var list = {};
            prop.forEach((P) => (list = getCSSProp(P, list)));
            return list;
          }
          return false;
        }
        /*

█ ❖ getCSSProp()
▓ Return property value {P}. If {list} is provided, add property and return list instead.
▓ ⬥ Default prop values will return null based on {DefaultVals}. Ex: Null "background-color" value = "rgba(0, 0, 0, 0)", return "" instead.                         */
        function getCSSProp(prop2, list = null) {
          const val = style.getPropertyValue(prop2);
          if (!list) return val == DefaultVals[prop2] ? null : val;
          if (prop2.startsWith("--")) {
            var oldName = prop2;
            prop2 = s.camelize(prop2, true);
            delete list[oldName];
          }
          list[prop2] = val == DefaultVals[prop2] ? null : val;
          return list;
        }
      };
      /*

█
▓█═─────══─────═🙦   .iuData()   🙤═─────══─────═❖
▓ Get, set, and delete custom attributes. (data-name="value")
▓   ◇ GET: Leave {val} blank to get data from {attr}.
▓     ⬥ If {val} = false, return {} instead of no data.
▓   ◇ SET: Specify {val} to set {attr} value to it.
▓   ◇ DELETE: {remove} = true to remvoe the data attribute.                                                                          */
      //TODO: Get rid of HTMLElement.prototype
      ElementProto.iuData = function(attr, val, remove) {
        attr = self.con.customPropPrefix + attr;
        if (remove) {
          if (this.hasAttribute(attr)) this.removeAttribute(attr);
        } else if (val) {
          if (["object", "function"].includes(typeof val)) {
            val = JSON.stringify(val);
          }
          this.setAttribute(attr, val);
        } else {
          var data = this.getAttribute(attr);
          if (!data && val === false) data = {};
          try {
            return JSON.parse(data);
          } catch (e) {
            return data;
          }
        }
      };
      if ("tag" in Element) {
        return console.error("Warning: injectCustomProps() already executed.");
      }
      /*
█
▓█═─────══─────═🙦   MISCELLANEOUS   🙤═─────══─────═❖
▓ Various other element properties.                                                                           */
      Object.defineProperties(ElementProto, {
        /*
█ ❖ .tag
▓ Get the element tag.                                                                  */
        // tag: {
        //   get: function() {
        //     return this.tagName.toLowerCase();
        //   }
        // },
        /*
█ ❖ .isHidden
▓ Check element's computer opacity, visibility, & display to determine if it's hidden.                                                                  */
        isHidden: {
          get: function() {
            var hidden = false,
              css = this.IUP.css(["opacity", "visibility", "display"]);
            if (css.opacity != "" && css.opacity < 0.1) hidden = true;
            if (css.visibility != "visible") hidden = true;
            if (css.display == "none") hidden = true;
            return hidden;
          },
        },
        /*
█ ❖ .hasBackground
▓ Determine if element has a background image or color.                                                                 */
        // hasBackground: {
        //   get: function() {
        //     const css = this.iuCSS(["background-image", "background-color"]);
        //     if (!css["background-image"] && !css["background-color"]) return false; // prettier-ignore
        //     return true;
        //   }
        // },
        /*
█ ❖ .scrollbarSizeX/Y
▓ Get the size of the horizontal or vertical scrollbar.                                                                  */
        // scrollbarSizeX: {
        //   get: function() {
        //     if (this.constructor.name == "HTMLBodyElement") {
        //       const { win, doc } = this.iuDOM;
        //       return win.innerWidth - doc.clientWidth;
        //     } else return this.offsetWidth - this.clientWidth;
        //   }
        // },
        // scrollbarSizeY: {
        //   get: function() {
        //     if (this.constructor.name == "HTMLBodyElement") {
        //       const { win, doc } = this.iuDOM;
        //       return this.innerHeight - this.clientHeight;
        //     } else return this.offsetHeight - this.clientHeight;
        //   }
        // },
        /*
█ ❖ .iuPosition
▓ Find the absolute X and Y of an element relative to the page document.                                                                  */
        iuPosition: {
          get() {
            var el = this,
              x = 0,
              y = 0;
            while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
              x += el.offsetLeft - el.scrollLeft;
              y += el.offsetTop - el.scrollTop;
              el = el.offsetParent;
            }
            return { top: y, left: x };
          },
        },
      });
      /*
█ ❖ .iuDOM
▓ Get a node's Window, Document, Head, and Body. Supports IUP shadow DOMs.
▓ { win, doc, head, body } = node.iuDOM;                                                                  */
      Object.defineProperties(NodeProto, {
        iuDOM: {
          get() {
            const node = this.getRootNode();
            if (node.constructor.name == "ShadowRoot") {
              return {
                win: node.ownerDocument.defaultView,
                doc: node,
                head: node.querySelector("#head"),
                body: node.querySelector("#body"),
              };
            } else if (node.constructor.name == "HTMLDocument") {
              return {
                win: node.defaultView,
                doc: node,
                head: node.head,
                body: node.body,
              };
            }
          },
        },
        /*
█ ❖ .iuNodeType
▓ Get a node's interface name.                                                                  */
        nodeType: {
          get() {
            var name = this.constructor.name;
            if (name.substring(0, 3) == "HTML") name = name.substring(3);
            return s.camelize(name);
          },
        },
      });
      //▊END PROPERTIES▊
    },
  }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.var = {
    /*
█
▓█═─────══─────═🙦   get_selector()   🙤═─────══─────═❖
▓ Get element {T}'s full selector as a string or <div> of color coded tags.
▓ arg = {
▓   ◇ .mode: Four selector styles to return
▓     ⬥ "code":        tag#id.class.class   *DEFAULT
▓     ⬥ "readable":    Tag #id .class.class
▓     ⬥ "tags":        [Tag] [id] [class] [class]
▓     ⬥ "symboltags":  [Tag] [#id] [.class] [.class]
▓   ◇ .showTag|showID|showClass: Set false to leave out.
▓   ◇ .outputAs:       "string|object"
▓
▓ ❖ SPECIAL TAG NAMES:
▓    IF {T} =                    THEN {tagName} =
▓     ⬥ "global|selection"          [the string]
▓     ⬥ {window.getSelection}       "selection"
▓     ⬥ Falsey value                "none"
▓                                                                               */
    get_selector: function(T, arg = {}) {
      if (!_.isElement(T)) return "";
      /*
█ ❖ Special exceptions                                                                   */
      if (["global", "selection", "video"].includes(T)) T = { tagName: T };
      if (T.name == "getSelection") T = { tagName: "selection" }; // node = window.getSelection
      if (!T) T = { tagName: "none" };
      /*
█ ❖ Extract tag, id, and classes from element properties                                                                   */
      const {
          mode = "code",
          showTag = true,
          showID = true,
          showClass = true,
          outputAs = "string",
        } = arg,
        { tagName, id, className } = T,
        separatorChar = "";
      if (outputAs == "object") {
        return {
          tag: tagName.toLowerCase(),
          id: id,
          class: className,
        };
      }
      var S = [
        showTag ? tagName.toLowerCase() : null,
        showID && id ? id : null,
        showClass && className ? className : null,
      ];
      switch (mode.toLowerCase()) {
        case "code":
          if (S[1]) S[1] = "#" + S[1];
          if (S[2]) S[2] = "." + S[2].replace(/\s/i, ".");
          break;
        case "readable":
          S[0] = s.capitalize(S[0]);
          if (S[1]) S[1] = "#" + S[1];
          if (S[2]) S[2] = "." + S[2].replace(/\s/i, " .");
          separatorChar = " ";
          break;
        case "symboltags":
          if (S[1]) S[1] = "#" + S[1];
          if (S[2]) S[2] = "." + S[2].replace(/\s/i, " .");
          break;
        case "symboltags":
        case "tags":
          S[0] = `<span class="s-tag">` + s.capitalize(S[0]) + `</span>`; // prettier-ignore
          if (S[1]) S[1] = `<span class="s-id">` + S[1] + `</span>`;
          if (S[2]) S[2] = S[2].split(/\s/i).map(v=> `<span class="s-class">${v}</span>`).join(); // prettier-ignore
          break;
      }
      S = S.join(separatorChar);
      if (mode == "tags" || mode == "symboltags") {
        S = `<div class="selector-tags">${S}</div>`;
      }
      return S;
    },
    /*
█
▓█═─────══─────═🙦   largest_node()   🙤═─────══─────═❖
▓ Calculate the largest node out of {selector}.
▓ {output} =
▓   "single": Return largest node.
▓   "list": Return all nodes with sizes.                                                                         */
    largest_node: function(selector, outputAs = "single") {
      const list = [],
        parseNodes = (N) => list.push({ node: N, size: N.width * N.height });
      document.querySelectorAll(selector).forEach(parseNodes);
      if (outputAs == "single") return _.max(list, (node) => node.size).node;
      if (outputAs == "list") return list;
    },
    /*
█
▓█═─────══─────═🙦   build_element()   🙤═─────══─────═❖
▓ Generate an element from a string or an object via document.createElement().
▓ arg = (string) `<tag class="classList" id="id" style="style">innerHTML</tag>`
▓ arg = (string) `tag.class#id`
▓ arg = (object) {
▓   ◇ .tag   = ("str") Element tag name.
▓   ◇ .clone = <element> Clone an element instead of creating a new one.
▓   ◇ .id    = ("str") Element ID.
▓   ◇ .class = ("str"|[arr]) String of a class/classes, or an array of classes.
▓   ◇ .style = ("str"|{obj}) String to set the 'style' attribute, or an object to pass to iuCSS().
▓                                                                                */
    build_element: function(arg, buildSVG = false) {
      if (typeof arg == "string") {
        if (arg[0] == "<") return buildElementFromHTML(arg, buildSVG);
        const tag = arg.match(/^(\w+)/)[1],
          id = arg.match(/#(\w+)/),
          classes = arg.match(/\.(\w+)/g),
          Element = document.createElement(tag);
        if (id) Element.id = id[1];
        if (classes) {
          Element.classList.add(...classes);
          Element.className = Element.className.replace(/\./g, "");
        }
        return Element;
      } else {
        const { tag, id, style, html, svg = buildSVG, appendChild } = arg;
        var Element = buildElementFromHTML(`<${tag}>`, svg);
        // ❖ ID
        if (id) Element.id = id;
        // ❖ Class
        if (typeof arg.class == "string") Element.className = arg.class;
        else if (Array.isArray(arg.class)) Element.classList.add(...arg.class);
        // ❖ Style
        if (typeof style == "string") Element.style = style;
        else if (typeof style == "object") Element.iuCSS(style);
        // ❖ HTML
        if (html) Element.innerHTML = html;
        return Element;
      }

      // ❖ buildElementFromHTML()
      function buildElementFromHTML(html, svg) {
        const parent = svg
          ? document.createElementNS("http://www.w3.org/2000/svg", "svg")
          : document.createElement("div");
        parent.innerHTML = arg;
        return parent.children[0];
      }
      // OLD CODE
      // const tag = arg.match(/^<(\w+)(\s|>)/),
      //   className = arg.match(/class="(.[^"']+)"/),
      //   id = arg.match(/id="(.[^"']+)"/),
      //   style = arg.match(/style="(.[^']+)"/),
      //   innerHTML = arg.match(/>(.+)<\//);
      // if (!tag) throw new Error("build_element() was given an invalid tag.");
      // const Element = document.createElement(tag[1]);
      // if (className) Element.className = className[1];
      // if (id) Element.id = id[1];
      // if (style) Element.style = style[1];
      // if (innerHTML) Element.innerHTML = innerHTML[1];
      // return element;
    },
  };
}();

/*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                      ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯















ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  FILE LIBRARY  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMMANDS:
▓   ◇ Download_File
▓   ◇ getURL              (path)
▓   ◇ getScript           ({arg}|flags, target, id)
▓   ◇ Create_Input_Field
▓
▓ ❖ VARIABLES:
▓   ◇
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
const FileLib = new function() {
  const self = this;
  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ CONSTANTS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.con = {
    /*
█ ❖ SCRIPT INDEX 〜 getScript(﻿)                                                                   */
    SCRIPT_INDEX: {
      groups: {
        iup: ["Types.js", "Input.js", "Libraries.js", "Utilities.js"], // ❖ All IUP JS scripts
        css: ["ui-style.css", "fontawesome-all.css"], // ❖ Main IUP CSS scripts
        js: ["jquery.js", "underscore.js", "underscore.string.js"], // ❖ Main JS libraries
        jqu: ["jquery-ui.js", "jquery-ui.css"], // ❖ jQuery UI
      },
      flags: [
        "TEMP",
        "Types.js",
        "Input.js",
        "Libraries.js",
        "Utilities.js",
        "Inject.js",
        "ui-style.css",
        "page-style.css",
        "font-style.css",
        "animate-style.css",
        "typeface-style.css",
        "jquery.js",
        "jquery-ui.js",
        "jquery-ui.css",
        "underscore.js",
        "underscore.string.js",
        "keypress.js",
        "opentype.js",
        "mediainfo.js",
        "x2js.js",
        "fontawesome-all.css",
        "zwicon.css",
        "foundation-icons.css",
        "material-design-icons.css",
      ],
      url: [
        "lib/TEMP.js",
        "lib/Types.js",
        "lib/Input.js",
        "lib/Libraries.js",
        "lib/Utilities.js",
        "lib/Inject.js",
        "lib/ui-style.css",
        "lib/page-style.css",
        "lib/font-style.css",
        "lib/animate-style.css",
        "lib/typeface-style.css",
        "vendor/jquery.min.js",
        "vendor/jquery-ui/jquery-ui.min.js",
        "vendor/jquery-ui/jquery-ui.min.css",
        "vendor/underscore.min.js",
        "vendor/underscore.string.min.js",
        "vendor/keypress.min.js",
        "vendor/opentype.js",
        "vendor/mediainfo.js",
        "vendor/x2js.js",
        "vendor/fontawesome-pro/css/all.min.css",
        "vendor/zwicon.min.css",
        "vendor/foundation-icons.css",
        "vendor/materialdesignicons.min.css",
      ],
    },
  };
  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.cmd = {
    /*
█
▓█═─────══─────═🙦   Download_File()   🙤═─────══─────═❖
▓ Download a file from a URL.
▓ arg = {
▓   ◇ .url*           ⬥ (str)
▓   ◇ .filename       ⬥ (str)
▓   ◇ .conflictAction ⬥ "uniquify|overwrite|prompt"
▓   ◇ .saveAs         ⬥ (true|false)
▓   ◇ .method         ⬥ (GET|POST)
▓   ◇ .headers        ⬥ (Headers Object)
▓   ◇ .body           ⬥ (POST Body)
▓ *required                                                                     */
    Download_File: function(arg) {
      if (arg.filename) {
        const filetype = arg.url.split("/").pop().split(".").slice(-1)[0]; // prettier-ignore
        arg.filename = arg.filename + "." + filetype;
      }
      chrome.runtime.sendMessage({ downloadFile: arg });
    },
    /*
█
▓█═─────══─────═🙦   getURL()   🙤═─────══─────═❖
▓ Attempt to get a file's chrome extension URL from {path}. Returns false on fail.                                                                       */
    getURL: function(path) {
      var result = false;
      try {
        result = chrome.runtime.getURL(path);
      } catch (e) {
        if (e.message == "Extension context invalidated.") {
          UILib.cmd.UI_Notification({
            ID: "context-invalidated",
            icon: { val: "", animateContent: "spin" },
            message: "Extension reload detected. Refreshing page...",
            timer: 3,
            onEject: () => window.location.reload(),
          });
          // throw new Error("IUP: The extension has reloaded since the page was opened. Refresh the page to continue."); // prettier-ignore
          // const message = "The extension has reloaded since the page was opened. Refresh the page to continue.", // prettier-ignore
          //   button = { title: "Refresh", icon: "" };
          // UILib.cmd.UI_Notification({ message, button, icon: "a" });
        } else {
          console.error(`IUP:getURL could not find the URL <${path}>.`);
        }
      }
      return result;
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ queryCache() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇
▓
▓ ❖ TODO ❖
▓   ◇
▓                                                                               */
    queryCache: function(folder, key, data) {
      //
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ queryFile() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                        Query a file in the cache.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ FUNCTIONALITY ❖
▓ Search cache for file with {key}.
▓   ◇ If found, return data.
▓   ◇ If not found, get URL from {path}, build data, then return it.
▓   ◇ If found and {refresh}, build data again and return it.
▓                                                                               */
    queryFile: function(key, path, refresh = false) {
      if (IUP.cache.file[key] && !refresh) return IUP.cache.file[key];
      var url, html;
      url = FileLib.cmd.getURL(path);
      IUP.cache.file[key] = url;
      return IUP.cache.file[key];
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ getScript() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓              Generate HTML code for local JS 🙵 CSS scripts.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ SYNTAX ❖
FileLib.cmd.getScript({ ID});
█
▓ ❖ FUNCTIONALITY ❖
▓   ◇ If document {DOC} provided, inject code into <head> of its DOM. Otherwise, return it as string.
▓
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .ID       = (null|"str")  Unique ID for nodes.
▓   ◇ .flags    = Accepts flag keywords & fetches the associated URL.
▓     ⬥ "string"  = A single flag name.
▓     ⬥ [array]   = Array of flag names.
▓     ⬥ "css"     = Shortcut for all CSS scripts.
▓     ⬥ "js"      = Shortcut for all JS scripts.
▓   ◇ .file     = (str)  Name of file located in "/utility/", or root directory if starting with "/".
▓   ◇ .css      = (null|"css")  Include CSS code in <style> node.
▓   ◇ .gradient = (null|"str")  Pass to genGradient().
▓   ◇ .doc      = (true|<node>)  Inject scripts into target element's DOM. (or 'true' for document)
▓
▓ ❖ NOTES ❖
▓ Each flag has an associated URL. Flag & URL must have matching indexes.
▓ self.con.scripts = {
▓   ◇ .flags  = Full name of scripts
▓   ◇ .url    = Corrosponding URL for scripts
▓   ◇ .groups = Group flags representing multiple flags.
▓
▓ ❖ TODO ❖
▓   ◇ Check if each script has already been injected into {target}.
▓   ◇ CSS PLANES
▓     ⬥ document -
▓                                                                               */
    getScript: function(arg, id) {
      if (typeof arg == "string") arg = { flags: [arg] };
      else if (Array.isArray(arg)) arg = { flags: arg };
      const SCRIPT_INDEX = self.con.SCRIPT_INDEX,
        PRE = "iuGS",
        VERBOSE = false,
        { inject = true, eject = false } = arg;
      var nodes = [],
        DOC = arg.doc || document;
      if (DOC) DOC = DOC.iuDOM.doc;
      const ID = arg.ID || id || _.uniqueId(PRE);

      /*
█ ❖ FILES ⬥ Get utility stylesheet URL and insert as <link>.                                                                  */
      var files = arg.file ? [arg.file] : arg.files;
      if (files) {
        if (!Array.isArray(files)) files = [files];
        files.forEach((key) => {
          const path = key[0] != "/" ? `/utility/${key}` : key;
          nodes.push(buildFileNode(key, path));
        });
      }

      /*
█ ❖ FLAGS ⬥ Search the index for each flag and add the associated JS or CSS script to the output code.                                                                    */
      var flags = arg.flag ? [arg.flag] : arg.flags;
      if (flags) {
        if (!Array.isArray(flags)) flags = [flags];
        for (var group in SCRIPT_INDEX.groups) {
          if (flags.includes(group)) {
            flags = flags.concat(SCRIPT_INDEX.groups[group]);
            flags = flags.filter((flag) => flag != group);
          }
        }
        flags.forEach((flag) => {
          var index = SCRIPT_INDEX.flags.indexOf(flag);
          if (index > -1) {
            nodes.push(buildFileNode(flag, SCRIPT_INDEX.url[index]));
          } else IUP.WARN(`getScript couldn't find script for "${flag}".`);
        });
      }

      /*
█ ❖ Output Data                                                                   */
      if (VERBOSE) console.verbose("📜 getScript(﻿)", flags, DOC ? DOC : "(no document)"); // prettier-ignore
      if (arg.css) {
        arg.css = `<style class="${PRE} ${PRE}__${ID}">${arg.css}</style>`;
        nodes.push(ElementLib.var.build_element(arg.css));
      }
      if (arg.gradient) {
        arg.gradient = `<svg class="${PRE} ${PRE}__${ID} ${PRE}__gradient"><defs>${LayoutLib.cmd.genGradient(arg.gradient)}</defs></svg>`; // prettier-ignore
        nodes.push(ElementLib.var.build_element(arg.gradient));
      }
      var ScriptData = {
        doc: DOC,
        nodes,
        getHTML: function() {
          var output = "";
          this.nodes.forEach((N) => (output += N.innerHTML));
          return output;
        },
        inject: function(target = this.doc.head) {
          target.append(...this.nodes);
          return this;
        },
        eject: function() {
          this.nodes.forEach((N) => N.remove());
          return this;
        },
      };
      if (inject && id !== false) ScriptData.inject();
      return ScriptData;

      function buildFileNode(key, url, html) {
        var html;
        url = self.cmd.queryFile(key, url);
        if (url.endsWith(".css")) html = `<link class="${PRE} ${PRE}__${ID}" data-key="${key}" rel="stylesheet" href="${url}">`; // prettier-ignore
        if (url.endsWith(".js")) html = `<script class="${PRE} ${PRE}__${ID}" data-key="${key}" src="${url}"></script>`; // prettier-ignore
        return ElementLib.var.build_element(html);
      }
    },
  };
}();
/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                      ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯















ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  INPUT LIBRARY  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMMANDS:
▓   ◇ n/a
▓
▓ ❖ VARIABLES:
▓   ◇ build_keybind
▓   ◇ access_clipboard
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
const InputLib = new function() {
  const self = this;
  this.cmd = {}; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.var = {
    build_keybind: function(combo, callback) {
      const keybind = new window.keypress.Listener();
      if (typeof combo == "string") keybind.simple_combo(combo, callback);
      else if (typeof combo == "object") keybind.register_many(combo);
      return keybind;
    },
    access_clipboard: function(val) {
      //src: https://stackoverflow.com/questions/47751811/create-custom-clipboarddata-property-for-clipboardevent
      const clipboardData = { clipboardData: new DataTransfer() },
        e = new ClipboardEvent("paste", clipboardData);
      if (val !== null) navigator.clipboard.writeText(val);
      else return e.clipboardData.getData();
    },
    /*
█
▓█═─────══─────═🙦   string_calculation()   🙤═─────══─────═❖
▓ Calculate the value of a mathematical expression in a string.
▓  ◇ Add, subtract, multiply, divide, power
▓  ◇ "5px * 2" ⮚ "10px"                                                                         */
    string_calculation: function(input) {
      const split = input.match(/(\d+)\s?(.+)\s?(\+|-|\*|\/|\^)\s?(\d+)(%?)/);
      if (!split) return input;
      var [, val1, unit, operator, val2] = split;
      if (operator == "+") output = val1 + val2;
      if (operator == "-") output = val1 - val2;
      if (operator == "*") output = val1 * val2;
      if (operator == "/") output = val1 / val2;
      if (operator == "^") output = Math.pow(val1, val2);
      return output + unit;
    },
  };
}();

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯















ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█     🙢  LAYOUT LIBRARY  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMMANDS ❖
▓   ◇ Simple_Modal     (target)
▓   ◇ Generate_Table   ({columns, data})
▓   ◇ Node_Style       ({target, id, css, action})
▓   ◇ genGradient ()
▓
▓ ❖ VARIABLES ❖
▓   ◇ simple_modal
▓     ⬥ node
▓     ⬥ keybind
▓     ⬥ realParent
▓     ⬥ is_active
▓   ◇ scrollbar_width  (axis)
▓▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
const LayoutLib = new function() {
  const self = this;
  this.con = {
    SimpleModal: {
      docCSS: `body, html { width:100%; height:100%; overflow:hidden; }`, // document <style> CSS
    },
    genGradient: {
      pre: "iuGR",
      gold: [
        ["rgba(228, 141, 5, 1)", "0%"],
        ["rgba(229, 145, 10, 1)", "4.38%"],
        ["rgba(234, 156, 23, 1)", "9.31%"],
        ["rgba(240, 174, 46, 1)", "14.5%"],
        ["rgba(250, 199, 77, 1)", "19.84%"],
        ["rgba(255, 212, 93, 1)", "22.17%"],
        ["rgba(255, 234, 117, 1)", "39.79%"],
        ["rgba(255, 207, 65, 1)", "51.45%"],
        ["rgba(254, 211, 71, 1)", "57.12%"],
        ["rgba(253, 216, 78, 1)", "60.59%"],
        ["rgba(253, 202, 84, 1)", "74.58%"],
        ["rgba(242, 171, 54, 1)", "100%"],
      ],
    },
  };
  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.cmd = {
    /*


██⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Simple_Modal() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 Create a simple modal with a target element.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ TODO ❖
▓   ◇ Replace target in the same node position (not just append to parent node)
▓   ◇ Add dropmenu:
▓     ⬥ Background Visibility
▓     ⬥ Zoom Mode {"fill|fit|100%"}
▓     ⬥ Hold Mouse Mode ("fill|fit|100%")
▓     ⬥ Close Full Screen (Esc)
▓   ◇ Animate element enlarging 🙵 background fading
▓   ◇ Optional keybinds (esc to exit)
▓                                                             */
    //     Simple_Modal: function(arg = {}) {
    //       const { wrapID, targID } = self.con.SimpleModal,
    //         PRE = "iuSM",
    //         isActive = self.var.simple_modal.isActive;
    //       var { target, action } = arg;
    //       var node = self.var.simple_modal.node;
    //       if (action == "activate") return openModal(target);
    //       else if (action == "deactivate") return closeModal();
    //       if (!isActive && !node.length) openModal();
    //       else if (isActive && !node.length) closeModal();
    //       else if (isActive && node.length) {
    //         closeModal();
    //         openModal();
    //       }
    //       /*
    // █ ❖ Open Modal                                                                   */
    //       function openModal() {
    //         if (isActive) return false;
    //         self.var.simple_modal.isActive = true;
    //         if (!target) throw new Error("IUP:Simple_Modal wasn't given a target.");

    //🚧
    // const body = document.createElement("div");
    // body.id = "body";
    // const script = { file: "LayoutLib_SimpleModal.css" };
    // FileLib.cmd.getScript(script, true, "SimpleModal");
    // self.var.simple_modal.node = { body };
    // document.body.appendChild(body);
    //🚧

    // ❖ Build & Inject HTML
    // const script = { file: "LayoutLib_SimpleModal.css" };
    // self.var.simple_modal.node = LayoutLib.cmd.buildShadowDOM({PRE, script}); // prettier-ignore
    // const { body } = self.var.simple_modal.node;
    // const Wrapper = document.createElement("div");
    // const eventList = ["click", "play"];
    // eventList.forEach(name => body.addEventListener(name, blockEvent));
    // function blockEvent(e) {
    //   e.stopPropagation();
    // }
    // self.var.simple_modal.realParent = target.parentElement;
    // self.var.simple_modal.target = target;

    // ❖ Prep Target Element
    // target.classList.add(`${PRE}__target`);
    // body.append(target);

    // ❖ Set Keybinds
    // if (keybinds) {
    // self.var.simple_modal.keybind = new window.keypress.Listener();
    // self.var.simple_modal.keybind.simple_combo("escape", function() {
    //   self.cmd.Simple_Modal(false);
    // });
    // document.querySelector(`.${PRE}__bg`).appendChild(target);
    // }

    // ❖ Start animation
    // _.defer(function() {
    //   node.wrap.classList.add("is-shown");
    // });
    // }
    /*
█ ❖ Close Modal                                                                   */
    //   function closeModal() {
    //     const { target, isActive, realParent, node } = self.var.simple_modal;
    //     // if (!target || !isActive) return false;
    //     // self.var.simple_modal.isActive = false;
    //     realParent.appendChild(target); // TODO: Append to same location within parent
    //     target.classList.remove(targID);
    //     // node.deact();
    //     //🚧🚧
    //     const scripts = document.querySelector(`.iuGS[data-key="LayoutLib_SimpleModal.css"]`); // prettier-ignore
    //     if (scripts) scripts.remove();
    //     node.body.remove();
    //   }
    // },

    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Node_Style() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓        Apply CSS to an element without altering its 'style' attribute.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .target = The target element to apply to.
▓   ◇ .id     = Add additional styles with a unique ID.
▓   ◇ .css    = CSS code to apply. Same syntax as the style="" attribute.
▓   ◇ .action = null|"create|apply|delete"
▓     ⬥ null     = Detect action based on other parameters & init state.
▓     ⬥ "init"   = Initialize node for {target}. Apply {css} if provided. [detect: {target}, !initialized]
▓     ⬥ "apply"  = Apply style {css} to {target}.  [detect: {css}, {target}, initialized]
▓     ⬥ "delete" = Remove style node for {target}.  [detect: !{css}, {target}, initialized]
▓
▓ ❖ NOTE ❖
▓ Each affected element has:
▓   ◇ An attribute containing a unique code. (data-as-code="")
▓   ◇ A <style> node in <head> with matching code.
▓                                                                                 */
    Node_Style: function(arg) {
      if (!arg.target) throw new Error("IUP:Node_Style was not given a target element."); // prettier-ignore
      if (!arg.target.tagName) throw new Error("IUP:Node_Style was not provided a valid target element."); // prettier-ignore
      const { target, css = "", id = null } = arg,
        prefix = "iuNS-",
        attrCode = "as-code",
        hasCode = target.iuData(attrCode);
      var action = arg.action,
        styleNode;

      // ❖ Auto-detect action
      if (!action) {
        if (!hasCode) action = "init";
        if (hasCode && css) action = "apply";
        if (hasCode && !css) action = "delete";
      }

      // ❖ Run action
      if (action == "init") initStyle();
      if (action == "apply") applyStyle();
      if (action == "delete") deleteStyle();

      /*
█ ❖ initStyle()                                                                    */
      function initStyle() {
        if (!target.iuData(attrCode)) {
          CODE = _.uniqueId(prefix);
          target.iuData(attrCode, CODE);
          target.classList.add();
        }
        if (!target.classList.contains(CODE)) target.classList.add(CODE);
        node = getStyleNode();
        if (css) applyStyle();
      }
      /*
█ ❖ applyStyle()                                                                   */
      function applyStyle(node) {
        node = getStyleNode();
        node.innerHTML = `.${CODE} { ${css} }`;
      }
      /*
█ ❖ deleteStyle()                                                                   */
      function deleteStyle() {
        node = getStyleNode();
        if (node) node.remove();
        // target.classList.remove(CODE);
        // target.iuData(attrCode, null, true);
      }
      function clearAllStyles() {
        var nodes = document.head.querySelectorAll(`style[id^=${code}]`);
        nodes.forEach((N) => N.remove());
      }

      /*
█ ❖ getStyleNode() - Get or create a unique style node for {target}, with optional {id}.                                                                  */
      function getStyleNode() {
        if (styleNode) return styleNode;
        var code = target.iuData(attrCode);
        if (!code) return false;
        code += (id ? `-${id}` : "") + "-s"; // <style> node selector w/ ID
        node = document.head.querySelector(`#${code}`);
        if (!node) {
          const html = `<style id="${code}"></style>`;
          document.head.insertAdjacentHTML("beforeEnd", html);
          node = document.head.querySelector(`#${code}`);
        }
        return node;
      }
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Inject_Styles() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                  Inject a unique <style> node into <head>.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓   ◇ id       = Unique ID.
▓   ◇ code     = CSS style to inject.
▓   ◇ location = Which document to inject into.
▓     ⬥ "page"             = Top document
▓     ⬥ "menu"             = Main Menu iframe
▓     ⬥ iframe|shadow DOM  = Detect document
▓     ⬥ any node           = Get owner document
▓
▓ ❖ FUNCTIONALITY ❖
▓   Ⅰ. If <style> with {id} doesn't exist, create one with {code}.
▓   Ⅱ. If <style> with {id} exists, and {code} is provided, update node.
▓   Ⅲ. If <style> with {id} exists, and {code} is empty, delete node.
▓
▓ ❖ TODO ❖
▓   ◇ Add "action" parameter like that other similar command.
▓                                                                                */
    Inject_Styles: function(id, code, location = "page") {
      var doc;
      id = "IUP-" + id;
      if (location == "page") doc = document;
      // if (location == "menu") doc = document;
      if (location.tagName == "IFRAME") doc = location.documentElement;
      if (location.shadowRoot) doc = location.shadowRoot;
      if (location.ownerDocument) doc = location.ownerDocument;
      var node = doc.getElementById(id);
      // ❖ Ⅱ. If <style> with {id} exists, and {code} is provided, update node.
      if (node && !code) node.remove();
      // ❖ Ⅲ. If <style> with {id} exists, and {code} is empty, delete node.
      else if (node && code) node.innerText = code;
      // ❖ Ⅰ. If no <style> with {id} exists, create one with {code}.
      else if (!node && code) {
        code = `<style id="${id}">${code}</style>`;
        doc.head.insertAdjacentHTML("beforeEnd", code);
        return doc.getElementById(id);
      }
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ slimScrollbars() ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓ *MACRO
▓                                                                                */
    slimScrollbars(WIN = window) {
      const ID = "slimScrollbars",
        gradient = self.cmd.genGradient({ stops: "gold", standard: "css", angle: 45 }), // prettier-ignore
        css = `
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: var(--iup-color-theme);
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--iup-color-highlight);
  cursor: pointer;
}
::-webkit-scrollbar-thumb:hover {
  background: ${gradient};
}
`;
      WIN.addEventListener("f11change", (e) => {
        if (e.f11) self.cmd.Inject_Styles(ID, css);
        else self.cmd.Inject_Styles(ID, null);
      });
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ 🚧trackDocumentResize()🚧 ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓                                                                                */
    trackDocumentResize(WIN = window) {
      const observer = new ResizeObserver((entries) => {
        const height = document.documentElement.scrollHeight;
        document.body.iuCSS("--iup-page-height", height);
      });
      observer.observe(document.scrollingElement);
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ trackFullScreen() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓         Dispatch the "f11change" event when user enables full screen.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ e for f
▓                                                                                */
    trackFullScreen(WIN = window) {
      const f11ChangeEvent = new Event("f11change");
      WIN.f11 = false;
      WIN.addEventListener("resize", function(e) {
        if (document.webkitIsFullScreen) return;
        if (WIN.screen.height == WIN.innerHeight) {
          if (WIN.f11 == false) {
            WIN.f11 = true;
            f11ChangeEvent.f11 = true;
            WIN.dispatchEvent(f11ChangeEvent);
          }
        } else {
          if (WIN.f11 == true) {
            WIN.f11 = false;
            f11ChangeEvent.f11 = false;
            WIN.dispatchEvent(f11ChangeEvent);
          }
        }
      });
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ genGradient() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                      Generate a CSS or SVG gradient.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓ arg = (string) ID of gradient preset in {self.con.genGradient}. Argument {.stops} also accepts a preset ID.
▓ arg = (object) {
▓   ◇ .id*        = (str) ID for SVG gradient.
▓   ◇ .standard   = ("css|svg") Which style standard to use.
▓   ◇ .type       = ("linear|radial") Gradient type.
▓   ◇ .angle      = (number) Rotation angle. Values other than a number may be {standard}-specific.
▓   ◇ .stops      = ("str"|[color]|[[color, stop]]) Array of color stops. Each item can be a color, or an array with a color & stop position.
▓                                                                                 */
    genGradient(arg = "gold") {
      const pre = self.con.genGradient.pre;
      if (typeof arg == "string") arg = { id: arg, stops: self.con.genGradient[arg] }; // prettier-ignore
      if (typeof arg.stops == "string") {
        if (!arg.id) arg.id = arg.stops;
        arg.stops = self.con.genGradient[arg.stops];
      }
      var { id, standard = "svg", type = "linear", stops, angle = 90 } = arg,
        output = "";
      /*
█ ❖ Parse color stops                                                                   */
      stops.forEach((S) => {
        if (!Array.isArray(S)) S = [S];
        if (standard == "css") output += S.join(" ") + ",";
        else {
          S = [`stop-color="${S[0]}"`, S[1] ? ` offset="${S[1]}"` : ""];
          output += `<stop ${S.join("")}></stop>`;
        }
      });
      /*
█ ❖ Enclose result                                                                   */
      if (standard == "css") {
        if (typeof angle == "number") angle = `${angle}deg`;
        output = `-webkit-${type}-gradient(${angle}, ${output.slice(0, -1)})`;
      } else {
        output = `<${type}Gradient id="${pre}-${id}" gradientTransform="rotate(${angle})">${output}</${type}Gradient>`;
      }
      return output;
    },
  }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.var = {
    /*
█
▓█═─────══─────═🙦   Simple_Modal    🙤═─────══─────═❖
▓ Variable storage for SimpleModal.                                                                          */
    simple_modal: {
      node: {},
      keybind: null,
      realParent: null,
      isActive: false,
    },
    /*
█
▓█═─────══─────═🙦   get_page_height()   🙤═─────══─────═❖
▓ Get the height of the page.                                                                           */
    get_page_height: function() {
      const height = document.documentElement.scrollHeight + "px";
      document.documentElement.iuCSS("--iup-page-height", height);
      return height;
    },
    /*
█
▓█═─────══─────═🙦   scrollbar_width()   🙤═─────══─────═❖
▓ Get the width of the default browser scrollbar.                                                                           */
    scrollbar_width: function(axis = "vertical") {
      const node = document.createElement("div");
      axis = "horizontal" ? "Height" : "Width";
      node.style = `visibility:hidden!important;overflow:scroll!important;width:100px!important;height:100px!important`;
      document.body.appendChild(node);
      const result = node[`offset${axis}`] - node[`scroll${axis}`];
      node.remove();
      return result;
    },
    /*
█
▓█═─────══─────═🙦   in_native_ui()    🙤═─────══─────═❖
▓ Determine if inside IUP's native UI.
▓   ◇ Provide {node} to determine if inside a native page, the Main Menu, or an IUP shadow DOM.
▓   ◇ Otherwise, true if in a native page or if Main Menu is open.
▓═──═🙦                                                                          */
    in_native_ui: function(node) {
      const isNativePage = window.location.hostname == chrome.runtime.id;
      if (node) {
        const isMainMenu = node.iuDOM.body.id == "MM-OuterWrap",
          isShadowDOM = node.iuDOM.body.id == "body";
        return isNativePage || isMainMenu || isShadowDOM;
      } else {
        const mainMenuOpen = document.documentElement.classList.contains(IUP.S.MENU_ACTIVE_CLASS); // prettier-ignore
        return isNativePage || mainMenuOpen;
      }
    },
    /*
█
▓█═─────══─────═🙦   light_or_dark()    🙤═─────══─────═❖
▓ Determine if a color is light or dark. Returns light for true, false for dark.
val = LayoutLib.var.parse_css_val("20px", V => V * 2); // returns "40px"
█═──═🙦                                                                          */
    light_or_dark: function(color) {
      // ❖ Extract RGB values from color
      if (color.substr(0, 1) == "#") {
        var [r, g, b] = [1, 3, 5].map((n) => parseInt(color.substr(n, 2), 16));
      } else if (color.substr(0, 3) == "rgba") {
        var [r, g, b] = color.substr(5, color.length - 2).split(",");
      } else if (color.substr(0, 3) == "rgb") {
        var [r, g, b] = color.substr(4, color.length - 2).split(",").map(parseInt); // prettier-ignore
      }

      // ❖ Calculate brightness value
      return (r * 299 + g * 587 + b * 114) / 1000 >= 128;
    },
  };
}();

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯















ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  MEDIA LIBRARY  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMMANDS ❖
▓   ◇ Convert_Image()
▓   ◇ 🚧Embed_Box()
▓   ◇ locateMedia()
▓
▓ ❖ VARIABLES ❖
▓   ◇ ❌embedded_media
▓   ◇ 🚧calculate_image_similarity
▓
▓ ❖ CONSTRUCTORS ❖
▓   ◇ 🚧VideoPlayer
▓   ◇ 🚧EmbedBox
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
const MediaLib = new function() {
  const self = this;
  this.con = {
    MenuMediaFit: [
      {
        id: "fit",
        title: "Media Fit",
        submenu: [
          {
            id: "fit-h",
            title: "Fill horizontally",
            onUse(target) {
              const css = "object-fit: contain!important";
              LayoutLib.cmd.Node_Style({ target, css });
            },
          },
          {
            id: "fit-h",
            title: "Fill horizontally",
            onUse(target) {
              const css = "object-fit: contain!important";
              LayoutLib.cmd.Node_Style({ target, css });
            },
          },
          {
            id: "cover",
            title: "Cover",
            onUse(target) {
              const css = "object-fit: cover!important";
              LayoutLib.cmd.Node_Style({ target, css });
            },
          },
          {
            id: "none",
            title: "None",
            onUse(target) {
              const css = "object-fit: none!important";
              LayoutLib.cmd.Node_Style({ target, css });
            },
          },
          {
            id: "scaleDown",
            title: "Scale down",
            onUse(target) {
              const css = "object-fit: scale-down!important";
              LayoutLib.cmd.Node_Style({ target, css });
            },
          },
        ],
      },
    ],
    EmbedMedia: {
      FileTypes: ["flv", "swf", "webm", "mp4"],
    },
  };
  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.cmd = {
    /*





█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Convert_Image() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                        Convert & download an image file.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓   arg = {
▓    ◇ .T*       = Target image.
▓    ◇ .src*     = Source URL.
▓    ◇ .type     = "jpg|png|webp" Filetype to convert into.
▓    ◇ .action   = "download|replace" Download the file or replace the target image.
▓    ◇ .width    = 🚧Change image width. Leave height blank to scale proportionally.
▓    ◇ .height   = 🚧Change image height. Leave width blank to scale proportionally.
▓    ◇ .quality  = Image quality
▓      ⬥ jpg     = 0-1 (0% - 100%)
▓      ⬥ bmp     = 1|2|4|8|16|24|32 (bits per pixel)
▓ * Either target or src required.
▓                                                                               */
    Convert_Image: function(arg) {
      const { T, src, type = "jpg", action = "download", quality, width, height } = arg, // prettier-ignore
        typeData = type == "jpg" ? "jpeg" : type,
        Canvas = document.createElement("canvas"),
        Image = new Image(),
        filename = T.src.split("/").slice(-1)[0].split(".")[0] + `.${type}`, // prettier-ignore
        ctx = Canvas.getContext("2d");
      Image.onload = function() {
        Canvas.width = width || Image.width;
        Canvas.height = height || Image.height;
        ctx.drawImage(Image, 0, 0);
        const url = Canvas.toDataURL(`image/${typeData}`, quality);
        if (action == "download") {
          FileLib.cmd.Download_File({ url, filename, saveAs: true });
        } else if (action == "replace") T.src = url;
      };
      Image.setAttribute("crossOrigin", "anonymous");
      Image.src = src || T.src;
    },
    /*






█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ locateMedia() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                Identify & filter media elements on the page.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .mediaType 〜 Media type to search for.
▓     ⬥ (string):      Single media type
▓     ⬥ (array):       Multiple media types
▓     ⬥ "*":           All media types
▓   ◇ .outputType 〜 What kind of value to return.
▓     ⬥ "element":     Primary media element
▓     ⬥ "source|src":  Primary media source URL
▓     ⬥ "mediaList":   Array of media elements
▓   ◇ .onScreen 〜 Filter out media off-screen.
▓
▓ ❖ NOTE ❖
▓   ◇ MEDIA TYPES: "video", "audio", "object", "embed", "iframe"
▓
▓ ❖ TODO ❖
▓    ◇ Smart detection algorithm (if multiple elements are detected)
▓      ⬥ If multiple elements are found, prioritize elements in viewport
▓    ◇ Detect Twitter:
▓    ◇ <https://twitter.com/* /status/ *> ".AdaptiveMedia-singlePhoto img"
▓    ◇ <https://twitter.com/* /status/ *> ".Gallery-media img"
▓                                                                               */
    locateMedia: function(arg = {}) {
      if (typeof arg === "string") arg = { mediaType: arg };
      /*
█ ❖ Variables                                                                   */
      var { outputType = "element", mediaType = "video" } = arg;
      const { onScreen = true, minSize = 0, allowBlob = true } = arg,
        validTypes = ["img", "video", "audio", "object", "embed", "iframe", "canvas"]; // prettier-ignore
      // parse data
      outputType = outputType.toLowerCase();
      if (mediaType == "*") mediaType = validTypes; // search for all media types
      if (typeof mediaType == "string") mediaType = [mediaType];
      mediaElementQuery = mediaType.join(", ").toLowerCase();

      /*
█ ❖ Query page with media selector, analyze nodes                                                                   */
      const queryMedia = document.querySelectorAll(mediaElementQuery);
      var mediaList = [],
        topDimension = minSize,
        largest;
      if (!queryMedia.length) return false;

      queryMedia.forEach((M) => {
        var { width, height, bottom, top } = M.getBoundingClientRect(),
          dimension = width * height,
          viewHeight = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight
          ),
          isOnScreen = !(bottom < 0 || top - viewHeight >= 0);
        //if (M.tagName == "VIDEO") dimension = M.videoWidth * M.videoHeight;
        //TODO Determine if on screen
        if (onScreen && !isOnScreen) return false;
        //if (!onScreen) item.onScreen = isOnScreen;
        //var item = { node: N, dimension: dimension, duration: N.duration || null }; // prettier-ignore
        //mediaList.push(item);
        //console.log(M.tagName, M.videoWidth, M.videoHeight);
        if (dimension > topDimension) {
          topDimension = dimension;
          largest = M;
        }
      });
      _B(largest);
      /*
█ ❖ Parse data 🙵 return                                                                   */
      if (!largest) return false;
      _C();
      if (largest.currentSrc.substring(0, 5) == "blob:") {
        _D();
        if (!allowBlob) return false;
      }
      if (outputType == "element") {
        returnVal = largest;
      } else if (outputType == "source" || outputType == "src") {
        returnVal = largest.currentSrc;
      }
      return returnVal;
    },
    /*


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ videoStatusBadge() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓ Show a play or pause badge on the tab.
▓ *MACRO                                                                             */
    videoStatusBadge(DOC = document) {
      const onPlay = function(e) {
        if (!DOC.hasFocus()) return;
        window.IUP.U.FlagPage.cmd.Animate_Flag({
          badge: "▶",
          fontFamily: "Segoe UI Symbol",
        });
      };
      const onPause = function(e) {
        if (!DOC.hasFocus()) return;
        window.IUP.U.FlagPage.cmd.Animate_Flag({
          badge: "⏸",
          fontFamily: "Segoe UI Symbol",
        });
      };
      DOC.addEventListener("play", onPlay, true);
      DOC.addEventListener("pause", onPause, true);
    },
    /*


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ doubleClickImageToOpen() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓ *MACRO                                                                             */
    doubleClickImageToOpen(DOC = document) {
      const onDoubleClick = function(e) {
        var topImg = ElementLib.var.largest_node("img");
        if (e.target == topImg) window.location.href = topImg.src;
      };
      DOC.addEventListener("dblclick", onDoubleClick, true);
    },
  };

  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.var = {
    /*
█ ❖ embedded_media                                                                   */
    embedded_media: {
      val: null,
      add: function(url) {
        this.val.push(url);
      },
      remove: function(url) {
        const len = this.val.length;
        this.val = _.filter(this.data, (U) => {
          return U != url;
        });
        return len > this.val.length ? true : false;
      },
    },

    /*
█
▓█═─────══─────═🙦   is_browsing_media_file()   🙤═─────══─────═❖
▓ TODO                                                                          */
    is_browsing_media_file(DOC = document, typelist = ["img", "video"]) {
      if (DOC.body.childElementCount == 1) {
        const MediaFile = DOC.body.children[0],
          type = MediaFile.tagName.toLowerCase();
        if (typelist.includes(type)) {
          MediaFile.classList.add("iuML__browsedMedia");
          return MediaFile;
        }
      }
    },

    /*
█
▓█═─────══─────═🙦   calc_image_similarity()🚧   🙤═─────══─────═❖
▓ Calculate what % images {A} and {B} are similar.                                                                          */
    //TODO Look up algorithms for this
    calc_image_similarity(arg) {
      const {
        A,
        B,
        scale = 0.5, // Scale images down for lower resolution
        radius = 2, // Search radius to include in match
        hue = 0.5, //
        sat = 0.5,
        lum = 0.5,
        pixel = 0.5,
      } = arg;
      // Scale larger image down to match smaller
      // Scale both down by {scale}
      // Break images down into data array
    },
    /*
█ ❖ ❌url_is_media_file()                                                                   */
    url_is_media_file(url = window.location.href) {
      //if (document.body.childElementCount == 1)
    },
  };
}();
/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯













    /*















ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█       🙢  UI LIBRARY  🙠       █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMMANDS ❖
▓   ◇ buildMenu
▓   ◇ buildItem
▓   ◇ buildIcon
▓   ◇ buildWallpaper
▓
▓ ❖ CONSTRUCTORS ❖
▓   ◇ Modal
▓   ◇ Notification
▓   ◇ Dropmenu
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
const UILib = new function() {
  var self2 = this;
  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.cmd = {
    /*






█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ UI_Modal ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                           Build or modify a modal.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓═─────═🙦  arg =
{
  id: (auto-generated ID)|"uniqueID",
  title: null|"Title",
  content: null|`<html>`,
  // frame: "menu|page",
  // toggle: true|false,
  // size: "lg|sm|md|xl",
  // footer: null|`<html>`,
  // onInject(this) {},
  // onEject() {}
  //tabs: ❌WIP,
}
█═─────══─────═🙦                                                                 */
    UI_Modal: function(arg, obj = null) {
      var modal = new Modal(arg);
      return modal;
    },
    buildDialog: function(arg) {
      const { title, preset, val, components } = arg;
      // title, type
      if (preset == "alert") {
        //
      }
      if (preset == "textbox") {
        function content(node) {
          const textbox = buildInput({ type: "textbox", subtype: "box", val });
          node.appendChild(textbox);
        }
      }
      const dialog = self2.cmd.UI_Modal({ title, size: "sm", content });
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ buildMenu() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
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
    buildMenu(menuData, parent = {}, id, target = null) {
      const isElement = parent.constructor.name.endsWith("Element"),
        MenuNode = isElement ? parent : document.createElement("div");
      if (menuData.items) {
        parent = menuData;
        menuData = parent.items;
      }
      MenuNode.classList.add(parent.submenu ? "submenu-wrap" : "menu-wrap");
      menuData.forEach((itemData) => {
        const ItemNode = self2.cmd.buildItem(itemData, parent, id, target);
        MenuNode.appendChild(ItemNode);
      });
      const noIcons = _.every(MenuNode.children, child => child.classList.contains("-no-icon")), // prettier-ignore
        setSVGWidth = function() {
          const allTitles = MenuNode.querySelectorAll(".item__title"),
            maxTitleWidth = _.max(allTitles, (node) => node.clientWidth),
            menuWidth = parseInt((maxTitleWidth.clientWidth + 42) * 1.2);
          MenuNode.iuCSS("--svg-width", menuWidth + "px");
          return menuWidth;
        };
      if (noIcons) MenuNode.classList.add("-no-icons");
      MenuNode.IUP = { noIcons, setSVGWidth };
      MenuNode.IUP.setSVGWidth();
      return MenuNode;
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ buildWallpaper() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓    Build the 'background-image' CSS prop for wallpaper from settings data.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
    buildWallpaper: function(Settings) {
      Settings = Settings || IUP.S;
      var output = Settings.themePattern.css;
      if (!output) {
        const patternID = Settings.themePattern.id,
          colorMode = Settings.themeMode.pattern;
        output = `/assets/wallpaper/${patternID}-${colorMode}.png`;
        output = `url(${FileLib.cmd.getURL(output)})`;
      }
      return output;
    },
  };

  /*

█
▓══────────────────══🙦⟅             ∽ 🎕 ∼             ⟆🙤══────────────────══█
▓










▓‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅        ∽ Modal() ∼       ⟆▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                The official Internet Utilities Platinum modal.
▓            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ PARAMETERS 〜 Modal ❖
▓ arg = {
▓   ◇ .id        = (str) Unique modal ID. (default = auto-generated)
▓   ◇ .location  = ("menu|page"|<node>) Where to open modal, inside main menu or on main page.
▓   ◇ .toggle    = (bool) If a modal already exists with same ID, toggle it off instead.
▓   ◇ .size      = ("lg|sm|md|xl") Default size of the modal if not specified by tab.
▓   ◇ .tabs      = [tab] Array of tabs. (see below)
▓   ◇ .onInject()   = Run script after modal activates, right before the initial tab is loaded.
▓   ◇ .onEject() = Run script after modal activates, right before the initial tab is loaded.
▓
▓ ❖ PARAMETERS 〜 Tab ❖
▓ tab = {
▓   ◇ .id         = (str) Tab ID unique to modal. (default = auto-generated)
▓   ◇ .style      = (css) CSS style to include.
▓   ◇ .size       = ("lg|sm|md|xl") Size of the modal.
▓   ◇ .title      = (null|"str") Title of modal.
▓   ◇ .content    = <html> HTML for content node.
▓   ◇ .footer     = <html> HTML for footer node.
▓   ◇ .onUse()    = Run func when tab is clicked.
▓     ⬥ if {title}, {content}, and {footer} are omitted, tab won't load, but onUse() will still run.
▓   ◇ .onLoad()   = Run func after tab content is loaded.
▓   ◇ .onUnload() = Run func when tab closes, before the next tab loads.
▓
▓ ❖ MODAL PROPERTIES ❖
▓ this = {
▓   ◇ .id:          ⬥ Modal ID
▓   ◇ .node         ⬥ The modal's outer wrapper, containing the tabs
▓     ⬥ doc
▓     ⬥ host
▓     ⬥ outer
▓     ⬥ wrap
▓     ⬥ title
▓     ⬥ CSS
▓     ⬥ content
▓     ⬥ footer
▓   ◇ .title        ⬥ Title node.
▓   ◇ .style        ⬥ CSS style node.
▓   ◇ .content      ⬥ Content node.
▓   ◇ .footer       ⬥ Footer node.
▓   ◇ .getTab()     ⬥ Get a tab from its ID or array index. Defaults to active tab.
▓   ◇ .loadTab()    ⬥ Load a tab, replacing each section node with new data.
▓   ◇ .deact()      ⬥ Close 🙵 destroy the modal.
▓
▓ ❖ DATA STRUCTURE ❖
▓ ⯁ Background Wrap {.wrap-bg}
▓   ◇ Outer Wrap {.wrap-outer} ⬥ Placement wrapper.
▓     ⬥ Tabs {#tabs}           ⬥ The modal window's tabs.
▓     ⬥ Box Wrap {.box-wrap}
▓       ⬦ Close Btn {#close} = The (X) close button.
▓       ⬦ Title {#title}     = The title of the modal. Draggable.
▓       ⬦ Content {#content} = The main body of the modal.
▓       ⬦ Footer {#footer}   = The footer of the modal. Anything in the footer is pushed to the bottom of the modal.
▓
▓ ❖ TODO ❖
▓   ◇ {activeTab} If modal is already open, but a different tab is active, switch to it.
▓   ◇ Implement <dialog> instead of <div> as main wrapper?
▓   ◇ If another modal is open, and user hasn't moved it, give the modal a starting offset so it doesn't completely overlap. (Similar to windows explorer)
▓                                                                               */
  function Modal(arg) {
    const self = this,
      PRE = "iuM";
    /*
█ ❖ DEFAULTS                                                                   */
    if (!Array.isArray(arg.tabs)) arg.tabs = [arg.tabs];
    arg = _.defaults(arg, {
      id: _.uniqueId(PRE),
      initialTab: 0,
      location: "menu", //"auto",
      toggle: true,
      size: "lg",
      tabs: [],
    });

    /*
█ ❖ PROPERTIES                                                                   */
    this.PRE = PRE;
    this.ID = arg.ID;
    this.node = {};
    this.settings = arg;
    this.state = { activated: false, injected: false, activeTab: null };
    this.create = () => UILib.cmd.Create_Instance(self);
    this.destroy = () => UILib.cmd.Destroy_Instance(self);
    /*
█
▓█═─────══─────═🙦   .createScript()   🙤═─────══─────═❖
▓ Initialize the modal.                                                                            */
    this.createScript = function(arg) {
      const ID = self.id,
        { initialTab, location, size, style, onInject } = self.settings; // prettier-ignore

      // ❖ Determine which DOM to place in
      // if (location == "auto") {
      // } //TODO
      if (location == "menu") self.settings.parent = IUP.MM.node.frame.body;
      else if (location == "page") self.settings.parent = document.body;
      else self.settings.parent = location.iuDOM.doc;

      /*
█ ❖ BUILD HTML                                                                   */
      const script = { file: "UILib_Modal.css" },
        iconClose = FileLib.cmd.getURL(`/assets/icons/close.svg`),
        html = `
<div class="wrap-bg -size-${size}">
  <div id="tabs"></div>
  <div class="wrap-box">
    <img id="close" src="${iconClose}">
    <h3 id="title"></h3>
    <div id="content"></div>
    <div id="footer"></div>
  </div>
</div>`;
      if (self.settings.useShadowDOM) {
        let arg = { ID: script, html, appendTo: self.settings.parent };
        self.node = LayoutLib.cmd.buildShadowDOM(arg, self);
      } else {
        const body = document.createElement("div");
        body.id = ID;
        body.innerHTML = html + "<style></style>";
        self.settings.parent.appendChild(body);
        self.node.bg = body.querySelector(".wrap-bg");
        self.node.body = body;
        self.node.host = body;
        self.node.style = body.querySelector("style");
      }
      const { body, bg } = self.node;
      body.classList.add(PRE);

      // ❖ Initialize node properties
      self.node.tabs = body.querySelector("#tabs");
      self.node.title = body.querySelector("#title");
      self.node.content = body.querySelector("#content");
      self.node.footer = body.querySelector("#footer");

      /*
█ ❖ BUILD TABS                                                                  */
      _.each(self.settings.tabs, (data, i) => {
        const tabNode = document.createElement("div");
        if (!data) {
          tabNode.className = "gap";
          self.settings.tabs[i] = {};
        } else {
          data.id = data.id || _.uniqueId(ID + "-tab-");
          var { id, tabName, title, content, footer } = data;
          tabNode.onclick = function(e) {
            if (data.onUse) data.onUse(this);
            if (!title && !content && !footer) return;
            self.loadTab(id);
          };
          tabNode.innerHTML = tabName || title;
          tabNode.id = id;
        }
        self.node.tabs.appendChild(tabNode);
      });

      /*
█ ❖ COMPLETE INITIALIZATION                                                                   */
      // ❖ Click X to close
      body.querySelector("#close").onclick = (e) => self.eject();
      // ❖ Init dragging
      $(bg).draggable({
        containment: document.querySelector("#MM-SpaceBuffer"),
        handle: "#title",
      });
    };
    /*
█
▓█═─────══─────═🙦   .inject()   🙤═─────══─────═❖
▓                                                                    */
    this.inject = function() {
      self.loadTab(initialTab);
      _.defer(() => self.node.body.classList.add("-is-active"));
      self.state.injected = true;
      if (self.settings.onInject) self.settings.onInject(self);
    };
    /*
█
▓█═─────══─────═🙦   .getTab()   🙤═─────══─────═❖
▓ Get tab data based on its ID or array index. Defaults to active tab.                                                                    */
    this.getTab = function(tab = self.state.activeTab) {
      if (typeof tab == "number") {
        if (tab >= self.settings.tabs.length || tab < 0) {
          throw new Error(`IUP:getTab index "${tab}" is out of range.`);
        }
        tab = self.settings.tabs[tab];
      } else {
        tab = _.filter(self.settings.tabs, (T = {}) => T.id == tab)[0];
        if (!tab) throw new Error(`IUP:getTab couldn't find tab "${tab}".`);
      }
      return tab;
    };

    /*
█
▓█═─────══─────═🙦   .loadTab()   🙤═─────══─────═❖
▓ Load a tab from data {Tab}, replacing each section node (title, content, footer) with a new node.
▓ ⬥ If section data is a function, pass new node as argument.
▓ ⬥ If section data isn't a string or a function, it's hidden.                                                                     */
    this.loadTab = function(Tab) {
      const oldTab = self.getTab();
      if (oldTab.onUnload) oldTab.onUnload(); // close active tab
      const newTab = self.getTab(Tab),
        { id, title, style, content, footer } = newTab,
        sizes = ["sm", "md", "lg", "xl"],
        sectNodes = ["title", "content", "footer", "style"];

      // ❖ Change Size
      const oldSize = `-size-${oldTab.size || self.settings.size}`,
        newSize = `-size-${newTab.size || self.settings.size}`;
      if (oldSize != newSize) {
        self.node.bg.classList.replace(oldSize, newSize);
      }

      // ❖ Replace Section Nodes
      function replaceSectionNode(name) {
        const data = newTab[name],
          node = self.node[name],
          tag = name == "title" ? "h3" : name == "style" ? "style" : "div";
        var newNode = document.createElement(tag);
        newNode.className = "";
        if (typeof data == "function") newNode = data(newNode, self) || newNode;
        else if (typeof data == "string") newNode.innerHTML = data;
        else newNode.className = "is-empty";
        newNode.id = name;
        node.replaceWith(newNode);
        self.node[name] = newNode;
      }
      sectNodes.forEach(replaceSectionNode);

      // ❖ Complete Init
      self.state.activeTab = id;
      if (self.settings.onLoad) self.settings.onLoad(this);
      //TODO: transition animation
      // - if content change, fade out self.content, change innerHTML
      // - if dimension change, set new width and height
      // - if content change, fade self.content back in
    };
    /*

█
▓█═─────══─────═🙦   .eject()   🙤═─────══─────═❖
▓ Close the modal.                                                  */
    // TODO Save modal position
    this.eject = function() {
      self.node.body.classList.remove("-is-active"); // ❖ Trigger close animation
      self.destroy();
    };
    /*

█
▓█═─────══─────═🙦   .deactScript()   🙤═─────══─────═❖
▓ Close & deactivate the modal.                                                  */
    this.destroyScript = function() {
      self.node.destroy();
      // if (self.settings.onDestroy) self.settings.onDestroy();
    };

    self.create(); // ❖ Run Activation Script
  }
  /*
█
▓══────────────────══🙦⟅             ∽ 🎕 ∼             ⟆🙤══────────────────══█
▓










▓‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅    ∽ Notification() ∼    ⟆▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓ ❖ Display a notification.
▓            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .ID:         ⬥ (str) Unique ID for notification.
▓   ◇ .message*:   ⬥ (str) Notification message.
▓   ◇ .title:      ⬥ (str) Notification title.
▓   ◇ .component:  ⬥ ("item|browser|system") Type of component to use for notification.
▓     ⬥ "browser"     Basic window.alert() message.
▓     ⬥ "system"      Chrome API notification. (chrome.notifications.create)
▓     ⬥ "item"        IUP Item-based notification.
▓   ◇ .type:
▓   ("system")
▓     ⬥ "basic"       icon, title, message, expandedMessage, up to two buttons
▓     ⬥ "image"       icon, title, message, expandedMessage, image, up to two buttons
▓     ⬥ "list"        icon, title, message, items, up to two buttons. Users on Mac OS X only see the first item.
▓     ⬥ "progress"    icon, title, message, progress, up to two buttons
▓   ("item")
▓     ⬥ "default"     Standard notification box. Bottom right.
▓     ⬥ "dialog"      For alerts and prompts. Center.
▓     ⬥ "infobox"     Small box with text, 40 characters or less. Top right.
▓     ⬥ "taskbar"     Taskbar button for utilities. Bottom left.
▓   ◇ .location:   ⬥ Element to overlay on. Defaults to page body.
▓   ◇ .pos:        ⬥ ("northwest|northeast|southwest|southeast|nw|ne|sw|se")
▓   ◇ .timer:      ⬥ (int) How long the notification is shown (ms).
▓   ◇ .icon:       ⬥ Notification icon path.
▓   ◇ .sound:      ⬥ (true|<path>) Play sound when shown. True for default, or path to sound file.
▓  (EVENTS)
▓   ◇ onInject()      ⬥
▓   ◇ onTimerStart()  ⬥
▓   ◇ onTimerStop()   ⬥
▓   ◇ onTimerChange() ⬥ Triggers onTimerStart().
▓   ◇ onTimerEnd()    ⬥
▓   ◇ onEject()       ⬥
▓   ◇ onDestroy()     ⬥
▓ *required
▓
▓ ❖ TODO ❖
▓   ◇ Support multiple notifications at once:
▓     ⬥ Keep a persistent shadow dom open and put notifications inside it
▓     ⬥ Prevent collision with a dynamic 2x2 grid for each of the 4 sides
▓                                                                               */
  function Notification(arg) {
    const self = this,
      PRE = "iuN",
      ANIM_SPEED = window.IUP.S.animationSpeed * 1000,
      LAYERS = ["default", "infobox", "taskbar"],
      _isShown = "-is-shown",
      _timerActive = "-timerActive";

    _.defaults(arg, {
      passive: arg.type == "infobox" ? true : false,
      ID: _.uniqueId(PRE),
      title: "",
      component: "item",
      type: arg.component == "system" ? "basic" : "default",
      subtype: "",
      size: "lg",
      timer: arg.manualClose ? 0 : arg.type == "infobox" ? 1200 : 5000,
      // icon: FileLib.cmd.getURL("assets/icon128.png"),
      manualClose: arg.timer == 0,
      sound: false,
      item: null,
    });

    this.PRE = PRE;
    this.ID = arg.ID;
    this.node = {};
    this.settings = arg;
    this.state = {
      activated: false,
      injected: false,
      timer: null,
      interval: null,
    };
    this.create = () => UILib.cmd.Create_Instance(self);
    this.destroy = () => UILib.cmd.Destroy_Instance(self);

    /*
█
▓█═─────══─────═🙦   .createScript()   🙤═─────══─────═❖
▓ Build Shadow DOM.                                                                          */
    this.createScript = function() {
      if (self.settings.component == "item") {
        const script = { file: "UILib_Notification.css" },
        html = LAYERS.map(layer => `<div class="iuN__layer -${layer}Layer"></div>`).join(""); // prettier-ignore
        self.node = LayoutLib.cmd.buildShadowDOM({ PRE, script, html });
        LAYERS.forEach((layer) => {
          const _class = `${layer}Layer`;
          self.node[_class] = self.node.dom.querySelector(`.-${_class}`);
        });
      }
    };
    /*
█
▓█═─────══─────═🙦   .inject()   🙤═─────══─────═❖
▓ Inject the notification.                                                                          */
    this.inject = function() {
      const ID = self.ID,
        { component, type, subtype, timer, icon, title, message } = self.settings; // prettier-ignore

      // ❖ 🚧Play Sound🚧
      // if (self.settings.sound) {
      //   MediaLib.cmd.Play_Sound(sound);
      //   //TODO: check if there's a default sound for "system" notifications.
      // }

      /*
█ ❖ TYPE "ALERT" ⬥ Simple browser alert.                                                                   */
      if (component == "alert") {
        window.alert(message);

        /*
█ ❖ TYPE "SYSTEM" ⬥ Native Mac/PC system notification.                                                                   */
      } else if (component == "system") {
        const notification = {
          id: self.selector(),
          type,
          iconUrl: icon,
          title: title || "Internet Utilities Platinum",
          message,
          eventTime: timer ? Date.now() + timer : null,
          requireInteraction: self.settings.manualClose,
          silent: null,
        };
        chrome.runtime.sendMessage({ notification });

        /*
█ ❖ TYPE "ITEM" ⬥                                                                    */
      } else if (component == "item") {
        // // ❖ Handle duplicates
        // if (IUP.I.Notification[ID] && IUP.I.Notification[ID].host) {
        //   if (arg.toggle) return IUP.I.Dropmenu[ID].deact(); // if toggle is on for this ID, close modal and abort
        //   IUP.I.Dropmenu[ID].host.remove();
        // }

        // ❖ Build Item Node
        var ItemNode = self.node.dom.querySelector(`#${ID}`);
        if (ItemNode) ItemNode.remove();
        if (type == "default") {
          const itemData = { title: message, icon: arg.icon, ...arg.item };
          ItemNode = UILib.cmd.buildItem(itemData);
          ItemNode.append(ElementLib.var.build_element(`div.${PRE}__bar`));
          prepItemNode(ItemNode);
        } else if (type == "infobox") {
          ItemNode = document.createElement("div");
          prepItemNode(ItemNode);
          ItemNode.innerHTML = `<span>${message}</span>`;
        }
        function prepItemNode(Node) {
          Node.id = ID;
          Node.classList.add(`${PRE}__item`, `-${type}`, `-${arg.size}`, _isShown); // prettier-ignore
          self.node[`${type}Layer`].append(Node);
          self.node.item = Node;
        }
        _.defer(() => {
          if (timer) self.startTimer();
        });
      }
      self.state.injected = true;
      if (self.settings.onInject) self.settings.onInject(self);
    };

    /*
█
▓█═─────══─────═🙦   .startTimer()   🙤═─────══─────═❖
▓ Set the notification timer.                                                                        */
    this.startTimer = function(time = self.settings.timer) {
      self.settings.timer = time;
      self.node.item.classList.remove(_timerActive);

      // ❖ Stop Timer ⬥ Time was set to 0 or false.
      if (time === 0 || time === false) {
        if (self.settings.onTimerStop) self.settings.onTimerStop(self);
        clearTimeout(self.state.timer);
        return;
      }

      // ❖ Change Timer ⬥ If timer is already running, change it.
      if (self.state.timer) {
        clearTimeout(self.state.timer);
        if (self.settings.onTimerChange) self.settings.onTimerChange(self);
      }

      // ❖ Start Timer ⬥ Set timeout and activate Item.
      _.defer(() => {
        self.state.timer = setTimeout(self.eject, time + ANIM_SPEED);
        self.node.item.classList.add(_isShown, _timerActive);
        self.node.item.iuCSS(`--${PRE}-timer`, `${time}ms`);
        if (self.settings.onTimerStart) self.settings.onTimerStart(self);
      });
    };

    /*
█
▓█═─────══─────═🙦   .eject()   🙤═─────══─────═❖
▓ Eject the notification.                                                                          */
    this.eject = function(destroy = true) {
      const ItemNode = self.node.item;
      ItemNode.classList.remove(_isShown, _timerActive);
      setTimeout(() => {
        if (!self.settings.passive && !ItemNode.classList.contains(_isShown))
          self.destroy();
      }, ANIM_SPEED);
      self.state.injected = false;
      if (self.settings.onEject) self.settings.onEject(self);
    };

    /*
█
▓█═─────══─────═🙦   .deactScript()   🙤═─────══─────═❖
▓ Destroy the notification.                                                                          */
    this.destroyScript = function() {
      if (self.node.item) self.node.item.remove();
    };

    /*
█
▓█═─────══─────═🙦   PROPERTIES   🙤═─────══─────═❖
▓ title  = Get/set notification title.
▓ icon   = Get/set icon data. (rebuilds the icon)
▓ timer  = Start the timer.
                                                                                */
    Object.defineProperties(self, {
      title: {
        get: () => self.node.item.IUP.title,
        set: (val) => {
          if (self.settings.type == "default") self.node.item.IUP.title = val;
          if (self.settings.type == "infobox") {
            self.settings.message = val;
            if (!self.node.item) return self.inject();
            self.node.item.innerHTML = `<span>${val}</span>`;
          }
        },
      },
      icon: {
        get: () => self.node.item.IUP.icons[0],
        set: (arg) => {
          if (typeof arg == "string") arg = { val: arg };
          arg = _.extend(self.node.item.IUP.icons[0], arg);
          arg.pos = 0;
          IUP.Icon.Construct_Icon(self.node.item, arg);
        },
      },
      timer: {
        set: (time) => {
          self.startTimer(time);
        },
      },
    });

    self.create();
  }
  /*
█
▓══────────────────══🙦⟅             ∽ 🎕 ∼             ⟆🙤══────────────────══█
▓










▓‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅      ∽ Dropmenu() ∼      ⟆▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                           A simple dropdown menu.
▓            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ NOTES ❖
▓   ◇ {arg} shares parameters with buildMenu({}).
▓   ◇ See buildItem({}) for menu item parameters.
▓
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .id           = (str)  Unique ID for dropmenu. (default = auto-generated)
▓   ◇ .title        = (str)  Print title for the dropmenu.
▓   ◇ .items*       = [arr]  Array of items.
▓   ◇ .parent       = <element>  Parent element to append menu node. (default = <html>)
▓   ◇ .button       = (true|<element>)  Toggle button to activate menu. True to insert hamburger button into parent.
▓   ◇ .btnMouse     = ("both|left|right")  Left-click or right-click button to toggle.
▓   ◇ .closeMouse   = ("both|left|right")  Left-click or right-click outside dropmenu to close.
▓   ◇ .reopen       = (true|false)  Left-click or right-click to toggle.
▓   ◇ .openAt       = ("mouse|button")  Open menu at the mouse or toggle button.
▓   ◇ .useShadowDOM = ("auto"|true|false)  Use shadow DOM. "auto" to use if inserted outside IUP's UI.
▓   ◇ .group        = (str)  Assign to dropmenu group, only one menu in group is open at once.
▓   ◇ .side         = ("right|left")  Open on left or right side of hamburger.
▓ *required
▓
▓ ❖ PROPERTIES ❖
▓   ◇ .id
▓   ◇ .selector
▓   ◇ .isActive
▓   ◇ .node
▓   ◇ .items
▓   ◇ .settings
▓
▓ ❖ DATA STRUCTURE ❖
▓   ⯁ Outer Wrapper (#body)
▓     ◇ Main Wrapper (.wrap-box .menu-wrap)
▓       ⬥ Menu Item
▓       ⬥ ...
▓     ◇ Toggle Button (.btn-toggle)
▓
▓ ❖ TODO ❖
▓   ◇ Keybind controls:
▓     ⬥ Up/Down:       Navigate menu items/Change item input value.
▓     ⬥ Enter/Return:  Activate menu item.
▓     ⬥ Left/Right:    Navigate between menu/submenu/items.
▓     ⬥ Esc:           Close dropmenu.
▓                                                                               */
  function Dropmenu(arg) {
    const self = this,
      PRE = "iuDM",
      _isShown = "-is-shown";

    /*
█
▓█═─────══─────═🙦   INITIALIZE  🙤═─────══─────═❖
▓                                                                        */
    /*
█ ❖ DEFAULTS                                                                   */
    _.defaults(arg, {
      id: _.uniqueId(PRE),
      passive: true,
      title: "",
      button: true,
      btnMouse: "both",
      closeMouse: "both",
      openAt: "mouse",
      parent: document.documentElement,
      useShadowDOM: "auto",
      group: null,
      side: "right",
    });
    if (arg.useShadowDOM == "auto") {
      arg.useShadowDOM = !LayoutLib.var.in_native_ui(arg.parent);
    }

    /*
█ ❖ PROPERTIES                                                                   */
    this.PRE = PRE;
    this.ID = arg.ID;
    this.node = {};
    this.settings = arg;
    this.state = { activated: false, injected: false };
    this.create = () => UILib.cmd.Create_Instance(self);
    this.destroy = () => UILib.cmd.Destroy_Instance(self);

    /*

█
▓█═─────══─────═🙦   .createScript()   🙤═─────══─────═❖
▓ Build & inject the dropmenu into the DOM.                                                                          */
    this.createScript = function() {
      const ID = self.id;

      /*
█ ❖ BUILD WRAPPER                                                                   */
      const script = { file: "UILib_Dropmenu.css" },
        html = `<div class="wrap-box"></div>`;
      if (self.settings.useShadowDOM) {
        self.node = LayoutLib.cmd.buildShadowDOM({ PRE, ID, script, html });
      } else {
        const body = document.createElement("div");
        body.id = `${PRE}-${ID}`;
        body.innerHTML = html;
        self.settings.parent.appendChild(body);
        self.node.box = body.querySelector(".wrap-box");
        self.node.body = body;
      }

      self.node.box.addEventListener("use", (e) => {
        if (e.closeMenuOnUse) self.destroy();
      });

      /*
█ ❖ TOGGLE BUTTON                                                                   */
      const { button, btnMouse, closeMouse } = self.settings;
      if (button) {
        if (button === true) {
          self.node.box.insertAdjacentHTML("afterEnd", `<i class="btn-toggle fas fa-fw fa-bars"></i>`); // prettier-ignore
          self.settings.button = self.node.body.querySelector(".btn-toggle");
        }
      } else self.node.body.classList.add("-absolute");

      /*
█ ❖ TOGGLE BUTTON ⬥ Events                                                                   */
      self.settings.button.onclick = function(e) {
        if (self.state.injected) self.eject();
        else if (["left", "both"].includes(btnMouse)) self.inject(e);
        e.stopPropagation();
      };
      self.settings.button.oncontextmenu = function(e) {
        if (self.state.injected) self.eject();
        else if (["right", "both"].includes(btnMouse)) self.inject(e);
        e.preventDefault();
        e.stopPropagation();
      };
      if (["left", "both"].includes(closeMouse)) {
        document.addEventListener("click", closeMouseEvent);
      }
      if (["right", "both"].includes(closeMouse)) {
        document.addEventListener("contextmenu", closeMouseEvent);
      }
      function closeMouseEvent(e) {
        if (self.state.injected) self.eject();
      }
    };
    /*
█
▓█═─────══─────═🙦   .inject()   🙤═─────══─────═❖
▓ Inject the dropmenu.                                                                      */
    this.inject = function(e) {
      /*
█ ❖ Close all nodes in dropmenu group.                                                                   */
      if (self.settings.group) {
        for (var D in IUP.I.Dropmenu) {
          let menu = IUP.I.Dropmenu[D],
          matches = menu.state.injected && menu.settings.group == self.settings.group; // prettier-ignore
          if (matches) menu.eject();
        }
      }
      /*
█ ❖ GENERATE MENU                                                                   */
      while (self.node.box.firstChild) self.node.box.removeChild(self.node.box.firstChild); // prettier-ignore
      UILib.cmd.buildMenu(self.settings.items, self.node.box, self.id);

      /*
█ ❖ Position menu at mouse (if applicable)                                                                   */
      if (self.settings.openAt == "mouse") {
        self.node.box.style.left = e.pageX + "px";
        self.node.box.style.top = e.pageY + "px";
      }

      if (self.settings.side == "left") {
        self.node.box.classList.add("-left-side");
      }
      /*
█ ❖ 🚧Overflow Repositioning                                                                   */
      // var { left, top } = self.node.body.getBoundingClientRect(),
      //   leftEdge = left + self.node.box.clientWidth,
      //   bodyWidth = document.body.clientWidth;
      // if (leftEdge > bodyWidth) {
      //   left -= leftEdge - bodyWidth;
      //   self.node.box.classList.add("overflow-x");
      //   // self.node.box.style.transform = `scaleY(1) translate(${left}px, 0)`;
      // }
      /*
█ ❖ Trigger Open Animation                                                                   */
      _.defer(() => self.node.box.classList.add(_isShown));
      self.state.injected = true;
    };
    /*
█
▓█═─────══─────═🙦   .eject()   🙤═─────══─────═❖
▓ Close the dropmenu.                                                                               */
    this.eject = function() {
      self.state.injected = false;
      self.node.box.classList.remove(_isShown);
    };
    /*
█
▓█═─────══─────═🙦   .deactScript()   🙤═─────══─────═❖
▓ Destroy the dropmenu, deleting it from the DOM.                                                                  */
    this.destroyScript = function() {
      self.node.host.remove();
    };

    self.create();
  }
}();

/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯















ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█     🙢  WINDOW LIBRARY  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMMANDS ❖
▓   ◇ Navigate_History  (action)
▓   ◇ Navigate_URL      (url, navType)
▓   ◇ Open_Window       (url, features)
▓   ◇ accessClipboard   (val)
▓
▓ ❖ VARIABLES ❖
▓   ◇ get_clipboard_contents
▓   ◇ history
▓     ⬥ num_entries
▓     ⬥ state
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
const WindowLib = new function() {
  const self = this;
  this.var = {
    /*
█
▓█═─────══─────═🙦   accessClipboard()   🙤═─────══─────═❖
▓ Read or write to the user's clipboard.                                                                  */
    accessClipboard: function(val = null) {
      //src: https://stackoverflow.com/questions/47751811/create-custom-clipboarddata-property-for-clipboardevent
      const clipboardData = { clipboardData: new DataTransfer() },
        e = new ClipboardEvent("paste", clipboardData);
      if (val !== null) {
        e.clipboardData.setData("text/plain", val);
      } else {
        return e.clipboardData.getData();
      }
    },
  }; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.var = {
    history: {
      get num_entries() {
        return window.history.length;
      },
      get state() {
        return window.history.state;
      },
    },
  };
}(); /*
▓                                                                             ⸯ▓
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
                       ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯                        */

//
