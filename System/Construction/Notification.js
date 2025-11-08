import { IUP } from "../Environment/-asset/Initialization.js";
// TODO: Play, Pause, Stop, Rewind, Fastforward
export const Metadata = {
  Title: "Notification",
  Desc: "A notification message shown to the user.",
  Keyname: "Notification",
  System: "Construction",
};
export const Constant = {
  ID: "IUP-Notification",
};
export const State = {
  Node: {},
  is_notification_open: false,
};
export const Registry = [];

export const Action = {
  /*
▓█═─────══─────═🙦   Spawn Notification   🙤═─────══─────═❖
▓ Open the notification on the page.                                                                     */
  Spawn_Notification: function(dat = {}) {
    const extLink = browser.runtime.getURL(
        "/System/Construction/-asset/Style-Notification.css"
      ),
      html = `<link rel="stylesheet" href="${extLink}">
    <div class="wrap-box Layout-Notification -outer-box">
      <div class="notification-head">
        <span class="head-title">${dat.Title}</span>
        <button class="head-close notification-close" title="Close Notification">&times;</button>
      </div>
      <div class="box-body notification-body">
        <span>${dat.Content}</span>
      </div>
    </div>`;
    State.Node = IUP.Shadow.Action.Spawn_Shadow_Page({
      ID: Constant.ID,
      html,
      // appendTo: document.body,
    });
    var { Body, Box } = State.Node;
    Body.querySelector(".modal-close").addEventListener("click", (e) =>
      Action.Despawn_Modal()
    );
    Body.addEventListener("use", (e) => Action.Despawn_Modal());
  },
  Despawn_Notification: function() {
    IUP.Shadow.Action.Despawn_Shadow_Page({ ID: Constant.ID });
    State.is_context_menu_open = false;
  },
};
