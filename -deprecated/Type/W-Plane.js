/*

PLANE SUBTYPES
 - Screen: Stays fixed to viewport.
 - Page: Covers the entire Base.
 - Base: Base webpage containing the document <body>.
 - Back: Empty background plane for the root <html>.

*/
this.Action = {
  Create_Plane: function() {},
};

this.Action = {
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ buildShadowDOM() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓            Build and inject a shadow DOM for a UI instance or utility.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ SYNTAX ❖
{ host, dom, body, box } = LayoutLib.cmd.buildShadowDOM({ID, script, html});
█
▓ ❖ FUNCTIONALITY ❖
▓   ◇ Comes with a faux <head> and <body> element.
▓
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .ID*             = (str)  Unique ID for the shadow DOM.
▓   ◇ .script          = (null|data)  Data is passed to getScript(script) and injected into faux <head>.
▓   ◇ .html            = (null|html)  HTML injected after faux <head>.
▓   ◇ .appendTo        = (<html>|<element>)  Node to append shadow DOM to. Defaults to <html>.
▓   ◇ .handleDuplicate = ("use|replace|iterate")  How to handle an existing shadow DOM with the same ID.
▓     ⬥ "use"     = Use existing shadow DOM
▓     ⬥ "replace" = Delete it and build a new one.
▓     ⬥ "iterate" = Add a number suffix to the end. {id}-1, {id}-2, etc.
▓ *REQUIRED
▓
▓ ❖ RETURN VALUE ❖
▓ return {
▓   ◇ TODO...
▓   ◇ .host  = Shadow host
▓   ◇ .dom   = Shadow DOM
▓   ◇ .head  = Faux <head> node for scripts. ⮚ <div id="head"></div>
▓   ◇ .style = Style node setup inside the head. ⮚ <style id="style"></style>
▓   ◇ .body  = Faux <body> node for scripts. ⮚ <div id="body"></div>
▓   ◇ .box   = If a ".wrap-box" element was included in {html}.
▓   ◇ .outer = If an ".wrap-outer" element was included in {html}.
▓   ◇ .bg    = If a ".wrap-bg" element was included in {html}.
▓
▓ ❖ TODO ❖
▓   ◇ n/a
▓                                                                                 */
  buildShadowDOM: function(arg, self) {
    if (self) {
      arg.ID = self.ID;
      arg.instance = self.constructor.name;
      IUP.I[arg.instance] = self;
    }
    const { ID = arg.PRE, PRE, instance, html, gradient = "gold", appendTo = document.documentElement, handleDuplicate = "use" } = arg, // prettier-ignore
      _isActive = "-is-active",
      _isDeact = "-is-deact";
    var host = document.getElementById(ID),
      dom,
      script = arg.script || {};
    /*
█ ❖ Handle Duplicate ID                                                                   */
    const duplicateFound = host && host.shadowRoot;
    if (duplicateFound && handleDuplicate == "use") dom = host.shadowRoot;
    else {
      if (duplicateFound) {
        if (handleDuplicate == "replace") host.remove();
        else if (handleDuplicate == "iterate") {
          for (var i = 1, id = `${ID}-${i}`; document.getElementById(id); i++){} // prettier-ignore
          ID = id;
        }
      }
      /*
█ ❖ Build Shadow DOM                                                                   */
      host = document.createElement("span");
      host.id = ID;
      dom = host.attachShadow({ mode: "open" });
      host.innerHTML = `<style>/*html{height:auto!important;}*/ html span#${ID}{ position:absolute!important;display:contents!important; } html span#${ID}.-is-deact{ visibility:hidden; }</style>`;
      dom.innerHTML = `<div id="head"><style id="style"></style>${script}</div><div id="body"></div>`;
      dom.head = dom.querySelector("#head");
      dom.body = dom.querySelector("#body");
      script.gradient = script.gradient || gradient;
      script.flags = script.flags ? ["css", ...script.flags] : ["css"];
      script.doc = dom;
      script = FileLib.cmd.getScript(script);

      const uiSize = window.IUP.S.menuItemSize.id;
      dom.body.classList.add(`UI-${uiSize}`);
      if (PRE) dom.body.classList.add(PRE);
      if (html) dom.body.insertAdjacentHTML("beforeEnd", html);
      if (appendTo) appendTo.appendChild(host);
    }

    /*
█ ❖ Activate Shadow DOM                                                                   */
    host.classList.remove(_isDeact);
    dom.body.classList.add(_isActive);

    /*
█ ❖ Output                                                                      */
    const DataObj = {
      ID,
      PRE,
      self,
      host,
      dom,
      head: dom.head,
      body: dom.body,
      style: dom.querySelector("#style"),
      outer: dom.querySelector(".wrap-outer"),
      bg: dom.querySelector(".wrap-bg"),
      box: dom.querySelector(".wrap-box"),
      script,
      deact() {
        this.host.classList.add(_isDeact);
        this.body.classList.remove(_isActive);
      },
      destroy() {
        this.host.remove();
        if (instance) delete IUP.I[instance][ID];
      },
    };
    return DataObj;
  },
};
