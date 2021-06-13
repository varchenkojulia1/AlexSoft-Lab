export const showSectionFunc = () => {
  const sections = document.querySelectorAll("main > section"),
    breakpointsDesktop = [600, 1200, 2000, 3000, 3500, 3800],
    breakpointsTablet = [300, 900, 1500, 2400, 2900, 3300];
  let currentBreakpoints =
    window.innerWidth <= 1024 ? breakpointsTablet : breakpointsDesktop;

  sections.forEach((section, index) => {
    if (window.pageYOffset >= currentBreakpoints[index]) {
      section.classList.remove("is-transparent");
      let time = 0;
      if (window.innerWidth <= 1024 && index === 0) {
        time = 1000;
      }
      document.getElementById("textWrapper").classList.remove("is-transparent");
      document.getElementById("btnGroup").classList.remove("is-transparent");
      setTimeout(() => {
        document
          .getElementById("imgWrapper")
          .classList.remove("is-transparent");
      }, time);
    }
  });
};
