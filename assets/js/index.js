// Variables

// Range Variables

const slider = document.querySelector(".modal-window__range");

// Drop-Downs Variables

const dropDowns = document.querySelectorAll(".drop-down-btn");

// Modal Windows Variables

const buttons = document.querySelectorAll("button");
const modalWindows = document.querySelectorAll("div[data-modal]");

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

buttons.forEach(item => {
    item.addEventListener("click", (event) => {
        const currentBtn = event.currentTarget;

        if (currentBtn.getAttribute("data-modal")) {
            Array.from(modalWindows).forEach(modal => modal.classList.add("none"));
            
            Array.from(modalWindows).forEach(modal => {
                if (modal.getAttribute("data-modal") == currentBtn.getAttribute("data-modal")) {
                    modal.classList.remove("none");
                }
            });
        }
    });
});