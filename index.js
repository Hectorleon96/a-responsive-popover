const popoverTrigger = document.getElementById("popover-trigger");
const popoverContainer = document.getElementById("popoverContainer");

const popoverObserver = new ResizeObserver((entries) => {
  for (let entrie of entries) {
    if (entrie.target.nodeName === "BODY") {
      const isPopoverVisible = !popoverContainer.classList.contains("hide");

      if (!isPopoverVisible) {
        return;
      }

      resolvePopoverPosition();
      applyPopoverStyles();
    }
  }
});

function resolvePopoverPosition() {
  const popoverClient = popoverContainer.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const fromTop = popoverClient.top;
  const topFraction = popoverClient.top / viewportHeight;
  const topPercentage = topFraction * 100;

  const currentPosition = popoverContainer.dataset.position;

  if (Math.round(topPercentage) <= 0 && currentPosition === "top") {
    popoverContainer.dataset.position = "bottom";
    return;
  }

  const fromBottom = popoverClient.bottom;
  const bottomFraction = popoverClient.bottom / viewportHeight;

  if (bottomFraction >= 1 && currentPosition === "bottom") {
    popoverContainer.dataset.position = "top";
  }
}

function applyPopoverStyles() {
  const viewportWidth = window.innerWidth;

  const MOBILE_WIDTH_PIXELS = 425;
  const isMobile = viewportWidth <= MOBILE_WIDTH_PIXELS;

  if (isMobile) {
    const calculedWidth = `${viewportWidth - 24 * 2}px`;
    popoverContainer.style.width = calculedWidth;
    popoverContainer.style.maxWidth = calculedWidth;
    popoverContainer.style.wordBreak = "all";
  } else {
    popoverContainer.style.width = "auto";
    popoverContainer.style.maxWidth = "350px";
    popoverContainer.style.wordBreak = "unset";
  }
}

function popoverTriggerClick(event) {
  event.stopPropagation();

  const isVisible = !popoverContainer.classList.contains("hide");

  if (isVisible) {
    popoverContainer.classList.add("hide");
    document.removeEventListener("scroll", resolvePopoverPosition);
    return;
  }

  document.addEventListener("scroll", resolvePopoverPosition);
  popoverContainer.classList.remove("hide");
  applyPopoverStyles();
  resolvePopoverPosition();
}

function clickOutside(event) {
  const withinBoundaries = event.composedPath().includes(popoverContainer);

  const isPopoverVisible = popoverContainer.classList.contains("hide");

  if (withinBoundaries === false && isPopoverVisible === false) {
    popoverContainer.classList.add("hide");
  }
}

popoverObserver.observe(document.querySelector("body"));
document.addEventListener("click", clickOutside);
popoverTrigger.addEventListener("click", popoverTriggerClick);
