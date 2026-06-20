const popoverTrigger = document.getElementById("popover-trigger");
const popoverContainer = document.getElementById("popoverContainer");

const popoverObserver = new ResizeObserver(() => {
  const isPopoverVisible = !popoverContainer.classList.contains("hide");

  if (!isPopoverVisible) {
    return;
  }

  resolvePopoverPosition();
  applyPopoverStyles();
});

function openPopover() {
  document.addEventListener("scroll", resolvePopoverPosition);
  document.addEventListener("keydown", keydownClose);

  popoverContainer.classList.remove("hide");
  popoverContainer.setAttribute("aria-hidden", "false");
  popoverTrigger.setAttribute("aria-expanded", "true");

  applyPopoverStyles();
  resolvePopoverPosition();
}

function closePopover() {
  popoverContainer.classList.add("hide");
  popoverContainer.setAttribute("aria-hidden", "true");
  popoverTrigger.setAttribute("aria-expanded", "false");

  document.removeEventListener("scroll", resolvePopoverPosition);
  document.removeEventListener("keydown", keydownClose);
}

function resolvePopoverPosition() {
  const popoverClient = popoverContainer.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const topFraction = popoverClient.top / viewportHeight;
  const topPercentage = topFraction * 100;

  const currentPosition = popoverContainer.dataset.position;

  if (Math.round(topPercentage) <= 0 && currentPosition === "top") {
    popoverContainer.dataset.position = "bottom";
    return;
  }

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
    const horizontalPaddingPerSide = 24;
    const popoverWidth = `${viewportWidth - horizontalPaddingPerSide * 2}px`;

    popoverContainer.style.width = popoverWidth;
    popoverContainer.style.maxWidth = popoverWidth;
    popoverContainer.style.wordBreak = "break-all";
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
    closePopover();
    return;
  }

  openPopover();
}

function clickOutside(event) {
  const withinBoundaries = event.composedPath().includes(popoverContainer);
  const isPopoverHidden = popoverContainer.classList.contains("hide");

  if (withinBoundaries === false && isPopoverHidden === false) {
    closePopover();
  }
}

function keydownClose(event) {
  if (popoverContainer.classList.contains("hide")) {
    return;
  }

  const { key } = event;

  if (key === "Escape" || key === "Esc") {
    closePopover();
  }
}

popoverObserver.observe(document.body);

document.addEventListener("click", clickOutside);
popoverTrigger.addEventListener("click", popoverTriggerClick);
