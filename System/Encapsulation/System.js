import { IUP } from "../Environment/-asset/Initialization.js"; /* 
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ System Module ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓  ❖ Process
▓    ◇ Module_List(System): Generate a list of a System's modules based on System Index or Module Index.
▓  ❖ Layout
▓    ◇ Module: Page for the System module
▓    ◇ System: Page for a specific System
▓    ◇ Card: Card for a specific System
▓  ❖ Index
▓    ◇ System: Index of every System.
▓  ❖ Setting
▓    ◇ System: Configuration for each System
▓                                                                                    */
export const Metadata = {
  Title: "System",
  Desc: "A collective system of modules that work together.",
  Keyname: "System",
  Variant: "Sys",
  System: "Encapsulation",
  Child: [
    "Acoustic",
    "Algebraic",
    "Application",
    "Arithmetic",
    "Arrangement",
    "Attention",
    "Audiovisual",
    "Character",
    "Coloristic",
    "Communication",
    "Configuration",
    "Construction",
    "Connection",
    "Copypasting",
    "Cosmetic",
    "Datapoint",
    "Discussion",
    "Distribution",
    "Documentation",
    "Encapsulation",
    "Environment",
    "Exhibition",
    "Filesystem",
    "Graphical",
    "Iconography",
    "Integration",
    "Instigation",
    "Keymapping",
    "Locomotion",
    "Logical",
    "Maintenance",
    "Measurement",
    "Monetary",
    "Namespace",
    "Notetaking",
    "Onboarding",
    "Organization",
    "Personalization",
    "Portaling",
    "Programming",
    "Resource",
    "Reading",
    "Revision",
    "Scripting",
    "Searching",
    "Sheeting",
    "Structuring",
    "Stylesheet",
    "Targeting",
    "Textual",
    "Texturing",
    "Timekeeping",
    "Trigonomic",
    "Typography",
    "Typology",
    "Vocabulary",
    "Websurfing",
    "Windowing",
    "Writing",
  ],
};

export const Config = {
  Status: {
    Title: "System Status",
    Desc: "Activate or deactivate the System.",
    Type: "Status",
    Format: ["Online", "Standby", "Offline"],
    Default: "Offline",
    Part: "Switch",
  },
};

export const Part = {
  /*
▓ ❖ Module_List: HTML list of a System's modules with descriptions.                                                             */
  Module_List(Sys) {
    var html = "",
      ModIndex = IUP.Module.Index.Module,
      SysIndex = IUP.System.Index.System;
    if (ModIndex[Sys]) {
      for (var Mod in ModIndex[Sys]) {
        let dat = ModIndex[Sys][Mod],
          Title = IUP.Keyname.Order.Generate.Keylink(Mod),
          Desc = dat === true ? IUP[Mod].Metadata.Desc : dat.Desc;
        html += `<li><span>${Title}:</span> ${Desc}</li>`;
      }
    } else {
      for (const Mod in SysIndex[Sys].Module) {
        html += `<li><span>${Mod}:</span> ${SysIndex[Sys].Module[Mod]}</li>`;
      }
    }
    return `<ul>${html}</ul>`;
  },
};

export const Sheet = {
  // ❖ <System Cover Sheet> Page for the System module.
  Cover: function() {
    return "There are (N) number of Systems on the platform.";
  },

  // ❖ <System Sheet> Page for a specific System {Sys}.
  System: function(Sys) {
    const Item = document.createElement("div"),
      genKey = IUP.Keyname.Order.Generate.Keylink;
    Item.className = `Layout-System`;
    let dat = { ...IUP[Sys].Metadata },
      utilList = IUP.Keyname.Order.Generate.Multi_Keylink(dat.Utility),
      modList = Part.Module_List(Sys);
    var html = `
    <div><h5>System Information:</h5><ul>
    <li><span>${genKey("Status")}:</span> [${genKey(dat.Status)}]</li>
    <li><span>${genKey("Utility")}:</span> ${utilList}</li></ul></div>
    <div><h5>System Modules:</h5>${modList}</div>`;
    Item.appendChild(IUP.Metadata.Card.Titling(dat));
    Item.innerHTML += html;
    return Item;
  },
};

export const Card = {
  // ❖ <System Card> - Card Node for a specific System {Sys}, used by <Utility Sheet>.
  System: function(Sys) {
    const Item = document.createElement("div"),
      dat = IUP[Sys].Metadata,
      Icon = IUP.Icon.Order.Generate_Icon(dat.Icon),
      Title = IUP.Keyname.Order.Generate.Keylink(
        Sys,
        `<h4>${Icon}${Sys} System</h4>`
      );
    var Cover = IUP[Sys].Cover || null;
    if (IUP[Sys].Layout && IUP[Sys].Layout.Cover)
      Cover = IUP[Sys].Layout.Cover();
    var Config = IUP[Sys].Config || null;
    if (Config) {
      var ConfigCard = Config ? IUP["Config"].Card.Config(Config) : null;
    }
    // Init System HTML
    Item.className = `system-item system-${Sys} -is-${dat.Status}`;
    Item.innerHTML = `<div class="system-tabs"></div><div class="system-main">${Title}<div class="system-content"></div></div>`;

    // Initialize tabs
    var tabList = {
      Status: {
        Title: dat.Status,
        Status: "Active",
        content: `This System's status is ${
          dat.Status
        }.<br><input type="checkbox" id="switch"><label for="switch">Toggle</label>`,
      },
      Cover: {
        Status: Cover ? "Active" : "Disabled",
        content:
          Cover ||
          `<p>${
            dat.Desc
          }</p><p>NOTICE: This System doesn't have any cover data.</p>`,
      },
      modules: {
        Status: "Active",
        content:
          `<p>${dat.Desc}</p><h5>Module List:</h5>` + Part.Module_List(Sys),
        // html: `This feature is deactivated. Please turn on <b><a href="?Module=Encapsulation">Encapsulation System</a></b> to view the System's modules.`
      },
      Demo: {
        Status: "Disabled",
        content: `<p>NOTICE: This feature is unavailable because its System is offline. Please turn on <b><a href="?Module=Onboarding">Onboarding System</a></b> to access Demos and tutorials.</p>`,
      },
      // App: {
      // 	Status: "Disabled",
      // 	html:
      // 		IUP.Application.Status == "Online"
      // 			? `Application System is online, click to visit app`
      // 			: `<p>NOTICE: This feature is unavailable because its System is offline. Please turn on <b><a href="?Module=Application">Application System</a></b> to open Platform apps.</p>`,
      // },
      Config: {
        Status: Config ? "Active" : "Disabled",
        content: Config ? ConfigCard : "<p>NOTICE: No settings available.</p>",
        // node: `<p>NOTICE: This feature is unavailable because its System is offline. Please turn on <b><a href="?Module=Configuration">Configuration System</a></b> to Configure module settings.</p>`,
      },
    };

    // Generate tabs
    for (const Tab in tabList) {
      let Title = tabList[Tab].Title || Tab,
        Status = tabList[Tab].Status,
        Content = tabList[Tab].content,
        contentNode = document.createElement("div");
      Item.querySelector(".system-tabs").insertAdjacentHTML(
        "beforeend",
        `<span class="tab-${Tab} -is-${Status}">${Title}</span>`
      );
      let tabNode = Item.querySelector(".tab-" + Tab);
      tabNode.addEventListener("click", (e) => clickTab(e, Tab));
      // Generate content
      if (typeof Content === "string") contentNode.innerHTML = Content;
      else if (Content instanceof Element) contentNode.appendChild(Content);
      // else console.log("!!! Couldn't detect type of", typeof Content, Content);
      contentNode.classList.add("content-" + Tab, "-is-" + Status);
      Item.querySelector(".system-content").appendChild(contentNode);
    }

    // clickTab() - Event handler for clicking a System's tab.
    function clickTab(e, Tab) {
      //Handle tab
      let selectedTab = Item.querySelector(".system-tabs .-is-Selected");
      if (selectedTab) selectedTab.classList.remove("-is-Selected");
      let tabNode = e
        ? e.target
        : Item.querySelector(".system-tabs .tab-" + Tab);
      tabNode.classList.add("-is-Selected");

      // Handle content
      let selectedContent = Item.querySelector(".system-content .-is-Selected");
      if (selectedContent) selectedContent.classList.remove("-is-Selected");
      let contentNode = Item.querySelector(".system-content .content-" + Tab);
      // console.log("contentNode =", contentNode, Tab, Item.innerHTML);
      contentNode.classList.add("-is-Selected");
      // Item.querySelector(".system-content").innerHTML = tabList[Tab].html;
      // Item.querySelector(".system-content").className =
      // 	"system-content content-" + Tab;
    }
    // Set default tab and append to page
    if (Cover) clickTab(null, "Cover");
    else clickTab(null, "modules");
    return Item;
  },
};

/*
  
█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ SYSTEM INDEX ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓  Index of every System on the Platform.
▓   ◇ Systems that aren't yet implemented have their metadata defined here.
▓   ◇ Set a System's value to "true" to fetch data from its own module file.
▓     - Example: "Acoustic: true" will fetch System data from "System/Acoustic/Acoustic.js"
▓                                                                                                   */
export const Index = {
  System: {
    Acoustic: true,
    Algebraic: {
      Utility: ["Mathematic"],
      Desc: "Solves mathematic equations and formulas.",
      Icon: "subscript",
      Status: "Disabled",
      Module: {
        "Q-Equation Typing": "Represents mathematic equations.",
        Formula: "A mathematic formula.",
        Crunch: "To solve a mathematic formula and output the result.",
        "Formula Editor": "Write mathematic formulas.",
        "'MathJAX' Plugin": "Library for displaying mathematical notations.",
        "Formula Repository": "Contains standard formulas.",
      },
    },
    Application: {
      Utility: ["Executive", "Runtime"],
      Desc: "Create software apps by combining modules.",
      Icon: "grid-2",
      Status: "Disabled",
      Cover:
        "Activate this [System] to start using Platform Apps.<ul><li>Apps combine a variety of modules to form a complete software application</li><li>Browse the [apps] available from the [Systems] you've activated so far</li><li>Use the [app] builder to customize apps or create your own</li><li>Activate more [Systems] to acquire new apps and unlock app features</li></ul>",
      Module: {
        "App Catalog": "View all the Platform's Apps and Tools.",
        App: "A Platform-based software app.",
        Tool: "A tool that provides App functionality.",
        Suite: "A group of apps designed to work together.",
        "App Builder": "Developer tool for building apps.",
      },
    },
    Arithmetic: true,
    Arrangement: {
      Utility: ["Interface"],
      Desc: "Arranges UI components into layouts.",
      Icon: "",
      Status: "Disabled",
      Module: {
        Layout: "A layout for UI parts.",
        Flex: "A flexbox-based layout for UI parts.",
        Grid: "A grid-based layout for UI parts.",
        Fitting: "A [part] of varying size that fits into a [Layout].",
        Align: "An alignment relative to another object.",
        Widget: "",
        Dashboard: "A specialized layout for widgets.",
      },
    },
    Audiovisual: true,
    Boolean: true,
    Character: {
      Utility: ["Linguistic"],
      Desc: "Handles text strings and Unicode characters.",
      Note: "Alt name: Symbology, Unicode",
      Icon: "face-smile",
      Status: "Disabled",
      Module: {
        String: "A string of text characters.",
        "String Transformer": "Transform the characters of text strings.",
        Glyph: "A single Unicode character.",
        Emoji: "A character used as an emoji.",
        Unicode: "Database of Unicode characters.",
        Regex: "A regular expression that matches characters in a string.",
      },
    },
    Coloristic: true,
    Communication: {
      Utility: ["Community"],
      Desc: "Communicates with other users through messages.",
      Icon: "messages",
      Status: "Disabled",
      Cover: "",
      Module: {
        Chatroom: "Enter chat rooms with other users.",
        Chat: "A chat message sent between users.",
        "Chat Card": "A small chat window.",
      },
    },
    Construction: true,
    Configuration: true,
    Connection: {
      Utility: ["Storage", "Runtime"],
      Desc: "Transfers data in and out of the Platform.",
      Note: "Alt name: Delivery, Transferrence",
      Icon: "download",
      Status: "Disabled",
      Module: {
        Transfer: "To transfer data in or out of the Platform.",
        Download: "A file being downloaded.",
        "Download Manager": "Manage the files being downloaded.",
        "Download Sheet": "Displays a list of downloaded files.",
      },
    },
    Copypasting: {
      Utility: ["Runtime"],
      Desc: "Manages cut, copy, and paste functionality.",
      Note: "Alt name: Copypaste, Clipping, Copypasta",
      Icon: "clipboard",
      Status: "Disabled",
      Cover:
        "Activate this System to enhance copy/paste functionality.<ul><li>Multiple clipboards can separately copy text, images, and more</li><li>Clipboard history keeps a record of clipboard data</li></ul>",
      Module: {
        Clipboard: "Stores the data used by copy/paste.",
        Copy: "To copy target data to the [clipboard].",
        Cut: "To cut target data to [clipboard].",
        Paste: "To paste data from [clipboard] to target.",
        "Clipboard Manager": "Manage and customize the clipboard.",
        "Clipboard History": "Keeps a record of clipboard data.",
        "Clipboard Settings": "Configuration settings for the clipboard.",
      },
    },
    Cosmetic: true,
    Datapoint: {
      Utility: ["Storage"],
      Desc: "Handles singular values of data.",
      Icon: "",
      Status: "Disabled",
      Module: {
        "V-Value Typing": "Represents values of data.",
        Variable: "A variable value that can be changed.",
        Constant: "A constant value that cannot be changed.",
        Default: "The default of a value.",
        Param: "An input or output parameter.",
      },
    },
    Dataset: {
      Utility: ["Storage"],
      Desc: "Handles multiple values of data.",
      Note:
        "Alt name: Repository; Indexes can reference each other, creating a platform-wide associative database.",
      Icon: "table",
      Status: "Disabled",
      Module: {
        "I-Index Typing": "Represents sets of data.",
        Index: "A set of data.",
        Table: "A database table.",
        Registry: "An aggregated pool of modules.",
      },
    },
    Discussion: {
      Utility: ["Community"],
      Desc: "Provides community forums where users can interact.",
      Icon: "buildings",
      Status: "Disabled",
      Module: {
        Forum: "A message board or community where users interact.",
        Board: "A board or sub-community for a forum.",
        Post: "A [message] posted to a [board] by a user.",
        Handle: "A social media user's ID.",
        "Support Forums":
          "Forum app for users to get support with their Platform.",
        "Developer Forums": "Forum app for Platform developers to collaborate.",
        "User Forums": "Browse user-created forums or design your own forum.",
      },
    },
    Distribution: {
      Utility: ["Community"],
      Desc: "Provides a storefront to download and share modules.",
      Icon: "store",
      Status: "Disabled",
      Module: {
        Storefront:
          "Browse the community storefront and download or share content.",
        Content: "Packages content into modules for Platform use.",
        "'Content Suggestion' Card":
          "Offer in-app suggestions for downloading new Platform content.",
      },
    },
    Documentation: {
      Utility: ["Executive", "Knowledge"],
      Desc: "Review the Platform's official documentation.",
      Note: "Alt name: Knowledge",
      Icon: "book-user",
      Status: "Disabled",
      Cover:
        "Learn how the Platform works under the hood.<ul><li>Aggregates documentation data from across Platform</li><li>Auto-generates documentation for Apps and other modules</li><li>Check out <a href='?Module=Onboarding'>Onboarding System</a> for interactive tutorials</li></ul>",
      Module: {
        Manual: "App for reviewing the Platform's official documentation.",
        Info: "An informative note added to a module.",
      },
    },
    Encapsulation: true,
    Environment: {
      Utility: ["Runtime"],
      Desc: "Manages the software engine's runtime environment.",
      Icon: "engine",
      Status: "Online",
      Module: {
        Status: "The current status of a module.",
        Mode: "A mode that a module is set as.",
        State: "A state that a module can be in.",
        Background: "Executes the browser engine's background script.",
        Console: "Handles the browser engine's console.",
        Error: "An error or warning [message] from a software bug.",
      },
    },
    Exhibition: {
      Utility: ["Multimedia", "Browsing"],
      Desc: "Presents content and media for consumption.",
      Note: "Alt name: Viewing, Presentation, Rendition, Depiction",
      Icon: "face-viewfinder",
      Status: "Disabled",
      Module: {
        "Media Library": "Organizes media into galleries and playlists.",
        Gallery: "A gallery containing [image] and [video].",
        Playlist: "A playlist containing [video] and [audio].",
        Booklist: "A booklist containing [books] and [audiobooks].",
        "Content Viewer App": "For viewing individual media files.",
        "Viewer Toolbar": "Toolbar for controlling the viewing interface.",
        "Viewer Layout": "Modular interface for framing and viewing content.",
      },
    },
    Filesystem: {
      Utility: ["Storage"],
      Desc: "Navigates files and manages file types.",
      Note: "Alt name: Filing",
      Icon: "folder-tree",
      Status: "Disabled",
      Module: {
        "F-File Typing": "Represents digital files in standard formats.",
        File: "A computer file.",
        Folder: "A folder containing files.",
        "File Navigator":
          "File browser for accessing your files across cloud and local storage.",
        Filetype: "A file extension.",
        "Filetype Viewer": "Look up file type information.",
        "Filetype Card": "Display info about a file type.",
        "Filetype Table": "Table of all the supported file types.",
      },
    },
    Graphical: true,
    Iconography: true,
    Instigation: {
      Utility: ["Automation"],
      Desc: "Listens for events and triggers platform operations.",
      Note: "Alt name: Initiation, Triggering, Execution, Launch, Happening",
      Icon: "flag-swallowtail",
      Status: "Disabled",
      Module: {
        Event: "An event that can be triggered.",
        Trigger: "An event handler that listens for events.",
        "Trigger Registry": "All triggerable events on the Platform.",
        Eventkit: "Contains a group of Events.",
      },
    },
    Integration: {
      Utility: ["Automation", "Runtime"],
      Desc: "Natively integrates code libraries as plugins.",
      Icon: "plug",
      Status: "Disabled",
      Module: {
        "Plugin Library":
          "View the plugins currently installed on the Platform.",
        Vendor: "A 3rd party software vendor that's natively integrated.",
        Plugin: "A natively integrated code library.",
        Service: "A natively integrated API service.",
        Account: "A natively integrated cloud account.",
      },
    },
    Keymapping: {
      Utility: ["Automation", "Interface"],
      Desc: "Handles input bindings for keyboard & mouse.",
      Note:
        "Alt name: Interaction. Bind Subtypes: Keyboard Bind, Mouse Bind, Keybind = Keyboard Bind",
      Icon: "keyboard",
      Status: "Offline",
      Cover:
        "Activate this System to unlock hotkeys and customize Platform controls.<ul><li>Set hotkeys and change the control scheme of modules.</li><li>Key combos will be added to menu items in the UI.</li><li>Handles Platform keybinds as well as the browser engine and operating system</li><li>Supports Mac/Win-specific bindings and custom modifier keys</li></ul>",
      Module: {
        Bind: "An input binding with modifier keys.",
        "Hotkey Layout": "Control scheme for an App's input bindings.",
        "Keyboard Layout": "Visual keyboard layout with [Items] as keys.",
        "Keyboard Eventkit":
          "Triggers for [Press], [Release], and [Hold] keys.",
        "Mouse Eventkit":
          "Triggers for [Click], [Release], [Hold], [Drag], and [Scroll].",
        "'Default Keybind' Table":
          "List of built-in bindings for the engine and operating system.",
        Modifier:
          "An input modifier that's held down. Includes table of standardized modifier keys for PC & Mac.",
        Binder: "UI part for setting an input binding.",
        "Keypress.js Plugin": "Library for handling keybinds.",
      },
    },
    Locomotion: {
      Note: "Alt name: Movement, Motion, Transit, Actuation",
      Title: "Locomotion System",
      Desc: "Animating media and the user interface.",
      Icon: "person-running",
      Utility: ["Multimedia"],
      Status: "Disabled",
      Module: {
        "Animation Studio": "Design animations.",
        Animation: "Instructions for an animation.",
        Transition: "A transition animation.",
        "Animation Eventkit": "Triggers for starting and stopping animations.",
        "Animation Repository": "Preset animations for various uses.",
      },
    },
    Logical: {
      Utility: ["Automation"],
      Desc: "Implements logical rules for low-code programming.",
      Icon: "code-branch",
      Status: "Disabled",
      Module: {
        "R-Rule Typing": "Represents programming logic for running operations.",
        "Algorithm Builder":
          "Write your own programming algorithms without code.",
        Condition: "A condition that must be passed to run operations.",
        Evaluate: "Run an operation if the condition evaluates true.",
        Switch: "Run operations depending on the value of a condition.",
        // "Throw Subtype": "",
        Loop: "A loop that runs an operation repeatedly.",
        While: "A loop that repeats while condition is true.",
        For: "A loop that repeats for each data in a set.",
        // Each: "Repeat the loop while condition is true.",
        Algorithm: "",
      },
    },
    Maintenance: {
      Utility: ["Executive"],
      Desc: "Provides maintenance tools for a fast and bug-free platform.",
      Icon: "wrench",
      Status: "Disabled",
      Module: {
        "Diagnostic App": "Tools for diagnosing bugs and issues.",
        "Logging Card": "Displays a console log.",
        "Performance App": "Monitor and optimize the engine's performance.",
      },
    },
    Measurement: {
      Utility: ["Mathematic"],
      Desc: "Handles units of measurement.",
      Icon: "ruler-combined",
      Status: "Disabled",
      Module: {
        "Unit Calculator":
          "Calculate and convert between units of measurement.",
        Unit: "An amount of a unit of measurement.",
        Length: "A measure of length.",
        Mass: "A measure of weight.",
        Capacity: "A measure of liquid capacity.",
        Temperature: "A measure of temperature.",
        "Measurement Table": "Includes all standardized units of measurement.",
      },
    },
    Monetary: {
      Utility: ["Mathematic", "Knowledge"],
      Desc: "Handles money values and international currencies.",
      Icon: "money-bill-wave",
      Status: "Disabled",
      Module: {
        Currency: "An amount of money.",
        "Currency Converter": "Tool that converts between currencies.",
        "Currency Exchange":
          "Service that retrieves the current value of international currencies.",
      },
    },
    Namespace: true,
    Notetaking: {
      Utility: ["Knowledge", "Linguistic"],
      Desc: "Write notes and annotations for documents and other media.",
      Icon: "Note",
      Status: "Disabled",
      Module: {
        "Notebook App": "View your collection of notes.",
        Note: "A note for a piece of data.",
        Attachment: "A file attached as a note.",
        Annotation: "Tool for adding notes and annotations to documents.",
        "Atrament.js Plugin": "Library for drawing with the cursor.",
      },
    },
    Onboarding: {
      Utility: ["Knowledge"],
      Desc: "Teaches users how the Platform works with interactive tutorials.",
      Icon: "graduation-cap",
      Status: "Offline",
      Cover:
        "Learn how the Platform works with interactive tutorials!<ul><li>Caters to every skill level, no software engineering required</li><li>Tutorials are gamified with objectives and progression</li><li>Check out <a href='?Module=Documentation'>Documentation System</a> to view the Platform's official documentation</li></ul>",
      Module: {
        "Tutorial Catalog": "View all the tutorials you've acquired.",
        Tutorial: "A tutorial for the Platform.",
        Demo: "Environment for demoing features.",
        Completion: "Tool that tracks objectives to complete.",
        Objective: "An objective to complete",
        "Completion Card": "Card for displaying completion progress.",
        "Demo Repository": "Contains example data used in demos.",
      },
    },
    Organization: {
      Utility: ["Storage", "Browsing"],
      Desc: "Organizes sets of data with tagging and filtering.",
      Note: "Alt name: Cataloging",
      Icon: "shelves",
      Status: "Offline",
      Module: {
        Organizer: "Layout for presenting an organized set of data.",
        "Organizer Builder": "Set up an organization system for data.",
        Thumbnail: "",
        Tag: "",
        "Tagging Tool": "Assign tags to data.",
        "Filter Dataset": "To filter a set of data.",
        Sort: "To sort a set of data.",
      },
    },
    Portaling: {
      Utility: ["Storage", "Runtime"],
      Desc: "Links to locations on the internet, computer, and Platform.",
      Note: "Alt name: Referential, Hyperlinking, Linking, Gateway",
      Icon: "link",
      Status: "Disabled",
      Module: {
        "H-Hyperlink Typing": "Represents a link to a virtual location.",
        Link: "A link to a location.",
        "Web Link": "A link to a website.",
        Mark: "A bookmark or other marker inside data.",
        Navigate: "To navigate to a location.",
        "Bookmark Manager": "Manage your browser bookmarks.",
      },
    },
    Programming: true,
    Publishing: {
      Utility: ["Linguistic"],
      Desc: "Write and arrange documents for publishing.",
      Note: "Alt name: Writing",
      Icon: "typewriter",
      Status: "Disabled",
      Module: {
        Document: "A type of document.",
        "Text Document": "Represents a rich text document.",
        "Word Processor": "Editing tools for text documents.",
        Printer: "A printer that prints documents and graphics.",
      },
    },
    Reading: {
      Utility: ["Linguistic"],
      Desc: "Presents books and documents for reading.",
      Note: "Alt name: Literary",
      Icon: "book-open-cover",
      Status: "Disabled",
      Module: {
        Reader: "Reading app for books and documents.",
        Book: "A readable book.",
        Article: "A readable article.",
        Comic: "A readable comic book.",
        Audiobook: "A listenable audiobook.",
        Booklist: "A set of books to read.",
      },
    },
    Resource: {
      Utility: ["Storage"],
      Desc: "Supplies the Platform with resources for content.",
      Icon: "warehouse",
      Status: "Disabled",
      Module: {
        "A-Asset Typing": "Represents digital assets of content.",
        "Resource Viewer": "View all the resources hosted on the Platform.",
        Vault: "A collection of assets for Platform usage.",
      },
    },
    Revision: {
      Utility: ["Runtime", "Browsing"],
      Desc: "Tracks history and returns to an earlier state.",
      Icon: "clock-rotate-left",
      Status: "Disabled",
      Cover: "",
      Module: {
        History: "A record of data over time.",
        Timestamp: "A precise record of the date & time an event occurs.",
        Log: "A chronological record mapping timestamps to data.",
        "Navigation History": "View your browsing history and manage the data.",
        Back: "To go backwards in history.",
        Forward: "To go forwards in history.",
        "Clipboard History": "Controls undo/redo functionality.",
        "Backup History":
          "Records changes to files over time and restores them.",
        Version: "A version code for modules.",
      },
    },
    Scripting: {
      Utility: ["Automation"],
      Desc: "Edits and runs programming scripts.",
      Icon: "code",
      Status: "Disabled",
      Module: {
        "Script Editor": "Editor app for writing code.",
        Coding: "A block of programming code, via Textual System.",
        Script: "A script file containing programming code.",
        Userscript: "App for running JS-based userscripts.",
      },
    },
    Sheeting: {
      Utility: ["Interface"],
      Desc:
        "Implements the Platform's internal windowing system inside browser tabs.",
      Icon: "window",
      Status: "Disabled",
      Module: {
        "Sheet Editor": "Editor app for designing sheet interfaces.",
        Sheet: "Platform window made out of UI parts. (W-Window-Sheet)",
        Card: "Small-form sheet for popups and panels.",
        Bar: "Wide-form bar that attaches to the top or bottom of sheets.",
        Flap: "Tall-form sidebar that attaches to the sides of sheets.",
        "Title Bar": "Sheet window's title with min/max/close buttons.",
      },
    },
    Structuring: {
      Utility: ["Storage"],
      Desc: "Provides data structures for Type data.",
      Note: "Alt name: Modeling",
      Icon: "helmet-safety",
      Status: "Disabled",
      Module: {
        "S-Structure Typing": "Represents data structures.",
        List: "An ordered array of data values.",
        Set: "A unique set of data values.",
        Tree: "A branching data set.",
        Mapping: "A set of keys mapped to an array of values.",
        "'x2js' Plugin": "Converts between XML and JavaScript objects.",
        "Option Part": "Input part for selecting an option.",
      },
    },
    Stylesheet: {
      Utility: ["Aesthetic"],
      Desc: "Parses CSS style code and data.",
      Note: "Alt Name: Styling",
      Icon: "vest",
      Status: "Disabled",
      Module: {
        Style: "A CSS style property.",
        Styling: "A CSS style configuration.",
        "Style Picker": "Tool for picking a style configuration.",
        "Style Dropper": "Tool that samples style from a web document.",
        "Filter Style": "Applies a visual filter to graphics or elements.",
        Transform: "Applies a transformation to graphics or elements.",
        "Stylesheet Table": "List of CSS style properties.",
        "Styling Repository":
          "Provides style presets for a variety of use cases.",
      },
    },
    Targeting: true,
    Textual: true,
    Texturing: {
      Utility: ["Aesthetic"],
      Desc: "Provides the interface with patterns and textures.",
      Icon: "paint-roller",
      Status: "Disabled",
      Module: {
        "Texture Vault":
          "Your collection of textures, patterns, and backgrounds.",
        Pattern: "Represents a pattern for backgrounds or overlays.",
        Material: "Advanced texture based on properties of physical materials.",
        "Material Lab": "Developer tool for designing Materials.",
        "Texture Repository": "The built-in collection of textures",
      },
    },
    Timekeeping: {
      Utility: ["Knowledge"],
      Desc: "Trackes the time & date with calendars and clocks.",
      Note: "Alt name: Chronology",
      Icon: "clock-desk",
      Status: "Disabled",
      Module: {
        "D-Date Typing": "Represents a measure or point in time.",
        Time: "A time on the [clock]. (Hour, Minute, Second, Millisecond)",
        Date: "A date on the [calendar]. (Day, Month, Year)",
        Timestamp: "A timestamp code for a specific point in time.",
        Calendar: "Keep track of dates with calendars.",
        Clock: "Keep track of the time with international clocks.",
        Alarm: "When an alarm goes off.",
        Timer: "When a timer expires.",
        "Time Zone": "Tool that tracks and converts between time zones.",
      },
    },
    Trigonomic: {
      Utility: ["Mathematic"],
      Desc: "Plots coordinates within Euclidean space.",
      Note: "Alt name: Euclidean, Spatial, Graphing, Coordinate",
      Icon: "chart-scatter",
      Status: "Disabled",
      Module: {
        "X-Coordinate Typing": "Represents positions in space.",
        Point: "A point in Euclidean space. Alt: Coord",
        Anchor: "An anchor point in space.",
        Offset: "An offset amount for a point.",
        Angle: "A 360-degree angle number.",
        "Graphing Calculator": "Render points and lines on a graph.",
        Region: "A range between multiple coordinates.",
        // Shape: "A basic shape.",
        // "Shape Repository": "Provides basic SVG-based shapes.",
      },
    },
    Typography: true,
    Typology: {
      Utility: ["Executive", "Storage"],
      Desc: "Implements the Platform's data types.",
      Note:
        "Types are smart data types that automatically manage Platform data. Activate more Systems to collect new Types.",
      Icon: "cubes",
      Status: "Offline",
      Module: {
        "Type Collection":
          "View all the Types currently supported by the Platform.",
        Typing: "Organizes the data types into categories.",
      },
    },
    Vocabulary: {
      Utility: ["Linguistic"],
      Desc: "Identifies and analyzes words and languages.",
      Note: "Alt name: Lexical, Dialectic, Vocabulary",
      Icon: "language",
      Status: "Disabled",
      Module: {
        Dictionary: "App that defines words and retrieves info about them.",
        Translator: "Tool that detects languages and translates text.",
        Spellcheck:
          "Scans text for spelling and grammatical errors and corrects them. Alt: Correction",
        "Language Table": "List of international languages.",
        "Dictionary Service": "Retrieve language information from a service.",
        "Translation Service": "Translate text using a service.",
      },
    },
    Warehouse: {
      Utility: ["Storage"],
      Desc: "Stores data in SQL databases.",
      Note: "Alt name: ...",
      Icon: "",
      Status: "Disabled",
      Module: {
        Database: "",
      },
    },
    Websurfing: {
      Utility: ["Browsing"],
      Desc: "Integrates the Platform into web pages.",
      Note: "Alt name: Injection, Augmentation, Webhook",
      Icon: "globe",
      Status: "Standby",
      Module: {
        "Headsup Display":
          "Control the content you consume online with a HUD-style overlay.",
        Scanning: "Scan web pages and report back information.",
        Override: "Override and intercept unwanted functionality on web pages.",
        Injection:
          "Injects the Platform and manages the Shadow DOM in the webpage.",
        Searching:
          "Searches the web with search engine integration for text, images, and more.",
        "Website Profiler App":
          "Customize how the Platform integrates on a per-site basis.",
      },
    },
    Windowing: {
      Utility: ["Interface"],
      Desc: "Manages the browser engine's tabs and windows.",
      Icon: "browser",
      Status: "Disabled",
      Module: {
        "W-Window Typing": "Represents UI windows.",
        Window: "A window of the browser engine.",
        Tab: "A tab of a window.",
        Viewport: "Tool for window resizing and full screen.",
        Favicon: "Control the icons of tabs with badges and flags.",
        Session: "A browser session.",
        "'Favico.js' Plugin": "Vendor script for controlling tab icons.",
      },
    },
  },
  // SYSTEMS - WORK IN PROGRESS
  SystemWIP: {
    Attention: {
      Utility: ["Runtime", "Interface"],
      Desc: "Gets the user's attention with notifications.",
      Note: "Alt name: Alerting, Notifying",
      Icon: "square-exclamation",
      Status: "Disabled",
      Module: {
        Alert: "An alert popup shown to the user.",
        Notification: "A notification message shown to the user.",
        "Notification Center":
          "Customize and manage the Platform's notifications.",
        "Notification Card": "Card interface for a single notification.",
      },
    },
    Authorization: {
      Utility: ["Runtime"],
      Desc: "Logs into and integrates cloud accounts.",
      Icon: "cloud",
      Status: "Disabled",
      Module: {
        Cloud: "A cloud service.",
        Sync: "To synchronize local data with the cloud.",
      },
    },
    Bookmarking: {
      Utility: ["Browsing"],
      Desc: "Manages bookmarks and other saved locations.",
      Icon: "book-bookmark",
      Status: "Disabled",
      Module: {
        Mark: "A bookmark or other marker inside data.",
        "Bookmark Manager": "Manage your browser bookmarks.",
      },
    },
    Caching: {
      Utility: ["Browsing", "Storage"],
      Desc: "Saves browsing data to a cache.",
      Icon: "box-taped",
      Module: {
        "Cache Manager App": "Manage the Platform's cache.",
        "Cache Registry": "Contains all cached data.",
      },
    },
    Charting: {
      Utility: ["Mathematic", "Knowledge"],
      Desc: "Provides statistics charts for visualizing data.",
      Note: "Alt name: Statistical",
      Icon: "chart-pie",
      Status: "Disabled",
      Module: {
        Chart: "Part for visualizing numbers.",
        Dashboard: "Layout for organizing charts.",
        "D3.js Plugin": "Library for data visualization.",
      },
    },
    Collaboration: {
      Utility: ["Community"],
      Desc: "Connects to other Platforms for collaboration.",
      Icon: "users",
      Status: "Disabled",
      Module: {
        "User Type": "Represents a Platform user.",
      },
    },
    Datasource: {
      Utility: ["Storage"],
      Desc: "Retrieves data from data storage systems.",
      Note: "Alt name: Retrieval, Warehouse",
      Icon: "database",
      Module: {
        "Datasource Viewer": "View and manage integrated data sources.",
        "Storage Type": "A type of data storage.",
        "Local Storage": "",
      },
    },
    Detection: {
      Utility: ["Browsing", "Automation"],
      Desc: "Identifies content and data on webpages.",
      Note:
        "Once the type of data is identified, the Platform can manage it using Types.",
      Icon: "barcode-scan",
      Module: {
        "Content Detection Tool": "",
      },
    },
    Emailing: {
      Utility: ["Runtime", "Community"],
      Desc: "Sends and receives emails.",
      Icon: "inboxes",
      Module: {
        "Email Client App": "App for checking email.",
        "Email Service": "Connects to an email server.",
      },
    },
    Filtration: {
      Utility: ["Storage"],
      Desc: "Identifies and filters raw data for platform use.",
      Icon: "tank-water",
      Module: {
        "": "",
      },
    },
    Financial: {
      Utility: ["Knowledge", "Mathematic"],
      Desc: "",
      Note: "Alt name: Economic, Capitalist",
      Icon: "money-bill-wave",
      Module: {
        "Stocks App": "Check the current stock prices.",
        "Stocks Service": "Retrieve stock data from an API.",
        "'Stock Numbers' Part":
          "Displays a number with positive/negative changes.",
      },
    },
    Gaming: {
      Utility: ["Browsing"],
      Desc: "Implements a simple game engine for HTML5-based games.",
      Icon: "gamepad-modern",
      Module: {
        "Gaming Center App": "",
        "Game Table": "Rules and assets for games.",
      },
    },
    Identification: {
      Utility: ["Storage"],
      Desc: "Searches for data within documents and media.",
      Icon: "file-magnifying-glass",
      Status: "Disabled",
      Module: {
        "Finding Tool": "Find and replace.",
        "Finding Card": "Find and replace in card form.",
        "Finding Bar": "Find and replace in bar form.",
      },
    },
    Personalization: {
      Utility: ["Community"],
      Desc: "Personalizes the platform based on user-provided information.",
      Icon: "id-card",
      Status: "Disabled",
      Module: {
        "Member Profile":
          "Enter your personal info to personalize your Platform and get it certified.",
        User: "A user of the platform or internet.",
        Member: "A Platform user.",
      },
    },
    Progression: {
      Utility: ["Executive"],
      Desc: "Gamifies the Platform with user progression.",
      Icon: "medal",
      Status: "Disabled",
      Module: {
        "Access Division":
          "Divides the Platform into four tiers of progression.",
      },
    },
    Screenspace: {
      Utility: ["Interface"],
      Desc: "Manages screen space and interface layers.",
      Note: "Alt name: Viewport. Combine with Windowing or Sheeting?",
      Icon: "",
      Status: "Disabled",
      Module: {
        Plane:
          "An interface layer contained in a window's page. (Alt name: Overlay?)",
        "Full Screen": "Tool to enter and exit full screen.",
        Viewport: "Triggers for window resizing and full screen.",
      },
    },
    Security: {
      Utility: ["Runtime"],
      Desc: "Secures your Platform and personal data.",
      Icon: "shield",
      Status: "Disabled",
      Module: {
        "": "",
      },
    },
    Statistic: {
      Utility: ["Mathematic", "Knowledge"],
      Desc: "Presents and crunches statistical data.",
      Note: "Overlaps with Charting System?",
      Icon: "",
      Status: "Disabled",
      Module: {
        "": "",
      },
    },
    Versioning: {
      Utility: ["Executive"],
      Desc: "Handles module and software versions.",
      Note: "Subsystem of Revision System?",
      Icon: "",
      Status: "Disabled",
      Module: {
        "Version Code": "A version number.",
      },
    },
    Weather: {
      Utility: ["Knowledge"],
      Desc: "Provides up-to-date weather data.",
      Icon: "sun-cloud",
      Status: "Disabled",
      Module: {
        "Weather App": "Check the weather.",
        "Weather Card": "Display the weather on a small-form card.",
        "Weather Service": "Retrieve weather data from an API.",
        "Weather Table": "Types of weather supported by the System.",
      },
    },
    Webpage: {
      Utility: ["Browsing"],
      Desc: "Controls web documents.",
      Note: "Alt name: Webdocument",
      Icon: "",
      Status: "Disabled",
      Module: {
        Element: "An HTML element.",
        Dom: "A web document's DOM.",
        Page: "The page of a browser tab or sheet window.",
        Plane: "An interface layer contained in a window's page.",
      },
    },
  },

  // ROADMAP - Projects for the future that are non-essential now //
  SystemRoadmap: {
    Administration: {
      Utility: ["Community", "Executive", "Runtime"],
      Desc: "Governs access to the platform for multiple users.",
      Note: "Alt name: Governance",
      Icon: "",
      Module: {
        "Admin User": "An administrator granted unrestricted platform access.",
        "Guest User": "A guest user granted limited platform access.",
      },
    },
    Cartography: {
      Utility: ["Knowledge"],
      Desc: "Implements political borders and regions in maps.",
      Icon: "flag-usa",
      Module: {
        "World Map": "Interactive map of the world.",
        Geofence: "Interactive map with political borders.",
        "Country Map Table": "",
      },
    },
    Intelligence: {
      Utility: ["Automation"],
      Desc: "Integrates artificial intelligence into the Platform.",
      Icon: "user-robot",
      Module: {
        "": "",
      },
    },
    Interpretation: {
      Utility: ["Linguistic", "Automation"],
      Desc: "Interprets the meaning of natural language with lexical analysis.",
      Icon: "",
      Module: {
        "": "",
      },
    },
    Smartphone: {
      Utility: ["Runtime"],
      Desc: "Integrates mobile devices into the Platform.",
      Note: "Alt Names: Mobile, Handheld",
      Icon: "mobile",
      Module: {
        "Mobile Service": "Connects to a smartphone device.",
      },
    },
  },
};
