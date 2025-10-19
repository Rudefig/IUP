export const Key = "Cuemark";
export const Parent = "Tool";
export const Metadata = {
  Title: "Cuemark Tool",
  Desc: "Mark and call cue points on HTML5 videos.",
  System: "Audiovisual",
};
/*


ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  CUEMARK TOOL  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ COMMANDS ❖
▓   ◇ Set_Cue
▓   ◇ Call_Cue
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
export const Constant = {
  totalCues: 9, // TODO Move to setting
};
export const Action = {
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Set_Cue() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓       Set or call cue points on the video which change the current time.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓   {V} = video
▓   {action} =
▓    ◇ [Cue, Time]: Set cue {Cue} to time {Time}.
▓    ◇ [Cue]:       Call cue {Cue} and change video time.
▓    ◇ "init":      Initialize the keybinds.
▓    ◇ "defaults":  Initialize with default cues set.
▓    ◇ "clear":     Clear all cues from the video.
▓  //TODO Add event listener if video changes source/duration to clear/recalculate cues
▓  //TODO Convert to {arg} system
▓                                                                                  */
  Set_Cue: function(Video, action) {
    if (!Video) throw new Error("IUP:Set_Cue wasn't provided a video.");
    if (Video && Video.tagName != "VIDEO")
      throw new Error("IUP:Set_Cue wasn't provided a valid video.");
    const totalCues = Constant.totalCues, // TODO Move to setting
      playData = Video.iuData(Constant.pre) || {},
      startTime = playData.start || 0,
      endTime = playData.end || V.duration,
      duration = endTime - startTime;
    var CueData = Video.iuData("cue") || {};

    // ❖ Init Cues - Register cues w/ blank data
    if (action == "init") {
      CueData = {};
      registerCue();
      // ❖ Init Cues w/ Defaults - Register default cues, spaced evenly along vid time
    } else if (action == "defaults") {
      CueData = { usingDefault: true, 1: startTime };
      for (var i = 2; i <= totalCues; i++) {
        CueData[i] = duration * ((i - 1) / totalCues) + startTime;
      }
      registerCue();
      // ❖ Call Cue - Set video time to cue # {action}.
    } else if (CueData[action]) {
      Video.currentTime = CueData[action];
      // ❖ Clear All Cues
    } else if (action == "clear") {
      Video.removeData("cue");
      if (Variable.keybinds) Variable.keybinds.destroy();
      // ❖ Set Cue Point
    } else if (typeof action === "object") {
      const [num, setTime] = action;
      registerCue(num, setTime);

      // UILib.cmd.UI_Notification({
      //   ID: "VideoController",
      //   subType: "infobox",
      //   message: `CUE ${num} SET`, // `CUE ${N} = ${timeStr}`,
      //   timer: 1800
      // });
    }
    /*
█ ❖ registerCue() - set cue {num} to time {setTime} and activate keybinds                                                                   */
    function registerCue(num = null, setTime = null) {
      if (CueData.usingDefault) {
        CueData.resetCuesNext = true;
      } else if (CueData.resetCuesNext) {
        CueData = {};
        delete CueData.resetCuesNext;
        delete CueData.usingDefault;
      }
      if (typeof num == "number") CueData[num] = setTime;

      if (num !== "temp") V.iuData("cue", JSON.stringify(CueData));
    }
  },
  /*
█
▓█═─────══─────═🙦   Call_Cue()   🙤═─────══─────═❖
▓ Call cue {N} on video {Video}.                                                                          */
  Call_Cue: function(Video, N) {
    const CueData = Video.IUP.cue || {};
    if (CueData[N] || CueData[N] === 0) Video.currentTime = CueData[N];
  },
}; /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VARIABLES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
export const Variable = {
  active_video: null, // The last video played. Currently being controlled.
  keybinds: null,
  notification: null,
  apply_mod: (e, val = 1) => {
    const mods = {
      alt: 0.25,
      ctrl: 4,
      shift: 1,
    };
    return e.altKey ? val * 0.25 : e.ctrlKey ? val * 4 : val;
  },
  // prop = "start|end|cue#"
  getTimeProp: function(V, prop) {
    const pre = "data-iup-";
    if (!V) return null;
    if (["start", "end"].includes(prop)) {
      return V.iuData(prop);
    }
    if (typeof prop == "number") {
      return V.iuData("cue")[prop] || null;
    }
    return null;
  },
};
/*
█ ❖ SETTINGS                                                                   */
export const Config = {
  fadeUnderPlaybackRate: {
    Title: "Mute Videos Under Playback Rate",
    Desc: "Fade out the volume of videos under this playback rate.",
    Type: "Number",
    Default: 0.6,
  },
  mouseWheelControl: {
    Title: "Mouse Wheel Control",
    Desc:
      "Control this property on a video when you scroll with the mouse over it.",
    Type: "List",
    Part: "dropdown",
    Default: "time",
    choices: {
      playbackRate: { Title: "Playback Rate" },
      time: { Title: "Time" },
      volume: { Title: "Volume" },
    },
    preprocess: (val) => val.replace(/\s/g, "").toLowerCase(),
  },
  rightMouseControl: {
    Title: "RMB Drag Control",
    Desc:
      "Control this property on a video when right-click and drag left or right.",
    Type: "List",
    Part: "dropdown",
    Default: "playbackRate",
    choices: {
      playbackRate: { Title: "Playback Rate" },
      time: { Title: "Time" },
      volume: { Title: "Volume" },
    },
    preprocess: (val) => val.replace(/\s/g, "").toLowerCase(),
  },
};
/*
█ ❖ CONTEXT                                                                   */
export const Context = {
  Selector: "video",
  parentSelector: "video",
  items: [
    {
      ID: "mediaPlayback",
      Title: "Media Playback",
      Submenu: [
        {
          ID: "setStart",
          Title: "Set start point",
          Icon: "",
          marked: (V) => V.iuData(Constant.pre, false).start !== 0,
          onUse(T) {
            IUP.Playback.Action.Set_Playback(T, "set", "start");
          },
        },
        {
          ID: "setEnd",
          Title: "Set end point",
          Icon: "",
          marked: (V) => V.iuData(Constant.pre, false).end !== V.duration,
          onUse(T) {
            IUP.Playback.Action.Set_Playback(T, "set", "end");
          },
        },
        {
          ID: "speed",
          Icon: "",
          Title: "Playback Speed",
          Part: {
            Type: "Number",
            val: 1,
            //Default: V => V.iuSpeed,
            Min: 0,
            Max: 1,
            Step: 0.05,
            onEdit(val, e, V) {
              V.iuSpeed = parseFloat(val);
            },
          },
        },
        // {
        //   id: "loopReverse",
        //   Icon: "",
        //   Title: "Loop With Reverse",
        //   disabled: true,
        //   onUse(V) {
        //     IUP.Playback.Action.Set_Playback(V, "set", "reverse");
        //   }
        // }
      ],
    },
  ],
};
const cueContextItems = {
  id: "cuePoints",
  Title: "Cue Points",
  submenu: [],
};
for (var i = 1; i <= 6; i++) {
  cueContextItems.submenu.push({
    id: `cue` + i,
    Icon: `${i}`,
    Title: "Set Cue " + i,
    marked: (T) =>
      T.iuData("cue") && T.iuData("cue")[i] && !T.iuData("cue").usingDefault,
    onUse(T) {
      Action.Set_Cue(T, [i, T.currentTime]);
    },
  });
}
Context.items.push(cueContextItems);
Context.items.push({
  id: "clearAll",
  Title: "Clear playback mods",
  Icon: "",
  onUse(T) {
    var arg = { start: false, end: false, reverse: false };
    T.playbackRate = 1;
    IUP.Playback.Action.Set_Playback(T, "clear");
    Action.Set_Cue(T, "clear");
  },
});
