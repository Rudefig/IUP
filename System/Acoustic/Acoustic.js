export const Metadata = {
  Keyname: "Acoustic",
  Title: "Acoustic System",
  Desc: "Handles music, sound effects, and other types of audio.",
  Icon: "fa-guitar",
  Utility: ["Multimedia"],
  Status: "Offline",
  Module: {
    "Audio Editor": "Editing tools for audio files.",
    "Audio Type": "An audio file.",
    "Volume Tool": "Control the volume of media.",
    "Music Library": "Organizes your music collection.",
    "Music Audio Subtype": "Audio of a piece of music.",
    "Sound Audio Subtype": "Audio of a sound effect.",
    "Music Repository": "Collection of public domain music.",
    "Sound Effect Repository": "Collection of generic sound effects.",
  },
};

// export const Layout = {
//   Cover: function() {
//     return "Activate this System to animate your Platform!<ul><li></li></ul>";
//   },
// };

export const Config = {
  Title: "Acoustic Config",
  Keyname: "Acoustic",
  SettingList: {
    Master_Volume: {
      Title: "Master volume",
      Desc: "Volume level of all audio.",
      Type: "Number",
      // Part: "Slider",
      Default: 100,
      Unit: "%",
      Min: 0,
      Max: 100,
    },
    Music_Volume: {
      Title: "Music volume",
      Desc: "Volume level of music.",
      Type: "Number",
      // Part: "Slider",
      Default: 100,
      Unit: "%",
      Min: 0,
      Max: 100,
    },
    Sound_Volume: {
      Title: "Sound volume",
      Desc: "Volume level of sound effects.",
      Type: "Number",
      // Part: "Slider",
      Default: 100,
      Unit: "%",
      Min: 0,
      Max: 100,
    },
  },
};
