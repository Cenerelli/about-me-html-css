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