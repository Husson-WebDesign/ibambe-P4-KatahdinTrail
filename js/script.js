// JavaScript will be developed in a later phase.
console.log("Javascript loaded successfully");
// Contact Form Validation
// =========================
const contactForm = document.querySelector("#contact-form");

function showError(input, message) {
    document.querySelector("#" + input.id + "-error").textContent = message;
    input.setAttribute("aria-invalid", "true");
    input.classList.add("invalid");
}

function clearError(input) {
    document.querySelector("#" + input.id + "-error").textContent = "";
    input.removeAttribute("aria-invalid");
    input.classList.remove("invalid");
}

if (contactForm) {
    const nameInput = contactForm.querySelector("#name");
    const emailInput = contactForm.querySelector("#email");
    const activityInput = contactForm.querySelector("#activity");
    const formSuccess = document.querySelector("#form-success");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateName() {
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Please enter your name.");
            return false;
        }
        clearError(nameInput);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === "") {
            showError(emailInput, "Please enter your email address.");
            return false;
        } else if (!emailPattern.test(email)) {
            showError(emailInput, "Please enter a valid email address.");
            return false;
        }
        clearError(emailInput);
        return true;
    }

    function validateActivity() {
        if (activityInput.value === "") {
            showError(activityInput, "Please choose an activity.");
            return false;
        }
        clearError(activityInput);
        return true;
    }


    nameInput.addEventListener("input", function () {
        if (nameInput.hasAttribute("aria-invalid")) validateName();
    });
    emailInput.addEventListener("input", function () {
        if (emailInput.hasAttribute("aria-invalid")) validateEmail();
    });
    activityInput.addEventListener("change", validateActivity);

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Run every check so all problems show at once
        const results = [validateName(), validateEmail(), validateActivity()];
        const formIsValid = results.every(Boolean);

        if (!formIsValid) {
            formSuccess.textContent = "";
            contactForm.querySelector("[aria-invalid]").focus();
        } else {
            formSuccess.textContent =
                "Thank you for your submission!";
                console.log("Successful Form Submission");
            contactForm.reset();
        }
    });
};

// Mobile Navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");
const mobileLayout = window.matchMedia("(max-width: 600px)");

if (menuButton && navigation) {
    document.documentElement.classList.add("js"); // CSS only collapses the nav once JS is running
    menuButton.hidden = false;

    function setMenuState(isOpen) {
        navigation.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.querySelector(".menu-label").textContent = isOpen ? "Close" : "Menu";
    }

    menuButton.addEventListener("click", function () {
        setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
    });

    // Close after choosing a link on a phone
    navigation.addEventListener("click", function (event) {
        if (event.target.closest("a") && mobileLayout.matches) {
            setMenuState(false);
        }
    });

    // Escape closes the menu and returns focus to the button
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
            setMenuState(false);
            menuButton.focus();
        }
    });

    // Click outside the header closes the menu
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".site-header")) setMenuState(false);
    });

    // Reset when the window crosses the 600px breakpoint
    mobileLayout.addEventListener("change", function () {
        const restoreFocus = mobileLayout.matches && navigation.contains(document.activeElement);
        setMenuState(false);
        if (restoreFocus) menuButton.focus();
    });
}

//Gallery slider
const slider = document.querySelector(".slider");

if (slider) {
    const track = slider.querySelector(".slides");
    const slides = slider.querySelectorAll(".slide");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const counter = document.querySelector(".slider-count");
    let current = 0;

    function showSlide(index) {
        current = (index + slides.length) % slides.length; // wraps around
        track.style.transform = "translateX(-" + (current * 100) + "%)";
        slides.forEach((slide, i) => slide.setAttribute("aria-hidden", i !== current));
        counter.textContent = (current + 1) + " / " + slides.length;
    }

    prevBtn.addEventListener("click", () => showSlide(current - 1));
    nextBtn.addEventListener("click", () => showSlide(current + 1));

    slider.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") showSlide(current - 1);
        if (e.key === "ArrowRight") showSlide(current + 1);
    });

    showSlide(0);
}