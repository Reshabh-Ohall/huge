// Load form.html into the page
fetch("components/form/form.html")
  .then(res => {
    if (!res.ok) throw new Error("Failed to load form: " + res.status);
    return res.text();
  })
  .then(data => {
    document.getElementById("form-container").innerHTML = data;

    // Define open/close after form is loaded
    window.openTalkPanel = function () {
      document.getElementById("talkPanel").classList.add("show");
      document.getElementById("talkOverlay").classList.add("show");
      document.body.style.overflow = "hidden";

      // Enable ESC close
      document.addEventListener("keydown", escKeyHandler);
    };

    window.closeTalkPanel = function () {
      document.getElementById("talkPanel").classList.remove("show");
      document.getElementById("talkOverlay").classList.remove("show");
      document.body.style.overflow = "";

      document.removeEventListener("keydown", escKeyHandler);
    };

    function escKeyHandler(e) {
      if (e.key === "Escape") {
        window.closeTalkPanel();
      }
    }
  })
  .catch(err => console.error("Form load error:", err));

document.addEventListener("submit", function (e) {
  const form = e.target;
  if (form.id === "talkForm") {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    fetch("http://localhost:3000/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          alert("Form submitted!");
          form.reset();
          // Optionally close the panel: closeTalkPanel();
        } else {
          throw new Error('Submission failed');
        }
      })
      .catch((err) => {
        console.error("Submission failed:", err);
        alert("Submission failed: " + err.message);
      });
  }
});