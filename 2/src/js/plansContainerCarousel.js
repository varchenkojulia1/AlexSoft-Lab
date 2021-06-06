import $ from "jquery";
export const plansContainerCarousel = () => {
  $(".plans-items").slick({
    mobileFirst: true,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: "unslick",
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
