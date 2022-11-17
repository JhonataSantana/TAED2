const dicionario = document.getElementById("dicionario");

const consultaPalavra = (evento) => {
    evento.preventDefault();

    const palavra = document.getElementById("palavra").value.toLowerCase();
    const resultado = document.getElementById("resultadoDicionario");
    let primeiro = resultado.firstElementChild;
    while(primeiro){
        primeiro.remove();
        primeiro = resultado.firstElementChild;
    }

    const formData = new FormData();
    formData.append('palavra', palavra);
    
    const ajax = new XMLHttpRequest();
    
    ajax.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            
            const data = JSON.parse(ajax.responseText);
            console.log(data);

            if(!data.exist){

                const documentFragment = document.createDocumentFragment();
                const title = document.createElement("h5");
                title.textContent = "Você quis dizer"
    
                documentFragment.append(title);

                const lista = document.createElement("ul");
                lista.classList.add('list-group');
    
                for(const sugestao of data.response){
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

            }else{

                const documentFragment = document.createDocumentFragment();
                const title = document.createElement("h5");
                title.textContent = "Significado"
    
                documentFragment.append(title);

                const significado = document.createElement("p");
                significado.textContent = "Lorem Ipsum..."

                documentFragment.append(significado);

                resultado.append(documentFragment);

            }

        }

    }

    ajax.open('POST', "./engine/consulta.php", true);
    ajax.send(formData);

};

dicionario.addEventListener("submit", consultaPalavra);
