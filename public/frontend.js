VANTA.DOTS({
  el: ".vanta",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0xe0e0db,
  color2: 0x3ddc97,
});
document.querySelector(".video-link").addEventListener("click", function () {
  const radio = document.querySelector(".radio-btn");
  radio.setAttribute("checked", "checked");
});
window.onscroll = function () {
  scroll();
};

function scroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.querySelector(".nav-section").style.top = "-100px";
  } else {
    document.querySelector(".nav-section").style.top = "0";
  }
}
