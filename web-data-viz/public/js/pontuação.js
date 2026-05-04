window.onload = function () {
    obterRanking();
    document.getElementById("b_usuario").innerHTML = sessionStorage.NOME_USUARIO;
};

function obterRanking() {
    fetch("/usuarios/buscarRanking", {
        method: "GET",
    })
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.log("DADOS QUE CHEGARAM DO BANCO:", dados);

                    var tabela = document.getElementById("corpo_tabela");
                    tabela.innerHTML = "";

                    if (dados.length == 0) {
                        tabela.innerHTML = "<tr><td colspan='2'>Ainda não há pontuações registradas.</td></tr>";
                        return;
                    }

                    for (let i = 0; i < dados.length; i++) {
                        var linhaAtual = dados[i];
                        var novaLinha = tabela.insertRow();
                        var celulaNome = novaLinha.insertCell(0);
                        var celulaPontos = novaLinha.insertCell(1);

                        celulaNome.innerHTML = linhaAtual.nome; 
                        celulaPontos.innerHTML = linhaAtual.pontuacao;
                    }
                });
            } else {
                console.error("Erro na resposta da API");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar ranking:", erro);
        });
}

function RefazerQuiz() {
    window.location = "quiz_personalidade.html";
}
