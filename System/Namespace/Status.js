export const Metadata = {
  Keyname: "Status",
  Title: "Status Type",
  Desc: "Current status of a module.",
  // Alt: "Module-Platform",
  Child: ["Online", "Standby", "Offline", "Disabled"],
  System: "Namespace",
  Typing: "K",
};
export const Module = {
  Online: {
    Title: "Online",
    Parent: "Status",
    Variant: "On",
  },
};
