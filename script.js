window.addEventListener("DOMContentLoaded", () => {

  const startText = document.getElementById("start-text");
  const music = document.getElementById("bg-music");

  function showScene(scene) {
    document.querySelectorAll(".scene").forEach(s => {
      s.classList.remove("active");
    });

    const target = document.getElementById("scene-" + scene);
    if (target) target.classList.add("active");
  }

  showScene("intro");

  startText?.addEventListener("click", async () => {
    console.log("clicou");

    showScene("loading");

    if (music) {
      music.volume = 0.4;
      music.play().catch(() => {
        console.log("áudio bloqueado");
      });
    }

    setTimeout(() => {
      console.log("indo para texto");
      introTextScene();
    }, 1200);
  });

  function introTextScene() {
    showScene("intro-text");

    const el = document.getElementById("intro-text");

    if (!el) {
      console.log("intro-text não existe");
      return;
    }

    const text =
`Olá...
Hoje não é um dia qualquer.
Alguém muito especial faz aniversário.`;

    typeWriter(el, text, () => {
      setTimeout(starsScene, 2000);
    });
  }

  function typeWriter(el, text, cb) {
    if (!el) return;

    el.innerHTML = "";
    let i = 0;

    function loop() {
      if (i < text.length) {
        el.innerHTML += text[i++];
        setTimeout(loop, 25);
      } else cb?.();
    }

    loop();
  }

  function starsScene() {
    showScene("stars");
    setTimeout(nameScene, 1500);
  }

  function nameScene() {
    showScene("name");

    const el = document.getElementById("name-display");
    const name = "BEATRIZ";

    if (!el) return;

    el.innerHTML = "";
    let i = 0;

    function loop() {
      if (i < name.length) {
        el.innerHTML += name[i++];
        setTimeout(loop, 200);
      } else {
        setTimeout(storyScene, 1000);
      }
    }

    loop();
  }

  function storyScene() {
    showScene("story");

    const el = document.getElementById("story-text");

    const story = [
      "Nem todos os presentes cabem em uma caixa...",
      "Alguns são feitos de tempo.",
      "De carinho.",
      "Ou da mémoria que restou.",
      "E hoje é tudo pra você, Beatriz."
    ];

    let i = 0;

    function next() {
      if (i < story.length) {
        typeWriter(el, story[i], () => {
          setTimeout(() => {
            el.innerHTML = "";
            i++;
            next();
          }, 2000);
        });
      } else {
        setTimeout(messageScene, 500);
      }
    }

    next();
  }

  function messageScene() {
    showScene("message");

    const el = document.getElementById("final-message");

    const msg =
`Beatriz...

Feliz aniversário.
Você merece tudo de bom 💖`;

    typeWriter(el, msg, () => {
      setTimeout(() => {
        showScene("ending");
      }, 1500);
    });
  }

});