document.addEventListener("DOMContentLoaded", () => {
  scrollTo();
  skillListCreate();
  filterSkillList();
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
 * スキル一覧描画
 */
const skillListCreate = () => {
  const jsonFile = "/assets/json/available-skill.json";
  const htmlInsert = document.querySelector(".js-createSkillList");

  fetch(jsonFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${jsonFile}. HTTP Status: ${response.status}`);
      }

      return response.json();
    })
    .then((array) => {
      let addHtml = "";
      let statusClass;

      // HTML生成
      array.forEach((item) => {
        addHtml += `<li class="skill__list">`;
        addHtml += `<img src="/assets/image/skill/${item.image.src}" alt="${item.image.alt}" class="skill__list--image" />`;
        addHtml += `<p class="skill__list--name">${item.name}</p>`;
        switch (item.status) {
          case "得意":
            statusClass = "skillful";
            break;
          case "普通":
            statusClass = "usual";
            break;
          case "勉強中":
            statusClass = "studying";
            break;
        }
        addHtml += `<span class="skill__list--status ${statusClass}">${item.status}</span>`;
        addHtml += `<p class="skill__list--duration"><span>経験年数：&nbsp;</span>${item.duration}年</p>`;
        addHtml += `</li>`;
      });

      htmlInsert.innerHTML = addHtml;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

/**
 * スキル一覧絞り込み
 */
const filterSkillList = () => {};

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
