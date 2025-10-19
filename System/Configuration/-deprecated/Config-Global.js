/*                        _‗______🙖⟆∽🎕∼⟅🙐________‗_
ⸯ‗‗‗‗‗༼╯̿ ̿ ̿ ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾̿ ╰༽‗‗‗‗‗‗
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Iɴᴛᴇʀɴᴇᴛ Uᴛɪʟɪᴛɪᴇꜱ Pʟᴀᴛɪɴᴜᴍ ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓⸾░          ̿ ̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿ ̿ ⸯ            ⸯ▓
▓⸾░
▓⸾░                             SETTINGS DATA
▓⸾░               Index of user settings & global constants.
▓⸾░
▓██⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓⸾░﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓⸾░                              ❖ INDEX ❖
▓⸾░   ◇ DEFAULT_SETTINGS:
▓⸾░     ⬥ Global settings
▓⸾░     ⬥ Private global settings
▓⸾░     ⬥ Global constants
▓⸾░   ◇ DEFAULT_SECTIONS: Default MM sections.
▓⸾░ⸯ
▓██⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓⸾░﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓⸾░                           ❖ DATA STRUCTURE ❖
▓⸾░ setting = {
▓⸾░   ◇ .title        = Printed name of setting.
▓⸾░   ◇ .desc         = Printed description.
▓⸾░   ◇ .type         = Input control type
▓⸾░     ⬥ *See <input.js>
▓⸾░   ◇ .onEdit()     = Script to run when setting is changed from the settings page.
▓⸾░   ◇ .toStorage()  = Alter the setting value before it's sent to storage.
▓⸾░   ◇ .toDisplay()  = Alter the setting value before it's sent to storage.
▓⸾░
▓██⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓⸾░﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓⸾░                              ❖ NOTES ❖
▓⸾░  ◇ Art Direction: The settings page should look like an official form for a
▓⸾░   5 star hotel or restaurant, letting the client customize their service.
▓⸾░   Minimalist, thin black lines, adequate spacing.
▓⸾░
▓██⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓⸾░﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓⸾░                               ❖ TODO ❖
▓⸾░ ◇ Default values can be a function that returns the value.
▓⸾░ ◇ Keybind Chooser:
▓⸾░   ⬥ 4 toggle buttons on the left for modifiers: ctrl/cmd, alt/opt, shift, and win/ctrl
▓⸾░   ⬥ Input field for key (When user focuses it, it records any key press)
▓⸾░   ⬥ Button to record key/confirm key
▓⸾░   ⬥ Press esc to cancel selection
▓⸾░ ◇ When changing UI size, warn if body font is smaller than recommended for legibility.
▓⸾░
▓══─────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══─────────────══█
 ﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊⏜⏝⏜⏝⏜⏝⏜﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊    */

const GlobalSettings = {
    /*


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ MAIN ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
    General: {
      Title: "Interface",
      Type: "header",
    },
    /*
█ ❖ MENU - ITEM SIZE                                                                   */
    // menuItemSize: {
    //   Title: "Menu item size",
    //   Desc: "Size of all menu items",
    //   Type: "List",
    //   Part: "dropdown",
    //   Default: "MD",
    //   ChoiceList: {
    //     XS: { Title: "Extra Small" },
    //     SM: { Title: "Small" },
    //     MD: { Title: "Medium" },
    //     LG: { Title: "Large" },
    //     XL: { Title: "Extra Large" },
    //   },
    // },
    /*

█
▓█═─────══─────═🙦   NOTIFICATION TYPE   🙤═─────══─────═❖
▓                                                                           */
    notificationType: {
      Title: "Notification method",
      Desc: "Notification system to use by default",
      Type: "List",
      Part: "dropdown",
      development: true,
      Default: "native",
      Choice: { native: { Title: "Native" }, browser: { Title: "Browser" } },
    },
    /*

█
▓█═─────══─────═🙦   GLOBAL VOLUME   🙤═─────══─────═❖
▓                                                                           */
    //     globalVolume: {
    //       Title: "Volume",
    //       Desc: "Volume level of sound effects",
    //       System: "Acoustic",
    //       Type: "Number",
    //       Part: "Slider",
    //       development: true,
    //       Default: 100,
    //       /*
    // █ ❖ INPUT PROPERTIES                                                                   */
    //       unit: "%",
    //       min: 0,
    //       max: 100,
    //     },
    /*


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ APPEARANCE ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
    Appearance: {
      Title: "Aesthetic",
      Type: "header",
    },
    /*

█
▓█═─────══─────═🙦   TYPEFACE SET   🙤═─────══─────═❖
▓ ⮚
▓   choices = {
▓    ◇ .Title:      Printed name.
▓    ◇ .logo:       Main Menu logo class name. Each font style has its own class in <menu-style.css>.
▓    ◇ .body:       Default font for plain text.
▓    ◇ .head:       Font for headers.
▓                                                                               */
    fontStyle: {
      Title: "Typeface set",
      Desc: "A set of fonts used throughout the interface",
      System: "Typography",
      Type: "List",
      Part: "Dropdown",
      Default: "Trajan",
      /*
█ ❖ CHOICES                                                                   */
      Choice: {
        Trajan: {
          Title: "Imperial",
          demoFont: "font: 500 21px Trajan Pro;",
          logo: "Trajan",
          body: "300 1rem Avenir Next",
          h1: "400 76px Trajan Pro",
          h2: "500 64px Trajan Pro",
          capt: "1rem Avenir Next",
          cond: "1rem Avenir Next Cond",
        },
        MynaruseRoyale: {
          Title: "First Estate",
          demoFont: `font: 500 16px Mynaruse Royale; font-feature-settings: "salt";`,
          logo: "MynaruseRoyale",
          body: "300 1rem TT Bells",
          h1: "92px Mynaruse Royale",
          h2: "72px Mynaruse Royale",
          capt: "1rem Avenir Next",
          cond: "1rem Avenir Next Cond",
        },
        Centra: {
          Title: "Centra",
          demoFont: `font: 700 21px "Centra No.1";`,
          logo: "Centra",
          body: "300 1rem Helvetica Now",
          h1: `700 92px "Centra No.1"`,
          h2: `700 72px "Centra No.1"`,
          capt: `300 1rem "Centra No.1"`,
          cond: "1rem Vito Cond",
        },
        MynaruseFlare: {
          Title: "Flashing Lights",
          demoFont: "font: 600 18px Mynaruse Flare;",
          logo: "MynaruseFlare",
          body: "300 1.16rem Futura PT",
          h1: "500 64px Mynaruse Flare",
          h2: "72px TT Moons",
          capt: "1.5rem Futura PT",
          cond: "1rem TT Moons",
        },
        Chevalier: {
          Title: "Chevalier",
          demoFont: "font: bold 22px Chevalier;",
          logo: "Chevalier",
          body: "400 1.06rem Caslon Book",
          h1: "82px Engravers Shaded",
          h2: "72px Engravers Solid",
          capt: `1rem "21 Cent Cond"`,
          cond: `1rem "21 Cent Cond"`,
        },
        StarlitDrive: {
          Title: "Starlit Drive",
          demoFont: "font: 300 42px/22px Starlit Drive;",
          logo: "StarlitDrive",
          body: "300 1.16rem Futura PT",
          h1: "68px P22 Underground",
          h2: "68px P22 Underground",
          capt: "1.1rem Futura PT",
          cond: "1rem Avenir Next Cond",
        },
        // TrajanEmbossed: {
        //   Title: "Trajan Embossed",
        //   body: "Avenir Next",
        //   header: "Avenir Next Condensed"
        // }
        //TODO: Add calligraphy style font: Classic Script, Beauty Athena, Dream Script, Symphony Pro, Commercial Script, Sonata Pro
        // Also check these out: Aviano
      },
    },
    /*
█
▓█═─────══─────═🙦   PRIMARY COLOR   🙤═─────══─────═❖
▓ Primary UI color.
▓ choices = {
▓   ◇ .title = Printed name.
▓   ◇ .color = #Hash format color.
▓   ◇ .alt   = Same color in "r,g,b" format.
▓
▓ ❖ TODO: Add patterns: wood, marble, granite, floral, roses
▓ ❖ NOTES: Gold color: #B28018
▓                                                                               */
    themeColor: {
      Title: "Primary color",
      Desc: "Main color of the interface",
      System: "Coloring",
      Type: "List",
      Part: "box",
      input: "radio",
      Default: "blue",
      /*
█ ❖ CHOICES                                                                   */
      Choice: {
        blue: { Title: "Navy", color: "#001b38", alt: "0, 27, 56" },
        blue2: { Title: "Charcoal Blue", color: "#1b2837", alt: "27, 40, 55" },
        teal: { Title: "Teal", color: "#01424A", alt: "1, 66, 74" },
        violet: { Title: "Violet", color: "#1D0C24", alt: "29, 12, 36" },
        yellow: { Title: "Mustard", color: "#403601", alt: "64, 54, 1" },
        green: { Title: "Green", color: "#1c2c1d", alt: "28, 44, 29" },
        pink: { Title: "Fuchsia", color: "#711422", alt: "113, 20, 34" },
        red: { Title: "Wine", color: "#481516", alt: "72, 21, 22" },
        orange: { Title: "Amber", color: "#521D00", alt: "82, 29, 0" },
        leather: { Title: "Leather", color: "#381603", alt: "56, 22, 3" },
        lbrown: { Title: "Light Brown", color: "#3D3122", alt: "61, 49, 34" },
        dbrown: { Title: "Dark Brown", color: "#211C1B", alt: "10, 18, 13" },
        gray: { Title: "Charcoal", color: "#181818", alt: "24, 24, 24" },
        black: { Title: "Black", color: "#000", alt: "0, 0, 0" },
      },
      /*
█ ❖ INPUT PROPERTIES                                                                   */
      style: `
          .themeColor__box { display: flex; justify-content: center; align-items: center; width: 46px; height: 46px; font-size: 18px; color: transparent; }
          .InputRadio__radio:checked + .themeColor__box { color: #FFF; }
          `,
      genItem: val => `<div class="fal themeColor__box" style="background:${val.color}"><span></span></div>`, // prettier-ignore
      // ❖ onEdit() ⬥ Animate theme color changing.
      onEdit(val) {
        const speed = IUP.S.animationSpeed * 3500,
          htmlClass = document.documentElement.classList;
        setDocProp("--iup-color-theme-temp", val.color);
        setDocProp("--iup-window-width", document.body.scrollWidth + "px");
        htmlClass.add("swap-color");
        setTimeout(() => {
          htmlClass.remove("swap-color");
          setDocProp("--iup-color-theme", val.color);
        }, speed);
      },
    },
    /*
█
▓█═─────══─────═🙦   HIGHLIGHT COLOR   🙤═─────══─────═❖
▓ choices = {
▓   ◇ .title = Printed name.
▓   ◇ .color = #Hash format color.
▓   ◇ .alt   = Same color in "r,g,b" format.
▓
▓                                                                               */
    highlightColor: {
      Title: "Highlight color",
      Desc: "Choose a vivid color that stands out",
      System: "Coloring",
      Type: "List",
      Part: "box",
      input: "radio",
      Default: "yellow",
      /*
█ ❖ CHOICES                                                                   */
      Choice: {
        red: { Title: "Red", Color: "#F00" },
        yellow: { Title: "Yellow", Color: "#f3c200" },
        green: { Title: "Green", Color: "#00B100" },
        cyan: { Title: "Cyan", Color: "#00D1FF" },
        magenta: { Title: "Magenta", Color: "#F0F" },
      },
      /*
█ ❖ INPUT PROPERTIES                                                                   */
      genStyle: (val, ID) => `#${ID} { --InputList-tiles-checked-color: #000; }
          #${ID} label { padding: 2px; }
          .${ID}__box { display: flex; justify-content: center; align-items: center; width: 36px; height: 36px; border: 1px #000 solid; font-size: 12px; color: transparent; }
          .${ID}__check { color: transparent; padding-bottom: 2px; }
          .InputRadio__radio:checked + .${ID}__box { color: #000; }`,
      genItem: (val, ID) => `<div class="far ${ID}__box" style="border-color:${val.color}"><span class="${ID}"></span></div>` // prettier-ignore
      // ❖ onEdit() ⬥ Animate theme color changing.
      // onEdit: function(val, setting) {
      //   const speed = window.IUP.S.animationSpeed * 3500;
      //   setDocProp("--iup-color-theme-temp", val.color);
      //   setDocProp("--iup-window-width", document.body.scrollWidth + "px");
      //   document.documentElement.classList.add("swap-color");
      //   setTimeout(() => {
      //     document.documentElement.classList.remove("swap-color");
      //     setDocProp("--iup-color-theme", val.color);
      //   }, speed);
      // }
    },
    /*
█
▓█═─────══─────═🙦   WALLPAPER   🙤═─────══─────═❖
▓ The theme background pattern. White or black depending on color mode (see themeMode).
▓   choices = {
▓    ◇ .title = Printed name.
▓    ◇ .size  = Size of the pattern in pixels.
▓    ◇ .css   = Use CSS for property instead of generating URL for a pattern.
▓ TODO: Add patterns: wood, marble, granite, floral, roses
▓                                                                               */
    themePattern: {
      Title: "Wallpaper",
      Desc: "Theme background pattern",
      System: "Texturing",
      Type: "List",
      Part: "radio",
      Default: "diamond",
      /*
█ ❖ CHOICES                                                                   */
      Choice: {
        none: { Title: "None" },
        diamond: { Title: "Diamond", size: 120 },
        "paisley-1": { Title: "Paisley A", size: 240 },
        "stripes-1": { Title: "Stripes", size: 240 },
        "paisley-2": { Title: "Paisley B", size: 240 },
        arabesque: { Title: "Arabesque", size: 300 },
        "paisley-3": { Title: "Paisley C", size: 240 },
        "logo-sans": { Title: "Logo Sans", size: 250 },
        blueprints: { Title: "Blueprints" },
        vignette: { Title: "Vignette", css: `radial-gradient(circle, #5B595A 0%, #000 100%)` } // prettier-ignore
      },
      genItem: (val, ID) => `<div class="far ${ID}__box" style="background-image:var(--iup-pattern)"><span class="${ID}"></span></div>`, // prettier-ignore
      /*
█ ❖ INPUT PROPERTIES                                                                   */
      // ❖ onEdit() ⬥ Animate wallpaper changing.
      onEdit(themePattern) {
        const animSpeed = IUP.S.animationSpeed * 3000,
          htmlClass = document.documentElement.classList;
        IUP.S.themePattern = themePattern;
        htmlClass.add("swap-pattern", "swap-pattern-2");
        setTimeout(function() {
          document.documentElement.iuCSS({
            "--iup-pattern-size": themePattern.size + "px",
            "--iup-pattern": UILib.cmd.buildWallpaper(IUP.S),
          });
          htmlClass.remove("swap-pattern");
          setTimeout(() => htmlClass.remove("swap-pattern-2"), animSpeed);
        }, animSpeed);
      },
    },
    /*
█
▓█═─────══─────═🙦   COLOR MODE   🙤═─────══─────═❖
▓ Choose between a light or dark UI.
▓   choices = {
▓    ◇ "title":      Printed name.
▓    ◇ "#bg":        UI background color. (white by default)
▓    ◇ "#fg":        UI foreground color. (black by default)
▓    ◇ "b":          RGB version of {bg}. (#FFF = 255,255,255)
▓    ◇ "f":          RGB version of {fg}.
▓    ◇ "#highlight": Theme 'highlight' color.
▓    ◇ "#disabled":  Theme 'disabled' color.
▓    ◇ "#faded":     Theme 'faded' color.
▓    ◇ "pattern":    Pattern color mode. ("light|dark")
▓                                                                               */
    //     themeMode: {
    //       Title: "Color mode",
    //       Desc: "Choose between light or dark mode",
    //       System: "Coloring",
    //       Type: "List",
    //       Part: "dropdown",
    //       Default: "light",
    //       /*
    // █ ❖ CHOICES                                                                   */
    //       Choice: {
    //         light: {
    //           Title: "Light",
    //           bg: "#FFF",
    //           fg: "#000",
    //           b: "255,255,255",
    //           f: "0,0,0",
    //           pattern: "light",
    //           highlight: "#00567A",
    //           disabled: "#979797",
    //           faded: "#bfbfbf",
    //         },
    //         dark: {
    //           Title: "Dark",
    //           bg: "#000",
    //           fg: "#FFF",
    //           b: "0,0,0",
    //           f: "255,255,255",
    //           pattern: "dark",
    //           highlight: "#00567A",
    //           disabled: "#979797",
    //           faded: "#bfbfbf",
    //         },
    //         darkGlass: {
    //           Title: "Dark Glass",
    //           bg: "rgba(0,0,0,.86)",
    //           fg: "#FFF",
    //           b: "0,0,0",
    //           f: "255,255,255",
    //           pattern: "dark",
    //           highlight: "#00567A",
    //           disabled: "#979797",
    //           faded: "#bfbfbf",
    //           stroke: 0,
    //         },
    //         custom: { Title: "Custom (WIP)", bg: "#000", fg: "#FFF" },
    //       },
    //       /*
    // █ ❖ INPUT PROPERTIES                                                                   */
    //       // ❖ onEdit() ⬥ Animate color mode changing.
    //       onEdit(val) {
    //         const animSpeedIn = IUP.S.animationSpeed * 2000,
    //           animSpeedOut = animSpeedIn * 3,
    //           bodyClass = document.body.classList;
    //         bodyClass.add("swap-pattern", "swap-content-1");
    //         setTimeout(() => {
    //           document.documentElement.iuCSS({
    //             "--iup-color-bg": val.bg,
    //             "--iup-color-fg": val.fg,
    //             "--iup-color-b": val.b,
    //             "--iup-color-f": val.f,
    //             "--iup-pattern": UILib.cmd.buildWallpaper(IUP.S),
    //           });
    //           bodyClass.add("swap-content-2");
    //           setTimeout(() => bodyClass.remove("swap-pattern", "swap-content-1", "swap-content-2"), animSpeedOut); // prettier-ignore
    //         }, animSpeedIn);
    //       },
    //     },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ MENU ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
    MainMenu: {
      Title: "Main Menu",
      Type: "header",
    },
    /*

█
▓█═─────══─────═🙦   LAUNCH KEY   🙤═─────══─────═❖
▓                                                                           */
    launchKey: {
      Title: "Launch key",
      Desc: "Key for toggling the Main Menu",
      System: "Websurfing",
      Type: "Bind",
      // development: true,
      Default: {
        key: "`",
        ctrl: false,
        shift: false,
        alt: false,
      },
    },
    /*
█ ❖ MENU SCALE
▓ Amount to scale page by when the menu opens.
▓ EXAMPLE FORMULAS: {val} = 80
▓ ⬥ Scale Up:    100 / {val}    EX: 'scale(1.25)'
▓ ⬥ Scale Down:  {val} / 100    EX: 'scale(0.80)'
▓ ⬥ Calc Width:  10000 / {val}  EX: 'width: 125%'                             */
    menuScale: {
      Title: "Page zoom",
      Desc: "Page scaling while the HUD is open",
      System: "Websurfing",
      Type: "number",
      Part: "Slider",
      performance: (val) => (val ? 3 : 0),
      Default: 80,
      unit: "%",
      min: 50,
      max: 100,
    },
    /*
█ ❖ MENU - SHADOW INTENSITY                                                                   */
    menuShadowIntensity: {
      Title: "Shadow intensity",
      Desc: "Darkness of shadow while HUD is open",
      System: "Websurfing",
      Type: "number",
      Part: "Slider",
      development: true,
      performance: (val) => (val ? 3 : 0),
      Default: 80,
      unit: "%",
      min: 50,
      max: 100,
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ PERFORMANCE ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
    Performance: {
      Title: "Performance",
      Type: "header",
    },
    freezeWindow: {
      Title: "Disable scrolling with menu",
      Desc:
        "If the menu stutters and jumps around while scrolling, first try quitting other windows and programs. If that doesn't work, enable to lock scrolling when the menu is open.",
      System: "Maintenance",
      Type: "bool",
      Part: "switch",
      development: true,
      Default: false,
    },
    sleepMode: {
      Title: "Sleep mode",
      Desc:
        "While in sleep mode, IUP will wait until the Launch Key is pressed before running any code",
      System: "Websurfing",
      Type: "bool",
      Part: "switch",
      development: true,
      Default: false,
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ OTHER ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
    Misc: {
      Title: "Misc",
      Type: "header",
    },
    matureContent: {
      Title: "Mature content filter",
      Desc: "",
      Type: "bool",
      Part: "switch",
      Default: true,
    },
    //TODO https://developer.chrome.com/apps/permissions
    optionalPermissions: {
      Title: "Optional permissions",
      Desc: "Manage optional permissions for the extension",
      Type: "text",
      development: true,
      text: "TBA",
    },
    /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ OTHER ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
    Development: {
      Title: "Development",
      Type: "header",
    },
    typefaceLab: {
      Title: `Typeface Lab`,
      Type: "html",
      html: `<a class="btn btn-wide" data-label="Launch" href="/preview/index.html?q=TypefaceLab" target="_blank"></a>`,
    },
    animationLab: {
      Title: `Animation Lab`,
      Type: "html",
      html: `<a class="btn btn-wide" data-label="Launch" href="/preview/index.html?q=AnimationLab" target="_blank"></a>`,
    },
    sandbox: {
      Title: `Sandbox`,
      Type: "html",
      html: `<a class="btn btn-wide" data-label="Launch" href="/preview/index.html?q=Sandbox" target="_blank"></a>`,
    },
    /*




ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  GLOBAL CONSTANTS  🙠    █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓                                                                                */
    menuWidth: {
      Default: 300,
    },
    themePatternBlendMode: {
      Default: "soft-light",
    },
    themePatternPosition: {
      Default: "center",
      // Default: "top left"
    },
    animationTransition: {
      Default: "ease-out",
    },
    menuSpeedFastMultiplier: {
      Default: 1.25, // ❌❓
    },
    keyPressTimeout: {
      Default: 600,
    },
    /*
█ ❖ CLASSES & ID'S                                                                   */
    MENU_ACTIVE_CLASS: {
      Default: "iuMM-is-active",
    },
    MENU_SCALED_CLASS: {
      Default: "iuMM-is-scaled",
    },
    MENU_DOM_ID: {
      Default: "iuMM-DOM", // Main Menu shadow DOM, the outer-most element
    },
    MENU_BACKGROUND_ID: {
      Default: "iuMM-Background", // Background node inside shadow DOM
    },
    MENU_FRAME_ID: {
      Default: "iuMM-Frame", // Iframe inside shadow DOM
    },
    MENU_ANCHOR_ID: {
      Default: "iuMM-Anchor",
    },
    /*
█ ❖ URLS❌                                                                   */
    URL: {
      Default: {
        fa: chrome.runtime.getURL("vendor/fontawesome/css/all.min.css"),
        mstyle: chrome.runtime.getURL("lib/menu-style.css"),
        jq: chrome.runtime.getURL("vendor/jquery.min.js"),
        jqu_js: chrome.runtime.getURL("vendor/jquery-ui/jquery-ui.min.js"),
        jqu_css: chrome.runtime.getURL("vendor/jquery-ui/jquery-ui.min.css"),
      },
    },
  },
  /*




ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  DEFAULT SECTIONS  🙠    █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓                                                                                */
  DEFAULT_SECTIONS = [
    {
      name: "favorites",
      isCollapsed: false,
      isHidden: false,
      order: 0,
    },
    {
      name: "executive",
      isCollapsed: false,
      isHidden: false,
      order: 1,
    },
    {
      name: "content",
      isCollapsed: false,
      isHidden: false,
      order: 2,
    },
    {
      name: "media",
      isCollapsed: false,
      isHidden: false,
      order: 3,
    },
    {
      name: "notes",
      isCollapsed: false,
      isHidden: false,
      order: 4,
    },
    {
      name: "page",
      isCollapsed: false,
      isHidden: false,
      order: 5,
    },
    {
      name: "text",
      isCollapsed: false,
      isHidden: false,
      order: 6,
    },
    {
      name: "hidden",
      isCollapsed: false,
      isHidden: true,
      order: 998,
    },
    {
      name: "uncategorized",
      isCollapsed: false,
      isHidden: false,
      order: 999,
    },
  ];
/*




ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█   🙢  UTILITY FUNCTIONS  🙠    █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓                                                                                */
function setDocProp(prop, val) {
  document.documentElement.style.setProperty(prop, val);
}

//

//
