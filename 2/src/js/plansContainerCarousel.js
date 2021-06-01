import $ from "jquery";
export const plansContainerCarousel = () => {
  $(".plans-items").slick({
    responsive: [
      {
        breakpoint: 4000,
        settings: "unslick",
      },
      {
        breakpoint: 1025,
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 3,
          infinite: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          dots: false,
          slidesToShow: 1,
          centerMode: true,
          infinite: false,
        },
      },
    ],
  });
};
