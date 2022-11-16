const corretor = document.getElementById("corretor");

corretor.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = document.getElementById("texto").value;
    
    console.log(texto.split(" "))

});