import $ from "jquery";

export const componentSlider = () => {
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
};
