// Variables

// Range Variables

const slider = document.querySelector(".modal-window__range");

// Drop-Downs Variables

const dropDowns = document.querySelectorAll(".drop-down-btn");
const overDropDowns = document.querySelectorAll(".drop-down-btn_over");

// Modal Windows Variables

const modalButtons = document.querySelectorAll("button[data-modal]");
const modalWindows = document.querySelectorAll("div[data-modal]");

// Carts Variables

const countButtons = document.querySelectorAll("button[data-count]");

// Search Variables

const searchButtons = document.querySelectorAll(".header__search-btn");

// Filter Variables

const filterButtons = document.querySelectorAll(".modal-window__filter-btn");

// Header Variables

const headerHeight = document.querySelector(".header").offsetHeight + parseFloat(getComputedStyle(document.querySelector(".wrapper")).gap);
const wrapper = document.querySelector(".wrapper__wrapper");

wrapper.style.paddingTop = headerHeight + "px";

// System Variables

const resolve = document.documentElement.offsetWidth;

// Functions

function toggleDropDown(elem, currentEl, activeCl) {
    elem.classList.toggle("none");
    currentEl.classList.toggle(activeCl);
}

function openDropDown(elem, currentEl, activeCl) {
    elem.classList.remove("none");
    currentEl.classList.add(activeCl);
}

function hiddenDropDown(elem, currentEl, activeCl) {
    elem.classList.add("none");
    currentEl.classList.remove(activeCl);
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
        let dropDown = event.currentTarget.nextElementSibling;

        if (event.currentTarget.classList.contains("side-panel__link-drop-down-item")) {
            dropDown = event.currentTarget.parentElement.nextElementSibling;
            toggleDropDown(dropDown, event.currentTarget.parentElement, "active-btn");
        }   else {
            toggleDropDown(dropDown, event.currentTarget, "active-btn");
        }
    });
});

if (resolve <= 768) {

    overDropDowns.forEach(item => {
        item.addEventListener("click", (event) => {
            const dropDown = event.currentTarget.nextElementSibling;
            toggleDropDown(dropDown, event.currentTarget, "active-btn");
        });
    });

}   else {
    let dropDownLists = document.querySelectorAll(".drop-down-list_over");

    dropDownLists.forEach(item => item.setAttribute("data-open", "false"));

    overDropDowns.forEach(item => {
        item.addEventListener("mouseenter", (event) => {
            const dropDown = event.currentTarget.nextElementSibling;
            openDropDown(dropDown, event.currentTarget, "active-btn");
        });
    });

    overDropDowns.forEach(item => {
        item.addEventListener("mouseleave", (event) => {
            const dropDown = event.currentTarget.nextElementSibling;
            const currentBtn = event.currentTarget;

            setTimeout(function () {
                if (dropDown.getAttribute("data-open") == "false") {
                    hiddenDropDown(dropDown, currentBtn, "active-btn");
                }
            }, 500);
            
        });
    });

    dropDownLists.forEach(item => {
        item.addEventListener("mouseenter", (event) => {
            const currentBtn = event.currentTarget.closest(".drop-down-list").previousElementSibling;
            
            event.currentTarget.setAttribute("data-open", "true");
            openDropDown(event.currentTarget, currentBtn, "active-btn");
        });
    })

    dropDownLists.forEach(item => {
        item.addEventListener("mouseleave", (event) => {
            const currentBtn = event.currentTarget.closest(".drop-down-list").previousElementSibling;
            event.currentTarget.setAttribute("data-open", "false");

            hiddenDropDown(event.currentTarget, currentBtn, "active-btn");
        });
    })
}



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
                currentBtn.classList.add("service__cart-btn_in");
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
                currentBtn.classList.remove("service__cart-btn_in");
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

// Filter Events

filterButtons.forEach(item => {
    item.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle("modal-window__filter-btn_active");
    });
});