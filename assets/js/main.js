document.addEventListener("DOMContentLoaded", () => {
  scrollTo();
  if (window.innerWidth < 768) {
    slideShow();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    slideShow();
  }
});

/**
 * スライダー
 */
const slideShow = () => {
  const slide = document.getElementById("slide");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const indicatorButtons = document.querySelectorAll(".slide__indicator--list");
  const slideItems = document.querySelectorAll(".role-items__box");
  const totalSlides = slideItems.length;
  const slideBoxWidth = slideItems[0].clientWidth;
  let currentIndex = 0;
  let autoPlayInterval;

  // インジケーターボタン押下時の処理
  indicatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      currentIndex = Number(event.target.dataset.slideCurrent) - 1;
      moveSlide();
      resetAutoPlayInterval();
    });
  });

  const nextClick = () => {
    currentIndex++;
    moveSlide();
    resetAutoPlayInterval();
  };

  const prevClick = () => {
    currentIndex--;
    moveSlide();
    resetAutoPlayInterval();
  };

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(nextClick, 5000);
  };

  const resetAutoPlayInterval = () => {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  };

  const moveSlide = () => {
    currentIndex = currentIndex % totalSlides;

    if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
    }

    slide.style.transform = `translateX(-${(currentIndex % totalSlides) * slideBoxWidth}px)`;

    // インジケータボタンのカレント処理
    indicatorButtons.forEach((button) => {
      button.classList.remove("currentSlide");
    });
    indicatorButtons[currentIndex].classList.add("currentSlide");
  };

  startAutoPlay();

  next.addEventListener("click", () => {
    nextClick();
  });

  prev.addEventListener("click", () => {
    prevClick();
  });
};

/**
 * ページ内スクロール
 */
const scrollTo = () => {
  document.querySelectorAll(".nav__lists--link").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = event.target.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    });
  });
};
