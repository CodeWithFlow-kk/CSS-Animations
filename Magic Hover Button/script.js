(function () {
  const btn = document.getElementById("magicBtn");
  const scene = document.querySelector(".scene");

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();
    const cx = rect.left + rect.width / 2 - sceneRect.left;
    const cy = rect.top + rect.height / 2 - sceneRect.top;

    const colors = ["#00ffff", "#ffffff", "#8a2be2"];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("span");
      p.className = "particle";
      const size = Math.floor(rand(6, 18));
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = cx - size / 2 + "px";
      p.style.top = cy - size / 2 + "px";
      const color = colors[Math.floor(rand(0, colors.length))];
      p.style.background = color;
      p.style.opacity = "1";
      p.style.transform = `translate(0px,0px) scale(1) rotate(0deg)`;
      p.style.transition =
        "transform 700ms cubic-bezier(.18,.9,.32,1), opacity 700ms linear";

      scene.appendChild(p);

      // force reflow then animate
      requestAnimationFrame(() => {
        const angle = rand(0, Math.PI * 2);
        const distance = rand(60, 240);
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const rotate = rand(-720, 720);
        const scale = rand(0.4, 1.6);
        p.style.transform = `translate(${dx}px, ${dy}px) scale(${scale}) rotate(${rotate}deg)`;
        p.style.opacity = "0";
      });

      // cleanup
      setTimeout(() => {
        if (p && p.parentNode) p.parentNode.removeChild(p);
      }, 800);
    }

    // small button press feedback
    btn.style.transition = "transform 120ms ease";
    btn.style.transform = "translateY(2px) scale(.98)";
    setTimeout(() => {
      btn.style.transform = "";
    }, 160);
  });

  // optional: keyboard activation with space/enter
  btn.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      btn.click();
    }
  });
})();
