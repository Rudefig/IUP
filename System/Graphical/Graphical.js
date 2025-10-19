export const Metadata = {
  Keyname: "Graphical",
  Title: "Graphical System",
  Desc: "Renderes graphics in raster or vector format.",
  Note: "Alt: Rendering, Imaging",
  Icon: "image-polaroid",
  Utility: ["Multimedia"],
  Status: "Offline",
  Module: {
    "G-Graphic Typing": "Represents different graphical formats.",
    Image: "A graphical image.",
    Raster: "A pixel-based raster image.",
    Vector: "A point-based vector image.",
    Canvas: "Canvas-based interface for drawing 2D graphics.",
    SVG: "SVG-based interface for drawing 2D graphics.",
    Layering: "Tool for layering graphics.",
    "Graphics Studio": "Professional design tools for editing image graphics.",
    "Media Viewer": "View media in mixed formats.",
    "CamanJS Plugin": "Library for manipulating the HTML5 Canvas.",
    "glfx.js Plugin": "Image effects library.",
  },
};

export const Action = {
  /*
█
▓█═─────══─────═🙦   Filter_Media   🙤═─────══─────═❖
▓ Apply the filter {filter} with value {val} on target {T}.                                                                            */
  Filter_Media: function(T, val, filter) {
    if (!T) throw new Error("IUP:Filter_Media wasn't given a target."); // prettier-ignore
    // TODO: Support multiple filters on one target
    // TODO: Detect and include filters already on target
    if (filter == "clear") return LayoutLib.cmd.Node_Style({ target: T, ID: "filter", action: "delete" }); // prettier-ignore
    const baseWidth = 1280,
      filterClass = self.con.filterClass,
      scaleBlur = self.settings.scaleBlur.val,
      existingData = LayoutLib.var.css_prop_to_data(T, "filter");

    [val] = LayoutLib.var.parse_css_val(val);

    /*
█ ❖ (If blurring a video) scale blur on full screen                                                                   */
    if (T.tagName == "VIDEO" && filter == "blur" && scaleBlur) {
      var saveVal = val;
      if (T.clientWidth > T.clientHeight) {
        val *= T.clientWidth / baseWidth;
      } else {
        val *= T.clientHeight / baseWidth;
      }
      T.onwebkitfullscreenchange = function() {
        Action.Filter_Media(T, saveVal, "blur");
      };
    }
    /*
█ ❖ Generate CSS filter value                                                                   */
    //TODO: Detect unit type in {val}, check that it's listed in {filterDataTypes}.
    const filterDataTypes = {
      blur: "px",
      brightness: "%",
      contrast: "%",
      grayscale: "%",
      "hue-rotate": "deg",
      invert: "%",
      opacity: "%",
      saturate: "%",
      sepia: "%",
    };
    existingData[filter] = [val, filterDataTypes[filter]];
    newData = LayoutLib.var.css_data_to_prop(existingData);
    LayoutLib.cmd.Node_Style({ target: T, ID: "filter", css: newData });

    if (typeof T === "string") {
      document.querySelector(T).classList.add(filterClass);
    } else if (_.isElement(T)) T.classList.add(filterClass);
    else console.error("IUP Filter_Media: Invalid target =", T);
  },
};

export const Context = {
  Selector: "img, video",
  Item: [
    {
      ID: "fullSize",
      Title: "Full size",
      Desc: "Set the target media's size to 100%.",
      hidden: T => T.naturalWidth == T.clientWidth && T.naturalHeight == T.clientHeight, // prettier-ignore
      onUse(T) {
        const attrSaved = "iup-data-savedStyle";
        if (T.hasAttribute(attrSaved)) {
          T.setAttribute("style", T.getAttribute(attrSaved));
          T.removeAttribute(attrSaved);
        } else {
          const originalStyle = T.getAttribute("style"),
            props = ["width", "height", "min-width", "min-height", "max-width", "max-height", "transform"], // prettier-ignore
            statement = ": initial !important;";
          T.setAttribute(attrSaved, originalStyle);
          T.setAttribute("style", props.join(statement) + statement);
        }
      },
    },
    {
      ID: "filter",
      Title: "Filter Media",
      Icon: "",
      Item: [
        {
          ID: "blur",
          Title: "Blur",
          Icon: "",
          Part: {
            Type: "Number",
            Default: "0px",
            onEdit(val, e, T) {
              Action.Filter_Media(T, val, "blur");
            },
          },
        },
        {
          Title: "Brightness",
          Icon: "",
          Part: {
            Type: "Number",
            Default: "100%",
            Max: 250,
            Step: 5,
            onEdit(val, e, T) {
              Action.Filter_Media(T, val, "brightness");
            },
          },
        },
        {
          Title: "Contrast",
          Icon: "",
          Part: {
            Type: "Number",
            Default: "100%",
            Max: 250,
            Step: 5,
            onEdit(val, e, T) {
              Action.Filter_Media(T, val, "contrast");
            },
          },
        },
        {
          Title: "Saturation",
          Icon: "",
          Part: {
            Type: "Number",
            Default: "100%",
            Max: 250,
            Step: 5,
            onEdit(val, e, T) {
              Action.Filter_Media(T, val, "saturate");
            },
          },
        },
        {
          ID: "clearAll",
          Title: "Clear all",
          Icon: "",
          onUse(T) {
            Action.Filter_Media(T, null, "clear");
          },
        },
      ],
    },
    {
      ID: "transform",
      Title: "Transform Media",
      Icon: "",
      Item: [
        {
          Title: "Rotate",
          Icon: "",
          Part: {
            Type: "Number",
            Default: "180°",
            Max: 360,
            Step: 45,
            onEdit(val, e, target) {
              ElementLib.cmd.Rotate_Element({ target, val });
            },
          },
        },
        {
          Title: "Scale",
          Icon: "",
          Part: {
            Type: "Number",
            Default: 1,
            Max: 10,
            Step: 0.05,
            onEdit(val, e, target) {
              _B(target);
              const css = LayoutLib.var.css_prop_to_data(target, "transform"); // prettier-ignore
              css.scale = [val];
              delete css.matrix;
              LayoutLib.cmd.Node_Style({
                target,
                ID: "transform-media",
                css: LayoutLib.var.css_data_to_prop(css),
              });
            },
          },
        },
        {
          ID: "rotate180",
          Title: "Rotate 180°",
          onUse(T) {
            T.style.transform = `rotate(180deg)`;
          },
        },
        {
          ID: "rotateScaleDown",
          Title: "Rotate 90° & scale down",
          onUse(T) {
            T.style.transform = `rotate(90deg) scale(.6)`;
            // var data = LayoutLib.var.css_prop_to_data(T, "transform");
            // data["rotate"] = [90, "deg"];
            // data["scale"] = [0.6, ""];
            // LayoutLib.var.css_data_to_prop(data, T);
          },
        },
        {
          ID: "rotateScaleUp",
          Title: "Rotate 90° & scale up",
          onUse(T) {
            T.style.transform = `rotate(90deg) scale(1.6)`;
            // var data = LayoutLib.var.css_prop_to_data(T, "filter");
            // data["rotate"] = [90, "deg"];
            // data["scale"] = [1.6, ""];
            // LayoutLib.var.css_data_to_prop(data, T);
          },
        },
        {
          ID: "clearAll",
          Title: "Clear all",
          Icon: "",
          onUse(target) {
            LayoutLib.cmd.Node_Style({ target, ID: "transform-media", action: "delete" }); // prettier-ignore
          },
        },
      ],
    },
  ],
};
