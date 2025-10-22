import { IUP } from "../Environment/-asset/Initialization.js";

export const Metadata = {
  Keyname: "Platform",
  Title: "Platform Module",
  Desc: "Represents the IUP platform itself.",
  Variant: "IUP",
  System: "Encapsulation",
};

export const Sheet = {
  // ❖ Cover HTML for Platform module
  Cover: function() {
    const Item = document.createElement("div");
    var content = `<h1>WELCOME TO YOUR NEW PLATFORM</h1>
<p>Bytestruck Technology presents the first prototype of <b>IUP</b> or
<b>Interoperate Universal Platform</b>. This personal software
platform isn't designed for any one purpose, but the more of its
modules are activated, the more it can accomplish. Each feature
you unlock and customize will evolve the [Platform], transforming it to suit
your preferences. Whether you're looking for an entertainment hub or
professional workflow, your [Platform] will provide you with all the
building blocks necessary.</p>

<p>The modules are grouped into <b>[Systems]</b> and divided among twelve
<b>[Utilities]</b> that cover different areas of software architecture. Each
[Utility] provides essential services to the rest of the [Platform],
interoperating with other Systems to implement features. Start exploring by 
choosing a [Utility] from the top menu, and browse all the [Systems] available 
to turn on. After finishing an introductory tutorial, you'll have platform-wide
access to its functionality.</p>

<p>The platform's architecture is a decentralized network of modules you
can interact with through its native UI. It's built on web
technology, providing efficiency and accessibility, as well as
seamless integration with the internet. Modules are supported by
3rd-party code libraries and API services that integrate directly
into the platform, providing an interface and low-code programming
access. In other words, the platform is compatible with anything
plugged into it.</p>`;
    Item.className = "page-intro";
    Item.innerHTML = IUP.Keyname.Order.Convert.String_To_Hypertext(content);
    return Item;
  },
  Splash: () => `<div class="text-content">
  <h5>INTRODUCING THE UNIVERSAL PLATFORM</h5>
  <p>
    You have been granted exclusive access to experimental technology that can
    supercharge your digital life, if you unlock its full potential.
  </p>
</div>
<div class="button-start"><a href="?">ACTIVATE PLATFORM</a></div>
<div class="diamond-shape"></div>
<div class="transition-gradient"></div>`,
};
