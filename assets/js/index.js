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

modalWindows.forEach(item => {
    item.addEventListener("click", (event) => {
        if (event.target == event.currentTarget) {
            item.classList.add("none");
        }
    });
});

// Cart Buttons Windows

countButtons.forEach(item => {
    item.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;
        const btnAttrName = currentBtn.getAttribute("data-count-name");
        const btnAttrValue = currentBtn.getAttribute("data-count");
        const cartCounts = document.querySelectorAll(`*[data-count-count]`);
        const cartCountsCurrentType = Array.from(cartCounts).filter(item => item.getAttribute("data-count-name") == btnAttrName);
        
        if (btnAttrValue == "false") {
            if (btnAttrName == "cart") {
                currentBtn.textContent = "В корзине";
            }
            
            currentBtn.setAttribute("data-count", "true");
            currentBtn.classList.add("btn-counted");

            cartCountsCurrentType.forEach(counter => {
                counter.textContent = +(counter.textContent) + 1;
                counter.setAttribute("data-count-count", counter.getAttribute("data-count-count") + 1);
            });
        }   else {
            if (btnAttrName == "cart") {
                currentBtn.textContent = "В корзину";
            }

            currentBtn.setAttribute("data-count", "false");
            currentBtn.classList.remove("btn-counted");

            cartCountsCurrentType.forEach(counter => {
                counter.textContent = +(counter.textContent) - 1;
                counter.setAttribute("data-count-count", counter.getAttribute("data-count-count") - 1);
            });
        }
    });
});

// Search Events

searchButtons.forEach(item => {
    item.addEventListener("click", (event) => {
        event.currentTarget.parentElement.classList.toggle("header__search_active");
    });
});