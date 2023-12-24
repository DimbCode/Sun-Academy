// Variables

// Range Variables

const slider = document.querySelector(".modal-window__range");

// Drop-Downs Variables

const dropDowns = document.querySelectorAll(".drop-down-btn");

// Modal Windows Variables

const modalButtons = document.querySelectorAll("button[data-modal]");
const modalWindows = document.querySelectorAll("div[data-modal]");

// Carts Variables

const countButtons = document.querySelectorAll("button[data-count]");

// Search Variables

const searchButtons = document.querySelectorAll(".header__search-btn");

// Functions

function toggleDropDown(elem, currentEl, activeCl) {
    elem.classList.toggle("none");
    currentEl.classList.toggle(activeCl);
}

// Range Events

noUiSlider.create(slider, {
    start: [0, 1000000],
    connect: true,
    range: {
        'min': 0,
        'max': 1000000
    }
});

slider.noUiSlider.on("update", () => {
    const [startInput, endInput] = slider.nextElementSibling.querySelectorAll(".input > input");
    const [startValue, endValue] = slider.noUiSlider.get();

    console.log(startInput, endInput, startValue, endValue);
    
    startInput.value = Math.floor(startValue);
    endInput.value = Math.floor(endValue);
});

// Drop-Downs Events

dropDowns.forEach(item => {
    item.addEventListener("click", (event) => {
        const dropDown = event.currentTarget.nextElementSibling;

        toggleDropDown(dropDown, event.currentTarget, "active-btn");
    });
});

// Modal Windows Events

modalButtons.forEach(item => {
    item.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;

        Array.from(modalWindows).forEach(modal => modal.classList.add("none"));
        
        Array.from(modalWindows).forEach(modal => {
            if (modal.getAttribute("data-modal") == currentBtn.getAttribute("data-modal")) {
                modal.classList.remove("none");
            }
        });
    });
});

// Cart Buttons Windows

countButtons.forEach(item => {
    item.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        const cartCounts = document.querySelectorAll("*[data-count-count]");

        cartCounts.forEach(item => {
            if (item.getAttribute("data-count-name") == currentBtn.getAttribute("data-count-name")) {
                if (currentBtn.getAttribute("data-count") == "false") {
                    if (item.getAttribute("data-count-name") == "cart") {
                        currentBtn.textContent = "В корзине";
                    }
                    currentBtn.setAttribute("data-count", "true");
                    currentBtn.classList.add("btn-counted");
                    item.textContent = +(item.textContent) + 1;
                    item.setAttribute("data-count-count", item.getAttribute("data-count-count") + 1);
                }   else {
                    if (item.getAttribute("data-count-name") == "cart") {
                        currentBtn.textContent = "В корзину";
                    }
                    currentBtn.setAttribute("data-count", "false");
                    currentBtn.classList.remove("btn-counted");
                    item.textContent = +(item.textContent) - 1;
                    item.setAttribute("data-count-count", item.getAttribute("data-count-count") - 1);
                }
            }
        });
    });
});

// Search Events

searchButtons.forEach(item => {
    item.addEventListener("click", (event) => {
        event.currentTarget.parentElement.classList.toggle("header__search_active");
    });
});