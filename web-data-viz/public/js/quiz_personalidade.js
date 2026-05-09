b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
let questaoAtual = 0;
const totalQuestoes = 8;
let pontos = 0;
let radios = [];
const respostascorretas = ["4", "1", "3", "1", "2", "1", "2", "1"];
let media = 0;

const ids = ['questao1','questao2','questao3','questao4','questao5','questao6','questao7','questao8'];

const btnAnterior  = document.getElementById('anterior');
const btnProxima   = document.getElementById('proxima');
const btnFinalizar = document.getElementById('finalizar');

function atualizarUI() {
    ids.forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('ativa');
        el.style.display = 'none';
    });

    const atual = document.getElementById(ids[questaoAtual]);
    atual.style.display = 'block';
    atual.classList.add('ativa');


    const pct = ((questaoAtual + 1) / totalQuestoes) * 100;
    document.getElementById('progresso-fill').style.width = pct + '%';
    document.getElementById('label-questao').textContent = `Questão ${questaoAtual + 1} de ${totalQuestoes}`;
    document.getElementById('label-pct').textContent = Math.round(pct) + '%';


    btnAnterior.style.display  = questaoAtual === 0 ? 'none' : 'inline-block';
    btnProxima.style.display   = questaoAtual === totalQuestoes - 1 ? 'none' : 'inline-block';
    btnFinalizar.style.display = questaoAtual === totalQuestoes - 1 ? 'inline-block' : 'none';
}

function AntQuestao() {
    if (questaoAtual > 0) {
        questaoAtual--;
        atualizarUI();
    }
}

function ProxQuestao() {
    if (questaoAtual < totalQuestoes - 1) {
        questaoAtual++;
        atualizarUI();
    }
}

function FinalizarQuiz() {
    radios = document.querySelectorAll("input[type='radio']:checked");

    if (radios.length < respostascorretas.length) {
        alert('Por favor, responda todas as questões antes de finalizar.');
        return;
    }

    let acertos = 0;
    radios.forEach((r, i) => {
        if (r.value === respostascorretas[i]) acertos++;
    });

    pontos = acertos * 12.5;
    media  = (pontos / 100) * 100;

    fetch("/usuarios/cadastrarPontuacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO,
            pontosServer:    pontos,
            mediaServer:     media,
        })
    })
    .then(function(resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
            alert('Quiz concluído! Iremos mostrar sua pontuação.');
            window.location = "./pontuação.html";
        } else {
            throw ("Houve um erro ao tentar finalizar o quiz");
        }
    })
    .catch(function(resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

atualizarUI();