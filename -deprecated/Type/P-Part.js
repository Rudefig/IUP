/*
 ‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗༼ ‾‾‾‾‾‾‾‾‾⏜⏝⏜⏝⏜⏝⏜‾‾‾‾‾‾‾‾‾ ༽‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗‗
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓⟅       ∽ Part Type ∼       ⟆▓⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇▓
▓                                UI component.
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
▓ ❖ FEATURES ❖
▓ Subtypes:
▓  ◇ Item
▓  ◇ Menu
▓ Format:
▓  ◇ ELEMENT
▓ Properties:
▓  ◇
▓ Components:
▓  ◇ ???
▓
▓ ❖ TODO ❖
▓  ◇
▓                                                                              */

this.Action = {
  /*
█
▓█═─────══─────═🙦   Get_Instance   🙤═─────══─────═❖
▓ Returns an instance and its type. [instance, type]
▓ ⬥ {instance} = (instance object) Get the type of this instance.
▓ ⬥ {instance} = (string) Locate instance of this type with ID {ID}.
▓                                                                           */
  Get_Instance: function(instance, ID) {
    var type;
    if (typeof instance == "string") {
      type = instance;
      instance = IUP.I[type][ID];
      if (!instance) IUP.ERROR(`Get_Instance couldn't find type "${type}" with ID "${ID}".`); // prettier-ignore
    } else type = instance.constructor.name;
    return [instance, type];
  },
  /*
█
▓█═─────══─────═🙦   Create_Instance   🙤═─────══─────═❖
▓                                                                           */
  Create_Instance: function(instance, ID) {
    const [self, type] = UILib.cmd.Get_Instance(instance, ID);
    if (self.state.activated) return IUP.WARN(`${type} instance "${ID}" already exists.`); // prettier-ignore

    IUP.I[type][ID] = self;

    if (self.createScript) self.createScript();
    if (self.settings.onCreate) self.settings.onCreate(self);

    self.state.activated = true;
    if (self.settings.onActivate) self.settings.onActivate(self);
    if (self.settings.passive !== true) self.inject();
    return self;
  },
  /*
█
▓█═─────══─────═🙦   Destroy_Instance   🙤═─────══─────═❖
▓                                                                           */
  Destroy_Instance: function(instance, ID) {
    const [self, type] = UILib.cmd.Get_Instance(instance, ID);
    if (!self.state.activated) return IUP.WARN(`${type} instance "${ID}" is already deactivated.`); // prettier-ignore
    if (self.state.injected) self.eject(); // Eject before deactivating
    if (self.destroyScript) self.destroyScript(); // Run instance deact script
    delete IUP.I[type][ID];
    self.state.activated = false; // Set as inactive
    if (self.settings.onDestroy) self.settings.onDestroy(self);
  }
};
