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

  // newsletter
  // const scriptURL =
  //   "https://script.google.com/macros/s/AKfycbwXL5oKO7-Yu8OwQL6XD3-tDqwxWZhZrWXXY7aslkVrGL25bCZP4xVkN05R3dEx3iEazA/exec"; // replace with your Google Apps Script URL
  // const form = document.forms["newsletter-form"];
  // const responseDiv = document.getElementById("response");

  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   responseDiv.innerHTML = "Submitting...";

  //   fetch(scriptURL, { method: "POST", body: new FormData(form) })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response.result === "success") {
  //         responseDiv.innerHTML = "Thank you for subscribing!";
  //         form.reset();
  //       } else {
  //         responseDiv.innerHTML = "There was an error. Please try again.";
  //       }
  //     })
  //     .catch((error) => {
  //       responseDiv.innerHTML = "There was an error. Please try again.";
  //       console.error("Error!", error.message);
  //     });
  // });

  document
    .getElementById("newsletter-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const form = new FormData(e.target);
      const responseDiv = document.getElementById("response");

      // Phone number validation
      const phoneInput = document.getElementById("phone").value;
      const phoneRegex = /^\d{10}$/; // Simple regex for 10-digit phone numbers

      if (!phoneRegex.test(phoneInput)) {
        responseDiv.innerHTML = "Please enter a valid 10-digit phone number.";
        return; // Stop form submission if the phone number is invalid
      }

      // Extracting checkbox values manually
      const types = [];
      document
        .querySelectorAll('input[name="type"]:checked')
        .forEach((checkbox) => {
          types.push(checkbox.value);
        });

      // Manually append checkbox data to FormData
      form.delete("type"); // Remove existing 'type' key to avoid duplication
      form.append("type", types.join(", "));

      responseDiv.innerHTML = "Submitting...";

      fetch(
        "https://script.google.com/macros/s/AKfycbwAUxjxBnmh7gE4vwIv35_EIWCsyU2_J7E8-H7ymH41rJhHRzKmTeElzmtVYB7n_waOtg/exec",
        {
          method: "POST",
          body: form,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "success") {
            responseDiv.innerHTML = "Thank you for subscribing!";
            e.target.reset();
          } else {
            responseDiv.innerHTML = "There was an error. Please try again.";
          }
        })
        .catch((error) => {
          responseDiv.innerHTML = "There was an error. Please try again.";
          console.error("Error!", error.message);
        });
    });
});
