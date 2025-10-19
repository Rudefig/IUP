/*ⸯ                     ༿─────────═🙦 🇵🇷🇪🇻🇮🇪🇼 🙤═─────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  PASSWORD FEATURES  🙠   █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ REFERENCES:
▓   ◇ https://www.paypal.com/signin
▓   ◇ https://www.linkedin.com/uas/login
▓   ◇ https://accounts.adobe.com/
▓   ◇ https://www.apple.com/shop/account/home
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
export const preview = {
  meta: {
    propStyle: true,
    targ: {
      width: 268,
      height: 90,
      top: 302,
      left: 324
    }
  },
  target: "#pw-wrap",
  /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ HTML ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
  html: `<div id="form-wrap">
  <h3 class="prop">WELCOME BACK</h3>
  <div id="login-input">
    <div id="user-wrap" class="row prop">
      <span>no-reply@gmail.com</span><span>Change</span>
    </div>
    <i></i>
    <div id="pw-wrap" class="row">
      <label for="field-pw">PASSWORD:</label>
      <input id="field-pw" type="password" />
    </div>
    <i class="fas fa-times"></i>
  </div>
  <div id="login-footer">
    <div class="grid-signin">
      <div></div>
      <button class="prop btn-signin">SIGN IN</button>
      <span class="prop remember-me"><input type="checkbox" checked /> Remember Me</span>
    </div>
    <a href="#" class="prop">Forgot password?</a>
    <div class="flex-3rdParty">
      <div class="facebook prop"><i class="fab fa-facebook-f"></i> Sign in with Facebook</div>
      <div class="google prop"><i class="fab fa-google"></i> Sign in with Google</div>
    </div>
  </div>
</div>`,
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ EVENT SCRIPTS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
  onPreviewInit: function(self, SR) {
    const pw = SR.querySelector("#field-pw"),
      wrap = SR.querySelector("#pw-wrap"),
      icon = SR.querySelector("#pw-wrap + i");
    pw.used = false;
    pw.onblur = function() {
      pw.used = true;
      validate();
    };
    pw.oninput = function() {
      validate();
    };
    function validate() {
      if (!pw.used) return;
      if (pw.value.length == 0) {
        wrap.classList.remove("valid");
        wrap.classList.remove("invalid");
      } else if (pw.value.length >= 8) {
        wrap.classList.add("valid");
        wrap.classList.remove("invalid");
      } else {
        wrap.classList.remove("valid");
        wrap.classList.add("invalid");
      }
    }
  }
};
