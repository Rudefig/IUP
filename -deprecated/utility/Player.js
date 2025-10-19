/*
ⸯ                       ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█    🙢  VIDEO CONTROLLER  🙠    █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ INDEX:
▓   ◇ constants
▓       ⬥
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█                         */
export var con = {
  dataAttribute: "data-iup-vc",
  contextDragTimeout: 100,
  numDefaultCues: 9, // TODO Move to setting
  HOLD_TIMEOUT: 150,
  BTN_TEXT_REFERENCE: ["none", "lmb", "rmb", "both", "aux"],
  CSS: `.vc-dragX { cursor: ew-resize; }`,

  /*


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ PROPERTY INDEX ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                         */
  VideoPropIndex: {
    playbackrate: {
      step: 0.01,
      min: 0.0,
      script: function(V, mod = 1) {
        var val = V.playbackRate + this.step * mod;
        if (val < this.min) val = this.min;
        V.playbackRate = val;
        return V.playbackRate;
      },
      output: function(val) {
        return val == this.min ? "❙❙" : "x" + +val.toFixed(2);
      }
    },
    currenttime: {
      step: 0.2,
      min: 0,
      script: function(V, mod = 1) {
        var time = V.currentTime + this.step * mod,
          data = V.iuData("vc");
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
      }
    },
    volume: {
      step: 0.05,
      min: 0,
      max: 1,
      script: function(V, mod = 1) {
        var val = V.currentTime + this.step * mod;
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
      script: function(V, mod = 1) {
        var val = V.currentTime + this.step * mod;
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


█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ VIDEO EVENT INDEX ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                         */
  VidEventIndex: {
    /*
█ ❖ timeupdate 〜 Every video time update, check if outside start/end time and reset to start.                                                                   */
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
█ ❖ mousemove 〜 Change a property by clicking 🙵 dragging.                                         */
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
█ ❖ wheel 〜 Change a property by scrolling up or down.                                                                   */
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
█ ❖ ended 〜 When video ends, reverse or set to start point.                                                                   */
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
█ ❖ contextmenu 〜 If user has been dragging(mousemove) for longer than the timeout, don't show context menu.                */
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
█ ❖ visibilitychange 〜 Auto-pause on tab switch.                                                                   */
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
