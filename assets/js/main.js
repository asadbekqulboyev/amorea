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
    initialSlide: 2,
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
        locale: "ru",
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
      $(".first").click(function () {
        const pickerValue = $("#datepicker").val();
        if (pickerValue && pickerValue.length > 0) {
          $(this).parents(".modal_content").next().fadeIn();
          $(this).parents(".modal_content").fadeOut(0);
        } else {
          $("#datepicker").focus(); // Inputga fokus qilish
        }
      });
    }
  });
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
