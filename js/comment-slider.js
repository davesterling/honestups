const customSlideIndex = {};
let customIntervalId;

function changeCustomSlide(customSliderId, n) {
    clearInterval(customIntervalId);
    customShowSlide(customSliderId, (customSlideIndex[customSliderId] += n));
    startCustomInterval(customSliderId, 10000);
}

function currentCustomSlide(customSliderId, n) {
    customShowSlide(customSliderId, (customSlideIndex[customSliderId] = n));
}

function customShowSlide(customSliderId, n) {
    const customSlides = document.querySelectorAll(`#${customSliderId} .custom-slide`);
    const customDots = document.querySelectorAll(`#${customSliderId} .custom-dot`);

    if (n > customSlides.length) {
        customSlideIndex[customSliderId] = 1;
    } else if (n < 1) {
        customSlideIndex[customSliderId] = customSlides.length;
    } else {
        customSlideIndex[customSliderId] = n;
    }

    for (let i = 0; i < customSlides.length; i++) {
        customSlides[i].classList.remove("active-custom-slide");
    }

    for (let i = 0; i < customDots.length; i++) {
        customDots[i].classList.remove("active-custom-dot");
    }

    const selectedIndex = customSlideIndex[customSliderId] - 1;
    if (customSlides[selectedIndex]) {
        customSlides[selectedIndex].classList.add("active-custom-slide");
        customDots[selectedIndex].classList.add("active-custom-dot");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const customSliderId = 'custom-comment-slider3';
    customShowSlide(customSliderId, 1);

    startCustomInterval(customSliderId, 10000);
});

function autoIndex(customSliderId) {
    const customSlides = document.querySelectorAll(`#${customSliderId} .custom-slide`);

    if (customSlideIndex[customSliderId] === undefined) {
        customSlideIndex[customSliderId] = 1;
    } else {
        customSlideIndex[customSliderId] = (customSlideIndex[customSliderId] + 1) % customSlides.length;
    }

    customShowSlide(customSliderId, customSlideIndex[customSliderId]);
}


function startCustomInterval(customSliderId, customIntervalDelay) {
    customIntervalId = setInterval(function () {
        autoIndex(customSliderId);
    }, customIntervalDelay);
}


