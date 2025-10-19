/*
ⸯ     				          ༿───────────═🙦 🎕 🙤═───────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  SOUND VOLUME  🙠      █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖
▓
▓ ❖ TODO
▓  UI Components:
▓   ◇ Volume slider
▓   ◇ Toggle mute
▓   ◇ Volume w/ mute
▓  Icon change:
▓   ◇ 0 = volume-off
▓   ◇ >0 & <=33 = volume-low
▓   ◇ >33 & <=66 = volume
▓   ◇ >66 & <=200 = volume-high
▓   ◇ if muted = volume-xmark / volume-slash
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
export var Tool = function() {
  const self = this;

  this.Meta = {
    title: "Sound Volume",
    icon: ["volume", "volume-xmark", "volume-off", "volume-low", "volume-high"],
    desc: "Change the audio volume of playback media."
  };

  this.Var = {
    Target: {
      name: "Target Media",
      type: ["VIDEO", "AUDIO"]
    },
    Volume_Level: {
      name: "Volume Level",
      type: "FLOAT",
      default: 1,
      step: 0.05,
      min: 0,
      max: 1,
      //
      output: val => +(val * 100).toFixed(2)
    },
    Audio_Muted: {
      name: "Audio Muted",
      type: "BOOL",
      default: false
    }
  };

  this.Action = [
    {
      name: "Step Volume",
      script: function(VIDEO, mod = 1) {
        var val = VIDEO.currentTime + this.step * mod;
        if (val < this.min) val = this.min;
        if (val > this.max) val = this.max;
        VIDEO.volume = val;
        return VIDEO.volume;
      }
    },
    {
      name: "Mute Volume",
      script: function(VIDEO) {
        if (VIDEO.muted) VIDEO.muted = false;
        else VIDEO.muted = true;
        return VIDEO.muted;
      }
    }
  ];
  // TODO
};
