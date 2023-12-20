// Modal Variables

const modalWindow = document.querySelector(".mobile-modal");
const skipModalWindow = document.querySelector(".mobile-modal__navbar > .navbar__back-link");
const openModalWindow = document.querySelector(".header__mobile-btn");

// Spoiler Variables

const spoilerButtons = document.querySelectorAll(".question__open-section");

// Functions

function toggleSpoiler(element, cl) {
    element.classList.toggle(cl);
}

function openSpoiler(element, cl) {
    element.classList.remove(cl);
}

function hiddenSpoiler(element, cl) {
    element.classList.add(cl);
}

// Event Listeners

spoilerButtons.forEach(item => {

    item.addEventListener("click", (event) => {
        const buttonElement = event.currentTarget
                                .lastElementChild;
        const spoiler = event.currentTarget
                        .nextElementSibling;
        
        buttonElement.classList.toggle("question__btn_active");
        toggleSpoiler(spoiler, "hidden");
    });

});

openModalWindow.addEventListener("click", () => {
    openSpoiler(modalWindow, "hidden");
});

skipModalWindow.addEventListener("click", (event) => {
    hiddenSpoiler(modalWindow, "hidden");
    event.preventDefault();
});

modalWindow.addEventListener("click", (event) => {
    if (event.target == event.currentTarget) {
        hiddenSpoiler(modalWindow, "hidden");
    }
});

// Sliders

try {
    const firstSlider = new Swiper(".price__slider", {
        direction: "horizontal",
        loop: true,

        slidesPerView: 1,
        spaceBetween: 30,

        pagination: {
            el: ".price__slider-pagination",
            clickable: true,
        },

        // breakpoints: {

        //     790: {
        //         slidesPerView: 2,
        //     }

        // }
    });

    const secondSlider = new Swiper(".examples__slider_first", {
        direction: "horizontal",
        loop: true,

        slidesPerView: 1,
        spaceBetween: 20,

        navigation: {
            nextEl: ".examples__slider-btn_right-first",
            prevEl: ".examples__slider-btn_left-first",
        },

        breakpoints: {

            850: {
                slidesPerView: 4,
            },

            650: {
                slidesPerView: 3,
            },

            400: {
                slidesPerView: 2,
            }

        }
    });

    const thirdSlider = new Swiper(".examples__slider_second", {
        direction: "horizontal",
        loop: true,

        slidesPerView: 1,
        spaceBetween: 20,

        navigation: {
            nextEl: ".examples__slider-btn_right-second",
            prevEl: ".examples__slider-btn_left-second",
        },

        breakpoints: {

            800: {
                slidesPerView: 3,
            },

            550: {
                slidesPerView: 2,
            },

        }
    });
}   catch {
    console.log("Error");
}

// Phone Mask

const phoneMask = () => {
    let setCursorPosition = (position, element) => {
        element.focus();

        if (element.setSelectionRange) {
            element.setSelectionRange(position, position);
        } else if (element.createTextRange) {
            let range = element.createTextRange();

            range.collapse(true);
            range.moveEnd('character', position);
            range.moveStart('character', position);
            range.select();
        }
    };

    function createMask (event) {
        let matrix = '+7 (___) ___-__-__',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        if (def.length >= val.length) {
            val = def;
        }

        this.value = matrix.replace(/./g, a => {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }

        if (this.value.charAt(1) != '7') {
            this.value = '';
            this.blur();
        }
    }

    let inputs = document.querySelectorAll('[type="tel"]');

    inputs.forEach(input => {
        input.maxLength = 30;
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });
};

phoneMask();