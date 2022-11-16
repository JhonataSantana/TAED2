const dicionario = document.getElementById("dicionario");

dicionario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const palavra = document.getElementById("palavra").value;

    console.log(palavra);

});