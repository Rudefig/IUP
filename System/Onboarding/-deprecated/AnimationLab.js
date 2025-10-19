/*ⸯ                     ༿─────────═🙦 🇵🇷🇪🇻🇮🇪🇼 🙤═─────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  ANIMATION LAB  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓
▓ ❖ ANIMATIONS
▓   ◇ Hurricane: Wind blows from right side, node detaches on right side and bangs up and down, eventually is pulled off and flips away.
▓   ◇ Unhinged: Top right side detaches, swings from top left side, then falls down
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
export const preview = {
  meta: {
    title: "Animation Lab",
    desc: "A development tool for creating element animations.",
    lab: true
  },
  /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ PROPERTIES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
  props: {
    ParamIndex: {
      translate: {
        x: [0, "px", 50],
        y: [0, "px", 50],
        z: [0, "px", 50]
      },
      rotate: {
        x: [0, "", 0.5],
        y: [0, "", 0.5],
        z: [0, "", 0.5],
        deg: [0, "deg", 30]
      },
      scale: {
        x: [1, "", 0.2],
        y: [1, "", 0.2],
        z: [1, "", 0.2]
      },
      perspective: {
        val: [800, "px", 100]
      }
    },
    ParamTypes: ["translate", "rotate", "scale"],
    ParamVals: ["x", "y", "z"],
    AnimIndex: {
      reset: { title: "RESET" },
      Vanish: { title: "Vanish" },
      Unhinged: { title: "Unhinged" },
      Hurricane: { title: "Hurricane", disabled: true },
      Slingshot: { title: "Slingshot", disabled: true },
      Trapdoor: { title: "Trapdoor", disabled: true },
      Hurricane: { title: "Atomizer", disabled: true }
    }
  },
  /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ HTML ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
  html: `
<div id="col-anims"></div>
<div id="col-element">
  <div id="animate-parent">
    <img id="animate-target" class="RESET" src="assets/animateme.jpg">
    <div id="animate-background"></div>
  </div>
</div>
<div id="col-params"></div>

</div>
  `,
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ EVENT SCRIPTS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
  onPreviewInit: function(self, SR) {
    const IMG = SR.querySelector("img"), //❌
      colAnims = SR.querySelector("#col-anims"),
      colElement = SR.querySelector("#col-element"),
      colParams = SR.querySelector("#col-params"),
      parent = SR.querySelector("#animate-parent"),
      target = SR.querySelector("#animate-target"),
      background = SR.querySelector("#animate-background");

    document.head.insertAdjacentHTML(
      "beforeEnd",
      FileLib.cmd.getScript("animate-style.css")
    );

    /*
█ ❖ ANIMATION BUTTONS ⬥ Generate buttons for executing animations.                                                                   */
    _.each(self.props.AnimIndex, (data, ID) => {
      const { title, disabled = false } = data,
        isDisabled = disabled ? " disabled" : "",
        btn = `<input id="${ID}" value="${title}" type="button"${isDisabled}>`;
      colAnims.insertAdjacentHTML("beforeEnd", btn);
      SR.querySelector(`#${ID}`).onclick = function() { execAnimation(ID); }; // prettier-ignore
    });
    // TODO: Convert to ElementLib.cmd.Animate_Element(T, animName)
    function execAnimation(ID) {
      const { top, left } = target.iuPosition,
        { width, height } = target.getBoundingClientRect();
      parent.iuCSS({
        "--Animate-page-height": LayoutLib.var.get_page_height(),
        "--Animate-top": top + "px",
        "--Animate-left": left + "px"
        // "--Animate-width": width + "px",
        // "--Animate-height": height + "px"
      });
      parent.className = "Animate";
      target.className = "Animate__target";
      background.className = "Animate__background";
      _.defer(() => {
        parent.classList.add("Animate--" + ID);
        target.classList.add("Animate__target--" + ID);
        background.classList.add("Animate__background--" + ID);
      });
    }
    /*
█ ❖ PARAM FIELDS ⬥ Generate input fields for transformation parameters.                                                                   */
    _.each(self.props.ParamIndex, (paramFields, paramName) => {
      const wrapHTML = `<div class="${paramName}"><h5>${paramName}</h5></div>`;
      colParams.insertAdjacentHTML("beforeEnd", wrapHTML);
      _.each(paramFields, (fieldData, fieldName) => {
        var [def, unit, step] = fieldData;
        const ID = `${paramName}-${fieldName}`,
          inputHTML = `<input value="${def}" id="${ID}">`;
        colElement.style.setProperty(`--${ID}`, def + unit);
        SR.querySelector(`.${paramName}`).insertAdjacentHTML("beforeEnd", inputHTML); // prettier-ignore
        function setProp(e) {
          colElement.style.setProperty(`--${ID}`, $(this).val() + unit);
        }
        const field = SR.querySelector(`#${ID}`);
        $(field).spinner({
          step: step,
          stop: setProp
        });
      });
    });
    //END
  }
};
