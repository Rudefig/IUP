const TypeIndex = {
  B: {
    name: "Bool",
    utility: "Executive",
    description: "True or False",
    disabled: true,
    type: {
      "B-Binary Type": ".",
      "B-Trinary Type": ".",
    },
    subtype: {},
    structure: {
      "S-Radio": "",
      "S-Checklist": "",
    },
    primitive: "Boolean()",
  },
  C: {
    name: "Color",
    utility: "Aesthetic",
    description: "Coloring Data",
    disabled: true,
    type: {
      "Binary Type": ".",
    },
    subtype: {},
    structure: {
      "S-Gradient": "",
    },
  },
  D: {
    name: "Date",
    utility: "Knowledge",
    description: "Time & Date",
    disabled: true,
    type: {
      "D-Date Type": "Represents a date on the calendar.",
      "D-Time Type": "Represents a date on the calendar.",
    },
    subtype: {},
    structure: {
      "D-Date Range": "Represents a range between two dates.",
      "D-Time Range": "Represents a range between two times.",
      primitive: "Date()",
    },
  },
  F: {
    name: "File",
    utility: "Storage",
    description: "Resource Files",
    disabled: true,
    type: {
      "F-File Type": ".",
    },
    subtype: {},
    structure: {
      "F-Folder": "Represents a set or tree of files.",
    },
    primitive: "File()",
  },
  G: {
    name: "Graphic",
    utility: "Multimedia",
    description: "Graphical Formats",
    disabled: true,
    type: {
      "M-Image Type": "Represents an image.",
      "Raster Graphic": "Represents a pixel-based raster image.",
      "Vector Graphic": "Represents a point-based vector image.",
    },
    subtype: { "Texture Graphic": ".", "Shape Graphic": "." },
    primitive: ["<canvas>", "<svg>"],
  },
  M: {
    name: "Media",
    utility: "Multimedia",
    description: "Media Assets",
    disabled: true,
    type: {
      "M-Image Type": "Represents an image.",
      "M-Video Type": "Represents a pixel-based raster image.",
      "M-Audio Type": "Represents a point-based vector image.",
    },
    subtype: { "Texture Graphic": ".", "Shape Graphic": "." },
    structure: {
      "M-Gallery": "Represents a gallery of images or videos.",
      "M-Playlist": "Represents a playlist of video or audio.",
    },
    primitive: ["<image>", "<video>", "<audio>"],
  },
  N: {
    name: "Number",
    utility: "Mathematics",
    description: "Graphical Formats",
    disabled: true,
    type: {
      "N-Number Type": "Represents an image.",
      "N-Integer": "Represents an integer.",
      "N-Float": "",
      "N-Unit": "",
    },
    subtype: {
      "N-Angle": ".",
      "N-Percent": ".",
      "N-Currency": ".",
      "N-Byte": ".",
    },
    structure: {
      "N-Range": "Represents a range between two numbers.",
    },
  },
  O: {
    name: "Order",
    utility: "Automation",
    description: "Execution Syntax",
    disabled: true,
    type: {
      "O-Action Type": "",
      "O-Process": "",
      "O-Query": "",
      "O-Trigger": "",
    },
    subtype: { "Texture Graphic": ".", "Shape Graphic": "." },
    structure: {
      "O-Procedure": "",
      "O-Macro": "",
      "O-Algorithm": "",
    },
  },
  P: {
    name: "Part",
    utility: "Interface",
    description: "Component Parts",
    disabled: true,
    type: {
      "Block Type": ".",
      "Item Type": ".",
      "Frame Type": ".",
    },
    subtype: {},
    structure: {
      "P-Layout": "",
    },
    primitive: "Element()",
  },
  W: {
    name: "Window",
    utility: "Interface",
    description: "UI Windowing",
    disabled: true,
    type: {
      "W-Window Type": ".",
      "W-Page Type": ".",
      "W-Sheet Type": ".",
      "W-Plane Type": ".",
    },
    subtype: {},
    structure: {
      "P-Layout": "",
    },
    primitive: ["Window", "Document()"],
  },
  X: {
    name: "Point",
    utility: "Mathematics",
    description: "Spatial Positioning",
    disabled: true,
    type: {
      "X-Point Type": ".",
      "X-Align Type": ".",
    },
    subtype: {},
    structure: {
      "P-Region": "Represents a range between two points.",
    },
  },
};
