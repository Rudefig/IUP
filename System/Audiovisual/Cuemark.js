import { IUP } from "/System/Environment/-asset/Initialization.js";
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

export const Action = {
  Engage: function(Video) {
    Video.IUP.Cue = {};
    //TODO - Initialize keybinds for active video
  },
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Set_Cue() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓       Set or call cue points on the video which change the current time.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓   {V} = video
▓   {action} =
▓    ◇ [Cue, Time]: Set cue {Cue} to time {Time}.
▓    ◇ "init":      Initialize the keybinds.
▓    ◇ "default":  Initialize with default cues set.
▓    ◇ "clear":     Clear all cues from the video.
▓  //TODO Add event listener if video changes source/duration to clear/recalculate cues
▓  //TODO Convert to {arg} system
▓                                                                                  */
  Set_Cue: function(Video, action) {
    if (!Video) throw new Error("IUP:Set_Cue wasn't provided a video.");
    if (Video && Video.tagName != "VIDEO")
      throw new Error("IUP:Set_Cue wasn't provided a valid video.");
    const totalCues = Constant.totalCues, // TODO Move to setting
      startTime = Video.IUP.start || 0,
      endTime = Video.IUP.end || Video.duration,
      duration = endTime - startTime;
    // ❖ Init Cues - Register cues w/ blank data
    if (action == "default") {
      Video.IUP.Cue = { usingDefault: true, 1: startTime };
      for (var i = 2; i <= totalCues; i++) {
        Video.IUP.Cue[i] = duration * ((i - 1) / totalCues) + startTime;
      }
      registerCue();
      // ❖ Clear All Cues
    } else if (action == "clear") {
      Video.IUP.Cue = null;
      if (State.keybinds) State.keybinds.destroy();
      // ❖ Set Cue Point
    } else if (Array.isArray(action) && action.length === 2) {
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
      if (Video.IUP.Cue.usingDefault) {
        Video.IUP.Cue.resetCuesNext = true;
      } else if (Video.IUP.Cue.resetCuesNext) {
        Video.IUP.Cue = {};
        delete Video.IUP.Cue.resetCuesNext;
        delete Video.IUP.Cue.usingDefault;
      }
      if (typeof num == "number") Video.IUP.Cue[num] = setTime;

      if (num !== "temp") Video.iuData("cue", JSON.stringify(CueData));
    }
  },
  /*
█
▓█═─────══─────═🙦   Call_Cue()   🙤═─────══─────═❖
▓ Call cue #{Num} on video {Video}.                                                                          */
  Call_Cue: function(Video, Num) {
    const CueData = Video.IUP.Cue || {};
    if (CueData[Num] || CueData[Num] === 0) Video.currentTime = CueData[N];
  },
};
export const Process = {
  apply_modifier: (e, val = 1) => {
    const mods = {
      alt: 0.25,
      ctrl: 4,
      shift: 1,
    };
    return e.altKey ? val * 0.25 : e.ctrlKey ? val * 4 : val;
  },
};
/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ STATES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                                                                                      */
export const State = {
  active_video: null, // The last video played. Currently being controlled.
  keybinds: null,
  notification: null,
};

export const Constant = {
  totalCues: 9, // TODO Move to setting
};

/*
█ ❖ CONTEXT MENU                                                                   */
export const Context = {
  Selector: "video",
  ItemList: [
    {
      ID: "cuemark",
      Title: "Cue marks",
      // Icon: "fa-flag fas",
      Submenu: [],
    },
  ],
};

for (var i = 1; i <= Constant.totalCues; i++) {
  Context.ItemList[0].Submenu.push({
    ID: `cue` + i,
    Title: "Set Cue " + i,
    Icon: `${i}`,
    onUse(Target) {
      Action.Set_Cue(Target, [i, Target.currentTime]);
    },
  });
}
