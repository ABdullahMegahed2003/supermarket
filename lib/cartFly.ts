export function triggerCartFly(
  productImage: string,
  sourceElement: HTMLElement | null
) {
  const animationDurationMs = 1800;
  const cartButton = document.querySelector(
    '[aria-label="الانتقال إلى سلة التسوق"]'
  ) as HTMLElement | null;

  if (!sourceElement || !cartButton) {
    return;
  }

  const sourceRect = sourceElement.getBoundingClientRect();
  const cartRect = cartButton.getBoundingClientRect();

  const ghost = document.createElement("div");
  ghost.className = "cart-fly-ghost";

  const image = document.createElement("img");
  image.src = productImage;
  image.alt = "";

  ghost.appendChild(image);
  document.body.appendChild(ghost);

  const dx =
    cartRect.left + cartRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
  const dy =
    cartRect.top + cartRect.height / 2 - (sourceRect.top + sourceRect.height / 2);

  ghost.style.width = `${sourceRect.width}px`;
  ghost.style.height = `${sourceRect.height}px`;
  ghost.style.left = `${sourceRect.left}px`;
  ghost.style.top = `${sourceRect.top}px`;
  ghost.style.opacity = "1";
  ghost.style.transform = "translate(0, 0) scale(1)";

  ghost.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.18)`, opacity: 0 },
    ],
    {
      duration: animationDurationMs,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    }
  );

  window.setTimeout(() => {
    ghost.remove();
  }, animationDurationMs + 100);
}

