export const scrollFunc = (e) => {
  const headerMenu = document.getElementById("header");

  let coordinates = 600;
  if (window.innerWidth < 1024 && window.innerWidth > 767) {
    // breakpoints for tablet
    coordinates = 400;
  } else if (window.innerWidth < 767) {
    // breakpoints for mobile
    coordinates = 300;
  }

  if (+window.pageYOffset > coordinates) {
    headerMenu.classList.add("gray-header");
  } else {
    headerMenu.classList.remove("gray-header");
  }
};
