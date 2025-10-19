/*
ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█     🙢 M-Playback Media  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓  Playable media including video and audio.
▓
▓ ❖ M-Playback (Standard Type)
▓   ◇ Properties
▓     ⬥ State
▓     ⬥ Position
▓     ⬥ Speed
▓     ⬥ Volume
▓   ◇ Components
▓     ⬥ Playback Bar
▓
▓ ❖ M-PLAYBACK (Assembly Type)
▓   ◇ Properties
▓     ⬥ playbackrate
▓     ⬥ currenttime
▓     ⬥ volume
▓     ⬥ zoom
▓   ◇ Actions
▓     ⬥ play
▓     ⬥ pause
▓     ⬥ scrub
▓   ◇ Events
▓     ⬥ timeupdate
▓     ⬥ mousedown //NOTE: Should be integrated from Interactive System
▓     ⬥ mouseup
▓     ⬥ mousemove
▓     ⬥ wheel
▓
▓ ❖ TODO
▓   ◇ Integrate other tools state data
▓  UI Components:
▓   ◇ Play/Pause Button
▓   ◇ Restart Button
▓   ◇ Playback Bar
▓     ⬥ ...
▓       - ...
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */

export var $Type = function() {
  const self = this;

  this.Meta = {
    key: "M-Playback",
    title: "Playback Media",
    desc: "Manage the current state of playback media.",
    icon: ["play", "pause", "rotate-left"]
  };

  this.Var = {
    Source: {
      title: "Media Source",
      desc: "The source file for playback.",
      type: ["VIDEO", "AUDIO"]
    }
  };

  this.Tool = {
    Playback_State: {
      name: "Playback State",
      desc: "Pause and play media",
      type: "STATE",
      states: ["PLAY", "PAUSE"],
      default: false
    },
    //TODO: Add start/end positions
    Playback_Position: {
      name: "Playback Position",
      type: "FLOAT",
      default: 0,
      step: 0.2,
      min: 0.0,
      //max: fetch duration
      script: function(V, multiplier = 1) {
        var time = V.currentTime + this.step * multiplier,
          data = V.iuData("vc"); // TEMP
        data.end = V.duration; // TEMP
        // If loop = true, if stepping past video end, skip to video start & vice versa.
        if (V.loop) {
          if (time < data.start) time = data.end - Math.abs(data.start - time);
          if (time > data.end) time = data.start + time - data.end;
        } else {
          if (time < data.start) time = data.start;
          if (time > data.end) time = data.end;
        }
        V.currentTime = time;
        return V.currentTime;
      },
      output: val => +(val * 100).toFixed(2)
    },
    Playback_Speed: {
      name: "Playback Speed",
      desc: "Speed up or slow down playback",
      type: "FLOAT",
      default: 1,
      step: 0.25,
      min: 0.0,
      script: function(V, multiplier = 1) {
        var val = V.playbackRate + this.step * multiplier;
        if (val < this.min) val = this.min;
        V.playbackRate = val;
        return V.playbackRate;
      },
      output: val => (this.min ? "❙❙" : "x" + +val.toFixed(2))
    }
  };

  this.Action = [
    {
      name: "Step Position",
      script: function(VIDEO, multiplier = 1) {
        var val = VIDEO.currentTime + this.step * multiplier;
        if (val < this.min) val = this.min;
        if (val > this.max) val = this.max;
        VIDEO.volume = val;
        return VIDEO.volume;
      }
    },
    {
      name: "Play",
      script: function(VIDEO) {}
    }
  ];
};

// ❖ M-PLAYBACK (Assembly Type)
/*


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ M-PLAYBACK (Assembly Type) ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                         */
export var $TYPE = function() {
  const self = this;

  this.Meta = {
    key: "M-PLAYBACK",
    icon: ["play", "pause", "rotate-left"],
    desc: "Manage the current state of playback media."
  };

  this.Var = {
    Target: {
      name: "Target Media",
      type: ["VIDEO", "AUDIO"]
    }
  };

  this.Con = {
    /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ PROPERTY INDEX ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█  */
    Property: {
      playbackrate: {
        step: 0.01,
        min: 0.0,
        script: function(V, multiplier = 1) {
          var val = V.playbackRate + this.step * multiplier;
          if (val < this.min) val = this.min;
          V.playbackRate = val;
          return V.playbackRate;
        },
        output: val => (this.min ? "❙❙" : "x" + +val.toFixed(2))
      },
      currenttime: {
        step: 0.2,
        min: 0,
        script: function(V, multiplier = 1) {
          var time = V.currentTime + this.step * multiplier,
            data = V.iuData("vc");
          data.end = V.duration; // TEMP
          // If loop = true, if stepping past video end, skip to video start & vice versa.
          if (V.loop) {
            if (time < data.start)
              time = data.end - Math.abs(data.start - time);
            if (time > data.end) time = data.start + time - data.end;
          } else {
            if (time < data.start) time = data.start;
            if (time > data.end) time = data.end;
          }
          V.currentTime = time;
          return V.currentTime;
        }
      },
      volume: {
        step: 0.05,
        min: 0,
        max: 1,
        script: function(V, multiplier = 1) {
          var val = V.currentTime + this.step * multiplier;
          if (val < this.min) val = this.min;
          if (val > this.max) val = this.max;
          V.volume = val;
          return V.volume;
        },
        output: val => +(val * 100).toFixed(2)
      },
      zoom: {
        step: 0.1,
        min: 0.1,
        max: 50,
        script: function(V, multiplier = 1) {
          var val = V.currentTime + this.step * multiplier;
          if (val < this.min) val = this.min;
          if (val > this.max) val = this.max;
          V.volume = val;
          return V.volume;
        },
        output: val => +(val * 100).toFixed(2)
      }
    },
    /*  activateMedia: function(node) {
      if (node.target) node = node.target;
      const selector = self.con.activeSelector,
        active = document.querySelector("." + selector);
      if (active) active.classList.remove(selector);
      node.classList.add(selector);
    },*/

    /*
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ EVENT INDEX ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█  */
    Event: {
      /*
█ ❖ timeupdate 〜 Every video time update, check if outside start/end time and reset to start                                                                   */
      timeupdate: function(self, e) {
        if (this.paused) return;
        const currentTime = this.currentTime,
          timeData = this.iuData("vc") || {};
        timeData.end = this.duration; //TEMP
        // ❖ START POINT: If video time is under start point, set to start point.
        if (timeData.start && currentTime < timeData.start) {
          this.currentTime = timeData.start;
        }
        // ❖ END POINT: If video time is over end point, set to start point, or trigger reverse.
        if (timeData.end && currentTime > timeData.end) {
          this.currentTime = timeData.start || 0;
          /*if (reverse) { V.currentTime = endTime; rewind(V); } else { }*/
        }
      },
      click: function(self, e) {
        e.preventDefault();
      },
      mousedown: function(self, e) {
        const button = self.con.BTN_TEXT_REFERENCE[e.buttons];
        if (button != "lmb") return;
        if (this.paused) this.play();
        else this.pause();
        this.isHolding = true;
        setTimeout(() => {
          if (this.isHolding) this.pauseOnRelease = true;
        }, self.con.HOLD_TIMEOUT);
      },
      mouseup: function(self, e) {
        const button = self.con.BTN_TEXT_REFERENCE[e.buttons];
        if (button != "lmb") return;
        this.isHolding = false;
        if (this.pauseOnRelease) {
          this.pause();
          this.pauseOnRelease = false;
        }
      },
      /*
█ ❖ mousemove 〜 Change a property by clicking and dragging                                         */
      mousemove: function(self, e) {
        //TODO: Find the optimal way to continuously change video time
        //TODO: Allow dragging out of video
        //TODO: Add modifier keys
        const V = e.target,
          lastX = this.lastDragX,
          thisX = e.clientX,
          button = self.con.BTN_TEXT_REFERENCE[e.buttons];
        var prop;
        if (button == "rmb") prop = self.settings.rightMouseControl.val;
        // else if (button == "lmb") prop = "playbackrate";
        else return;
        if (lastX > thisX) this.iuStepProp(prop, true); // left
        if (lastX < thisX) this.iuStepProp(prop); // right
        this.lastDragX = thisX;
        if (!this.iuTimeDragStarted) this.iuTimeDragStarted = Date.now();
      },
      // add dragging cursor
      // mousedown: function(self, e) {
      //   if (e.buttons == 2) this.classList.add("vc-dragX");
      // },
      // mouseup: function(self, e) {
      //   if (e.buttons == 2) this.classList.remove("vc-dragX");
      // },
      /*
█ ❖ wheel 〜 Change a property by scrolling up or down                                                                   */
      wheel: function(self, e) {
        //self.con.activateMedia(e);
        const prop = "currenttime", //self.mouseWheelControl.val,
          mod = e.altKey ? 0.1 : e.ctrlKey ? 4 : 1;
        if (e.deltaY < 0) {
          this.iuStepProp(prop, false, mod * this.playbackRate); //up
        } else {
          this.iuStepProp(prop, true, mod * this.playbackRate); // down
        }
        e.preventDefault();
      },
      /*
█ ❖ ended 〜 When video ends, reverse or set to start point                                                                   */
      ended: function(self, e) {
        const data = this.iuData("vc");
        //if (time.reverse) rewind(e.target, start || 0);
        if (data.start) {
          this.currentTime = data.start;
          this.play();
        }
      }
    },

    /*


  █
  ▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ DOCUMENT EVENT INDEX ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
  ▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                         */
    DOC_EVENT_INDEX: {
      /*
  █ ❖ contextmenu 〜 If user has been dragging (mousemove) for longer than the timeout, don't show context menu.                */
      contextmenu: function(self, e) {
        const HOLD_TIMEOUT = self.con.HOLD_TIMEOUT;
        if (!this.iuTimeDragStarted) return;
        this.classList.remove("vc-dragX");
        var dragTime = Date.now() - this.iuTimeDragStarted;
        __B(dragTime, HOLD_TIMEOUT, dragTime > HOLD_TIMEOUT);
        if (dragTime > HOLD_TIMEOUT) e.preventDefault();
        this.iuTimeDragStarted = false;
        /*const countX = V.dragCountX, countY = V.dragCountY; if (countX > 20 || countY > 20) e.preventDefault(); V.dragCountX = 0; V.dragCountY = 0;*/
      },
      /*
  █ ❖ visibilitychange 〜 Auto-pause on tab switch                                                                   */
      visibilitychange: function(self, e) {
        const attr = "pausedTabSwitch";
        document.querySelectorAll("video").forEach(V => {
          if (document.hidden && !V.paused) {
            V.pause();
            V.iuData(attr, true);
          }
          if (!document.hidden && V.iuData(attr)) {
            V.play();
            V.iuData(attr, null, true);
          }
        });
      }
    }
  };
};
