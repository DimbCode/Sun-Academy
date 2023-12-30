// Variables

// Range Variables

const slider = document.querySelector(".modal-window__range");

// Drop-Downs Variables

const dropDowns = document.querySelectorAll(".drop-down-btn");
const overDropDowns = document.querySelectorAll(".drop-down-btn_over");
const overLinks = document.querySelectorAll(".home .drop-down-list_over .drop-down-list__link");

// Modal Windows Variables

const modalButtons = document.querySelectorAll("button[data-modal]");
const modalWindows = document.querySelectorAll("div[data-modal], aside[data-modal]");

// Carts Variables

const countButtons = document.querySelectorAll("button[data-count]");

// Search Variables

const searchButtons = document.querySelectorAll(".header__search-btn");

// Filter Variables

const filterButtons = document.querySelectorAll(".modal-window__filter-btn");

// System Variables

const headerHeight = document.querySelector(".header__middle").offsetHeight + parseFloat(getComputedStyle(document.querySelector(".wrapper")).gap);
const headerHeight2 = document.querySelector(".header__middle_scroll").offsetHeight;
const wrapperHeight = document.querySelector(".wrapper__container").offsetTop;
const wrapper = document.querySelector(".wrapper__wrapper");
const sidePanel = document.querySelector(".side-panel");
const scrollHeader = document.querySelector(".header__middle_scroll");
const scrollBtn = document.querySelector(".scroll-up-btn");

sidePanel.style.maxHeight = document.documentElement.offsetHeight - scrollHeader.offsetHeight + "px";

window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > headerHeight) {
        scrollHeader.classList.remove("none");
    }   else {
        scrollHeader.classList.add("none");
    }

    if (document.documentElement.scrollTop >= wrapperHeight) {
        sidePanel.style.top = headerHeight2 + "px";
    }   else {
        // sidePanel.style.top = 100 + "px";
    }

    if (document.documentElement.scrollTop >= 10) {
        scrollBtn.classList.remove("none");
    }   else {
        scrollBtn.classList.add("none");
    }
});

// System Variables

const resolve = document.documentElement.offsetWidth;

if (resolve <= 500) {
    sidePanel.classList.add("none");
}

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

function setIcon(currentBtn, resultBtn) {
    // let classNames1 = currentBtn.className.split(" ");
    // let classNames2 = resultBtn.className.split(" ");
    // let cl1, cl2;

    // classNames1.forEach(item => {
    //     if (item.startsWith("ic-")) {
    //         cl1 = item;
    //     }
    // });

    // classNames2.forEach(item => {
    //     if (item.startsWith("ic-")) {
    //         cl2 = item;
    //     }
    // });

    // console.log(classNames1, classNames2, cl1, cl2)

    if (!(currentBtn.classList.contains("drop-down-list__link_reverse"))) {
        resultBtn.classList.remove("drop-down-list__link_reverse");
    }   else {
        resultBtn.classList.add("drop-down-list__link_reverse");
    }
    
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

overLinks.forEach(item => {
    item.addEventListener("click", (event) => {

        const btn = event.currentTarget.parentElement
                                    .parentElement
                                    .parentElement
                                    .previousElementSibling
                                    .children[0];

        btn.textContent = event.currentTarget.textContent;
        event.preventDefault();
        
        setIcon(item, btn);
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

            if (dropDown.getAttribute("data-open") == "false") {
                hiddenDropDown(dropDown, currentBtn, "active-btn");
            }
            
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