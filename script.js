document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const sidebarHamburger = document.getElementById("sidebarHamburger");

  hamburger.addEventListener("click", function () {
    hamburger.classList.add("open");
    sidebar.classList.add("open");
    sidebarHamburger.classList.add("open");
  });

  sidebarHamburger.addEventListener("click", function () {
    sidebar.classList.remove("open");
    hamburger.classList.remove("open");
  });

  const slider = document.querySelector(".items");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("active");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 0.5; //scroll speed
    slider.scrollLeft = scrollLeft - walk;
  });
});
