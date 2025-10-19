/*
▓‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅     ∽ TargetLine() ∼     ⟆▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓            ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ Highlight a target element on the page with horizontal and vertical lines.
▓
▓ ❖ PARAMETERS ❖
▓ arg = {
▓   ◇ .id:      = (str) Unique id for target lines.
▓   ◇ .target:  = (str) Element selector or array of selectors in DOM to target.
▓   ◇ .speed:   = (50|int|null) Speed of the animation in MS. Null or 0 to disable.
▓   ◇ .color:   = ("#FF0"|str)  Color of the lines.
▓
▓ ❖ DOM STRUCTURE ❖
▓   ◇ #body
▓     ◇ #body
▓     ◇ #body
▓
▓ ❖ TODO ❖
▓   ◇ Broken: https://developer.mozilla.org/en-US/docs/Web/API/Window/open
▓                                                                                  */
function TargetLine(arg) {
  const self = this,
    PRE = "iuTL";

  if (typeof arg == "string") arg = { ID: arg };
  _.defaults(arg, {
    ID: _.uniqueId(PRE),
    target: [],
    inject: arg.target && arg.target.length,
    speed: 50
  });
  if (!Array.isArray(arg.target)) arg.target = [arg.target];

  this.PRE = PRE;
  this.ID = arg.ID;
  this.node = {};
  this.settings = arg;
  this.state = { activated: false, injected: false };
  this.create = () => UILib.cmd.Create_Instance(self);
  this.destroy = () => UILib.cmd.Destroy_Instance(self);
  this.targets = new Map();
  /*
█
▓█═─────══─────═🙦   createScript()   🙤═─────══─────═❖
▓                                                                          */
  this.createScript = function(target) {
    const script = { file: "UILib_TargetLine.css" };
    self.node = LayoutLib.cmd.buildShadowDOM({ PRE, script });
  };
  /*
█
▓█═─────══─────═🙦   .inject()   🙤═─────══─────═❖
▓                                                                        */
  this.inject = function() {
    if (self.state.injected) IUP.WARN("TargetLine is already injected."); // prettier-ignore
    // self.node.body.iuCSS({ "--iuTL-speed": `${self.settings.speed}ms` });

    window.addEventListener("resize", self.onWindowResize);
    self.targets = new Map();
    self.settings.target.forEach(self.createTargetLine);
    self.state.injected = true;
    if (self.settings.onInject) self.settings.onInject(self);
  };
  /*
█
▓█═─────══─────═🙦   .createTargetLine()   🙤═─────══─────═❖
▓ Display horizontal and vertical lines over a single target by adding 2 nodes to the shadow DOM                                                                          */
  this.createTargetLine = function(target) {
    if (!target) return IUP.WARN("createTargetLine wasn't given a target.");
    if (target.constructor.name == "Selection") {
      //TODO
    }

    // ❖ Build HTML
    const __x = document.createElement("div"),
      __y = document.createElement("div");
    __x.classList.add(`${PRE}__x`);
    __y.classList.add(`${PRE}__y`);
    self.node.body.append(__x, __y);

    // ❖ Save to map object
    self.targets.set(target, { __x, __y });
    self.setLinePosition(target);
  };
  /*
█
▓█═─────══─────═🙦   .setLinePosition()   🙤═─────══─────═❖
▓ Position the lines on the edges of {target}.                                                                         */
  this.setLinePosition = function(target) {
    const { __x, __y } = self.targets.get(target);
    // ❖ Calc values
    const transform = target.iuCSS("transform"),
      isZoomed = IUP.MM.isActive,
      zoomVal = 100 / IUP.S.menuScale;
    __G(target);
    var { top, left } = target.iuPosition,
      width = target.offsetWidth + "px",
      height = target.offsetHeight + "px";
    top = (isZoomed ? top * zoomVal : top) + "px";
    left = (isZoomed ? left * zoomVal : left) + "px";
    // ❖ TODO: Account for transform properties
    //  - extract values from transform string
    //  - COPY THESE: {translate[X/Y]}, {rotate}, {skew[X/Y]}
    //  - Use {scaleY} as multiplier for node height, {scaleX} for width

    // ❖ Set values
    __x.iuCSS({ height, top, transform });
    __y.iuCSS({ width, left, transform });
  };

  /*
█
▓█═─────══─────═🙦   onWindowResize()   🙤═─────══─────═❖
▓ Window resize handler.                                                                          */
  self.onWindowResize = function(e) {
    if (!self.state.injected) {
      window.removeEventListener("resize", self.onWindowResize);
      return;
    }
    self.targets.forEach((nodes, target) => {
      const { __x, __y } = nodes;
      setNodePositions(target, __x, __y);
    });
  };
  /*
█
▓█═─────══─────═🙦   .eject()   🙤═─────══─────═❖
▓ Remove target lines.                                                                          */
  // TODO remove data-TargetLine-id values from targets
  this.eject = function() {
    if (!self.state.injected) return IUP.WARN("TargetLine is already ejected."); // prettier-ignore
    self.targets = new Map();
    self.state.injected = false;
    if (self.settings.onEject) self.settings.onEject(self);
  };
  /*
█
▓█═─────══─────═🙦   .deactScript()   🙤═─────══─────═❖
▓                                                                           */
  // TODO remove data-TargetLine-id values from targets
  this.destroyScript = function() {
    if (self.node.destroy) self.node.destroy();
  };

  self.create(); // ❖ Run Activation Script
}
