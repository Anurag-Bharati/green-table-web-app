const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  console.log("element", element);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};

export default scrollToElement;
