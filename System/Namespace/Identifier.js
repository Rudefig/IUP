export const Metadata = {
  Keyname: "Identifier",
  Title: "Identifier Code",
  Desc: "A unique ID code.",
  Variant: "ID",
  System: "Namespace",
  Parent: "Code",
  Typing: "K",
  Format: ["String"],
};

export const Operation = {
  // Generate a unique ID code
  Generate_ID: function(arg) {
    return id;
  },
};
