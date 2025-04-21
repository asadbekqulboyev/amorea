$(document).ready(function () {

  $('.header_right--location .item select').niceSelect();

  $('.header__bottom .item select').niceSelect();

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
    loop:true,
    effect: "coverflow",
    grabCursor:true,
    centeredSlides: true,
    initialSlide:2,
    speed:600,
    preventClicks:true,
    coverflowEffect:{
      rotate:0,
      stretch:50,
      depth:350,
      modifier: 1,
      slideShadows:true,
    },
    on:{
      click(event){
        swiper.slideTo(this.clickedIndex);
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
    },
    breakpoints: {
      320:{
        slidesPerView: 1,
        centeredSlides: true,
      },
      512:{
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
      }
    },
  });



  new Swiper('.discounted__blog--item', {
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
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
      }
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
      480:{
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

  if(window.innerWidth<=1024){
    let language = document.querySelectorAll(".about .header_right--location .item img")
    language.forEach((img) =>{
      if(img.getAttribute('src')=='assets/imges/header_language2.svg'){
        img.setAttribute('src','assets/imges/header_language.svg')
      }else if(img.getAttribute('src')=='assets/imges/header_mone_img2.svg'){
        img.setAttribute('src','assets/imges/header_mone_img.svg')
      }
    })
  }
});