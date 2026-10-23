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
            contactForm.reset();
        }
    });
};


const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");
 
function setMenuState(isOpen) {
    navigation.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "Close" : "Menu";
}
 
if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        setMenuState(!navigation.classList.contains("open"));
    });
 
    // Escape closes the menu and returns focus to the button
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && navigation.classList.contains("open")) {
            setMenuState(false);
            menuButton.focus();
        }
    });
}
console.log(document.querySelector(".menu-toggle"), document.querySelector("#main-navigation"));