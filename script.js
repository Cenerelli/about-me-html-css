const botaoIdioma = document.getElementById("botao-idioma");
const elementosTraduziveis = document.querySelectorAll("[data-lang]");

let idiomaAtual = "pt";

function aplicarIdioma(idioma) {
  elementosTraduziveis.forEach((elemento) => {
    elemento.hidden = elemento.dataset.lang !== idioma;
  });

  document.documentElement.lang = idioma === "pt" ? "pt-br" : "en";

  botaoIdioma.textContent = idioma === "pt" ? "English" : "Português";
}

botaoIdioma.addEventListener("click", () => {
  idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
  aplicarIdioma(idiomaAtual);
});

aplicarIdioma(idiomaAtual);

// ==============================
// Player de áudio customizado
// ==============================

const audioPrincipal = document.getElementById("audio-principal");
const botaoPlay = document.getElementById("botao-play");
const barraAudio = document.getElementById("barra-audio");
const tempoAtual = document.getElementById("tempo-atual");
const duracaoAudio = document.getElementById("duracao-audio");

let usuarioMexendoNaBarra = false;

function formatarTempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = Math.floor(segundos % 60);

  return `${minutos}:${segundosRestantes.toString().padStart(2, "0")}`;
}

botaoPlay.addEventListener("click", () => {
  if (audioPrincipal.paused) {
    audioPrincipal.play();

    botaoPlay.classList.add("tocando");
    botaoPlay.setAttribute("aria-label", "Pausar áudio");
  } else {
    audioPrincipal.pause();

    botaoPlay.classList.remove("tocando");
    botaoPlay.setAttribute("aria-label", "Tocar áudio");
  }
});

audioPrincipal.addEventListener("loadedmetadata", () => {
  barraAudio.max = Math.floor(audioPrincipal.duration);
  duracaoAudio.textContent = formatarTempo(audioPrincipal.duration);
});

audioPrincipal.addEventListener("timeupdate", () => {
  if (!usuarioMexendoNaBarra) {
    barraAudio.value = Math.floor(audioPrincipal.currentTime);
    tempoAtual.textContent = formatarTempo(audioPrincipal.currentTime);
  }
});

barraAudio.addEventListener("pointerdown", () => {
  usuarioMexendoNaBarra = true;
});

barraAudio.addEventListener("input", () => {
  const novoTempo = Number(barraAudio.value);

  tempoAtual.textContent = formatarTempo(novoTempo);
  audioPrincipal.currentTime = novoTempo;
});

barraAudio.addEventListener("pointerup", () => {
  usuarioMexendoNaBarra = false;

  const novoTempo = Number(barraAudio.value);
  audioPrincipal.currentTime = novoTempo;
});

audioPrincipal.addEventListener("ended", () => {
  botaoPlay.classList.remove("tocando");
  botaoPlay.setAttribute("aria-label", "Tocar áudio");

  barraAudio.value = 0;
  tempoAtual.textContent = "0:00";
});
