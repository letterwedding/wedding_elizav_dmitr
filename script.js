const playButton = document.querySelector(".play-button");
const form = document.querySelector(".form");
const statusNode = document.querySelector(".form-status");

if (playButton) {
  playButton.addEventListener("click", () => {
    const pressed = playButton.getAttribute("aria-pressed") === "true";
    playButton.setAttribute("aria-pressed", String(!pressed));
    playButton.textContent = pressed ? "Включить вайб" : "Вайб включен";
  });
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem("wedding-90-rsvp", JSON.stringify(data));
    statusNode.textContent = "Ответ сохранён. Потом подключим отправку в мессенджер.";
    form.reset();
  });
}
