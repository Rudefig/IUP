import { IUP } from "../Environment/-asset/Initialization.js";
// TODO: Play, Pause, Stop, Rewind, Fastforward
export const Metadata = {
  Title: "Playback Tool",
  Desc: "Controls playback of playable media.",
  Keyname: "Playback",
  Parent: "Tool",
  System: "Audiovisual",
};
/*
  
  
ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  PLAYBACK TOOL  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ ACTION ❖
▓   ◇ Engage_Playback
▓   ◇ Inject_Playback
▓   ◇ Set_Playback
▓   ◇ Eject_Playback
▓   ◇ Disengage_Playback
▓
▓ ❖ PROCESS ❖
▓   ◇ secsToString
▓
▓ ❖ NOTES ❖
▓   ◇ VC = Video Controller
▓
▓ ❖ TODO ❖
▓   ◇ Attempt to create a new <video> element with same URL. If that fails, extract current <video>.
▓   ◇ Don't load this utility if no videos are on the page?
▓   ◇ SAVE DATA TO NOTES: Save video VC data to Notes, restore on page open: on change / on manual save / off
▓   ◇ Change properties on a curve, the farther it goes the faster (video time) or slower (video speed) it goes
▓   ◇ CONTROLS:
▓     ⬥ When dragging mouse, display a range input under it.
▓     ⬥ HOME/END: Press HOME to skip to video start, END to skip to end.
▓   ◇ VIDEO:
▓     ⬥ Auto-Detect Size: Scan the video for black regions and resize to fit.
▓     ⬥ Drag & Resize Mode: Activate to freely reposition & scale the video with LMB/wheel.
▓   ◇ AUDIO:
▓     ⬥ Offset Audio: Shift the audio backwards or forwards relative to video (scale too?)
▓   ◇ CUE POINTS:
▓     ⬥ Commands for Next Cue Point/Previous Cue Point.
▓     ⬥ Hold down two cues at once to skip between them.
▓   ◇ NOTIFICATION:
▓     ⬥ Adjust infobox drop shadow based on image capture of region behind it.
▓     ⬥ When current time is displayed in notification, live update it until it fades.
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */

export const Constant = {
  pre: "pb",
  contextDragTimeout: 100,
  HOLD_TIMEOUT: 150,
  BTN_TEXT_REFERENCE: ["none", "lmb", "rmb", "both", "aux"],
  CSS: `.vc-dragX { cursor: ew-resize; }`,
};

export const Trigger = {
  Initialize: function(doc) {
    // if (window.location.hostname == "accounts.youtube.com") return;
    Action.Engage_Playback(doc);
  },
  Deactivate: function(doc) {
    Action.Disengage_Playback(doc);
  },
  Load: function() {
    var V = document.querySelector("video");
    if (!V) return;
    if (!V.duration)
      V.addEventListener("loadedmetadata", (e) => Action.Inject_Playback(V));
    else Action.Inject_Playback(V);
  },
  Use: function() {
    // self.cmd.Test_Video_Panel();
  },
};

export const Process = {
  secsToString: function(secs) {
    var DateObj = new Date(secs * 1000).toUTCString(),
      timeStr = DateObj.match(/(\d\d:\d\d:\d\d)/)[0], // hh:mm:ss
      ms = String(Math.floor((secs * 1000) % 60))[0];
    timeStr = timeStr.replace(/(00:)/, ""); // trim off empty hours
    timeStr = `${timeStr}:${ms}`; // add ms
    // timeStr = timeStr + ":" + ms + (ms.length == 1 ? "0" : ""); // add ms
    return timeStr;
  },
};

export const Action = {
  Inject: function() {
    Action.Engage_Playback();
  },
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Engage_Playback() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓    Initialize controllers with CSS, event listeners, and prototype injections.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓  ❖ FUNCTIONALITY ❖
▓    ◇ Inject CSS: Inject video controller CSS.
▓    ◇ Auto-Inject VC: Listen for the play event and inject controller into video.
▓    ◇ Auto-Pause: Auto-pause videos when tab is switched.
▓    ◇ Set Keybinds:
▓      ⬥ Cues (1-9, alt 1-9)
▓      ⬥ Arrow Keys (<-, ->)
▓    ◇ HTMLMediaElement.iuStepProp(): Step a video property back or forward based on presets.
▓    ◇ HTMLMediaElement.iuSpeed: Set or retrieve the video playback rate.
▓      ⬥ If set below minimum, pause video.
▓      ⬥ If set above maximum, set to maximum.
▓      ⬥ Lower volume relative to playback rate.
▓  ❖ NOTE ❖
▓    ◇ Inject_Playback() injects the actual VC into videos. This just preps the page.*/
  Engage_Playback: function(doc = document) {
    const { CSS, notification, totalCues, DOC_EVENT_INDEX } = IUP[Key].Constant,
      visibilitychange = DOC_EVENT_INDEX.visibilitychange.bind(doc, self),
      contextmenu = DOC_EVENT_INDEX.contextmenu.bind(doc, self);

    // LayoutLib.cmd.Inject_Styles("VideoController", CSS); // ❖ Inject CSS
    doc.addEventListener("play", IUP[Key].Action.Inject_Playback, true); // ❖ Auto inject VC when video is played
    doc.addEventListener("visibilitychange", visibilitychange); // ❖ Auto-pause on tab switch
    doc.addEventListener("contextmenu", contextmenu);
    IUP[Key].Construct.Notification = UILib.cmd.UI_Notification(notification);

    console.log("PLAYBACK ENGAGED");

    /*
█ ❖ CUE KEYBINDS                                                                   */
    var keyListener = new window.keypress.Listener(),
      combos = [];
    for (var i = 1; i <= totalCues; i++) {
      let N = i;
      // ❖ CALL: Generate keybind to call Cue {N}. (if {N} is set)
      combos.push({
        keys: `${N}`,
        is_exclusive: true,
        prevent_repeat: true,
        on_keyup: function() {
          const V = self.var.active_video;
          if (V) self.cmd.Call_Cue(V, N);
        },
      });
      // ❖ SET: Generate keybind to set Cue {N}.
      combos.push({
        keys: `alt ${N}`,
        is_exclusive: true,
        prevent_repeat: true,
        on_keyup: function() {
          const V = self.var.active_video;
          if (V) self.cmd.Set_Cue(V, [N, V.currentTime]);
        },
      });
    }
    /*
█ ❖ ARROW KEYBINDS                                                                   */
    var ArrowIndex = {
      right: [false, 25],
      "shift right": [false, 100],
      "alt right": [false, 500],
      left: [true, 25],
      "shift left": [true, 100],
      "alt left": [true, 500],
    };
    for (var key in ArrowIndex) {
      let [reverse, mod] = ArrowIndex[key];
      combos.push({
        keys: key,
        is_exclusive: true,
        prevent_repeat: true,
        on_keyup: function() {
          const V = self.var.active_video;
          if (V) V.iuStepProp("currenttime", reverse, mod);
        },
      });
    }
    // ❖ Register to keypress.js 🙵 save to temp data
    keyListener.register_many(combos);
    if (self.var.keybinds) self.var.keybinds.destroy();
    self.var.keybinds = keyListener;
    /*
█ ❖ .iuStepProp()
▓ Iterate a video property {prop} by a predefined step.
▓  ⬥ {stepBack}: If true, step backwards instead of forwards.
▓  ⬥ {mod}:      Multiply the step by this much.                                                           */
    HTMLMediaElement.prototype.iuStepProp = function(
      prop,
      stepBack = false,
      mod = 1
    ) {
      prop = prop.toLowerCase().replace(/\s/g, "");
      const self2 = this,
        s = stepBack ? -1 : 1,
        Index = self.con.VideoPropIndex;
      var result = Index[prop].script(self2, stepBack ? -mod : mod),
        msg = "output" in Index[prop] ? Index[prop].output(result) : result;

      // ❖ Change time
      if (prop == "currenttime") {
        // var time = msg;
        // self.var.Notification.settings.onEject = function() {
        //   self.var.Notification.settings.onEject = null;
        //   clearInterval(self.var.time_interval);
        // };
        // self.var.time_interval = setInterval(() => {
        //   time += 0.1;
        //   self.var.Notification.title = self.cmd.secsToString(time);
        // }, 100);
        self.var.Notification.title = self.cmd.secsToString(msg);
      } else self.var.Notification.title = msg;
      self.var.Notification.startTimer();
    };
    /*
█ ❖ .iuSpeed()
▓ Special 'playbackRate' property with auto-pause and volume control.                                                                   */
    Object.defineProperty(HTMLMediaElement.prototype, "iuSpeed", {
      get() {
        return this.playbackRate;
      },
      set(val) {
        if (typeof val != "number")
          return console.warn(
            "iuSpeed: Invalid number provided =",
            val,
            typeof val
          );
        const minPlayback = self.con.VideoPropIndex.playbackrate.min,
          maxPlayback = 16,
          attr = self.con.prefix + "pausedPlaybackMin";
        if (val <= minPlayback) {
          val = minPlayback;
          this.pause();
          this.iuData(attr, true);
        } else {
          if (val > maxPlayback) val = maxPlayback;
          if (this.paused && this.iuData(attr)) {
            this.play();
            this.iuData(attr, null, true);
          }
        }
        this.playbackRate = val;
        this.volume = val < 1 ? val ** 4 : this.volume;
      },
    });
    /*
█ 🚧 .freezeFrame()
▓ Capture a frame of the video.                                                                   */
    // Object.defineProperties(HTMLVideoElement.prototype, {
    //   freezeFrame: function() {
    //     this.pause();
    //     const canvas = document.createElement("canvas"),
    //       context = canvas.getContext("2d");
    //     var data;
    //     canvas.width = this.videoWidth;
    //     canvas.height = this.videoHeight;
    //     context.drawImage(this, 0, 0);
    //     canvas.toBlob((blob) => data.push(blob), "image/jpeg");
    //   },
    // });
  },
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Inject_Playback() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓   Inject VC into video {V}. Initialize controller data & add event listeners.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ FUNCTIONALITY ❖
▓   ◇ If controller already injected, return data.
▓   ◇ If metadata isn't loaded, wait for it and rerun command.
▓   ◇ Set controller data attribute to defaults.
▓   ◇ Add event listeners in video event index. (con.VidEventIndex)
▓   ◇ Add event listeners in document event index. (con.DOC_EVENT_INDEX)
▓
▓ ❖ DATA STRUCTURE ❖
▓  data-iup-vc = {
▓   ◇ start: Video start time.
▓   ◇ end:   Video end time.
▓   ◇ TODO...
▓
▓ ❖ TODO ❖
▓   ◇ Detect Y axis (separate property)
▓     ⬥ wait 3(?) pixels before determining if drag is X or Y
▓     ⬥ keep recalculating, change if the avg drag distance is more than 2/3 towards the other axis
▓   ◇ Detect Y axis (same property)
▓     ⬥ If user drags up diagonally, step property higher/faster
▓     ⬥ If user drags down diagonally, step property lower/slower
▓
*/
  Inject_Playback: function(Video) {
    if (Video.target) Video = Video.target;
    if (!Video) throw new Error("IUP:Inject_Playback wasn't given a video.");
    if (Video.tagName != "VIDEO")
      throw new Error("IUP:Inject_Playback wasn't provided with video data.");
    self.var.active_video = Video;
    // ❖ Abort if already injected; return controller data
    var data = Video.iuData(self.con.pre);
    if (data) return data;

    // ❖ Wait For Metadata ⬥ If metadata isn't loaded, listen for it and try again.
    if (!Video.duration) {
      Vid.addEventListener("metadataloaded", self.cmd.Inject_Playback);
      return;
    }

    // V.iuData(self.con.pre, { start: 0, end: V.duration }); // ❖ Set default controller data
    self.cmd.Set_Cue(Video, "defaults"); // ❖ Set default cues

    // ❖ Event Listeners ⬥ Add event listeners in index to video, storing references for later removal.
    const eventHandlers = self.con.VidEventIndex;
    var eventRefs = {};
    for (var L in eventHandlers) {
      eventRefs[L] = eventHandlers[L].bind(Video, self);
      Video.addEventListener(L, eventRefs[L]);
    }
    Video.EventRefs = eventRefs;

    // ❖ If user has been dragging for longer than the timeout, don't show context menu
    // TODO Only need one event listener for the doc, not for each vid
  },
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ Set_Playback() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓       Set where the media starts, ends, and more for video {Video}.
▓               ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓   {action} =
▓    ◇ "set":   Set data property {prop} to {val}.
▓    ◇ "call":  Call time property {prop}.
▓    ◇ "clear":   Clear property {prop}, or null to clear all playback modifications.
▓    ◇ 🚧"reverse": Play video backwards once it ends.
▓   {prop} =
▓    ◇ "start":   Video start time
▓    ◇ "end":     Video end time
▓                                                                                  */
  Set_Playback: function(Video, action, prop = null, val = null) {
    var data = IUP[Key].Action.Inject_Playback(V), // initialize or acquire data
      cueData = Video.iuData("cue");
    if (!data) throw new error("IUP:Set_Playback wasn't given any data.");
    if (!action)
      console.warn(
        "IUP:Set_Playback wasn't given an action. Only the controller was injected."
      );
    /*
█ ❖ Clear playback mods                                                                   */
    if (action == "clear") {
      if (prop) {
        data[prop] = null;
      } else {
        Video.removeData(self.con.pre);
        for (var L in self.con.VidEventIndex) {
          Video.removeEventListener(L, self.con.VidEventIndex[L]);
        }
      }
      return true;
    }
    /*
█ ❖ Set start/end point                                                                   */
    if (action == "set") {
      data[prop] = val || V.currentTime;
      Video.iuData(self.con.pre, data);
      // if using default cues, refresh cue times
      if (cueData.usingDefault) IUP.Cuemark.Set_Cue(V, "defaults");
    }
    /*
█ ❖ Call start/end point                                                                   */
    if (action == "call") {
      V.currentTime = data[prop];
    }

    /*🚧if (action == "reverse")🚧 { setAttr(set); } else { V.onended = null; }*/
    // MediaStreamTrack.getSettings().frameRate
    /*function rewind(vid) {
      const frameRate = 30;
      const vidStart = vid.getAttribute(startAttr) || 0;
      console.log("REWIND CALLED");
      vid.pause();
      vid.playbackRate = 1.0;
      vid.videoTracks[0];
      var rewind = setInterval(function() {
          if (vid.currentTime <= vidStart) {
          vid.play();
          } else {
          vid.currentTime -= 0.1;
          }
      }, 100);
      vid.onplay = function() {
          console.log("CLEARING INTERVAL:", rewind);
          clearInterval(rewind);
          console.log("INTERVAL CLEARED:", rewind);
          vid.onplay = null;
      };
      🚧}🚧*/
  },
  /*
█
▓█═─────══─────═🙦   Eject_Playback()   🙤═─────══─────═❖
▓                                                                           */
  Eject_Playback(Video) {
    if (Video.target) Video = Video.target;
    if (!Video) throw new Error("IUP:Eject_Playback wasn't given a video.");
    if (Video.tag != "video")
      throw new Error("IUP:Eject_Playback wasn't provided a valid video.");
    Video.iuData(self.con.pre, null, true);
    Video.iuData("cue", null, true);
    const eventHandlers = self.con.VidEventIndex;
    for (var L in eventHandlers) {
      Video.removeEventListener(L, Video.pEventRefs[L]);
    }
    delete Video.pEventRefs;
  },
  /*
█
▓█═─────══─────═🙦   Disengage_Playback()   🙤═─────══─────═❖
▓                                                                           */
  Disengage_Playback: function(doc = document) {
    doc.removeEventListener("play", IUP[Key].Action.Inject_Playback);
    doc.removeEventListener(
      "visibilitychange",
      IUP[Key].Constant.DOC_EVENT_INDEX.visibilitychange
    );
    self.var.keybinds.destroy();
    doc.querySelectorAll("video").forEach(IUP[Key].Action.Eject_Playback);
  },
  Extract_Video: function(target = "auto") {},
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
        {
          ID: "clearAll",
          Title: "Clear playback mods",
          Icon: "",
          onUse(T) {
            var arg = { start: false, end: false, reverse: false };
            T.playbackRate = 1;
            IUP.Playback.Action.Set_Playback(T, "clear");
            Action.Set_Cue(T, "clear");
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
