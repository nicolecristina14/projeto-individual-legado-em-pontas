window.onload = function() {
    b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
    atualizarUI();
};

// Variáveis de controle
let questaoAtual = 0;
const ids = ['questao1', 'questao2', 'questao3', 'questao4'];
const totalQuestoes = ids.length;

// Esta função roda assim que a página terminar de carregar
window.onload = function() {
    b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
    atualizarUI();
};

function atualizarUI() {
    // 1. Captura os botões dentro da função para garantir que eles existam
    let btnAnterior = document.getElementById('anterior');
    let btnProxima = document.getElementById('proxima');
    let btnFinalizar = document.getElementById('finalizar');

    // 2. Esconde todas as questões
    for (let i = 0; i < totalQuestoes; i++) {
        let elemento = document.getElementById(ids[i]);
        if (elemento != null) {
            elemento.style.display = 'none';
        }
    }

    // 3. Mostra a questão atual
    let questaoMostrar = document.getElementById(ids[questaoAtual]);
    if (questaoMostrar != null) {
        questaoMostrar.style.display = 'block';
        questaoMostrar.classList.add('ativa');
    }

    // 4. Atualiza a barra de progresso e textos
    let porcentagem = ((questaoAtual + 1) / totalQuestoes) * 100;
    document.getElementById('progresso-fill').style.width = porcentagem + '%';
    document.getElementById('label-questao').textContent = "Questão " + (questaoAtual + 1) + " de " + totalQuestoes;
    document.getElementById('label-pct').textContent = Math.round(porcentagem) + '%';

    // 5. Lógica de visibilidade dos botões
    if (questaoAtual == 0) {
        btnAnterior.style.display = 'none';
    } else {
        btnAnterior.style.display = 'inline-block';
    }

    if (questaoAtual == totalQuestoes - 1) {
        btnProxima.style.display = 'none';
        btnFinalizar.style.display = 'inline-block';
    } else {
        btnProxima.style.display = 'inline-block';
        btnFinalizar.style.display = 'none';
    }
}

function AntQuestao() {
    if (questaoAtual > 0) {
        questaoAtual = questaoAtual - 1;
        atualizarUI();
    }
}

function ProxQuestao() {
    // Validação básica: Não deixa avançar sem marcar uma opção
    let inputsDaQuestao = document.querySelectorAll("#" + ids[questaoAtual] + " input[type='radio']:checked");
    
    if (inputsDaQuestao.length == 0) {
        alert("Por favor, selecione uma opção antes de prosseguir.");
        return;
    }

    if (questaoAtual < totalQuestoes - 1) {
        questaoAtual = questaoAtual + 1;
        atualizarUI();
    }
}

function FinalizarQuiz() {
    let selecionados = document.querySelectorAll("input[type='radio']:checked");

    if (selecionados.length < totalQuestoes) {
        alert('Por favor, responda todas as questões antes de finalizar.');
        return;
    }

    let contagem = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 };
    
    for (let i = 0; i < selecionados.length; i++) {
        let resposta = selecionados[i].value;
        contagem[resposta] = contagem[resposta] + 1;
    }

    let resultadoFinal = "1";
    let maiorVoto = 0;

    for (let perfil in contagem) {
        if (contagem[perfil] > maiorVoto) {
            maiorVoto = contagem[perfil];
            resultadoFinal = perfil;
        }
    }

    let dadosEnviar = {
        idUsuarioServer: sessionStorage.ID_USUARIO,
        resultadoServer: resultadoFinal 
    };

    fetch("/usuarios/cadastrarPersonalidade", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosEnviar)
    })
    .then(function (resposta) {
        if (resposta.ok) {
            sessionStorage.RESULTADO_QUIZ = resultadoFinal; 
            alert('Analisando seu perfil...');
            window.location = "./resultado.html";
        } else {
            alert("Erro ao salvar resultado.");
        }
    })
    .catch(function (erro) {
        console.error("Erro na requisição:", erro);
    });
}

atualizarUI();