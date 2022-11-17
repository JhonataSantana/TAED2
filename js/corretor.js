const corretor = document.getElementById("corretor");

corretor.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = document.getElementById("texto").value;
    const palavras = texto.split(" ");
    const resultado = document.getElementById("resultadoCorretor");
    let filho = resultado.firstElementChild;
    while (filho) {
        filho.remove();
        filho = resultado.firstElementChild;
    }

    const documentFragment = document.createDocumentFragment();
    const title = document.createElement("h5");
    title.textContent = "Correção";
    documentFragment.append(title);

    const correcao = document.createElement('p');
    documentFragment.append(correcao);

    resultado.append(documentFragment);

    for (const palavra of palavras) {

        const word = document.createElement('span');
        word.textContent = ' ' + palavra;
        word.classList.add("word");
        documentFragment.append(word);

        const formData = new FormData();
        formData.append('palavra', palavra.toLowerCase());

        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {

            if (this.readyState == 4 && this.status == 200) {

                const data = JSON.parse(ajax.responseText);

                if (!data.exist) {

                    word.addEventListener("click", (evento) => {
                        document.getElementById("palavra").value = palavra;
                        consultaPalavra(evento);
                    });
                    word.style.color = 'red';
                    word.style.cursor = 'pointer';

                }

            }

        }

        ajax.open('POST', "./engine/consulta.php", true);
        ajax.send(formData);

    }

    correcao.append(documentFragment);

});