/*
ⸯ   				            ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█       🙢  PAGE META  🙠  	    █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓				               ╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯
▓ ❖ INDEX:
▓   ◇ constants
▓       ⬥ metaIndex
▓   ◇ meta
▓   ◇ parseNode()
▓ ❖ NOTES:
▓   ◇ COMPLETE LIST: https://gist.github.com/lancejpollard/1978404
▓ ❖ TODO:
▓   ◇ Write edit() functions for each item
▓   ◇ Count # of elements in document properties: embeds (<object>), forms, images, links, plugins (<embed>), scripts,
▓   ◇ Add section: navigator (https://developer.mozilla.org/en-US/docs/Web/API/Navigator)
▓══─────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══─────────────══█  */

export var con = {
  metaIndex: {
    /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ APPEARANCE ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                                                                                      */
    favicon: {
      title: "Favicon",
      sect: "appearance",
      desc: "Icon of the page or site.",
      value: function() {
        // ❖ Get nodes
        var $NODES = document.querySelectorAll(
          "link[rel='shortcut icon' i], link[rel='icon shortcut' i], link[rel='icon' i]"
        );
        4;
        if (!$NODES.length) return undefined; // abort if no nodes found
        var nodeList = {
          attrNames: ["Image", "Source", "Sizes"], // names of the data fields to display
          values: [] // where the data values of each node are stored
        };
        // ❖ Loop through all the nodes and store the data
        $NODES.forEach(function(N) {
          let url = N.href;
          nodeList.values.push({
            code: N.outerHTML,
            val: [
              `<img src="${url}">`,
              `<a href="${url}" target="_blank">${url}</a>`,
              N.sizes
            ]
          });
        });
        return nodeList;
      },
      edit: function(val) {
        var $NODES = document.querySelectorAll(
          "link[rel='shortcut icon' i], link[rel='icon shortcut' i], link[rel='icon' i]"
        );
        $NODES.forEach(N => (N.href = val));
      }
    },
    /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ DOCUMENT ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                                                                                      */
    doctype: {
      title: "Doctype",
      sect: "document",
      desc: "The document's format type.",
      editable: false,
      value: function() {
        return {
          code: "document.doctype",
          val: new XMLSerializer()
            .serializeToString(document.doctype)
            .replace(/</g, "&lt;")
        };
      }
    },
    title: {
      title: "Title",
      sect: "document",
      desc: "Title of the window.",
      value: function() {
        return {
          code: "document.title",
          val: document.title || decodeURI(_.last(window.location.pathname.split("/"))) // prettier-ignore
        };
      },
      edit: val => (document.title = val)
    },
    charset: {
      title: "Charset",
      sect: "document",
      desc: "The character encoding of the document.",
      advanced: true,
      editable: false,
      value: function() {
        return {
          code: "document.charset",
          val: document.charset
        };
      }
    },
    contentType: {
      title: "Content Type",
      sect: "document",
      desc: "MIME type the document is rendered as.",
      value: function() {
        return {
          code: "document.contentType",
          val: document.contentType
        };
      }
    },
    designMode: {
      title: "Design Mode",
      sect: "document",
      desc: "When the document is in design mode its contents can be edited.",
      value: function() {
        return {
          code: "document.designMode",
          val: document.designMode
        };
      }
    },
    dir: {
      title: "Text Direction",
      sect: "document",
      desc: "Directionality of the text.",
      value: function() {
        return {
          code: "document.dir",
          val: document.dir
        };
      }
    },
    fullscreenEnabled: {
      title: "Full Screen Enabled",
      sect: "document",
      desc: "Whether full screen mode is available.",
      value: function() {
        return {
          code: "document.fullscreenEnabled",
          val: document.fullscreenEnabled
        };
      }
    },
    lastModified: {
      title: "Last Modified",
      sect: "document",
      desc: "Date and time on which the document was last modified.",
      value: function() {
        return {
          code: "document.lastModified",
          val: document.lastModified
        };
      }
    },
    readyState: {
      title: "Ready State",
      sect: "document",
      desc: "The loading state of the document.",
      value: function() {
        return {
          code: "document.readyState",
          val: document.readyState
        };
      }
    },
    referrer: {
      title: "Referrer",
      sect: "document",
      desc: "The URI of the page that linked to this page.",
      value: function() {
        return {
          code: "document.referrer",
          val: document.referrer
        };
      }
    },

    /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ WINDOW ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                                                                                      */
    devicePixelRatio: {
      title: "Device Pixel Ratio",
      sect: "window",
      desc: "Ratio of the screen resolution in physical pixels to CSS pixels.",
      value: function() {
        return {
          code: "window.devicePixelRatio",
          val: window.devicePixelRatio
        };
      },
      edit: val => (window.devicePixelRatio = val)
    },
    isSecureContext: {
      title: "Secure Context",
      sect: "window",
      desc:
        "If the content is believed to have been delivered securely over HTTPS/TLS, preventing man-in-the-middle attacks.",
      value: function() {
        return {
          code: "window.isSecureContext",
          val: window.isSecureContext
        };
      },
      edit: val => (window.isSecureContext = val)
    },
    name: {
      title: "Window Name",
      sect: "window",
      desc:
        "The name of the window, different from the title and used internally.",
      value: function() {
        return {
          code: "window.name",
          val: window.name
        };
      },
      edit: val => (window.name = val)
    },
    screenOrientationType: {
      title: "Screen Orientation",
      sect: "window",
      desc: "The page's current orientation type.",
      value: function() {
        return {
          code: "window.screen.orientation.type",
          val: window.screen.orientation.type
        };
      }
    },
    screenOrientationAngle: {
      title: "Screen Orientation Angle",
      sect: "window",
      desc: "The page's current orientation angle.",
      value: function() {
        return {
          code: "window.screen.orientation.angle",
          val: window.screen.orientation.angle
        };
      }
    },
    /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ INFO ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                                                                                      */
    description: {
      title: "Description",
      sect: "info",
      value: function() {
        return parseNode("meta[name='description' i]", "content");
      }
    },
    keywords: {
      title: "Keywords",
      sect: "info",
      desc: "", //TODO
      value: function() {
        return parseNode("meta[name='keywords' i]", "content");
      }
    },
    author: {
      title: "Author",
      sect: "info",
      desc: "Author of the page, usually meant for search engines.",
      value: function() {
        return parseNode("meta[name='author' i]", "content");
      }
    },
    "application-name": {
      title: "App Name",
      sect: "info",
      desc: "Name of the webapp the page is displaying.",
      value: function() {
        return parseNode("meta[name='application-name' i]", "content");
      }
    },
    generator: {
      title: "Generator",
      sect: "info",
      desc: "The software used to generate the page.",
      advanced: true,
      value: function() {
        return parseNode("meta[name='generator' i]", "content");
      }
    },

    /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ PLATFORM-SPECIFIC ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                                                                                      */
    "apple-mobile-web-app-title": {
      title: "iOS Webapp Title",
      sect: "platformDependant",
      desc: "Name of the webapp the page is displaying.",
      value: function() {
        return parseNode(
          "meta[name='apple-mobile-web-app-title' i]",
          "content"
        );
      }
    },
    "apple-touch-icon": {
      title: "iOS Touch Icon",
      sect: "platformDependant",
      desc:
        "Used by iOS as the home screen icon when saving the page as a Web Clip.",
      advanced: true,
      value: function() {
        // ❖ Get nodes
        var $NODES = document.querySelectorAll(
          "link[rel='apple-touch-icon' i]"
        );
        if (!$NODES.length) return undefined; // abort if no nodes found
        var nodeList = {
          attrNames: ["Image", "Source", "Sizes"], // names of the data fields to display
          values: [] // where the data values of each node are stored
        };
        // ❖ Loop through all the nodes and store the data
        $NODES.forEach(function(N) {
          let url = N.href;
          nodeList.values.push({
            code: N.outerHTML,
            val: [
              `<img src="${url}">`,
              `<a href="${url}" target="_blank">${url}</a>`,
              N.sizes
            ]
          });
        });
        return nodeList;
      }
    },
    "apple-startup-image": {
      title: "iOS Startup Image",
      sect: "platformDependant",
      desc:
        "Used by iOS as the startup icon when saving the page as a Web Clip.",
      advanced: true,
      value: function() {
        return parseMultiNodes("link[rel='apple-touch-startup-image' i]", [
          "Image",
          "Source",
          "Media"
        ]);
        // ❖ Get nodes
        var $NODES = document.querySelectorAll(
          "link[rel='apple-touch-startup-image' i]"
        );
        if (!$NODES.length) return undefined; // abort if no nodes found
        var nodeList = {
          attrNames: ["Image", "Source", "Media"], // names of the data fields to display
          values: [] // where the data values of each node are stored
        };
        // ❖ Loop through all the nodes and store the data
        $NODES.forEach(function(N) {
          let url = N.href;
          nodeList.values.push({
            code: N.outerHTML,
            val: [
              `<img src="${url}">`,
              `<a href="${url}" target="_blank">${url}</a>`,
              N.media
            ]
          });
        });
        return nodeList;
      }
    },
    "apple-mobile-web-app-capable": {
      title: "iOS Webapp Capable",
      sect: "platformDependant",
      desc: "Whether the iOS web application runs in full-screen mode.",
      advanced: true,
      value: function() {
        return parseNode(
          "meta[name='apple-mobile-web-app-capable' i]",
          "content"
        );
      }
    },
    "apple-mobile-web-app-status-bar-style": {
      title: "iOS Web App Status Bar Color",
      sect: "platformDependant",
      desc: "Sets the style of the status bar for an iOS web application.",
      advanced: true,
      value: function() {
        return parseNode(
          "meta[name='apple-mobile-web-app-status-bar-style' i]",
          "content",
          "color"
        );
      }
    },
    "format-detection": {
      title: "Format Detection",
      sect: "platformDependant",
      desc:
        "Enables or disables automatic detection of possible phone numbers in a webpage in Safari on iOS.",
      advanced: true,
      value: function() {
        return parseNode("meta[name='format-detection' i]", "content");
      }
    },
    "msapplication-TileColor": {
      title: "MS Tile Color",
      sect: "platformDependant",
      desc: "...",
      advanced: true,
      value: function() {
        return parseNode(
          "meta[name='msapplication-TileColor' i]",
          "content",
          "color"
        );
      }
    },
    "msapplication-TileImage": {
      title: "MS Tile Image",
      sect: "platformDependant",
      desc: "...",
      advanced: true,
      value: function() {
        return parseNode("meta[name='msapplication-TileImage' i]", "content");
      }
    },
    /*

█
▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ TECHNICAL ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                                                                                      */
    viewport: {
      title: "Viewport",
      sect: "technical",
      desc:
        "Describes how the layout and content adapts to the mobile viewport.",
      advanced: true,
      editable: false,
      value: function() {
        return parseNode("meta[name='viewport' i]", "content");
      }
    },
    webCrawler: {
      title: "Web Crawler",
      sect: "technical",
      desc: "Instructs search engine crawlers on what data to index.",
      advanced: true,
      editable: false,
      value: function() {
        return parseNode("meta[name='robots' i]", "content");
      }
    },
    base: {
      title: "Base URL",
      sect: "technical",
      desc: "Designates the base URL for referencing external files.",
      advanced: true,
      editable: false,
      value: function() {
        return parseNode("base", "href");
      }
    }
  }
};
/*
█
▓═─────══─────═🙦   parseNode()   🙤═─────═❖
▓ ⮚ Parse a single metadata node and return formatted for the utility.                                                                          */
function parseNode(selector, attr, type) {
  var $NODE = document.querySelector(selector);
  if (!$NODE) return undefined; // abort if no nodes found

  // if value is a color, insert a color example
  var tag = $NODE.innerHTML;
  if (type == "color") tag = `${tag} <span style="background-color:${tag}">`;

  return {
    val: $NODE.getAttribute(attr),
    code: $NODE.innerHTML
  };
}

/*
█
▓═─────══─────═🙦   parseMultiNodes()   🙤═─────═❖
▓ ⮚                                                                             */
function parseMultiNodes(selector, attrs, type) {
  // ❖ Get nodes
  var $NODES = document.querySelectorAll(selector);
  if (!$NODES.length) return undefined; // abort if no nodes found
  var nodeList = {
    attrNames: attrs, // names of the data fields to display
    values: [] // where the data values of each node are stored
  };
  // ❖ Loop through all the nodes and store the data
  $NODES.forEach(function(N) {
    let url = N.href;
    nodeList.values.push({
      code: N.outerHTML,
      val: [
        `<img src="${url}">`,
        `<a href="${url}" target="_blank">${url}</a>`,
        N.media
      ]
    });
  });
  //TODO: Make it return the multi nodes instead of this single code
  var $NODE = document.querySelector(selector),
    tag = $NODE.innerHTML;
  // if value is a color, insert a color example
  if (type == "color") tag = `${tag} <span style="background-color:${tag}">`;
  return {
    val: $NODE.getAttribute(attr),
    code: $NODE.innerHTML
  };
}
export var meta = {
  info: {
    howItWorks:
      "Page Metadata extracts data from various parts of the page and organizes it into a table."
  },
  cmd: {
    Get_Favicon_URL: {
      title: "Get Favicon URL",
      desc: ""
    }
  },
  var: {
    Get_Metadata: {
      title: "Get Metadata",
      desc: "Returns metadata of a specific item.",
      parameters: [
        {
          title: "id",
          desc: "ID of the metadata item",
          type: "dropdown",
          vals: [] //TODO Return list of metadata IDs
        }
      ]
    }
  }
};
