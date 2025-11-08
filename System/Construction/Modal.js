import { IUP } from "/System/Environment/-asset/Initialization.js";
export const Metadata = {
  Keyname: "Modal",
  Title: "Modal",
  Desc: "",
  System: "Construction",
};

export const Registry = [];
export const State = {
  Node: {},
  is_modal_open: false,
};
export const Constant = {
  ID: "IUP-Modal",
};

export const Action = {
  /*
▓█═─────══─────═🙦   Spawn Modal   🙤═─────══─────═❖
▓ Open the modal on the page.                                                                     */
  Spawn_Modal: function(dat = {}) {
    const extLink = browser.runtime.getURL(
        "/System/Construction/-asset/Style-Modal.css"
      ),
      html = `<link rel="stylesheet" href="${extLink}">
    <div class="Layout-Modal -outer-box">
      <div class="modal-head">
        <span class="head-title">${dat.Title}</span>
        <button class="head-close modal-close" title="Close Modal">&times;</button>
      </div>
      <div class="box-body modal-body">
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
  Despawn_Modal: function() {
    IUP.Shadow.Action.Despawn_Shadow_Page({ ID: Constant.ID });
    State.is_context_menu_open = false;
  },
};
