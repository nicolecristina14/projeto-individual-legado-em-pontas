window.onload = function() {
    b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
    exibirResultado();
};

function exibirResultado() {
    var perfilCodi = sessionStorage.RESULTADO_QUIZ;

    var perfis = {
        "1": {
            nome: "Maria Olenewa (A Pioneira)",
            img: "/assets/imgs/img1.png", 
            desc: "Você é a base de tudo. Valoriza a tradição, o ensino e a construção de estruturas sólidas. Sua missão é plantar sementes para que outros possam colher os frutos no futuro."
        },
        "2": {
            nome: "Dalal Achcar (A Impulsionadora)",
            img: "/assets/imgs/img2.png",
            desc: "Você tem alma de produtora e educadora. Sua visão é ampla e inclusiva. Você acredita que o talento deve pertencer a todos e não mede esforços para democratizar o acesso ao que é bom."
        },
        "3": {
            nome: "Ana Botafogo (A Estrela)",
            img: "/assets/imgs/img3.png",
            desc: "Você é o equilíbrio perfeito entre técnica e carisma. Sua disciplina é sua maior marca. Você se torna referência por onde passa devido à sua elegância e compromisso absoluto com a sua arte."
        },
        "4": {
            nome: "Cecília Kerche (A Embaixadora)",
            img: "/assets/imgs/img4.png",
            desc: "Você nasceu para brilhar além das fronteiras. Sua competência técnica te dá trânsito internacional e você carrega sua identidade com orgulho, sendo respeitada por instituições globais."
        },
        "5": {
            nome: "Márcia Haydée (A Musa Dramática)",
            img: "/assets/imgs/img5.png",
            desc: "Você é puro sentimento e interpretação. Sua força não está apenas no que você faz, mas em como você faz as pessoas se sentirem. Você é uma artista da alma e das emoções."
        },
        "6": {
            nome: "Luciana Sagioro (O Talento Contemporâneo)",
            img: "/assets/imgs/img6.png",
            desc: "Você representa a nova era. Tem a garra necessária para enfrentar os ambientes mais competitivos do mundo e a persistência para transformar sonhos distantes em realidade concreta."
        }
    };

    var dados = perfis[perfilCodi];

    if (dados) {
        document.getElementById("titulo_perfil").innerHTML = dados.nome;
        document.getElementById("descricao_perfil").innerHTML = dados.desc;
        
        document.getElementById("imagem_perfil").innerHTML = `<img src="${dados.img}" alt="${dados.nome}" class="foto-perfil">`;
    } else {
        document.getElementById("titulo_perfil").innerHTML = "Perfil não identificado";
        document.getElementById("descricao_perfil").innerHTML = "Faça o quiz novamente para descobrir seu legado no ballet!";
    }
}

function verDashboard() {
    window.location = "./quiz.html";
}