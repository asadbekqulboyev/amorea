$(document).ready(function () {
  $(".header_right--location .item select").niceSelect();

  $(".header__bottom .item select").niceSelect();

  $("#kt_datepicker_1").flatpickr({
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    disableMobile: true,
  });

  $("#kt_datepicker_2").flatpickr({
    enableTime: true,
    dateFormat: "Y-m-d",
    disableMobile: true,
  });

  const swiper = new Swiper(".mySwiper", {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 3,
    speed: 600,
    preventClicks: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 50,
      depth: 350,
      modifier: 1,
      slideShadows: true,
    },
    on: {
      click(event) {
        swiper.slideTo(this.clickedIndex);
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        centeredSlides: true,
      },
      512: {
        slidesPerView: 3,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 3, // 768px va undan katta ekranlar uchun
        centeredSlides: true,
      },
      1024: {
        slidesPerView: 3,
        centeredSlides: true, // 1024px va undan katta ekranlar uchun
      },
    },
  });
  const hero_slides = new Swiper(".hero_sliders", {
    spaceBetween: 11,
    navigation: {
      nextEl: ".next",
      prevEl: ".prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      556: {
        slidesPerView: 1.5,
      },
      768: {
        slidesPerView: 2.2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  new Swiper(".discounted__blog--item", {
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-right",
      prevEl: ".swiper-left",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  // slides
  var slide_items = new Swiper(".slide_items", {
    navigation: {
      prevEl: ".img_prev",
      nextEl: ".img_next",
    },
  });
  $(".item").each(function () {
    // Har bir .item ichida nechta .swiper-slide borligini hisoblaymiz
    let slideCount = $(this).find(".swiper-slide").length;
    $(this).find(".galerea p").text(slideCount);
  });
  // datepicker
  const input = $("#contactInput");
  const errorBox = $(".error-msg");
  const values = {
    telegram: "",
    whatsapp: "",
  };

  const placeholders = {
    telegram: "@имя пользователя",
    whatsapp: "Телефон",
  };

  const masks = {
    telegram: null,
    whatsapp: "+7 (999) 999-99-99",
  };

  function validateTelegram(value) {
    const regex = /^@[\w\d_]{5,32}$/;
    return regex.test(value);
  }

  function applyMask(type) {
    input.inputmask("remove");
    if (masks[type]) {
      input.inputmask({
        mask: masks[type],
        showMaskOnHover: false,
      });
    }
  }

  function showError(message) {
    if (message) {
      errorBox.text(message).addClass("active");
      input.addClass("error");
    } else {
      errorBox.text("").removeClass("active");
      input.removeClass("error");
    }
  }
  function updateUI() {
    const selected = $('input[name="messenger"]:checked').val();

    // Saqlab qo‘yilgan qiymatni qo'yamiz
    input.val(values[selected]).attr("placeholder", placeholders[selected]);

    // Maska qo'yish
    applyMask(selected);

    showError("");
  }

  // Input yozishda qiymatni saqlash
  input.on("input", function () {
    const selected = $('input[name="messenger"]:checked').val();
    let val = $(this).val();

    if (selected === "telegram") {
      if (!val.startsWith("@")) {
        val = "@" + val.replace(/^@+/, "");
        $(this).val(val);
      }

      if (val.length > 1 && !validateTelegram(val)) {
        showError("❌ Username noto‘g‘ri: 5-32 belgi, harf, raqam yoki _");
      } else {
        showError("");
      }
    }

    // Qiymatni saqlash
    values[selected] = val;
  });

  // Messenjer almashtirilganda
  $('input[name="messenger"]').on("change", function () {
    updateUI();
  });

  // Dastlab yuklanganda
  updateUI();
  $(".modal").click(function (e) {
    if ($(e.target).hasClass("modal")) {
      $(this).fadeOut();
    }
  });
  $(".order_btn").click(function (e) {
    e.preventDefault();
    $(".modal").fadeIn();
    if ($("#datepicker").length) {
      let isMobile = window.innerWidth <= 768;
      // Flatpickrni ishga tushirish
      const picker = $("#datepicker").flatpickr({
        mode: "range",
        dateFormat: "d.m.Y",
        minDate: "today",
        showMonths: isMobile ? 1 : 2,
        locale: flatpickr.l10ns.ru,
        appendTo: $(".custom_wrapper").length
          ? $(".custom_wrapper")[0]
          : $("body")[0],
        onChange: function (selectedDates, dateStr, instance) {
          console.log("Selected:", dateStr); // Sana chiqishini tekshiring
          if (dateStr) {
            instance.input.value = dateStr; // Sana inputga yoziladi
          } else {
            console.error("Sanani olishda xato yuz berdi.");
          }
        },
      });

      // Resize eventni qo‘shish va isMobile qiymatini yangilash
      $(window).on("resize", function () {
        isMobile = window.innerWidth <= 768;
        picker.redraw(); // Agar kerak bo‘lsa, flatpickrni qayta chizish
      });

      // "first" tugmasiga bosilganda sana mavjudligini tekshirish
      // $(".first").click(function (e) {
      //   const pickerValue = $("#datepicker").val();
      //   if (pickerValue && pickerValue.length > 0) {
      //     $(this).parents(".modal_content").next().fadeIn();
      //     $(this).parents(".modal_content").fadeOut(0);
      //     e.preventDefault();
      //   } else {
      //     $("#datepicker").focus(); // Inputga fokus qilish
      //   }
      //   if (
      //     $("#contactInput").val().length > 0 &&
      //     $("#firstname").val().length > 0
      //   ) {
      //     $(this).parents(".modal_content").next().fadeIn();
      //     $(this).parents(".modal_content").fadeOut(0);
      //     setTimeout(() => {
      //       $(".modal").fadeOut(); // yoki .hide() bo'lishi mumkin
      //     }, 7000);
      //   }
      // });
    }
  });
  $(".button.first").click(function (e) {
    const pickerValue = $("#datepicker").val(); // #datepicker inputining qiymati
    const contactValue = $("#contactInput").val(); // #contactInput inputining qiymati

    const $currentModal = $(this).parents(".modal_content"); // Hozirgi modal
    const $nextModal = $currentModal.next(".modal_content"); // Keyingi modal

    // Birinchi modal uchun tekshiruv (datepicker)
    if ($currentModal.index() === 0 && pickerValue.length > 10) {
      // Agar #datepicker qiymati 10dan ortiq bo'lsa
      $currentModal.fadeOut(0); // Oldingi modalni yashirish
      $nextModal.fadeIn(); // Keyingi modalni ko'rsatish
    }
    // Ikkinchi modal uchun tekshiruv (contactInput)
    else if ($currentModal.index() === 1 && contactValue.length > 0) {
      // Agar #contactInput to'ldirilgan bo'lsa
      $currentModal.fadeOut(0); // Oldingi modalni yashirish
      $nextModal.fadeIn(); // Keyingi modalni ko'rsatish

      // Agar bu oxirgi modal_content bo‘lsa (keyingisi bo‘lmasa)
      if ($nextModal.length === 0 || $nextModal.hasClass("thanks_modal")) {
        // 7 soniyadan keyin modalni yopish va "Thanks" oynasini ko'rsatish
        setTimeout(() => {
          $(".modal").fadeOut(); // Modalni
        }, 2000); // 7 soniya kutish
      }
    } else {
      // Agar inputlar bo'sh bo'lsa, kerakli inputga fokus qilish
      if ($currentModal.index() === 0 && !pickerValue) {
        $("#datepicker").focus();
      } else if ($currentModal.index() === 1 && !contactValue) {
        $("#contactInput").focus();
      }
    }

    e.preventDefault(); // Formani yuborishni to‘xtatish
  });

  let swiperInstance = null;

  function initMobileSwiper() {
    if (window.innerWidth < 768) {
      if (!swiperInstance) {
        swiperInstance = new Swiper(".sale_slider", {
          slidesPerView: 1,
          grid: {
            rows: 3,
            fill: "row",
          },
          spaceBetween: 16,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
      }
    } else {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
        swiperInstance = null;
      }
    }
  }

  $(document).ready(function () {
    initMobileSwiper();
    $(window).on("resize", function () {
      initMobileSwiper();
    });
  });
  if ($("#sort_select").length) {
    $("#sort_select").niceSelect();
  }
  function initNiceSelectDropdown() {
    // niceSelect ni ishga tushiramiz
    $("select").niceSelect();

    // Select ochilganda boshqalarni yopish
    $(document).on("click", ".nice-select", function (e) {
      // Bosilgan select tashqarisidagi barcha selectlarni yopamiz
      $(".nice-select").not(this).removeClass("open");
      e.stopPropagation(); // document clickga o'tmasin
    });

    // Document bo'yicha bosilsa, barcha ochilgan selectni yopamiz
    $(document).on("click", function () {
      $(".nice-select").removeClass("open");
    });
  }

  if ($("#price_range").length) {
    $("#price_range").ionRangeSlider({
      type: "double",
      min: 1000,
      max: 100000,
      from: 1000,
      to: 100000,
      step: 1000,
      postfix: " ₽",
      skin: "round",
      onStart: updateDisplay,
      onChange: updateDisplay,
    });

    function formatNumber(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function updateDisplay(data) {
      $("#price_from").text(formatNumber(data.from) + " ₽");
      $("#price_to").text(formatNumber(data.to) + " ₽");
    }
    function initPriceDropdown() {
      $(".price_toggle").click(function (e) {
        $(this).toggleClass("active");
        e.stopPropagation(); // toggle bosilganda document.click ishga tushmasin

        const parent = $(this).closest(".price_dropdown");

        // Boshqa popuplarni yopamiz
        $(".price_dropdown .price_popup")
          .not(parent.find(".price_popup"))
          .slideUp(150);

        // Shu popupni ochamiz/yopamiz
        parent.find(".price_popup").slideToggle(150);
      });

      // Tashqariga bosilganda barcha popuplarni yopish
      $(document).click(function () {
        $(".price_popup").slideUp(150);
      });

      // Popup ichiga bosilganda yopilmasin
      $(".price_popup").click(function (e) {
        e.stopPropagation();
      });
    }

    initPriceDropdown();
    $("#tourChoosing1").on("change", function () {
      const selected = $(this).val();
      $("#selectedRegion").text(selected);
    });
  }

  function initDropdown(containerSelector) {
    $(containerSelector).each(function () {
      const $thisContainer = $(this);
      const $input = $thisContainer.find('input[type="text"]#tourChoosing1');
      const $list = $thisContainer.find("#tourChoosing1~.dropdown-list");

      // Dropdown ochilishi
      $input.on("click", function () {
        $list.slideToggle();
      });

      // Checkbox tanlanganda inputni yangilash
      $list.find('input[type="checkbox"]').on("change", function () {
        const selected = $list
          .find('input[type="checkbox"]:checked')
          .map(function () {
            return $(this).val();
          })
          .get()
          .join(", ");
        $input.val(selected);
      });

      // Tashqariga bosilganda dropdownni yopish
    });
  }

  initDropdown(".dropdown-container");

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".dropdown-container#first").length) {
      $(".dropdown-container#first .dropdown-list").slideUp();
    }
    if (!$(e.target).closest(".dropdown-container#last").length) {
      $(".dropdown-container#last .dropdown-list").slideUp();
    }
  });

  function Selects2() {
    const $input = $("#tourChoosing2");
    const $dropdown = $input.next(".dropdown-list");

    // Inputni bosganda dropdownni ochish/yopish
    $input.on("click", function (e) {
      e.stopPropagation();
      $input.toggleClass("active");
      $dropdown.slideToggle();
    });

    // Label tanlanganda inputga qiymat yozish va dropdownni yopish
    $dropdown.find("label").on("click", function () {
      const value = $(this).text().trim();
      $input.val(value);
      $dropdown.slideUp();
      $input.removeClass("active");
    });
  }
  Selects2();

  function initDatePickers(
    checkinSelector = "#checkin",
    checkoutSelector = "#checkout"
  ) {
    const checkinInput = $(checkinSelector)[0];
    const checkoutInput = $(checkoutSelector)[0];

    // Sana formatini to'g'ri sozlash
    const today = new Date().toISOString().split("T")[0];

    const checkin = new AirDatepicker(checkinInput, {
      minDate: today,
      onSelect({ date }) {
        if (date) {
          // checkin sana tanlanganidan so'ng checkoutning minDate ni yangilash
          checkout.update({ minDate: date });

          // tanlangan sana uchun maxsus klass qo'shish
          $(checkoutInput).addClass("active-datepicker");

          // Checkout datepickerni fokus qilish va ochish
          checkout.show();
          $(checkoutInput).focus();

          // Tanlangan sanadan keyin checkin kalendari yopilishi
          checkin.hide();
        }
      },
    });

    const checkout = new AirDatepicker(checkoutInput, {
      minDate: today,
      onSelect() {
        // Checkout kalendari tanlanganidan so'ng u yopiladi
        checkout.hide();
      },
    });

    return { checkin, checkout };
  }

  initDatePickers();
});
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".testimonialSwiper", {
    loop: true,
    spaceBetween: 30,
    // slidesPerView: 3, // Boshlang'ich slaydlar soni
    centeredSlides: true,
    mousewheel: true,
    pagination: {
      el: ".testimonial-pagination",
      clickable: true,
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 3, // 768px va undan katta ekranlar uchun
      },
      1024: {
        slidesPerView: 3, // 1024px va undan katta ekranlar uchun
      },
    },
  });

  if (window.innerWidth <= 1024) {
    let language = document.querySelectorAll(
      ".about .header_right--location .item img"
    );
    language.forEach((img) => {
      if (img.getAttribute("src") == "assets/imges/header_language2.svg") {
        img.setAttribute("src", "assets/imges/header_language.svg");
      } else if (
        img.getAttribute("src") == "assets/imges/header_mone_img2.svg"
      ) {
        img.setAttribute("src", "assets/imges/header_mone_img.svg");
      }
    });
  }
});
