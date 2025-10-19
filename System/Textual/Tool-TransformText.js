/*
ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█     🙢  TRANSFORM TEXT  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ DESCRIPTION:
▓   ◇ Transform common letters & symbols between equivalent Unicode characters.
▓
▓ ❖ TODO:
▓   ◇ Deep transformation: Any transformation character can convert to any other transformation. Instead of just the "regular" charset, use every charset as a reference.
▓   ◇ Implement "Selection Mode": Select the text in the box and click a transformation button to convert it.
▓     ⬥ Generate buttons as buttons
▓     ⬥ Perform transformation onClick on selection only
▓     ⬥ Add "Revert" button below input textarea
▓     ⬥ This requires "deep transformation".
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
export var App = function() {
  const self = this;

  this.Meta = {
    title: "Transform Text",
    icon: "f032",
    desc: "Transform text characters into uppercase, bold, and more.",
    info:
      "Each character in the provided text is matched with the corrosponding character in a reference string.",
    system: "Language"
  };

  this.Process = {
    /*
▓█═─────══─────═🙦   Transform_Text   🙤═─────══─────═❖
▓ Perform transformation {type} on string {input}.                                                                          */
    Transform_Text: function(input, type) {
      if (!type) return input;
      const typeData = _.find(self.Index.transformations, sect => sect[type] !== undefined)[type]; // prettier-ignore
      if (typeData.map) return mapCharacters(input, typeData.map);
      else if (typeData.run) return typeData.run(input);

      function mapCharacters(input, refSet) {
        const NORMAL_CHAR_SET = self.Constant.NORMAL_CHAR_SET;
        var map = {},
          output = "";
        refSet = refSet.split(" ");

        // ❖ Split normal chars into array and map ref chars onto it
        NORMAL_CHAR_SET.split("").forEach((item, index) => {
          map[item] = refSet[index];
        });
        // ❖ Split input into array and apply the map
        input.split("").forEach(char => {
          output += map[char] !== undefined ? map[char] : char;
        });
        return output;
      }
    },
    /*
▓█═─────══─────═🙦   ❌Build_Sheet()❌   🙤═─────══─────═❖
▓ Build the main utility panel. ❌ Generate it with platform components                                                                             */
    Build_Sheet: function(Sheet, arg = {}) {
      // ❖ Initialize Sheet
      Sheet.node.content.innerHTML = self.Constant.SHEET_CODE;
      FileLib.cmd.getScript({ file: "TransformText.css", doc: Sheet.node.content }); // prettier-ignore

      // ❖ Sheet callback
      var F = Sheet.node.outer,
        P = Sheet.node.content,
        btnInput = F.querySelector("#tt-input"),
        btnOutput = F.querySelector("#tt-output");

      // ❖ MODE: Toggle
      btnInput.oninput = function() {
        updateOutputField();
      };

      // ❖ Change transformation mode
      F.querySelector("#tt-chooseMode").onchange = function() {
        // TODO update setting buttonMode
        // TODO regenerate buttons as toggle (mode=toggle) or buttons (mode=select)
      };

      var targetElement = arg.target || document.activeElement, // get user's text field
        textSelectors =
          "input[type=text], textarea, div[style*='user-select: text']";
      /*
█ ❖ TARGET TEXT: User is targeting a text field's contents.                                                                    */
      if (arg.target || $(targetElement).is(textSelectors)) {
        // Set original text
        var originalText = targetElement.value || targetElement.innerText,
          btnCopy = F.querySelector("#btn-copy"),
          btnRevert = F.querySelector("#btn-revert"),
          btnSaveClose = F.querySelector("#btn-saveClose");
        self.State.original_text = originalText;
        self.State.target_node = targetElement;
        btnInput.value = originalText;

        // Activate Revert button
        btnRevert.style.display = "block";
        btnRevert.onclick = function() {
          btnInput.value = originalText;
        };
        // Activate Save 🙵 Close button
        btnSaveClose.style.display = "block";
        btnSaveClose.onclick = function() {
          var value = btnOutput.value;
          self.var.target_node = value;
          Sheet.deact();
          window.IUP.MM.close();
        };
        // Activate copy button
        //btnCopy.style.display = "block";
        btnCopy.onclick = function() {
          var value = btnOutput.value;
          self.var.target_node.val = value;
          Sheet.deact();
          window.IUP.MM.close();
        };
      }

      // ❖ Loop through each section
      var saveSectName;
      _.each(self.Index, buildSection);

      /*
█ ❖ buildSection()                                                                   */
      function buildSection(sectData, sectName) {
        var displayName = sectName.replace(/_/g, " "); // format sect name

        // ❖ Skip if all types in section are hidden
        var notHidden = _.filter(sectData, val => !val.hidden);
        if (!notHidden.length) return;

        // ❖ Insert section title HTML
        P.querySelector(".tt-buttons").insertAdjacentHTML(
          "beforeend",
          `<h4>${displayName}:</h4><div class="tt-${sectName}"></div>`
        );

        // ❖ Loop through each transformation type
        saveSectName = sectName;
        _.each(sectData, buildButton);
      }
      /*
█ ❖ buildButton() - Generate a button for a transform type.                                                                   */
      function buildButton(typeData, typeID) {
        // ❖ Skip if hidden
        if (typeData.hidden) return;

        // ❖ Parse type data
        var disabled = typeData.disabled ? " disabled" : "",
          btnTextSetting = self.settings.buttonText.val,
          btnID = "tt-" + typeID,
          _btnID = "#" + btnID;
        // user setting "Name" or "ABC"
        if (btnTextSetting == "Name") {
          var btnName = typeData.name,
            btnDesc = typeData.desc;
        } else {
          var btnName = typeData.nameAlt,
            btnDesc = typeData.name;
        }

        // ❖ Generate button code 🙵 insert
        var btnCode = checkbox({
          id: btnID,
          tooltip: btnDesc,
          label: btnName,
          type: "button"
        });
        P.querySelector(".tt-" + saveSectName).insertAdjacentHTML(
          "beforeend",
          btnCode
        );

        // ❖ Add click event
        F.querySelector(_btnID).onclick = function() {
          // TODO: if button unchecked, undo transformation
          // Un-toggle other buttons
          P.querySelectorAll(`.toggle-btn:not(${_btnID})`).forEach(n => {
            n.checked = false;
          });
          // Change output field
          self.State.selected_transformation = typeID;
          updateOutputField();
        };
      }
      /*
█ ❖ updateOutputField()                                                                   */
      function updateOutputField() {
        var type = self.State.selected_transformation;
        btnOutput.value = self.Action.Transform_Text(btnInput.value, type);
      }
    }
  };
  /*
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */

  this.State = {
    selected_transformation: null,
    target_node: null,
    original_text: null,
    Type_Script: { val: null }, // transformation type script
    get Button_Mode() {
      return self.Setting.button_mode.val;
    }
  };

  this.Setting = {
    button_label: {
      title: "Button label",
      desc: "Customize the text label for transformation buttons.",
      type: "list",
      component: "dropdown",
      default: "abc",
      choices: {
        abc: { title: "'ABC'", description: "Show an example using 'ABC'." },
        name: { title: "Name", description: "Display the name." }
      }
    },
    button_mode: {
      default: "Toggle"
    }
  };

  this.Constant = {
    // ⮚ Un-transformed characters to use as reference map for transformed maps.
    NORMAL_CHAR_SET:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890(),.:;!?\"'`^~_&@#%+-*=<>[]{}|/$",
    // ⮚ The HTML code for the Sheet's contents.
    SHEET_CODE: `
  <div class="tt-textWrap">
    <div>
      <textarea id="tt-input"></textarea>
      <div class="tt-optionsRow">
        <div>
          Mode: <select id="tt-chooseMode">
            <option title="Transform everything in the text box.">Toggle</option>
            <option title="Transform the selected text.">Select</option>
          </select>
        </div>
        <a id="btn-revert" disabled>Revert</a>
      </div>
    </div>
    <div class="tt-divider">→</div>
    <div>
      <textarea disabled id="tt-output"></textarea>
      <div class="tt-optionsRow">
        <a id="btn-copy" disabled><i class="far fa-copy" aria-hidden="true"></i> Copy</a>
        <a id="btn-saveClose"> Save & Close</a>
      </div>
    </div>
  </div>
  <div class="tt-buttons">
  </div>
      `
  };

  this.Sheet = {
    title: "Transform Text",
    size: "small",
    tabName: "Transform Text",
    onLoad: self.Action.Build_Sheet
  };

  // Transformation Index
  /*
ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█     🙢  TRANSFORM TEXT  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ INDEX ❖
▓   ◇ constants
▓       ⬥ normalCharSet
▓       ⬥ panelCode
▓       ⬥ transfomations
▓   ◇ meta
▓   ◇ mapChars()
▓
▓ ❖ NOTE ❖
▓   ◇ Normal Character Set:
▓ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 0 ( ) , . : ; ! ? \ " ' ` ^ ~ _ & @ # % + - * = < > [ ] { } | / $
▓   ◇ Possible substitute letters: http://graphemica.com/blocks/latin-extended-b
▓
▓ ❖ TODO ❖
▓   ◇ Add icons to buttons
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
  this.Index = {
    Basic: {
      lowerCase: {
        name: "Lower Case",
        nameAlt: "Lower Case",
        desc: "ABC abc → abc abc",
        run: function(input) {
          return input.toLowerCase();
        }
      },
      upperCase: {
        name: "Upper Case",
        nameAlt: "Upper Case",
        desc: "ABC abc → ABC ABC",
        run: function(input) {
          return input.toUpperCase();
        }
      },
      capitalize: {
        name: "Capitalize",
        nameAlt: "Capitalize",
        desc: "ABC abc → Abc Abc",
        run: function(input) {
          return s.capitalize(input);
        }
      },
      sentenceCase: {
        name: "Sentence Case",
        desc: "ABC abc → Abc abc",
        hidden: true,
        run: function(input) {
          return input;
        }
      },
      reverseChars: {
        name: "Reverse",
        nameAlt: "Reverse",
        desc: "ABC abc → cba CBA",
        run: function(input) {
          return s.reverse(input);
        }
      },
      trimWhitespace: {
        name: "Trim Whitespace",
        desc: `"  ABC abc " →  "ABC abc"`,
        hidden: true,
        run: function(input) {
          return s.trim(input);
        }
      }
    },
    Word: {
      plural: {
        name: "Plural",
        desc: "Word → Words",
        hidden: true,
        run: function(input) {
          //return reverse(input);
        }
      },
      singular: {
        name: "Singular",
        desc: "Words → Word",
        hidden: true,
        run: function(input) {
          //return reverse(input);
        }
      }
    },
    Number: {},
    Special_Blocks: {
      smallCaps: {
        name: "Small Caps",
        nameAlt: "ᴀʙᴄ",
        desc: "ABC abc → ABC ᴀʙᴄ",
        map:
          "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z ᴀ ʙ ᴄ ᴅ ᴇ ғ ɢ ʜ ɪ ᴊ ᴋ ʟ ᴍ ɴ ᴏ ᴘ ǫ ʀ s ᴛ ᴜ ᴠ ᴡ x ʏ ᴢ"
      },
      fullwidth: {
        name: "Fullwidth",
        nameAlt: "ＡＢＣ",
        desc: "ABC abc → ＡＢＣ ａｂｃ",
        map:
          "Ａ Ｂ Ｃ Ｄ Ｅ Ｆ Ｇ Ｈ Ｉ Ｊ Ｋ Ｌ Ｍ Ｎ Ｏ Ｐ Ｑ Ｒ Ｓ Ｔ Ｕ Ｖ Ｗ Ｘ Ｙ Ｚ ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ １ ２ ３ ４ ５ ６ ７ ８ ９ ０ （ ） ， ． ： ； ！ ？ ＂ ＇ ｀ ＾ ～ ＿ ＆ ＠ ＃ ％ ＋ － ＊ ＝ ＜ ＞ ［ ］ ｛ ｝ ｜ ／ ＼ ＄"
      },
      superscript: {
        name: "Superscript",
        nameAlt: "ᴬᴮᶜ",
        desc: "ABC abc → ᴬᴮᶜ ᵃᵇᶜ",
        map:
          "ᴬ ᴮ ᶜ ᴰ ᴱ ᶠ ᴳ ᴴ ᴵ ᴶ ᴷ ᴸ ᴹ ᴺ ᴼ ᴾ Q ᴿ ˢ ᵀ ᵁ ⱽ ᵂ ˣ ʸ ᶻ ᵃ ᵇ ᶜ ᵈ ᵉ ᶠ ᵍ ʰ ⁱ ʲ ᵏ ˡ ᵐ ⁿ ᵒ ᵖ q ʳ ˢ ᵗ ᵘ ᵛ ʷ ˣ ʸ ᶻ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁰ ⁽ ⁾ , . : ; ꜝ ?  \" ' ` ^ ~ _ & @ # % ⁺ ⁻ * ⁼ < > [ ] { } | / $"
      },
      circled: {
        name: "Circled",
        nameAlt: "ⒶⒷⒸ",
        desc: "ABC abc → ⒶⒷⒸ ⓐⓑⓒ",
        map:
          "Ⓐ Ⓑ Ⓒ Ⓓ Ⓔ Ⓕ Ⓖ Ⓗ Ⓘ Ⓙ Ⓚ Ⓛ Ⓜ Ⓝ Ⓞ Ⓟ Ⓠ Ⓡ Ⓢ Ⓣ Ⓤ Ⓥ Ⓦ Ⓧ Ⓨ Ⓩ ⓐ ⓑ ⓒ ⓓ ⓔ ⓕ ⓖ ⓗ ⓘ ⓙ ⓚ ⓛ ⓜ ⓝ ⓞ ⓟ ⓠ ⓡ ⓢ ⓣ ⓤ ⓥ ⓦ ⓧ ⓨ ⓩ ① ② ③ ④ ⑤ ⑥ ⑦ ⑧ ⑨ 0 ( ) , ⨀ : ; ! ? ⦸ \" ' ` ^ ~ _ & @ # % ⊕ ⊖ ⊛ ⊜ ⧀ ⧁ [ ] { } ⦶ ⊘ $"
      },
      circledNegative: {
        name: "Circled Negative",
        nameAlt: "🅐🅑🅒",
        desc: "ABC abc → 🅐🅑🅒 🅐🅑🅒",
        map:
          "🅐 🅑 🅒 🅓 🅔 🅕 🅖 🅗 🅘 🅙 🅚 🅛 🅜 🅝 🅞 🅟 🅠 🅡 🅢 🅣 🅤 🅥 🅦 🅧 🅨 🅩 🅐 🅑 🅒 🅓 🅔 🅕 🅖 🅗 🅘 🅙 🅚 🅛 🅜 🅝 🅞 🅟 🅠 🅡 🅢 🅣 🅤 🅥 🅦 🅧 🅨 🅩 ➊ ➋ ➌ ➍ ➎ ➏ ➐ ➑ ➒ 🄌"
      },
      squared: {
        name: "Squared",
        nameAlt: "🄰🄱🄲",
        desc: "ABC abc → 🄰🄱🄲 🄰🄱🄲",
        map:
          "🄰 🄱 🄲 🄳 🄴 🄵 🄶 🄷 🄸 🄹 🄺 🄻 🄼 🄽 🄾 🄿 🅀 🅁 🅂 🅃 🅄 🅅 🅆 🅇 🅈 🅉 🄰 🄱 🄲 🄳 🄴 🄵 🄶 🄷 🄸 🄹 🄺 🄻 🄼 🄽 🄾 🄿 🅀 🅁 🅂 🅃 🅄 🅅 🅆 🅇 🅈 🅉"
      },
      squaredNegative: {
        name: "Squared Negative",
        nameAlt: "🅰🅱🅲",
        desc: "ABC abc → 🅰🅱🅲 🅰🅱🅲",
        map:
          "🅰 🅱 🅲 🅳 🅴 🅵 🅶 🅷 🅸 🅹 🅺 🅻 🅼 🅽 🅾 🅿 🆀 🆁 🆂 🆃 🆄 🆅 🆆 🆇 🆈 🆉 🅰 🅱 🅲 🅳 🅴 🅵 🅶 🅷 🅸 🅹 🅺 🅻 🅼 🅽 🅾 🅿 🆀 🆁 🆂 🆃 🆄 🆅 🆆 🆇 🆈 🆉"
      },
      parenthesized: {
        name: "Parenthesized",
        nameAlt: "⒜⒝⒞",
        desc: "ABC abc → ⒜⒝⒞ ⒜⒝⒞",
        map:
          "🄐 🄑 🄒 🄓 🄔 🄕 🄖 🄗 🄘 🄙 🄚 🄛 🄜 🄝 🄞 🄟 🄠 🄡 🄢 🄣 🄤 🄥 🄦 🄧 🄨 🄩 ⒜ ⒝ ⒞ ⒟ ⒠ ⒡ ⒢ ⒣ ⒤ ⒥ ⒦ ⒧ ⒨ ⒩ ⒪ ⒫ ⒬ ⒭ ⒮ ⒯ ⒰ ⒱ ⒲ ⒳ ⒴ ⒵ ⑴ ⑵ ⑶ ⑷ ⑸ ⑹ ⑺ ⑻ ⑼"
      },
      regionalIndicator: {
        name: "Regional Indicator",
        nameAlt: "🇦🇧🇨",
        desc: "ABC abc → 🇦🇧🇨 🇦🇧🇨",
        map:
          "🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿 🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿"
      },
      flipVertical: {
        name: "Flip Vertical",
        nameAlt: "🇦🇧🇨",
        desc: "ABC abc → ∀BC ɐpc",
        map:
          "∀ B C D E F G H I ɾ K ᒥ W N O Ь Ơ R Ꙅ ꓕ ᑎ 𐌡 M X ⅄ Z ɐ p c q e f ƃ h ᴉ ɾ k l ɯ u o b d ɹ s t n ʌ ʍ x ʎ z 1 2 3 4 5 6 7 8 9 0 ( ) ‘ ˙ : ; ¡ ¿ \" ' ` ⌄ ~ ‾ ⅋"
      },
      flipHorizontal: {
        name: "Flip Horizontal",
        nameAlt: "🇦🇧🇨",
        desc: "ABC abc → AᗺↃ _dↄ",
        disabled: true,
        map:
          "A ᗺ Ↄ ᗡ Ǝ ᖷ G H I ᒐ ꓘ ⅃ M И O ꟼ Q Я Ꙅ T U V W X Y Z a d ↄ b ɘ f g h i j k l m ᴎ o q p ᴙ ꙅ t u v w x y z 1 2 Ɛ 4 5 6 7 8 9 0 ( ) ⹁ . : ⁏ ! ⸮ \" ' ` ^ ∽ _ & @ # % + - * = < > [ ] { } | / $"
      },
      rotated: {
        name: "Rotated",
        nameAlt: "🇦🇧🇨",
        desc: "ABC abc → ∀ᗺↃ ɒqɔ",
        map:
          "∀ ᗺ Ↄ ᗡ Ǝ Ⅎ ⅁ H I ſ ꓘ Г W И O Ԁ Ὸ ꓤ S ꓕ ᑎ 𐌡 M X ⅄ Z ɒ q ɔ p ǝ ɟ ƃ ɥ ᴉ ɾ ʞ ן ɯ u o d b ɹ s ʇ n ʌ ʍ x ʎ z 1 2 Ɛ 4 5 9 7 8 6 0 ( ) ‘ ˙ : ; ¡ ¿ \" ' ⌄ ~ ‾ ⅋ @ # % + - * = > < ] [ } {"
      }
    },
    Math_Blocks: {
      italicSerif: {
        name: "Italic Serif",
        nameAlt: "𝐴𝐵𝐶",
        desc: "ABC abc → 𝐴𝐵𝐶 𝑎𝑏𝑐",
        map:
          "𝐴 𝐵 𝐶 𝐷 𝐸 𝐹 𝐺 𝐻 𝐼 𝐽 𝐾 𝐿 𝑀 𝑁 𝑂 𝑃 𝑄 𝑅 𝑆 𝑇 𝑈 𝑉 𝑊 𝑋 𝑌 𝑍 𝑎 𝑏 𝑐 𝑑 𝑒 𝑓 𝑔 ℎ 𝑖 𝑗 𝑘 𝑙 𝑚 𝑛 𝑜 𝑝 𝑞 𝑟 𝑠 𝑡 𝑢 𝑣 𝑤 𝑥 𝑦 𝑧"
      },
      boldSerif: {
        name: "Bold Serif",
        nameAlt: "𝐀𝐁𝐂",
        desc: "ABC abc → 𝐀𝐁𝐂 𝐚𝐛𝐜",
        map:
          "𝐀 𝐁 𝐂 𝐃 𝐄 𝐅 𝐆 𝐇 𝐈 𝐉 𝐊 𝐋 𝐌 𝐍 𝐎 𝐏 𝐐 𝐑 𝐒 𝐓 𝐔 𝐕 𝐖 𝐗 𝐘 𝐙 𝐚 𝐛 𝐜 𝐝 𝐞 𝐟 𝐠 𝐡 𝐢 𝐣 𝐤 𝐥 𝐦 𝐧 𝐨 𝐩 𝐪 𝐫 𝐬 𝐭 𝐮 𝐯 𝐰 𝐱 𝐲 𝐳 𝟏 𝟐 𝟑 𝟒 𝟓 𝟔 𝟕 𝟖 𝟗 𝟎 ( ) , . : ; ! ?  \" ' ` ^ ~ _ 🙴 @ # % + - * = < > [ ] { } | / $"
      },
      boldItalicSerif: {
        name: "Bold Italic Serif",
        nameAlt: "𝑨𝑩𝑪",
        desc: "ABC abc → 𝑨𝑩𝑪 𝒂𝒃𝒄",
        map:
          "𝑨 𝑩 𝑪 𝑫 𝑬 𝑭 𝑮 𝑯 𝑰 𝑱 𝑲 𝑳 𝑴 𝑵 𝑶 𝑷 𝑸 𝑹 𝑺 𝑻 𝑼 𝑽 𝑾 𝑿 𝒀 𝒁 𝒂 𝒃 𝒄 𝒅 𝒆 𝒇 𝒈 𝒉 𝒊 𝒋 𝒌 𝒍 𝒎 𝒏 𝒐 𝒑 𝒒 𝒓 𝒔 𝒕 𝒖 𝒗 𝒘 𝒙 𝒚 𝒛 ( ) , . : ; ! ?  \" ' ` ^ ~ _ & @ # % + - * = < > [ ] { } | / $"
      },
      sans: {
        name: "Sans",
        nameAlt: "𝖠𝖡𝖢",
        desc: "ABC abc → 𝖠𝖡𝖢 𝖺𝖻𝖼",
        map:
          "𝖠 𝖡 𝖢 𝖣 𝖤 𝖥 𝖦 𝖧 𝖨 𝖩 𝖪 𝖫 𝖬 𝖭 𝖮 𝖯 𝖰 𝖱 𝖲 𝖳 𝖴 𝖵 𝖶 𝖷 𝖸 𝖹 𝖺 𝖻 𝖼 𝖽 𝖾 𝖿 𝗀 𝗁 𝗂 𝗃 𝗄 𝗅 𝗆 𝗇 𝗈 𝗉 𝗊 𝗋 𝗌 𝗍 𝗎 𝗏 𝗐 𝗑 𝗒 𝗓 𝟣 𝟤 𝟥 𝟦 𝟧 𝟨 𝟩 𝟪 𝟫 𝟢"
      },
      italicSans: {
        name: "Italic Sans",
        nameAlt: "𝘈𝘉𝘊",
        desc: "ABC abc → 𝘈𝘉𝘊 𝘢𝘣𝘤",
        map:
          "𝘈 𝘉 𝘊 𝘋 𝘌 𝘍 𝘎 𝘏 𝘐 𝘑 𝘒 𝘓 𝘔 𝘕 𝘖 𝘗 𝘘 𝘙 𝘚 𝘛 𝘜 𝘝 𝘞 𝘟 𝘠 𝘡 𝘢 𝘣 𝘤 𝘥 𝘦 𝘧 𝘨 𝘩 𝘪 𝘫 𝘬 𝘭 𝘮 𝘯 𝘰 𝘱 𝘲 𝘳 𝘴 𝘵 𝘶 𝘷 𝘸 𝘹 𝘺 𝘻"
      },
      boldSans: {
        name: "Bold Sans",
        nameAlt: "𝗔𝗕𝗖",
        desc: "ABC abc → 𝗔𝗕𝗖 𝗮𝗯𝗰",
        map:
          "𝗔 𝗕 𝗖 𝗗 𝗘 𝗙 𝗚 𝗛 𝗜 𝗝 𝗞 𝗟 𝗠 𝗡 𝗢 𝗣 𝗤 𝗥 𝗦 𝗧 𝗨 𝗩 𝗪 𝗫 𝗬 𝗭 𝗮 𝗯 𝗰 𝗱 𝗲 𝗳 𝗴 𝗵 𝗶 𝗷 𝗸 𝗹 𝗺 𝗻 𝗼 𝗽 𝗾 𝗿 𝘀 𝘁 𝘂 𝘃 𝘄 𝘅 𝘆 𝘇 𝟬 𝟭 𝟮 𝟯 𝟰 𝟱 𝟲 𝟳 𝟴 𝟵"
      },
      boldItalicSans: {
        name: "Bold Italic Sans",
        nameAlt: "𝘼𝘽𝘾",
        desc: "ABC abc → 𝘼𝘽𝘾 𝙖𝙗𝙘",
        map:
          "𝘼 𝘽 𝘾 𝘿 𝙀 𝙁 𝙂 𝙃 𝙄 𝙅 𝙆 𝙇 𝙈 𝙉 𝙊 𝙋 𝙌 𝙍 𝙎 𝙏 𝙐 𝙑 𝙒 𝙓 𝙔 𝙕 𝙖 𝙗 𝙘 𝙙 𝙚 𝙛 𝙜 𝙝 𝙞 𝙟 𝙠 𝙡 𝙢 𝙣 𝙤 𝙥 𝙦 𝙧 𝙨 𝙩 𝙪 𝙫 𝙬 𝙭 𝙮 𝙯"
      },
      monospace: {
        name: "Monospace",
        nameAlt: "𝙰𝙱𝙲",
        desc: "ABC abc → 𝙰𝙱𝙲 𝚊𝚋𝚌",
        map:
          "𝙰 𝙱 𝙲 𝙳 𝙴 𝙵 𝙶 𝙷 𝙸 𝙹 𝙺 𝙻 𝙼 𝙽 𝙾 𝙿 𝚀 𝚁 𝚂 𝚃 𝚄 𝚅 𝚆 𝚇 𝚈 𝚉 𝚊 𝚋 𝚌 𝚍 𝚎 𝚏 𝚐 𝚑 𝚒 𝚓 𝚔 𝚕 𝚖 𝚗 𝚘 𝚙 𝚚 𝚛 𝚜 𝚝 𝚞 𝚟 𝚠 𝚡 𝚢 𝚣 𝟶 𝟷 𝟸 𝟹 𝟺 𝟻 𝟼 𝟽 𝟾 𝟿"
      },
      script: {
        name: "Script",
        nameAlt: "𝒜ℬ𝒞",
        desc: "ABC abc → 𝒜ℬ𝒞 𝒶𝒷𝒸",
        map:
          "𝒜 ℬ 𝒞 𝒟 ℰ ℱ 𝒢 ℋ ℐ 𝒥 𝒦 ℒ ℳ 𝒩 𝒪 𝒫 𝒬 ℛ 𝒮 𝒯 𝒰 𝒱 𝒲 𝒳 𝒴 𝒵 𝒶 𝒷 𝒸 𝒹 ℯ 𝒻 ℊ 𝒽 𝒾 𝒿 𝓀 𝓁 𝓂 𝓃 ℴ 𝓅 𝓆 𝓇 𝓈 𝓉 𝓊 𝓋 𝓌 𝓍 𝓎 𝓏 1 2 3 4 5 6 7 8 9 0 ( ) , . : ; ! ?  \" ' ` ^ 〜 _ 🙵 @ # % + - * = < > [ ] { } | / $"
      },
      boldScript: {
        name: "Bold Script",
        nameAlt: "𝓐𝓑𝓒",
        desc: "ABC abc → 𝓐𝓑𝓒 𝓪𝓫𝓬",
        map:
          "𝓐 𝓑 𝓒 𝓓 𝓔 𝓕 𝓖 𝓗 𝓘 𝓙 𝓚 𝓛 𝓜 𝓝 𝓞 𝓟 𝓠 𝓡 𝓢 𝓣 𝓤 𝓥 𝓦 𝓧 𝓨 𝓩 𝓪 𝓫 𝓬 𝓭 𝓮 𝓯 𝓰 𝓱 𝓲 𝓳 𝓴 𝓵 𝓶 𝓷 𝓸 𝓹 𝓺 𝓻 𝓼 𝓽 𝓾 𝓿 𝔀 𝔁 𝔂 𝔃"
      },
      fraktur: {
        name: "Fraktur",
        nameAlt: "𝔄𝔅ℭ",
        desc: "ABC abc → 𝔄𝔅ℭ 𝔞𝔟𝔠",
        map:
          "𝔄 𝔅 ℭ 𝔇 𝔈 𝔉 𝔊 ℌ ℑ 𝔍 𝔎 𝔏 𝔐 𝔑 𝔒 𝔓 𝔔 ℜ 𝔖 𝔗 𝔘 𝔙 𝔚 𝔛 𝔜 ℨ 𝔞 𝔟 𝔠 𝔡 𝔢 𝔣 𝔤 𝔥 𝔦 𝔧 𝔨 𝔩 𝔪 𝔫 𝔬 𝔭 𝔮 𝔯 𝔰 𝔱 𝔲 𝔳 𝔴 𝔵 𝔶 𝔷"
      },
      boldFraktur: {
        name: "Bold Fraktur",
        nameAlt: "𝕬𝕭𝕮",
        desc: "ABC abc → 𝕬𝕭𝕮 𝖆𝖇𝖈",
        map:
          "𝕬 𝕭 𝕮 𝕯 𝕰 𝕱 𝕲 𝕳 𝕴 𝕵 𝕶 𝕷 𝕸 𝕹 𝕺 𝕻 𝕼 𝕽 𝕾 𝕿 𝖀 𝖁 𝖂 𝖃 𝖄 𝖅 𝖆 𝖇 𝖈 𝖉 𝖊 𝖋 𝖌 𝖍 𝖎 𝖏 𝖐 𝖑 𝖒 𝖓 𝖔 𝖕 𝖖 𝖗 𝖘 𝖙 𝖚 𝖛 𝖜 𝖝 𝖞 𝖟"
      },
      doubleStruck: {
        name: "Double-Struck",
        nameAlt: "𝔸𝔹ℂ",
        desc: "ABC abc → 𝔸𝔹ℂ 𝕒𝕓𝕔",
        map:
          "𝔸 𝔹 ℂ 𝔻 𝔼 𝔽 𝔾 ℍ 𝕀 𝕁 𝕂 𝕃 𝕄 ℕ 𝕆 ℙ ℚ ℝ 𝕊 𝕋 𝕌 𝕍 𝕎 𝕏 𝕐 ℤ 𝕒 𝕓 𝕔 𝕕 𝕖 𝕗 𝕘 𝕙 𝕚 𝕛 𝕜 𝕝 𝕞 𝕟 𝕠 𝕡 𝕢 𝕣 𝕤 𝕥 𝕦 𝕧 𝕨 𝕩 𝕪 𝕫 𝟘 𝟙 𝟚 𝟛 𝟜 𝟝 𝟞 𝟟 𝟠 𝟡"
      }
    }
    /*▊END TRANSFORM TYPES▊*/
  };
};

/*

█
▓═─────══─────═🙦   META   🙤═─────═❖
▓                                                                              */
// export var meta = {
//   info: `Transform Text provides utilities for transforming characters in a given text. It can edit the contents of a text field if one is selected when opened. In addition to basic case transformations (i.e. uppercase), it can convert text into <a href="https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols">special Unicode characters</a> that simulate the appearance of bold text, italics, and more.`,
//   cmd: {
//     Open_Transform_Text_Panel: {
//       name: "Open Transform Text Panel",
//       desc: "Open the utility's panel.",
//       parameters: {}
//     },
//     Transform_Text: {
//       name: "Transform Text",
//       desc: "Perform a transformation on provided text.",
//       parameters: {
//         textSource: {
//           desc: "Source of text to transform.",
//           optional: false,
//           values: ["Active Textbox", "Selection", "Element", "String"]
//         },
//         targetElement: {
//           desc: "Choose an element to target. \n*Must select Element as source"
//         },
//         inputString: {
//           desc:
//             "Input a string to be transformed.\n*Must select String as source",
//           optional: true
//         },
//         onlyTargetTextboxes: {
//           desc: ""
//         }
//       }
//     }
//   },
//   var: {
//     Editing_Text_Field: {
//       name: "Target_Text_Field",
//       desc:
//         "If the utility panel is currently editing a text field on the page."
//     },
//     Editing_Selection: {
//       name: "Editing Selection",
//       desc:
//         "If the utility panel is currently editing text selected on the page."
//     }
//   }
// };
