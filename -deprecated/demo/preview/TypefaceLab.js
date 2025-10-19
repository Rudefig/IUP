/*ⸯ                     ༿─────────═🙦 🇵🇷🇪🇻🇮🇪🇼 🙤═─────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  TYPEFACE LAB  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓                Interface for testing out new Typeface Fonts.
▓
▓ ❖ PAGE LAYOUT ❖
▓   ◇ ASSET TABLE: Font assets are stored here for the Param Table.
▓   ◇ PARAM TABLE: Parameter controls for each of the fonts in a Typeface Style.
▓     ⬥ ASSET SLOT: Drag and drop fonts here from the Asset Table.
▓     ⬥ PARAMETERS: Adjust the font/text parameters of the loaded font.
▓   ◇ GRADIENT TABLE: Change the gradients used in some Typeface Styles.
▓
▓ ❖ TODO ❖
▓   ◇ Add accordian features for more options - https://auth0-cosmos.now.sh/sandbox/?selectedKind=List&selectedStory=Drawer%20and%20switch&full=0&addons=1&stories=1&panelRight=0
▓   ◇ When a new font is added, copy existing parameters
▓   ◇ BUG: Opentype library isn't catching "failed to decode downloaded font" error, showing up on console as uncatchable warning. (Try font FLORVAbold.otf)
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█
▓                                                                                */
export const preview = {
  meta: {
    title: "Typeface Lab",
    desc: "A development tool for creating Typeface Styles.",
    lab: true
  },
  /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ HTML ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
  html: `
<div class="iup-Table SectionAssets"></div>
<div class="iup-Table SectionGradients"></div>
<div class="SectionButtons">
  <a class="btn-reset" title="Reset data for all drop zones.">Reset</a>
  <a class="btn-swapHeader" title="Swap the header type between H1 & H2.">Swap H1/h2</a>
  <a class="btn-launchModal" title="Preview the appearance of modals.">Preview Modal</a>
  <a class="btn-listGlyphs" title="Preview the appearance of modals.">List Glyphs
    <svg width="24" height="24" vewBox="0 0 24 24"><path d="M19.2928932,4 L16.5,4 C16.2238576,4 16,3.77614237 16,3.5 C16,3.22385763 16.2238576,3 16.5,3 L20.5,3 C20.7761424,3 21,3.22385763 21,3.5 L21,7.5 C21,7.77614237 20.7761424,8 20.5,8 C20.2238576,8 20,7.77614237 20,7.5 L20,4.70710678 L14.8535534,9.85355339 C14.6582912,10.0488155 14.3417088,10.0488155 14.1464466,9.85355339 C13.9511845,9.65829124 13.9511845,9.34170876 14.1464466,9.14644661 L19.2928932,4 L19.2928932,4 Z M20,11.5 C20,11.2238576 20.2238576,11 20.5,11 C20.7761424,11 21,11.2238576 21,11.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,11.5 Z"/></svg>
  </a>
</div>
<datalist id="gradient-choices"></datalist>
<style id="logo1"></style>
<style id="logo2"></style>
`,
  /*




█ⸯ                      ༿───────────═🙦 🎕 🙤═───────────᠎༾
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█       🙢  PROPERTIES  🙠       █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ INDEX ❖
▓   ◇ {ParamTableColumns} ⬥ Index of text properties to be used as table columns.
▓   ◇ {ParamTableInputFields} ⬥ Min/max/step for input fields.
▓   ◇ {TypefaceIndex}     ⬥ Index of font types with their default {ParamTableColumns} values.
▓   ◇ {OpenTypeFeatures}  ⬥ Index of OpenType features for the 'Variant' column.
▓                                                                               */
  props: {
    /*

█ ❖ PARAM TABLE ⬥ Column Data                                                                   */
    ParamTableColumns: {
      title: "Name",
      fontFile: "Font",
      variant: "Variant",
      size: "Size",
      weight: "Weight",
      lineHeight: "Line Height",
      letterSpacing: "Char Space",
      uppercase: "Caps",
      top: "Top",
      gradient: "Gradient"
    },
    /*

█ ❖ PARAM TABLE ⬥ Input Fields ⬥ [min, max, step]                                                                   */
    ParamTableInputFields: {
      size: [0, 120, 1],
      weight: [0, 1000, 100],
      lineHeight: [0, 120, 1],
      letterSpacing: [0, 12, 0.25],
      top: [0, 60, 1]
    },
    /*

█ ❖ PARAM TABLE ⬥ Typeface Index                                                                   */
    TypefaceIndex: {
      logo1: {
        title: "Logo A",
        selector: ".LogoBox__line-1",
        fontFamily: "Trajan Pro 3",
        weight: 500,
        size: "16px",
        uppercase: true,
        top: "13px",
        gradient: "gold"
      },
      logo2: {
        title: "Logo B",
        selector: ".LogoBox__line-2",
        fontFamily: "Trajan Pro 3",
        weight: 700,
        size: "25px",
        letterSpacing: "2px",
        uppercase: true,
        top: "33px",
        gradient: "platinum"
      },
      head1: {
        title: "Header 1",
        selector: "h1, .h1",
        fontFamily: "Trajan Pro 3",
        size: "76px",
        uppercase: true,
        gradient: "silver"
      },
      head2: {
        title: "Header 2",
        selector: "h2, .h2",
        fontFamily: "Trajan Pro 3",
        size: "64px",
        variant: true,
        uppercase: true,
        gradient: "silver"
      },
      body: {
        title: "Body",
        varName: "--iup-font-body",
        fontFamily: "Avenir Next",
        selector: ":root",
        weight: 300,
        size: "13px",
        uppercase: false
      },
      capt: {
        title: "Caption",
        varName: "--iup-font-capt",
        fontFamily: "Avenir Next",
        weight: 300,
        size: "1rem",
        uppercase: false
      },
      cond: {
        title: "Condensed",
        varName: "--iup-font-cond",
        fontFamily: "Avenir Next Cond",
        size: "1rem",
        uppercase: true
      }
    },
    /*

█ ❖ OPENTYPE FEATURES
▓ Used in the 'Variant' dropdown.                                                                   */
    OpenTypeFeatures: {
      liga: "Common Lig.",
      dlig: "Discretionary Lig.",
      calt: "Contextual Alts",
      smcp: "Small Caps",
      swsh: "Swashes",
      salt: "Alternate Style",
      ss01: "Style Set 1",
      ss02: "Style Set 2",
      ss03: "Style Set 3",
      ss04: "Style Set 4",
      ss05: "Style Set 5",
      ss06: "Style Set 6",
      ss07: "Style Set 7",
      ss08: "Style Set 8",
      ss09: "Style Set 9"
    },
    /*

█ ❖ GRADIENT TABLE ⬥ Cells                                                                    */
    TableGradientIndex: [
      "",
      "bronze",
      "gold",
      "gold-2",
      "silver",
      "platinum",
      "custom",
      ""
    ],
    /*

█ ❖ ASSET TABLE ⬥ Font Choices                                                                   */
    FontChoiceIndex: {
      body: [
        "Avenir Next",
        "Brandon Text",
        "Brandon Grotesque",
        "Caslon Book",
        "Filson Pro",
        "Futura PT",
        "Gotham",
        "Helvetica Now",
        "Lagu Sans",
        "NewParis Text",
        "Roboto",
        "TT Bells",
        "TT Hoves"
      ],
      head: [
        "Eterea",
        "Louvre",
        "Parfait Script Pro",
        "P22 Underground",
        "Santis"
      ],
      cond: [
        "Avenir Next Cond",
        "Brandon Grotesque Cond",
        "Futura BT Cond",
        "TT Moons",
        "21 Cent Cond"
      ]
    }
  },
  /*




█ⸯ                      ༿───────────═🙦 🎕 🙤═───────────᠎༾
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  EVENT SCRIPTS  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓                                                                                */
  onPreviewInit: function(self) {
    /*
█ ❖ SETUP MAIN MENU DEMO                                                                   */
    document.documentElement.classList.add("ACTIVE");
    var frameHTML = IUP.MM.data.frameDoc.body.innerHTML;
    frameHTML = frameHTML.slice(frameHTML.indexOf(`<div class="MM__boxWrap">`));
    document.body.insertAdjacentHTML("beforeEnd", frameHTML);
    // document.getElementById("items-before").after(IUP.MM.data.itemsNode);
    const wrap = document.querySelector("#wrap-box");
    window.TypefaceIndex = self.props.TypefaceIndex;

    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ ASSET TABLE ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓      Generate parameter controls for each font used in a Typeface Style.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓                                                                                 */
    const AssetTable = document.querySelector(".SectionAssets"),
      numSlots = 7;
    AssetTable.style.gridTemplateColumns =
      "1fr " + "12fr ".repeat(numSlots) + "1fr";
    for (var i = 1; i <= numSlots; i++) {
      let CellNode = document.createElement("div"),
        SlotNode = buildAssetSlot(i);
      AssetTable.insertAdjacentHTML("beforeEnd", `<div class="iuT__rowHead">${i}</div>`); // prettier-ignore
      CellNode.classList.add("row-1");
      AssetTable.append(CellNode);
      CellNode.append(SlotNode);
      SlotNode.buildFont("logo1", "/assets/fonts/TrajanPro3-500.otf");
    }
    const emptyCell = `<div class="iuT__rowHead iuT__space"></div><div class="row-1 iuT__rowSpace"></div>`;
    AssetTable.insertAdjacentHTML("beforeEnd", emptyCell);
    AssetTable.insertAdjacentHTML("afterBegin", emptyCell);
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ PARAM TABLE ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓      Generate parameter controls for each font used in a Typeface Style.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓                                                                                 */
    const TableData = JSON.parse(JSON.stringify(self.props.TypefaceIndex)),
      paramCtrl = self.props.ParamTableInputFields,
      fontChoices = self.props.FontChoiceIndex,
      dropZoneTooltip = `Drop a font file here to load it. Scroll to navigate file history.`,
      svg = `<svg class="vertical-arrows" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 64">
  <rect class="topBox" width="16px" height="50%"></rect>
  <rect class="bottomBox" width="16px" height="50%" y="50%"></rect>
  <g>
    <path transform="translate(-2 0)" class="up" d="M9.31,0c0,12.82,1,21.31,1,28.1,0,1-.55,1.61-1.07,1.61s-1.06-.56-1.06-1.61c0-6.77.92-15.28.92-28.1Z"/>
    <path transform="translate(-2 0)" class="dot" d="M9.31,33.16A1.17,1.17,0,0,1,8.15,32a1.18,1.18,0,0,1,1.16-1.16m0,0A1.16,1.16,0,0,1,10.44,32a1.13,1.13,0,0,1-1.13,1.16"/>
    <path transform="translate(-2 0)" class="down" d="M9.09,64c0-12.79-.92-21.31-.92-28.1,0-1,.53-1.58,1.06-1.58s1.07.53,1.07,1.6c0,6.77-1,15.29-1,28.08Z"/>
  </g>
</svg>
`;
    for (var ID in TableData) {
      let { title, selector, varName, variant = "liga", size = "", weight = "", lineHeight = "", letterSpacing = "", uppercase = true, top = null, gradient = null } = TableData[ID], // prettier-ignore
        lineHeightPlaceholder = !lineHeight ? size : "",
        // dropClass = `DropZone id-${ID}`,
        choices = fontChoices[ID.substring(0,4)],
        fontList = choices ? choices.map(F => `<option>${F}</option>`).join("") : ""; // prettier-ignore
      if (fontList) fontList = `<div class="fontChoice"><select><option></option>${fontList}</select></div>`; // prettier-ignore
      // if (fontList) dropClass += ` select-enabled select-active`;
      TableData[ID].title = `${title}:<span>${selector || varName}</span>`;
      TableData[ID].fontFile = ``;
      // TableData[ID].fontFile = `<div><div class="${dropClass}" title="${dropZoneTooltip}"><span></span><style></style></div>${fontList}</div>${svg}`; // prettier-ignore
      TableData[ID].variant = `<select selected="${variant}" data-iup-val="${variant}" data-iup-id="${ID}" data-iup-prop="variant" class="item-disabled"></select>`; // prettier-ignore
      TableData[ID].size = `<input value="${size}" data-iup-val="${size}" data-iup-id="${ID}" data-iup-prop="size" type="text">`; // prettier-ignore
      TableData[ID].weight = `<input value="${weight}" data-iup-val="${weight}" data-iup-id="${ID}" placeholder="400" data-iup-prop="weight" type="text">`; // prettier-ignore
      TableData[ID].lineHeight = `<input value="${lineHeight}" data-iup-val="${lineHeight}" data-iup-id="${ID}" placeholder="${lineHeightPlaceholder}" data-iup-prop="lineHeight" type="text">`; // prettier-ignore
      TableData[ID].letterSpacing = `<input value="${letterSpacing}" data-iup-val="${letterSpacing}" data-iup-id="${ID}" placeholder="0px" data-iup-prop="letterSpacing" type="text">`; // prettier-ignore
      TableData[ID].uppercase = `<input checked="${uppercase}" data-iup-val="${uppercase}" data-iup-id="${ID}" data-iup-prop="uppercase" type="checkbox">`; // prettier-ignore
      if (top) TableData[ID].top = `<input value="${top}" data-iup-val="${top}" data-iup-id="${ID}" data-iup-prop="top" type="text">`; // prettier-ignore
      if (gradient) TableData[ID].gradient = `<select value="${gradient}" data-iup-val="${gradient}" data-iup-id="${ID}" data-iup-prop="gradient"></select>`; // prettier-ignore
      delete TableData[ID].selector;
      delete TableData[ID].varName;
    }
    /*
█ ❖ GENERATE CONTROL AREA                                                                   */
    const __params = LayoutLib.cmd.Generate_Table({
      ID: "SectionParams",
      columns: self.props.ParamTableColumns,
      data: TableData
    });
    wrap.appendChild(__params.node);
    wrap.querySelectorAll("input[type=text]").forEach(Node => {
      __B(Node);
      buildInput({ type: "Number", Node });
    });

    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ PARAM TABLE EVENTS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓   ◇ oninput()
▓   ◇ onwheel()
▓                                                                                 */
    wrap.querySelectorAll("input, select").forEach(N => {
      const ID = N.iuData("id"),
        WRAP = wrap.querySelector(`.col-2-fontFile[class*=${ID}]`),
        SLOT = document.querySelector(`.AssetSlot.id-${ID}`),
        paramName = N.iuData("prop");
      /*
█ ❖ ON INPUT ⬥ When a param value changes, update its font.                                                                 */
      N.oninput = function() {
        var paramVal = N.hasAttribute("checked") ? N.checked : N.value;
        // ❖ Parse Size
        if (paramName == "size") {
          if ("top" in WRAP.history[WRAP.current]) {
            WRAP.history[WRAP.current].height = paramVal;
          }
          if (!WRAP.history[WRAP.current].lineHeight) {
            wrap.querySelector(`input[data-iup-id=${ID}][data-iup-prop=lineHeight]`).placeholder = paramVal; // prettier-ignore
          }
        }
        // ❖ Parse Line Height/Letter Spacing
        const isNullParam = ["lineHeight", "letterSpacing"].includes(paramName);
        if (isNullParam && ["0", "0px"].includes(paramVal)) paramVal = "";

        // ❖ Save Data & Load Font
        WRAP.history[WRAP.current][paramName] = paramVal;
        WRAP.loadFont(WRAP.history[WRAP.current]);
      };
      /*
█ ❖ ON WHEEL ⬥ Scroll up or down active textbox to change the parameter value.                                                                  */
      // N.onwheel = function(e) {
      //   if (N !== document.activeElement) return;
      //   e.preventDefault();
      //   const scrollUp = Boolean(e.wheelDeltaY > 0),
      //     paramData = self.props.ParamTableInputFields[paramName];
      //
      //   // ❖ Set Default Param Value
      //   var paramVal = N.value;
      //   if (!paramVal) {
      //     if (paramName == "lineHeight") paramVal = WRAP.history[WRAP.current].size; // prettier-ignore
      //     else paramVal = N.placeholder;
      //   }
      //   const unit = ["size", "lineHeight", "letterSpacing", "top"].includes(paramName) ? "px" : ""; // prettier-ignore
      //
      //   // ❖ Calc New Param Value
      //   const result = LayoutLib.var.parse_css_val(
      //     paramVal,
      //     function(V) {
      //       if (!paramData) return;
      //       const [min, max, step] = paramData;
      //       if (scrollUp && V < max) V = V + step;
      //       if (!scrollUp && V > min) V = V - step;
      //       if (V > max) V = max;
      //       if (V < min) V = min;
      //       return V;
      //     },
      //     unit
      //   );
      //   N.value = result;
      //   N.oninput();
      // };
    });

    /*
█ ❖ BUTTON BAR                                                                   */
    document.querySelector(".btn-reset").onclick = function() {
      document.querySelectorAll(".AssetSlot").forEach(N => N.clearAllFonts());
    };
    document.querySelector(".btn-swapHeader").onclick = function() {
      genTitleNode();
    };
    document.querySelector(".btn-launchModal").onclick = function() {
      ExtensionLib.cmd.openUtilityPanel("CommandBars", { location: "page" });
    };
    document.querySelector(".btn-listGlyphs").onclick = function() {
      window.open("http://torinak.com/font/lsfont.html");
    };

    /*
█ ❖ H1/H2 DEMO ⬥ Click "HEADER 1" or "HEADER 2" to demo at top of page.                                                                   */
    document.querySelector(".row-1-head1.col-1-title").onclick = function() {
      genTitleNode("h1");
    };
    document.querySelector(".row-1-head2.col-1-title").onclick = function() {
      genTitleNode("h2");
    };

    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ ASSET SLOT ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 Drop font files onto an asset slot to load it.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ EVENT HANDLERS ❖
▓   ◇ dragover
▓   ◇ dragleave
▓   ◇ drop
▓   ◇ click
▓   ◇ contextmenu
▓
▓ ❖ METHODS ❖
▓   ◇ loadFont()   ⬥ Load font from data object.
▓   ◇ clearFont()  ⬥ Clear current font, restoring the text "(drop file)".
▓   ◇ deleteCurrentFont()  ⬥ Clear current font, restoring the text "(drop file)".
▓   ◇ clearAllFonts() ⬥ Clear font & erase font history.
▓   ◇ buildFont()  ⬥ Build data object from dropped font file.
▓                                                                                 */
    _.each(self.props.TypefaceIndex, (data, ID) => {
      const CellNode = wrap.querySelector(`.col-2-fontFile[class*=${ID}]`);
      CellNode.append(buildAssetSlot(ID, data));
    });
    function buildAssetSlot(ID, data = {}) {
      const WRAP = document.createElement("div");
      WRAP.classList.add(`AssetSlot`, `id-${ID}`);
      WRAP.innerHTML = `<div class="AssetSlot__slot" title=""><span class="AssetSlot__label"></span></div><style class="AssetSlot__style"></style>`;
      //       const svg = `<svg class="vertical-arrows" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 64">
      //   <rect class="topBox" width="16px" height="50%"></rect>
      //   <rect class="bottomBox" width="16px" height="50%" y="50%"></rect>
      //   <g>
      //     <path transform="translate(-2 0)" class="up" d="M9.31,0c0,12.82,1,21.31,1,28.1,0,1-.55,1.61-1.07,1.61s-1.06-.56-1.06-1.61c0-6.77.92-15.28.92-28.1Z"/>
      //     <path transform="translate(-2 0)" class="dot" d="M9.31,33.16A1.17,1.17,0,0,1,8.15,32a1.18,1.18,0,0,1,1.16-1.16m0,0A1.16,1.16,0,0,1,10.44,32a1.13,1.13,0,0,1-1.13,1.16"/>
      //     <path transform="translate(-2 0)" class="down" d="M9.09,64c0-12.79-.92-21.31-.92-28.1,0-1,.53-1.58,1.06-1.58s1.07.53,1.07,1.6c0,6.77-1,15.29-1,28.08Z"/>
      //   </g>
      // </svg>`;
      const __slot = WRAP.querySelector(`.AssetSlot__slot`),
        __text = WRAP.querySelector(`.AssetSlot__label`),
        __style = WRAP.querySelector(`.AssetSlot__style`),
        // variantNode = wrap.querySelector(`.col-3-variant[class*=${ID}] select`), // prettier-ignore
        { varName, selector } = data;

      /*
█═─────══─────═🙦   EVENT HANDLERS   🙤═─────══─────═❖                                                                               */
      /*
█ ❖ DRAGOVER/DRAGLEAVE                                                                   */
      WRAP.addEventListener("dragover", e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        WRAP.classList.add("-dropping");
      });
      WRAP.addEventListener("dragleave", e => WRAP.classList.remove("-dropping")); // prettier-ignore

      /*
█ ❖ DROP ⬥ When user drops font in slot, pass it to buildFont().                                                                   */
      WRAP.addEventListener("drop", function(e) {
        e.preventDefault();
        const files = e.dataTransfer.files,
          reader = new FileReader();
        reader.onload = function(file) {
          WRAP.buildFont(ID, reader.result, files[0].name);
        };
        reader.readAsDataURL(files[0]);
      });

      /*
█ ❖ WHEEL ⬥ Scroll over Drop Zone to navigate font history.                                                                   */
      __slot.onwheel = function(e) {
        e.preventDefault();
        const { history, current } = WRAP,
          last = history.length - 1,
          scrollUp = Boolean(e.wheelDeltaY > 0);
        if (scrollUp && current > 0) WRAP.current--; //     ❖ DOWN (forward history)
        if (!scrollUp && current < last) WRAP.current++; // ❖ UP   (back history)
        if (WRAP.current == 0) WRAP.clearFont();
        WRAP.loadFont();
      };
      /*


█═─────══─────═🙦   METHODS   🙤═─────══─────═❖                                                                               */
      /*
█ ❖ loadFont()
▓ Load font {F} from data object. (default = current font)                                                                    */
      WRAP.loadFont = function(F) {
        const { history, current } = WRAP;
        F = F || history[current];
        if (ID == "head1" || ID == "head2") genTitleNode(ID); // ❖ Swap element type of title H1/H2 to demo appearance
        __slot.iuData("history", `${current + 1}/${history.length}`); // prettier-ignore
        __style.innerHTML = genTypefaceClass(F) + (F.fontFace || "");
        if (current > 0) {
          WRAP.classList.remove("-dropping");
          WRAP.classList.add("-dropped");
          __slot.classList.remove("select-active");
          __text.style.fontFamily = F.fontFamily;
          __slot.iuData("filename", history[WRAP.current].filename);
          // variantNode.innerHTML = genVariantList(F.variantList);
          // variantNode.classList.remove("item-disabled");
        } else {
          __slot.iuData("filename", "");
          __style.innerHTML = "";
        }
      };

      /*
█ ❖ clearFont()
▓ Clear current font, restoring "(drop file)" text.                                                                   */
      WRAP.clearFont = function() {
        if (varName) document.body.style.removeProperty(varName);
        else if (selector) __style.innerHTML = "";
        WRAP.classList.remove("-dropped");
        __text.style.removeProperty(`font`);
        __style.innerHTML = null;
        // variantNode.innerHTML = null;
        // variantNode.classList.add("item-disabled");
      };

      /*
█ ❖ deleteCurrentFont()
▓ Delete the current font.                                                                   */
      WRAP.deleteCurrentFont = function() {
        WRAP.history.splice(WRAP.current, 1);
        WRAP.loadFont();
      };

      /*
█ ❖ clearAllFonts()
▓ Clear font & erase history.                                                                   */
      WRAP.clearAllFonts = function() {
        WRAP.clearFont();
        WRAP.history = [data];
        WRAP.current = 0;
        WRAP.loadFont(data);
      };

      /*
█ ❖ buildFont()
▓ Parse a font file that was dropped in drop zone.
▓ ID       = Typeface row ID.
▓ fontFile = Font file data.
▓ fileName = Name of font file.                                                                   */
      WRAP.buildFont = function(ID, fontFile, filename) {
        // ❖ Build font obj
        const { selector, varName, variant, size = "1rem", weight = 400, lineHeight, letterSpacing = "0", uppercase = false, gradient } = window.TypefaceIndex[ID], // prettier-ignore
          fontFamily = `lab-${ID}`,
          propVal = [weight, size, fontFamily].join(" "),
          fontFace = `@font-face { font-family: "${fontFamily}"; src: url(${fontFile}); }`,
          fontData = { ID, selector, filename, fontFamily, fontFace, varName, propVal, variant, size, weight, lineHeight, letterSpacing, uppercase, gradient }; // prettier-ignore

        // ❖ Detect OpenType features
        var variantList = [];
        opentype.load(fontFile, function(err, font) {
          if (err) return console.error("opentype.js error:", err);
          if (font.tables.gsub) {
            font.tables.gsub.features.forEach(F => {
              if (variantList.indexOf(F.tag) < 0) variantList.push(F.tag);
            });
          }
          fontData.variantList = variantList;

          // ❖ Save data object & load font
          WRAP.history.push(fontData);
          WRAP.current++;
          WRAP.loadFont(fontData);
        });
      };
      WRAP.clearAllFonts(); // init node data
      /*
█
▓█═─────══─────═🙦   DROPMENU   🙤═─────══─────═❖
▓                                                                            */
      WRAP.dropmenu = UILib.cmd.UI_Dropmenu({
        id: ID,
        button: WRAP,
        btnMouse: "right",
        group: "dropzone-menu",
        items: [
          {
            id: "delete-current",
            title: "Delete font",
            disabled: () => WRAP.history.length < 1,
            onUse: () => {
              WRAP.deleteCurrentFont();
            }
          },
          {
            id: "history",
            title: "History",
            submenu: function(output) {
              WRAP.history.forEach(H => {
                if (H.filename) output.push({ title: H.filename });
              });
              if (output.length) {
                output.push({
                  title: "Clear history",
                  icon: "far fa-trash-alt",
                  onUse: () => WRAP.clearAllFonts()
                });
              }
              return output;
            }
          },
          {
            id: "clear-history",
            title: "Clear all fonts",
            disabled: () => WRAP.history.length < 1,
            onUse: () => {}
          }
        ]
      });
      return WRAP;
    }
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ UTILITY FUNCTIONS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */

    /*
█ ❖ genTitleNode() ⬥ For swapping the title node tag between H1 & H2.                                                                   */
    function genTitleNode(newTag) {
      const oldTitle = document.querySelector("#title"),
        oldTag = oldTitle.tagName;
      if (newTag == "head2" || (!newTag && oldTag == "H1")) newTag = "h2";
      if (newTag == "head1" || (!newTag && oldTag == "H2")) newTag = "h1";
      if (oldTag == newTag) return;
      const newTitle = document.createElement(newTag);
      newTitle.id = "title";
      newTitle.iuData("text", "🞘 Typeface Lab 🞘");
      oldTitle.replaceWith(newTitle);
    }
    /*
█ ❖ genVariantList() ⬥ Detect OpenType features on a font and generate a list.                                                                   */
    function genVariantList(variantList) {
      var variantListHTML = `<option value="normal">None</option>`;
      const VariantIndex = self.props.OpenTypeFeatures;
      variantList.forEach(V => {
        if (VariantIndex[V]) variantListHTML += `<option value="${V}">${VariantIndex[V]}</option>`; // prettier-ignore
      });
      return variantListHTML;
    }
    /*
█
▓█═─────══─────═🙦   genTypefaceClass()   🙤═─────══─────═❖
▓ ⮚ Generate a CSS block for a typeface.                                                                           */
    function genTypefaceClass(D) {
      if (!D.length) return;
      var { ID, fontFamily, variant, weight = 400, size, lineHeight, letterSpacing = 0, uppercase = "none", top, height, gradient } = D, // prettier-ignore
        sizeVar = `--${ID}-size`,
        sizeVarFunc = `var(${sizeVar})`,
        sel = D.selector,
        typefaceClass = document.body.classList.item[0];
      /*
█ ❖ Generate CSS Variable                                                                   */
      if (D.varName) {
        return `body { ${D.varName}: ${weight} ${size} "${fontFamily}"; }`;
      }

      /*
█ ❖ PARSE DATA                                                                   */
      typefaceClass = `.LogoBox.-${typefaceClass} > `;
      height = !height && gradient ? sizeVarFunc : height || "";
      height = height ? `height: ${height}!important;\n` : "";
      gradient = gradient ? `background:var(--gradient-${gradient});\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;\n` : ""; // prettier-ignore
      fontFamily = fontFamily ? `font-family: "${fontFamily}"!important;` : "";
      /*
█ ❖ PARSE SELECTOR                                                                   */
      if (sel.includes("LogoBox__line-")) sel = `${typefaceClass}${sel}`;
      if (sel.includes("LogoBox__line-2")) sel += `,${sel} .LogoBox__platinum`; // prettier-ignore

      /*
█ ❖ OUTPUT                                                                   */
      const output = `${sel} {
  ${sizeVar}: ${size}!important;
  ${fontFamily}
  font-feature-settings: ${variant ? `"${variant}"` : "normal"}!important;
  font-size: ${sizeVarFunc}!important;
  ${weight ? `font-weight: ${weight}!important;` : ""}
  line-height: ${!lineHeight ? sizeVarFunc : lineHeight}!important;
  letter-spacing: ${letterSpacing}!important;
  text-transform: ${uppercase ? "uppercase" : "none"}!important;
  ${top ? `top: ${top}!important;\n` : ""}
  ${height}
  ${gradient && sel.includes("#line-") ? gradient : ""}
}${gradient && sel.startsWith("h1") ? `h1::before {${gradient}}` : ""}`;
      return output;
    }
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ GRADIENT TABLE ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓        Extract gradient data from CSS and display it in text fields.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
    const GradientIndex = self.props.TableGradientIndex,
      GradientTable = document.querySelector(".SectionGradients"),
      GradientData = window.getComputedStyle(document.documentElement);
    GradientTable.style.gridTemplateColumns =
      "1fr " + "7fr ".repeat(GradientIndex.length - 2) + "1fr";

    // ❖ Build gradient list for param table
    var gradientList = "";
    GradientIndex.map(G => (gradientList += `<option>${G}</option>`));
    document.querySelectorAll(".col-10-gradient select").forEach(N => {
      N.insertAdjacentHTML("beforeEnd", gradientList);
      N.value = N.iuData("val");
    });

    // ❖ Build gradient table
    _.defer(() => {
      _.each(GradientIndex, G => {
        if (!G) {
          GradientTable.insertAdjacentHTML("beforeEnd", `<div class="row-head"></div><div class="row-1"></div>`); // prettier-ignore
          return;
        }
        const varName = `--gradient-${G}`,
          css = parseGradient(GradientData.getPropertyValue(varName)),
          html = `<div class="row-head">${G}</div><div class="row-1"><textarea id="grad-${G}">${css}</textarea></div>`;
        GradientTable.insertAdjacentHTML("beforeEnd", html);
        const field = GradientTable.querySelector(`#grad-${G}`);
        field.onblur = function(e) {
          field.value = parseGradient(field.value);
        };
        field.oninput = function(e) {
          const val = `-webkit-linear-gradient(${field.value})`;
          document.documentElement.style.setProperty(varName, val);
        };
      });
    });
    function parseGradient(val) {
      val = val.replace("-webkit-linear-gradient(", "").trim();
      if (val.endsWith(")")) val = val.substring(0, val.length - 1).trim();
      val = val.replace(/, rgba/g, ",\nrgba");
      return val;
    }
  }
};
