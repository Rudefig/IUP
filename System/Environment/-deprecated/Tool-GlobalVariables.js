/*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ buildGlobalVars() ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓ Build the global variable object for storing IUP variables in window.IUP.
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ VARIABLE INDEX ❖
▓   ◇ MainMenu = Stores MainMenu() after it's constructed.
▓   ◇ utility  = Constructed utility data & settings.
▓   ◇ library  =
▓   ◇ setting  = User settings
▓   ◇ data     =
▓   ◇ proto    = Prototype registry.
▓     ⬥ set() = Total number of component instances.
▓   ◇ cache    =
▓   ◇ instance = Stores UI components.
▓     ⬥ numInstances() = Total number of component instances.
▓     ⬥ numActive()    = Number of active component instances.
▓     ⬥ deactAll()     = Deactivate all active components.
▓     ⬥ Get_Instances() = Utility function for the other methods.
▓                                                                               */
this.Action = {
  buildGlobalVars: function(settings) {
    const GlobalVars = {
      MainMenu: null,
      utility: {},
      library: { executive: {}, content: {}, media: {}, notes: {}, page: {}, text: {} }, // prettier-ignore
      setting: settings,
      data: {},
      // proto: {
      //   HTMLElement: {},
      //   HTMLDocument: {},
      //   Window: {},
      //   find(node) {
      //     //
      //   },
      //   define(interfaceName, propName, propData) {
      //     __Y(interfaceName, propName, propData);
      //     if (!IUP in this) this.IUP = {};
      //     // if (!interfaceName in this.IUP) this.IUP[interfaceName] = {};
      //     if (typeof propName == "string") {
      //       Object.defineProperty(this.IUP[interfaceName], propName, propData); // prettier-ignore
      //     } else if (typeof propName == "object") {
      //       Object.defineProperties(this.IUP[interfaceName], propName);
      //     }
      //   },
      //   injectAll() {
      //     _.each(this, (obj, interfaceName) => {
      //       Object.defineProperties(window.IUP[interfaceName], {
      //         IUP: {}
      //       });
      //     });
      //   }
      // },
      cache: {
        file: {},
        fileTarget: [document]
      },

      /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽  ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                               INSTANCE
▓                 ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
      /*
█ ❖  ⬥ Stores object instances of UI elements.                                                                   */
      instance: {
        Modal: {},
        Notification: {},
        Dropmenu: {},
        CommandBar: {},
        TargetLine: {},
        // ❖ numInstances() ⬥ Count the instances of {type} matching {filter}.
        numInstances(type, filter = null) {
          var count = 0;
          this.Get_Instances(type, () => count++, filter);
          return count;
        },
        // ❖ numActive() ⬥ Count the active instances of {type} matching {filter}.
        numActive(type, filter = null) {
          var count = 0;
          this.Get_Instances(type, () => count++, { is_active: true, ...filter }); // prettier-ignore
          return count;
        },
        // ❖ numInjected() ⬥ Count the injected instances of {type} matching {filter}.
        numInjected(type, filter = null) {
          var count = 0;
          this.Get_Instances(type, () => count++, { is_injected: true, ...filter }); // prettier-ignore
          return count;
        },
        // ❖ runCommand() ⬥ Run {command} on all instances of {type} matching {filter}.
        runCommand(type, command, filter = null) {
          if (["create", "inject", "eject", "deact"].includes(command)) {
            const callback = I => { const func = I[func]; func(); }; // prettier-ignore
            this.Get_Instances(type, callback, filter);
          }
        },
        // ❖ ejectAll() ⬥ Deactivate all instances of {type} matching {filter}.
        ejectAll(type, filter = null) {
          this.Get_Instances(type, I => I.eject(), filter);
        },
        // ❖ deactAll() ⬥ Deactivate all instances of {type} matching {filter}.
        deactAll(type, filter = null) {
          this.Get_Instances(type, I => I.deact(), filter);
        },
        // ❖ Get_Instances() ⬥ Run all instances of {type} matching {filter} through function {func}.
        Get_Instances(type, func, filter = null) {
          var data = this[s.capitalize(type)];
          if (!data) return IUP.WARN(`Get_Instances can't find instance type "${type}".`); // prettier-ignore
          if (typeof filter == "string") {
            const STATES = this.INSTANCE_STATES;
            if (STATES[filter]) filter = STATES[filter];
          }
          for (var I in data) {
            if (filter && !_.isMatch(data[I], filter) && !_.isMatch(data[I].settings, filter)) continue; // prettier-ignore
            func(data[I]);
          }
        },
        countInstances(type, filter = null) {
          var count = 0;
          this.Get_Instances(type, () => count++, { ...filter });
          return count;
        },
        INSTANCE_STATES: {
          activated: { is_active: true },
          deactivated: { is_active: false },
          injected: { is_injected: true },
          ejected: { is_injected: false }
        }
      },
      /*
█ ❖ SHORTCUT FUNCTIONS                                                                   */
      get MM() { return this.MainMenu; }, // prettier-ignore
      get U() { return this.utility; }, // prettier-ignore
      get S() { return this.setting; }, // prettier-ignore
      get I() { return this.instance; }, // prettier-ignore
      get L() { return this.library; }, // prettier-ignore
      WARN(msg) {
        // UILib.cmd.UI_Notification({});
        console.error(`IUP:${msg}`);
        return false;
      },
      ERROR(msg) {
        UILib.cmd.UI_Notification(msg, "IUP-ERROR");
        throw Error(msg);
      }
    };
    /*
█ ❖ RETURN GLOBAL VARIABLE                                                                   */
    return GlobalVars;
  }
};
