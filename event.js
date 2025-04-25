let menu = document.querySelector('#menu-bar');
let nabvar = document.querySelector('.navbar');
menu.onclick = () => {
  menu.classList.toggle('fa-times');
  nabvar.classList.toggle('active');
}
window.onscroll = () => {
  menu.classList.remove('fa-times');
  nabvar.classList.remove('active');
}

var swiper = new Swiper(".home-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
});
var swiper = new Swiper(".reviews-slider", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  speacBetween: 100,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    700: {
      slidesPerView: 2,
    },
    1050: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  }
});
