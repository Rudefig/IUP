import { IUP } from "../Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Shadow",
  Title: "Shadow Page",
  Desc: "A shadow page injected into a webpage.",
  // System: "Encapsulation",
};

export const Action = {
  Spawn_Shadow_Page: function(dat) {
    var Node = document.createElement("span"),
      Dom = Node.attachShadow({ mode: "open" }),
      { ID, html, appendTo = document.documentElement } = dat,
      Theme = IUP.Cosmetic.Setting.Theme || "Websafe",
      extensionLink = browser.runtime.getURL("");
    Node.id = ID;
    Node.innerHTML = `<style>/*html{height:auto!important;}*/ html span#${ID}{position:absolute!important;display:contents!important;} html span#${ID}.-is-deact{visibility:hidden;} </style>`;
    Dom.innerHTML = `<span id="Head">
    <link rel="stylesheet" href="${extensionLink}System/Construction/-asset/Style-Item.css" />
    <link rel="stylesheet" href="${extensionLink}System/Construction/-asset/Style-Input.css" />
    <link rel="stylesheet" href="${extensionLink}System/Cosmetic/-asset/Style-Global.css" />
    <link rel="stylesheet" href="${extensionLink}System/Cosmetic/-asset/Style-${Theme}.css" />
    <link rel="stylesheet" href="${extensionLink}System/Iconography/-asset/fontawesome/css/fontawesome.min.css" />
    <link rel="stylesheet" href="${extensionLink}System/Iconography/-asset/fontawesome/css/all.min.css" />
    <style id="style"></style></span>
    <div id="Body"></div>`;
    Node.Head = Dom.querySelector("#Head");
    Node.Body = Dom.querySelector("#Body");
    Node.Host = Node;
    if (html) Dom.querySelector("#Body").insertAdjacentHTML("beforeEnd", html);
    if (Dom.querySelector(".wrap-box"))
      Node.Box = Dom.querySelector(".wrap-box");
    if (appendTo) appendTo.appendChild(Node);
    // Node.Despawn = function(dat) {
    //   IUP.Shadow.Action.Despawn_Shadow_Page(dat);
    // };
    return Node;
  },
  Despawn_Shadow_Page: function(dat) {
    const { ID } = dat;
    document.querySelector(`#${ID}`)?.remove();
  },
};
