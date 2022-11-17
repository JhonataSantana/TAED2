const dicionario = document.getElementById("dicionario");

const consultaPalavra = (evento) => {
    evento.preventDefault();

    const palavra = document.getElementById("palavra").value.toLowerCase();
    const resultado = document.getElementById("resultadoDicionario");
    let filho = resultado.firstElementChild;
    while (filho) {
        filho.remove();
        filho = resultado.firstElementChild;
    }

    const documentFragment = document.createDocumentFragment();
    const title = document.createElement("h5");

    const formData = new FormData();
    formData.append('palavra', palavra);

    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            const data = JSON.parse(ajax.responseText);

            if (!data.exist) {

                title.textContent = "Você quis dizer"

                documentFragment.append(title);

                const lista = document.createElement("ul");
                lista.classList.add('list-group');

                for (const sugestao of data.response) {
                    const item = document.createElement('li');
                    item.classList.add('list-group-item', 'list-group-item-action');
                    item.textContent = sugestao;
                    item.addEventListener("click", (evento) => {
                        document.getElementById("palavra").value = sugestao;
                        consultaPalavra(evento);
                    });
                    lista.append(item);
                }

                documentFragment.append(lista);

                resultado.append(documentFragment);

            } else {

                title.textContent = "Significado"

                documentFragment.append(title);

                const significado = document.createElement("p");
                fetch('https://significado.herokuapp.com/v2/significados/'+palavra).then(function (response) {
                    var contentType = response.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        response.json().then(function (json) {
                            let content = '';
                            for(const def of json){
                                content += def.partOfSpeech + '</br>';
                                content += def.etymology + '</br>';
                                for(const mean of def.meanings){
                                    content += mean + '</br>';
                                }
                            }
                            significado.innerHTML = content;
                        });
                    } else {
                        console.log("Oops, we haven't got JSON!");
                    }
                });

                documentFragment.append(significado);

                resultado.append(documentFragment);

            }

        }

    }

    ajax.open('POST', "./engine/consulta.php", true);
    ajax.send(formData);

};

dicionario.addEventListener("submit", consultaPalavra);
