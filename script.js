document.addEventListener("DOMContentLoaded", function () {
  // hamburger sidebar menu

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

  // who we are slider

  // const slider = document.querySelector(".items");
  // let isDown = false;
  // let startX;
  // let scrollLeft;

  // slider.addEventListener("mousedown", (e) => {
  //   isDown = true;
  //   slider.classList.add("active");
  //   startX = e.pageX - slider.offsetLeft;
  //   scrollLeft = slider.scrollLeft;
  // });

  // slider.addEventListener("mouseleave", () => {
  //   isDown = false;
  //   slider.classList.remove("active");
  // });

  // slider.addEventListener("mouseup", () => {
  //   isDown = false;
  //   slider.classList.remove("active");
  // });

  // slider.addEventListener("mousemove", (e) => {
  //   if (!isDown) return;
  //   e.preventDefault();
  //   const x = e.pageX - slider.offsetLeft;
  //   const walk = (x - startX) * 0.5; //scroll speed
  //   slider.scrollLeft = scrollLeft - walk;
  // });

  const slider = document.querySelector(".items");
  let isDown = false;
  let startX;
  let scrollLeft;

  // Function to start dragging
  function startDrag(e) {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }

  // Function to stop dragging
  function stopDrag() {
    isDown = false;
    slider.classList.remove("active");
  }

  // Function to handle dragging
  function drag(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 0.9; // Scroll speed
    slider.scrollLeft = scrollLeft - walk;
  }

  // Event listeners for slider (parent)
  slider.addEventListener("mousedown", startDrag);
  slider.addEventListener("mouseleave", stopDrag);
  slider.addEventListener("mouseup", stopDrag);
  slider.addEventListener("mousemove", drag);

  // Event listeners for items (children) to stop event propagation
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    // Handle events on all child elements
    item.addEventListener("mousedown", (e) => {
      startDrag(e);
      e.stopPropagation(); // Stop propagation to prevent interference
    });

    item.addEventListener("mouseup", (e) => {
      stopDrag(e);
      e.stopPropagation();
    });

    item.addEventListener("mousemove", (e) => {
      drag(e);
      e.stopPropagation();
    });

    // Prevent the default behavior of image dragging
    const images = item.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("dragstart", (e) => e.preventDefault()); // Prevent image drag
      img.addEventListener("mousedown", (e) => {
        startDrag(e);
        e.stopPropagation();
      });

      img.addEventListener("mouseup", (e) => {
        stopDrag(e);
        e.stopPropagation();
      });

      img.addEventListener("mousemove", (e) => {
        drag(e);
        e.stopPropagation();
      });
    });
  });
});
