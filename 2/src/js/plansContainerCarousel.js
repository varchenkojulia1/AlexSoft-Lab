import $ from "jquery";
export const plansContainerCarousel = () => {
  $(".plans-items").slick({
    mobileFirst: true,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
      {
        breakpoint: 1325,
        settings: "unslick",
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          centerMode: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        },
      },
    ],
  });
};
