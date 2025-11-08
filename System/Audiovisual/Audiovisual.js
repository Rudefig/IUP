export const Metadata = {
  Title: "Audiovisual System",
  Utility: ["Multimedia"],
  Desc: "Handles video and audio playback.",
  Icon: "fa-mp3-player",
  Keyname: "Audiovisual",
  Parent: "System",
  Status: "Online",
};

export const Layout = {
  Cover: function() {
    return `Activate to unlock one of the Platform's flagship features, the universal player!<ul>
    <li>Use the same media player across any video and audio</li>
    <li>Works with your files on the hard drive or cloud</li>
    <li>Can override the default player on any website</li>
    <li>Pick which features you want and customize the toolbars and controls, or try out a premade player</li></ul>
    <video src="/System/Audiovisual/-asset/sample-5s.mp4" controls autoplay muted loop style="width:100%;border-radius:8px;box-shadow:0 0 8px rgba(0,0,0,.2);margin-top:12px;"></video>`;
  },
};
