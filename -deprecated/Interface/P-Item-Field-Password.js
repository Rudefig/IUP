/*
ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  PASSWORD FEATURES  🙠   █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓
▓  ❖ **CONVERT TO MACRO**
▓    ◇ Use buildItem() as base.
▓    ◇ Item Buttons: Position 1 = reveal password, Position 2 = capslock icon.
▓    ◇ Move the copy CSS functionality to LayoutLib.
▓
▓  ❖ DESC ❖
▓    ◇ Add a 'reveal password' button and CAPSLOCK indicator to password fields.
▓    ◇ Overlays a shadow DOM over PW field, clones CSS properties to match size.
▓
▓  ❖ TODO ❖
▓    ◇ BUGGED PAGES:
▓      ⬥ https://www.humblebundle.com/games/very-positive-bundle-3?hmb_source=navbar&hmb_medium=product_tile&hmb_campaign=tile_index_3
▓    ◇ APPEARANCE:
▓      ⬥ Choose caps lock icon - "CAPS" text or up arrow, outline or filled (4 icons total)
▓      ⬥ When user disables caps lock, change icon to crossed out version and animate out
▓    ◇ FUNCTIONALITY:
▓      ⬥ On init, auto-show reveal icon if PW field has text in it
▓      ⬥ Shift-click icon to disable on this site
▓      ⬥ Ensure it can support multiple PW fields on one page [NECESSARY?]
▓      ⬥ Try to detect if the site has its own hide password button (gather reference sites, identify common practices)
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
export var App = function() {
  const self = this;
  this.Meta = {
    title: "Password Features",
    icon: "f09c",
    desc:
      "Enhance password fields with a Reveal Password button and CAPSLOCK indicator."
  };
  this.warning = () => !self.var.get_pw_field.val ? "No password field found." : ""; // prettier-ignore
  this.onLoad = function() {
    self.Action.Activate();
  };
  this.onEject = function() {
    self.Action.Deactivate();
  };
  /*
█ ❖ CONSTANTS                                                                   */
  this.Constant = {
    shadowID: "IUP-UP",
    targClass: "IUP-UP-target",
    cssPropsToClone: ["width", "height", "border", "padding", "box-sizing"],
    // Generate node for Reveal Password.
    get revealPasswordTemplate() {
      var node = document.createElement("span");
      node.classList.add("btn-reveal");
      node.title =
        " ❖ Click to toggle password visibility.\n ❖ Shift-click to disable on this site.\n ❖ Alt-click to fix positioning.";
      node.innerHTML = `<i class="fas fa-eye" aria-hidden="true"></i>`;
      return node;
    },
    // Generate node for CAPSLOCK Indicator.
    get capslockTemplate() {
      var node = document.createElement("span"),
        iconURL = chrome.runtime.getURL("utility/CAPSLOCK.svg");
      node.classList.add("btn-caps");
      node.title = "CAPSLOCK is enabled.";
      node.innerHTML = `<object type="image/svg+xml" data="${iconURL}">`;
      // node.querySelector("object").onload = function(e) {
      //   console.log(this, this.getSVGDocument(), this.contentDocument, "aaa");
      // };
      return node;
    }
  };
  this.Trigger = {
    // focus ⬥ When user clicks any PW field, inject utility or refresh CSS.
    focus: function(e) {
      const target = e.path[0],
        isPassword = target.type == "password",
        isInput = target.tag == "input",
        targeted = target.classList.contains(self.con.targClass);
      if (targeted) self.Action.Refresh_Password_CSS(true);
      else if (isPassword && isInput) {
        self.var.node.password = target;
        self.Action.Inject(target);
        self.Action.Refresh_Password_CSS();
      }
    },
    // keyup ⬥ When user enters a letter into PW field.
    keyup: function(e) {
      const length = e.target.value.length,
        { revNode, capsNode } = self.var.node,
        capsActive = e.getModifierState("CapsLock"),
        revOn = true, //self.settings.revealPasswordEnabled.val,
        capsOn = true; //self.settings.capslockIndicatorEnabled.val;
      if (!length) {
        if (revOn) revNode.classList.remove("-is-shown");
        if (capsOn) capsNode.classList.remove("-is-shown");
      } else {
        if (revOn) revNode.classList.add("-is-shown");
        if (capsOn && capsActive) capsNode.classList.add("-is-shown");
        if (capsOn && !capsActive) capsNode.classList.remove("-is-shown"); // prettier-ignore
      }
    },
    // input - Listen for user clicking a password field; inject utility or refresh CSS
    input: function(e) {
      if (e.target.value.length) {
        //
      }
    }
  };
  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ COMMANDS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
  this.Action = {
    /*
█
▓█═─────══─────═🙦   Activate()   🙤═─────══─────═❖
▓ Listen for user focus on a PW field. Attempt to run inject script.                                                                             */
    Activate: function() {
      const focus = self.Trigger.focus;
      document.body.addEventListener("focus", focus, true);
      self.Action.Inject_Password_Features();
    },
    /*
█
▓█═─────══─────═🙦   Inject_Password_Features()   🙤═─────══─────═❖
▓ Inject upgrades into PW field {target}.                                                                             */
    Inject_Password_Features: function(target) {
      const PW = target || self.var.get_pw_field,
        {
          shadowID,
          targClass,
          revealPasswordTemplate,
          capslockTemplate
        } = self.con,
        revOn = true, //self.settings.revealPasswordEnabled.val,
        capsOn = true; //self.settings.capslockIndicatorEnabled.val;
      if (!PW || PW.classList.contains(targClass) || PW.iuIsHidden || PW.tag != "input") return false; // prettier-ignore
      var host = self.var.node.host;
      if (host) host.remove();
      /*
█ ❖ Init Shadow DOM                                                                   */
      PW.classList.add(targClass);
      if (!PW.parentElement.iuCSS("position")) {
        PW.parentElement.iuCSS("position", "relative");
      }

      const PRE = self.con.shadowID,
        script = { file: "PasswordFeatures.css" };
      self.var.node = LayoutLib.cmd.buildShadowDOM({ PRE, script });
      PW.insertAdjacentElement("beforeBegin", self.var.node.host);
      const body = self.var.node.body;
      /*
█ ❖ Inject "Capslock Indicator"                                                                   */
      if (capsOn) {
        self.var.node.capsNode = capslockTemplate;
        body.appendChild(self.var.node.capsNode);
      }
      /*
█ ❖ Inject "Reveal Password"                                                                    */
      if (revOn) {
        self.var.node.revNode = revealPasswordTemplate;
        body.appendChild(self.var.node.revNode);
        // ❖ Register click event
        self.var.node.revNode.onclick = function(e) {
          e.preventDefault();
          if (e.shiftKey) return self.Action.Deactivate();
          if (e.altKey) return self.Action.Refresh_Password_CSS();
          self.Action.Toggle_Password();
        };
        self.var.node.revNode.onmousedown = e => e.preventDefault(); // keep focus
      }
      // ❖ Copy CSS from PW field to wrapper so they match
      self.Action.Refresh_Password_CSS();
      /*
█ ❖ Inject 'keyup' Event Listener                                                                   */
      PW.addEventListener("keyup", self.Trigger.keyup);
    },
    /*
█
▓█═─────══─────═🙦   Toggle_Password()   🙤═─────══─────═❖
▓ Toggle revealing the password on and off.                                                                             */
    Toggle_Password: function() {
      const pwField = self.var.get_pw_field,
        isShown = self.var.password_is_shown,
        icon = self.var.node.dom.querySelector("i");
      if (!pwField) return console.error("IUP Toggle_Password Error: No password field found."); // prettier-ignore
      /*
█ ❖ Show PW                                                                   */
      if (!isShown) {
        pwField.setAttribute("type", "text");
        icon.setAttribute("class", "fas fa-eye-slash");
        self.var.password_is_shown = true;
      } else {
        /*
█ ❖ Hide PW                                                                   */
        pwField.setAttribute("type", "password");
        icon.setAttribute("class", "fas fa-eye");
        self.var.password_is_shown = false;
      }
    },
    /*
█
▓█═─────══─────═🙦   Refresh_Password_CSS()   🙤═─────══─────═❖
▓ Refresh the wrapper CSS to match the password field.                                                                           */
    Refresh_Password_CSS: function(refresh = false) {
      const PW = self.var.get_pw_field,
        body = self.var.node.body,
        icon = self.var.node.dom.querySelector("i"),
        iconOpacity = self.settings.iconOpacity.val,
        cssPropsToClone = self.con.cssPropsToClone;
      /*
█ ❖ Calculate Values                                                                   */
      var width = PW.iuCSS("width");
      if (self.var.node.host.iuCSS("text-align") == "center") width /= 2; // ❖ If shadow wrapper is aligned center, adjust to fit
      setStyle = P => (body.style[s.camelize(P)] = PW.iuCSS(P));
      cssPropsToClone.forEach(setStyle);
      body.iuCSS({
        "border-color": "transparent",
        opacity: iconOpacity,
        width: width + "px",
        top: PW.offsetTop + "px",
        left: PW.offsetLeft + "px"
      });
      icon.style.fontSize = PW.iuCSS("font-size");
      if (refresh) return; // skip icon color to avoid flicker

      /*
█ ❖ Determine Icon Color ⬥ Set to body font color if it contrasts with pw background color, otherwise detect based on light/dark layout */
      const bgColor = PW.iuCSS("background-color"),
            fgColor = document.body.iuCSS("color"),
            passMode = LayoutLib.var.light_or_dark(bgColor),
            bodyMode =  LayoutLib.var.light_or_dark(fgColor),
            iconColor = !passMode == bodyMode ? fgColor : bgColor ? "#000" : "#FFF"; // prettier-ignore
      body.style.color = iconColor;
      //TODO: Make the "CAPS" text transparent instead of white. Play around with photoshop.
      //TODO: Resize to 22x12px.
      self.var.node.style.insertAdjacentHTML("beforeEnd", `--up-fill:${iconColor};`) // prettier-ignore
    },
    /*
█
▓█═─────══─────═🙦   Deactivate()   🙤═─────══─────═❖
▓ Restore the page to its original state.                                                                             */
    Deactivate: function() {
      const pwField = self.var.get_pw_field,
        shadow = self.var.node.shadow,
        { focus, keyup } = self.Trigger;
      if (shadow) shadow.remove(); // remove shadow DOM
      if (pwField) {
        pwField.setAttribute("type", "password");
        pwField.removeEventListener("keyup", keyup);
        pwField.classList.remove(self.con.targClass);
      }
      document.body.removeEventListener("focus", focus, true);
      self.var.node = {};
      self.var.password_is_shown = false;
    }
  };
  /*
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█                                                                                      */
  this.var = {
    password_is_shown: false,
    node: {},
    password_field: null,
    get get_pw_field() {
      const PW = document.querySelector("." + self.con.targClass),
        input = document.querySelector("input[type='password']");
      return self.var.node.password || PW || input || false;
    }
  };

  /*
█ ❖ SETTINGS                                                                   */
  this.Setting = {
    revealPasswordEnabled: {
      title: "Reveal Button",
      desc: "Show a reveal password button on password fields.",
      type: "bool",
      default: true
    },
    capslockIndicatorEnabled: {
      title: "Capslock Icon",
      desc: "Show a capslock indicator on password fields.",
      type: "bool",
      default: true
    },
    //TODO Figure out way to add demo icon to the right of slider
    iconOpacity: {
      title: "Icon Opacity",
      desc: "Transparency level of the icons.",
      type: "number",
      component: "slider",
      default: 0.66,
      props: {
        unit: "%",
        min: 0,
        max: 100,
        toDisplay: val => val * 100,
        toStorage: val => val / 100
      }
    }
  };
  /*
█ ❖ META                                                                   */
  this.meta = {
    info: {
      howItWorks:
        "Scans the page for password fields and injects an overlay. Style properties are copied over so the appearance matches."
    }
  };
};
/*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█ⸯ      ──═⟅  ∽ 🎕 ∼  ⟆═──      ⸯ█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
                      ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯
*/
export var con = {};
