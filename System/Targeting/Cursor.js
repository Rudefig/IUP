export const Metadata = {
  Keyname: "Cursor",
  Title: "Module",
  Desc: "Handles the mouse cursor icon.",
  Icon: "f25a",
  Note:
    "Module is the base Key for the entire Platform, all other modules are descended from it.",
  Variant: "Mod",
  System: "Encapsulation",
};
/*
ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  SMART CURSOR  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓
▓ ❖ Action
▓   ◇ Engage: Generate & inject the cursor CSS into {target} DOM.
▓   ◇ Disengage: Remove style node and keybinds.
▓ ❖ Process
▓   ◇ Build_CSS_Block: Generate a cursor icon's CSS block from {cursorName} with selector {pattern}.
▓ ❖ State
▓   ◇ Binding
▓   ◇ ctrl_down
▓   ◇ shift_down
▓   ◇ alt_down
▓   ◇ setModifierIcon
▓   ◇ style_node
▓   ◇ cursor_css
▓   ◇ dpi
▓ ❖ Constant
▓   ◇ selector
▓   ◇ ICON_URL_BASE
▓   ◇ Index
▓ ❖ Setting
▓   ◇ Native_OS_Cursor: Choose the icon set based on your OS
▓ ❖ Sheet
▓   ◇ Cursor Index: List of all the smart cursor icons.
▓
▓
▓
▓                                ❖ NOTES ❖
▓ ❖ MOD CONTROL: When user holds down modifier key, override other cursors.
▓   ◇ CTRL: Open link in new tab
▓   ◇ SHIFT: Open link in new window
▓   ◇ ALT: Download link
▓  ❖ TEST PAGE: http://damkat.co.nf/test/SmartCursor.html
▓  ❖ SELECTOR REFERENCE:
▓    ◇ Starts with:      ^=  (^='url')
▓    ◇ Ends with:        $=  ($='url')
▓    ◇ Contains:         *=  (*='url')
▓    ◇ Case-Insensitive: i   (='url')
▓  ❖ OFFICIAL LIST OF URIS:
▓    ◇ https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml
▓  ❖ Adobe documents: [.psd, ai, eps] AutoCAD: [.dwg]
▓
▓                                 ❖ TODO ❖
▓  ❖ Add missing patterns to these cursors:
▓    ◇ Image
▓    ◇ Script
▓    ◇ External Link (if possible)
▓  ❖ Finish icon sets:
▓    ◇ Find 4k Windows cursor for underlay (so far just have "extra large", not quite 2x large)
▓    ◇ Find SD mac cursor for underlay (try lower resolution on laptop)
▓  ❖ Make Cursors:
▓    ◇ Anchor link (change to actual anchor)
▓    ◇ Text Document (.txt, .rtf)
▓    ◇ New Tab (not new window)
▓    ◇ Program (.exe, etc.)
▓    ◇ Font (ttf, otf, woff, woff2, eot)
▓    ◇ Run JavaScript (javascript:)
▓  ❖ Update Cursors:
▓    ◇ Disk Drive - Slightly smaller
▓    ◇ File Transfer - Slightly smaller + white BG
▓    ◇ Flash link - White BG
▓    ◇ IRC - Move down
▓    ◇ Map - Smaller
▓    ◇ Music - Slightly smaller
▓    ◇ RSS - Down a little
▓    ◇ Text Msg - Much smaller
▓    ◇ Torrent - Slightly smaller
▓    ◇ Voice Chat - Down + slightly smaller
▓  ❖ Add settings:
▓    ◇ (checkbox) (cursor) (name) (patterns)
▓    ◇ (Custom Cursor...)
▓  ❖ User-defined cursors:
▓    ◇ CHOOSE CURSOR: User chooses cursor from popup list w/ thumbnails
▓      ⬥ Add extra cursor icons for user (see OneNote page)
▓      ⬥ Also supports browser's built-in cursors
▓      ⬥ Separate into sections w/ dropdown? (Default, Extra, Built-In)
▓    ◇ CHOOSE PATTERNS: User adds to list of patterns
▓      ⬥ Dropdown: Starts With, Ends With, Contains
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */

export const Action = {
  /*
▓█═─────══─────═🙦   Engage()   🙤═─────══─────═❖
▓ Generate & inject the cursor CSS into {target} DOM.                                                                     */
  Engage: function(target = document.head) {
    var cursor_css = "",
      style_node;
    const icons = Constant.Index,
      selector = Constant.selector,
      modifiers = ["ctrl", "shift", "alt"];

    // ❖ Generate CSS code for each cursor and save to temp
    for (var I in icons) {
      cursor_css += Process.Build_CSS_Block(I, icons[I].pattern);
    }
    State.style_node = Injection.Inject(selector, cursor_css);
    State.cursor_css = cursor_css;

    /*
█ ◇ When user holds a modifier key, override other cursors.
▓   ⬥ Ctrl:   Open in new tab
▓   ⬥ Shift:  Open in new window
▓   ⬥ Alt:    Download linked file                                                                    */
    var keybindData = [];
    modifiers.forEach((modifier) => {
      keybindData.push({
        keys: modifier,
        prevent_repeat: true,
        on_keydown: () => State.setModifierIcon(X, true),
        on_keyup: () => State.setModifierIcon(X, false),
      });
    });
    const Binding = InputLib.var.build_keybind(keybindData);
    self.State.Binding = Binding;
  },
  /*
▓█═─────══─────═🙦   Disengage()   🙤═─────══─────═❖
▓ Remove style node and keybinds.                                                                     */
  Disengage: function() {
    Injection.Eject(Constant.selector);
    self.State.Binding.destroy();
  },
};

export const Process = {
  /*
▓█═─────══─────═🙦   Build_CSS_Block()   🙤═─────══─────═❖
▓ Generate a cursor icon's CSS block from {cursorName} with selector {pattern}.                                                                     */
  Build_CSS_Block: function(cursorName, pattern) {
    if (["newTab", "newWindow"].includes(cursorName)) return "";
    var output = "",
      value = Process.Build_CSS_Value(cursorName);

    if (typeof pattern == "string") pattern = [pattern];
    pattern.forEach((P) => {
      if (P.startsWith("[")) output += `a${P},`;
      else {
        var attr = P.search(/^[a-z]/i) + 1 ? "" : "href";
        output += `a[${attr}${P}i],`; // insert each selector pattern
        if (P.startsWith("$")) output += `a[href*${P.slice(1, -1)}?'i],`;
      }
    });
    output += output.replace("i],", "i] *,"); // include a wildcard selector
    output = output.slice(0, -1); // trim last comma
    output += `{ ${value} }\n`; // 25 25 = way up to the left
    return output;
  },
  Build_CSS_Value: function(cursorName) {
    const base = Constant.ICON_URL_BASE + "PC",
      dpi = State.dpi,
      url = browser.runtime.getURL(`${base}-${dpi}-${cursorName}.png`);
    return `cursor: url(${url}) 6 0, auto;`;
  },
};
/*
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */

export const State = {
  Binding: null,
  // Track modifier state
  ctrl_down: false,
  shift_down: false,
  alt_down: false,
  // Set the cursor icon depending on which modifier key is currently held.
  setModifierIcon: function(modifier, val) {
    this[`${modifier}_down`] = val;
    var code = this.cursor_css,
      cursorIconName = this.ctrl_down
        ? "newTab"
        : this.shift_down
        ? "newWindow"
        : this.alt_down
        ? "download"
        : null,
      newValue = Process.Build_CSS_Value(cursorIconName);
    if (newValue) this.style_node.innerHTML = `a { ${newValue} }`;
  },
  style_node: null,
  cursor_css: null,
  dpi: matchMedia("min-resolution: 192dpi").matches ? "2x" : "1x",
};

export const Setting = {
  native_os_cursor: {
    Title: "Operating System",
    Desc: "Choose the icon set based on your OS.",
    Type: "List",
    Part: "dropdown",
    Default: navigator.userAgent.indexOf("Mac OS X") == 1 ? "mac" : "pc",
    ChoiceList: {
      mac: { Title: "Mac" },
      pc: { Title: "PC" },
    },
    onEdit: () => Action.Engage(),
  },
};

export const Constant = {
  selector: "Smart-Cursor", // selector class for the CSS <style> node
  ICON_URL_BASE: "/System/Targeting/-asset/SmartCursor/", // URL base of the cursor icon files
};

this.Constant.Index = {
  // start with external link so others will override it if necessary
  anchor: {
    title: "Anchor Link",
    pattern: ["^='#'"],
  },
  appStore: {
    title: "App Store",
    pattern: ["^='market:'", "^='itms:'", "^='itms-apps:'"],
  },
  audio: {
    title: "Audio",
    pattern: [
      "$='.ape'",
      "$='.aac'",
      "$='.aif'",
      "$='.alac'",
      "$='.flac'",
      "$='.mid'",
      "$='.midi'",
      "$='.mka'",
      "$='.mp3'",
      "$='.m4a'",
      "$='.ogg'",
      "$='.wav'",
      "$='.wave'",
      "$='.wma'",
    ],
  },
  bitcoin: {
    title: "Bitcoin Address",
    pattern: ["^='bitcoin:'", "^='bitcoincash:'"],
  },
  browserExt: {
    title: "Chrome Extension",
    pattern: [
      "*='chrome.google.com/webstore/'",
      //"^='browserext:'", // MS Edge, Firefox, Opera
      "^='chrome-extension:'",
      //"^='ms-browser-extension:'",
      "$='.crx'",
    ],
  },
  cloudDownload: {
    title: "Cloud Download",
    pattern: [
      "*='drive.google.com/open?id='",
      "*='drive.google.com/file/d/'",
      "*='dropbox.com/s/'",
      "*='dl.dropboxusercontent.com/s/'",
      "*='mega.nz/#!'",
      "*='mega.co.nz/#!'",
    ],
  },
  diskDrive: {
    title: "Disk Drive",
    pattern: ["^='file:'", "^='svn:'"],
  },
  document: {
    title: "Document",
    pattern: [
      "$='.csv'",
      "$='.doc'",
      "$='.docm'",
      "$='.docx'",
      "$='.key'",
      "$='.numbers'",
      "$='.odp'",
      "$='.ods'",
      "$='.pages'",
      "$='.ps'",
      "$='.pps'",
      "$='.ppt'",
      "$='.pptm'",
      "$='.pptx'",
      "$='.xls'",
      "$='.xlsm'",
      "$='.xlsx'",
      "$='.xps'",
    ],
  },
  download: {
    title: "Download",
    pattern: [
      "$='.bz2'",
      "$='.gz'",
      "$='.jar'",
      "$='.lzma'",
      "$='.rar'",
      "$='.rpm'",
      "$='.tar'",
      "$='.xz'",
      "$='.zip'",
      "$='.7z'",
    ],
  },
  email: {
    title: "Email",
    pattern: ["^='mailto:'", "^='message:'", "^='smtp:'"],
  },
  fileTransfer: {
    title: "File Transfer",
    pattern: ["^='ftp:'", "^='sftp:'", "^='ssh:'"],
  },
  flash: {
    title: "Flash File",
    pattern: [
      "$='.flv'",
      "$='.f4v'",
      "$='.f4p'",
      "$='.f4a'",
      "$='.f4b'",
      "$='.swf'",
    ],
  },
  font: {
    title: "Font File",
    pattern: ["$='.eot'", "$='.otf'", "$='.ttf'", "$='.woff'", "$='.woff2'"],
  },
  game: {
    title: "Game",
    pattern: ["^='steam:'", "^='unreal:'", "^='secondlife:'"],
  },
  gitRepo: {
    title: "Git Repo",
    pattern: ["^='git:'", "$='.git'"],
  },
  image: {
    title: "Image",
    pattern: [
      "$='.bmp'",
      "$='.gif'",
      "$='.ico'",
      "$='.jpg'",
      "$='.jpeg'",
      "$='.png'",
      "$='.svg'",
      "$='.svgz'",
      "$='.tif'",
      "$='.tiff'",
    ],
  },
  irc: {
    title: "IRC Chat",
    pattern: ["^='irc:'", "^='ircs:'", "^='irc6:'"],
  },
  map: {
    title: "Map",
    pattern: [
      "*='bing.com/maps'",
      "^='comgooglemaps:'",
      "^='comgooglemaps-x-callback:'",
      "^='geo:'",
      "*='google.com/maps/'",
      "*='goo.gl/maps/'",
      "*='mapq.st'",
      "*='mapquest.com/'",
      "^='maps:'",
    ],
  },
  music: {
    title: "Music Player",
    pattern: ["^='lastfm:'", "^='spotify:'", "^='itms:'", "^='mms:'"],
  },
  // newWindow: {
  //   title: "New Window",
  //   pattern: ["target='_blank'"]
  // },
  newTab: {
    title: "New Tab",
    pattern: ["[target='_blank']"],
  },
  pdf: {
    title: "PDF File",
    pattern: ["$='.pdf'"],
  },
  phone: {
    title: "Phone #",
    pattern: [
      "^='tel:'",
      "^='callto:'",
      "^='skype:'",
      "^='gtalk:'",
      "^='facetime:'",
      "^='wtai:'",
      "^='dc:'",
      "^='sip:'",
      "^='fax:'",
    ],
  },
  program: {
    title: "Program",
    pattern: [
      "$='.bin'",
      "$='.dmg'",
      "$='.exe'",
      "$='.iso'",
      "$='.msi'",
      "$='.xpi'",
    ],
  },
  rssFeed: {
    title: "RSS Feed",
    pattern: [
      "type='application/rss+xml'",
      "^='feed:'",
      "$='.rss'",
      "$='.atom'",
    ],
  },
  script: {
    title: "Script",
    pattern: ["$='.css'", "$='.js'", "^='view-source:'", "$='.xml'"],
  },
  textDoc: {
    title: "Text Document",
    pattern: ["$='.txt'", "$='.rtf'"],
  },
  textMsg: {
    title: "Text Message",
    pattern: [
      "^='aim:'",
      "^='im:'",
      "^='imap:'",
      "^='msnim:'",
      "^='sms:'",
      "^='tg:'",
      "^='weixin:'",
      "^='whatsapp:'",
      "^='ymsr:'",
    ],
  },
  torrent: {
    title: "Torrent",
    pattern: ["^='magnet:'", "^='torrent:'", "^='udp:'", "$='.torrent'"],
  },
  video: {
    title: "Video",
    pattern: [
      "$='.asf'",
      "$='.avi'",
      "$='.mov'",
      "$='.mp4'",
      "$='.mov'",
      "$='.movie'",
      "$='.mpg'",
      "$='.mpeg'",
      "$='.mpeg4'",
      "$='.m4v'",
      "$='.ogg'",
      "$='.ogm'",
      "$='.ogv'",
      "$='.qt'",
      "$='.rbs'",
      "$='.webm'",
      "$='.wmv'",
    ],
  },
  voiceChat: {
    title: "voiceChat",
    pattern: [
      "*='discord.gg'",
      "^='mumble:'",
      "^='teamspeak:'",
      "^='ventrilo:'",
    ],
  },
};
/*external: {
            title: "External Link",
            pattern: [
                "a:not([href^='/'):not([href*='" +
                    window.location.hostname.replace("www.", "") +
                    "')"
            ]
        }*/

// info: {
//   howItWorks:
//     "Analyzes a link's URL for keywords located at the start, end, or middle. If a match is found, the cursor's graphic is changed."
// }
