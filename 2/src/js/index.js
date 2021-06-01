import $ from "jquery";
import "../styles/main.scss";
import "slick-carousel";
import { showMenuToggle } from "./showMenuToggle";
import { scrollFunc } from "./scrollFunc";
import { plansContainerCarousel } from "./plansContainerCarousel";
import { showSectionFunc } from "./showSectionFunc";
import { hideAll } from "./hideAll";

$(document).ready(function () {
  if (window.innerWidth > 767) {
    hideAll(document.querySelectorAll("main > section"));
  }
  $(".slider-1").slick({
    dots: true,
    arrows: false,
    autoPlay: true,
    autoplaySpeed: 30000,
  });

  $(".companies-sl").slick({
    arrows: false,
    dots: true,
    asNavFor: ".companies-list",
    autoPlay: true,
    autoplaySpeed: 15000,
  });
  $(".companies-list").slick({
    slidesToShow: 5,
    asNavFor: ".companies-sl",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 5,
          arrows: false,
          dots: false,
          infinite: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          arrows: false,
          dots: false,
          infinite: false,
        },
      },
    ],
  });
  plansContainerCarousel();
  window.addEventListener("resize", plansContainerCarousel);
  $("#hamburger").on("click", showMenuToggle);
  $(document).on("scroll", scrollFunc);
  $(document).on("scroll", showSectionFunc);
});
