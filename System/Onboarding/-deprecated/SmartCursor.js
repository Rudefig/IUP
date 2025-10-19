/*ⸯ                     ༿─────────═🙦 🇵🇷🇪🇻🇮🇪🇼 🙤═─────────᠎༾
█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█      🙢  SMART POINTER  🙠     █⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊╰────────────⏜⏝⏜⏝⏜⏝⏜────────────╯﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊﹊▓
▓ ❖ NOTE ❖
▓   ◇ FILE READY: download, script
▓   ◇ FILE READY (BLANK): pdf, exe
▓   ◇ URL READY: new window
▓   ◇ NEED FILE: audio, flash
▓   ◇ NEED URL: app store, bitcoin, cloud download, disk drive, file transfer, github, IRC, map, music, phone, voice chat, torrent magnet
▓
▓═──────────────══─────────────══🙦⟅ ∽ 🎕 ∼ ⟆🙤══─────────────══──────────────═█ */
export const preview = {
  meta: {
    propStyle: true
  },
  html: `
<div class="cursor-style"></div>
<div class="cursor-grid"></div>
<span id="bottom">Bottom Of Page</span>`,
  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ EVENT SCRIPTS ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
  onPreviewInit: function(self, DOC, props) {
    const wrap = DOC.querySelector(".cursor-grid"),
      icons = self.con.DefaultCursorIndex;
    for (var I in icons) {
      let title = icons[I].title,
        demo = props.CursorDemoIndex[I] || `<span class="fas"></span>`,
        tba = demo == "*" ? " tba" : "",
        html = `<div class="cell"><h5>${title}</h5><div class="cell-content${tba}"><div>${demo}</div></div>`;
      wrap.insertAdjacentHTML("beforeEnd", html);
    }
    DOC.querySelector("a[href='#bottom']").onclick = function() {
      DOC.querySelector("#bottom").scrollIntoView();
    };
  },
  onInit: function(self, DOC) {
    self.cmd.Init_Smart_Cursor(DOC.querySelector(".cursor-style"));
  },

  /*

█
▓█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█═⟅ ∽ PROPERTIES ∼ ⟆═█⌇𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙𝄙⌇█
▓                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾                        */
  props: {
    CursorDemoIndex: {
      anchor: `(<a href="#bottom">Scroll To Bottom</a>)`,
      appStore: ``,
      audio: `<a href="audio.wav" target="_blank">*Play Audio</a>`, // TODO file & image
      bitcoin: `<a href="bitcoin:xpub69QbesuMUFYMe7sLEzHEzCPW3bnZa7Qhtobh3ZLVHe12X7fUWDCyQ4rbU7G9feT4PLoAM27J9aTysLngD9DFHzTnF5D9LKKokb9UGG2vgGM" target="_blank"><img id="img-donate" src="SmartPointer/bitcoin-donate.png"></a>`, // TODO link
      browserExt: `<a href="https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm" target="_blank"><img id="img-browserExt" src="SmartPointer/extension-download.png"></a>`,
      cloudDownload: `(<a href="http://drive.google.com/file/d/" target="_blank">Cloud Download</a>)`, /// TODO image
      diskDrive: `(<a href="file:///C:/" target="_blank">Open In Explorer</a>)`,
      document: `(<a href="SmartPointer/document.docx" target="_blank">View Document</a>)`,
      download: `<a href="SmartPointer/download.zip" target="_blank"><img id="img-download" src="SmartPointer/download-link.png"></a>`,
      email: `<a href="mailto:no-reply@gmail.com">*Contact Me</a>`,
      fileTransfer: `<a href="ftp://">*FTP Link</a>`,
      flash: ``,
      font: `<a href="SmartPointer/CormorantGaramond-Regular.ttf" target="_blank">CormorantGaramond-Regular.ttf</a>`,
      game: `<a href="steam://store/204100" target="_blank"><img id="img-game" src="SmartPointer/game-steam.png"></a>`, // TODO original image
      gitRepo: `<a href="git:" target="_blank"><img id="img-gitRepo" src="SmartPointer/github-forkme.png"></a>`, // TODO link
      image: `<a class="image-link" href="SmartPointer/image-file.png" target="_blank"><span><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path></svg></span><span>View Image</span></a>`,
      irc: `<a href="irc://" target="_blank">*Join IRC Channel</a>`,
      map: `<a id="wrap-map" href="https://goo.gl/maps/zCKBhMbK3CXqdd3v5" target="_blank"><img src="SmartPointer/florence.jpg"><div>Florence<span>Metropolitan City of Florence, Italy</span></div></a>`,
      music: ``,
      newTab: `<a href="http://www.google.com" target="_blank">Open Link</a>`,
      pdf: `<a id="wrap-pdf" href="SmartPointer/document.pdf" target="_blank"><img id="img-pdf" src="SmartPointer/pdf-icon.png"><span>DOWNLOAD PDF</span></a>`, // TODO original image
      phone: ``,
      program: ``,
      rssFeed: ``,
      script: ``,
      textDoc: ``,
      textMsg: ``,
      torrent: `<div id="wrap-torrent">
<a href="SmartPointer/Night-of-the-Living-Dead-1968.torrent"><i class="fas fa-arrow-down"></i>Torrent Download</a>
<a href="SmartPointer/Night-of-the-Living-Dead-1968.torrent"><i class="fas fa-magnet"></i>Magnet Download</a>
</div>`,
      video: `<a href="assets/video.mp4" target="_blank">*Open Video</a>`,
      voiceChat: ``
    }
  }
};
