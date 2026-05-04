var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, experiencia FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, experiencia, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, experiencia, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, experiencia, senha) VALUES ('${nome}', '${email}', '${experiencia}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarPontuacao(idUsuario, pontuacao, media) {
    console.log("ACESSEI O USUARIO MODEL PARA PONTUACAO", idUsuario, pontuacao, media);
    
    let instrucaoSql = `
        INSERT INTO pontuacao (fkUsuario, pontuacao, media) VALUES ('${idUsuario}', '${pontuacao}', '${media}');
    `;
    console.log("Executando: " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarRanking() {
    var instrucaoSql = `
        SELECT u.nome, p.pontuacao 
        FROM usuario u 
        JOIN pontuacao p ON u.idUsuario = p.fkUsuario 
        ORDER BY p.pontuacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarPersonalidade(idUsuario, resultado) {
    var instrucaoSql = `
        INSERT INTO personalidade (fkUsuario, perfil) 
        VALUES (${idUsuario}, ${resultado});
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    autenticar,
    cadastrar,
    cadastrarPontuacao,
    buscarRanking,
    cadastrarPersonalidade
};