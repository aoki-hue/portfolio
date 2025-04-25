document.addEventListener("DOMContentLoaded", () => {
  scrollTo();
  skillListCreate(null);
  filterSkillList();
  clickWorking();
  new Validator("contactForm", "confirmBtn", "submitBtn");
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

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      clearInterval(autoPlayInterval);
      slide.style.transform = "";
    } else {
      currentIndex = 0;
      resetAutoPlayInterval();
    }
  });
};

/**
 * スキル一覧描画
 */
const skillListCreate = (filterItems) => {
  const jsonFile = "assets/json/available-skill.json";
  const htmlInsert = document.querySelector(".js-createSkillList");
  const skillStatus = document.querySelector(".js-skill-status");

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
      let duplicatedArray = []; // 重複込みの配列
      let skillArray = []; // HTML生成用の配列

      // jsonファイルを絞り込み、HTML生成用のオブジェクトを生成
      if (filterItems !== null) {
        filterItems.forEach((item) => {
          let resultArray;

          resultArray = array.filter((value) => {
            if (item.indexOf("年") < 0) {
              return value.status === item;
            } else {
              switch (item) {
                case "-年":
                  return value.duration === "-";
                case "0年～2年":
                  return value.duration >= 0 && value.duration <= 2;
                case "3年～5年":
                  return value.duration >= 3 && value.duration <= 5;
                case "6年以上":
                  return value.duration >= 6;
              }
            }
          });

          resultArray.forEach((item) => {
            duplicatedArray.push(item);
          });
        });

        // オブジェクト内の値の重複チェック
        skillArray = duplicatedArray.filter((item, index, array) => {
          return array.findIndex((nextItem) => item.id === nextItem.id) === index;
        });

        // 絞り込みのステータスを描画
        let statusHtml = "";
        filterItems.forEach((item) => {
          switch (item) {
            case "得意":
              statusHtml += `<span class="skill-filter__status--item skillful">${item}</span>`;
              break;
            case "普通":
              statusHtml += `<span class="skill-filter__status--item usual">${item}</span>`;
              break;
            case "勉強中":
              statusHtml += `<span class="skill-filter__status--item studying">${item}</span>`;
              break;
            default:
              if (item !== "") {
                statusHtml += `<span class="skill-filter__status--item duration">経験年数： ${item}</span>`;
              }
              break;
          }
        });
        skillStatus.innerHTML = statusHtml;
      } else {
        skillArray = array;
      }

      // HTML生成
      skillArray.forEach((item) => {
        addHtml += `<li class="skill__list">`;
        addHtml += `<img src="assets/image/skill/${item.image.src}" alt="${item.image.alt}" class="skill__list--image" />`;
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
const filterSkillList = () => {
  const modalFilter = document.querySelector(".js-skill-filter-modal");
  const filterBtn = document.querySelector(".js-skill-filter-button");

  // モーダルを開く
  modalFilter.addEventListener("click", () => {
    modalBackground.classList.remove("hidden");
    modalSkillContent.classList.remove("hidden");
  });

  // 選択した項目を格納する
  filterBtn.addEventListener("click", () => {
    const checkedItems = document.querySelectorAll("input[name=proficiency]:checked");
    const selectedItem = document.getElementById("duration");
    let filterItemsArray = [];

    // checkboxでcheckedされた項目のvalue値を格納
    checkedItems.forEach((item) => {
      filterItemsArray.push(item.value);
    });

    // selectBoxのvalue値を格納
    filterItemsArray.push(selectedItem.value);

    modalCloseProcessing();
    skillListCreate(filterItemsArray);
  });
};

/**
 * 実績項目を押下した際の処理
 */
const clickWorking = () => {
  const workingItems = document.querySelectorAll(".js-working-item");
  const workingItemCreate = document.querySelector(".js-modal-working-content");

  workingItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      let workingHtml = "";
      console.log(event.target);

      // モーダルを開く
      modalBackground.classList.remove("hidden");
      modalWorkingContent.classList.remove("hidden");

      // 実績のリンクを生成
      workingHtml += `<img src="${event.target.src}" alt="${event.target.alt}" class="working-modal__working--image" />`;
      workingHtml += `<a href="${event.target.dataset.link}" class="working-modal__working--link" target="_blank">${event.target.dataset.link}</a>`;
      workingHtml += `<p class="working-modal__working--text">${event.target.dataset.description}</p>`;

      workingItemCreate.innerHTML = workingHtml;
    });
  });
};

/**
 * モーダルを閉じる処理
 */
const modalCloseBtn = document.querySelectorAll(".js-modal-close");
const modalBackground = document.querySelector(".js-modal-background");
const modalSkillContent = document.querySelector(".js-modal-skill");
const modalWorkingContent = document.querySelector(".js-modal-working");

modalCloseBtn.forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    modalCloseProcessing();
  });
});

const modalCloseProcessing = () => {
  modalBackground.classList.add("hidden");
  modalSkillContent.classList.add("hidden");
  modalWorkingContent.classList.add("hidden");
};

/**
 * バリデーション
 */
class Validator {
  constructor(formId, confirmBtnId, submitBtnId) {
    this.form = document.getElementById(formId);
    this.inputs = document.querySelectorAll(".js-validate-input");
    this.inputTexts = document.querySelectorAll(".js-input-text");
    this.confirmButton = document.getElementById(confirmBtnId);
    this.submitButton = document.getElementById(submitBtnId);
    this.backButton = document.getElementById("backBtn");

    this.init();
  }

  init() {
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        // 各inputで値が入力された際
        this.validate(input);
        this.toggleSubmitButton();
      });
    });

    this.toggleSubmitButton(); // 初期状態でのチェック
    this.toggleConfirmPage();
  }

  validate(input) {
    const type = input.dataset.type;
    const value = input.value.trim();
    const errorElement = document.getElementById(`${input.id}Error`);
    const inputTextElement = document.getElementById(`${input.id}InputText`);

    let errorMessage = "";

    // 入力チェック
    if (!value) {
      errorMessage = "この項目は必須です。";
    } else {
      switch (type) {
        case "email":
          if (!this.validateEmail(value)) {
            errorMessage = "有効なメールアドレスを入力してください。";
          }
          break;
        case "tel":
          if (!this.validateTel(value)) {
            errorMessage = "有効な電話番号を入力してください。";
          }
          break;
        case "textarea":
          if (value.length < 10) {
            errorMessage = "10文字以上入力してください。";
          }
          break;
      }
    }

    errorElement.textContent = errorMessage;
    inputTextElement.textContent = value;
  }

  validateEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  validateTel(tel) {
    const regex = /0[1-9]\d{0,3}[-(]\d{1,4}[-)]\d{4}$/;
    return regex.test(tel);
  }

  toggleSubmitButton() {
    const allValid = Array.from(this.inputs).every((input) => {
      const type = input.dataset.type;
      const value = input.value.trim();

      if (!value) false;

      switch (type) {
        case "email":
          return this.validateEmail(value);
        case "tel":
          return this.validateTel(value);
        case "textarea":
          return value.length >= 10;
        default:
          return value;
      }
    });

    this.confirmButton.disabled = !allValid;
    this.submitButton.disabled = !allValid;
  }

  toggleConfirmPage() {
    this.confirmButton.addEventListener("click", () => {
      this.confirmButton.style.display = "none";
      this.backButton.style.display = "block";
      this.submitButton.style.display = "block";

      this.inputs.forEach((input) => {
        input.style.display = "none";
      });

      this.inputTexts.forEach((text) => {
        text.style.display = "block";
      });
    });

    this.backButton.addEventListener("click", () => {
      this.confirmButton.style.display = "block";
      this.backButton.style.display = "none";
      this.submitButton.style.display = "none";

      this.inputs.forEach((input) => {
        input.style.display = "block";
      });

      this.inputTexts.forEach((text) => {
        text.style.display = "none";
      });
    });
  }
}

/**
 * ページ内スクロール
 */
const scrollTo = () => {
  document.querySelectorAll(".js-scrollTo").forEach((anchor) => {
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
