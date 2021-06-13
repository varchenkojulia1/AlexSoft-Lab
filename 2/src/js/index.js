import $ from "jquery";
import "../styles/main.scss";
import "slick-carousel";
import { showMenuToggle } from "./showMenuToggle";
import { scrollFunc } from "./scrollFunc";
import { plansContainerCarousel } from "./plansContainerCarousel";
import { showSectionFunc } from "./showSectionFunc";
import { hideAll } from "./hideAll";
import { componentSlider } from "./companiesSlider";

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

  componentSlider();
  plansContainerCarousel();

  window.addEventListener("resize", plansContainerCarousel);
  // window.addEventListener("resize", componentSlider);

  $("#hamburger").on("click", showMenuToggle);
  $(document).on("scroll", scrollFunc);
  $(document).on("scroll", showSectionFunc);
});
