export const showSectionFunc = () => {
  const sections = document.querySelectorAll("main > section"),
    breakpointsDesktop = [600, 1200, 2000, 3000, 3500, 3800],
    breakpointsTablet = [300, 1200, 1900, 3100, 3700, 4100];
  let currentBreakpoints =
    window.innerWidth <= 1024 ? breakpointsTablet : breakpointsDesktop;

  sections.forEach((section, index) => {
    if (window.pageYOffset >= currentBreakpoints[index]) {
      if (window.innerWidth <= 1024 && index === 0) {
        section.style.opacity = "1";
        document.getElementById("textWrapper").style.opacity = "1";
        setTimeout(() => {
          document.getElementById("imgWrapper").style.opacity = "1";
        }, 1000);
      } else {
        section.style.opacity = "1";
      }
    }
  });
};
