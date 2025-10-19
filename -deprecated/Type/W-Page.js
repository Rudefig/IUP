this.Action = {
  /*
█
▓█═─────══─────═🙦   Navigate_History   🙤═─────══─────═❖
▓ Navigate through the page's history.                                                                  */
  Navigate_History: function(action) {
    switch (action.toLowerCase()) {
      case "back": window.history.back(); break; // prettier-ignore
      case "forward": window.history.forward(); break; // prettier-ignore
      case "first": window.history.go(-window.history.length); break; // prettier-ignore
      default: window.history.go(go); break; // prettier-ignore
    }
  },
  /*
█
▓█═─────══─────═🙦   Navigate_URL   🙤═─────══─────═❖
▓ Navigate the page to a given URL.                                                                  */
  Navigate_URL: function(url, navType = "href") {
    switch (navType.toLowerCase()) {
      case "href":
        window.location.href = url;
        break;
      case "replace":
        window.location.replace = url;
        break;
      case "assign":
        window.location.assign(url);
        break;
    }
  },
  /*
█
▓█═─────══─────═🙦   Open_Window   🙤═─────══─────═❖
▓ Open a new browser window.                                                                  */
  Open_Window: function(url, features) {
    var featuresTemplate = {
      menuBar: true,
      toolbar: true,
      location: true,
      statusbar: true,
      left: null,
      top: null,
      width: null,
      height: null,
      outerWidth: null,
      outerHeight: null,
      centerscreen: null
    };
    window.open(url, features);
  }
};
