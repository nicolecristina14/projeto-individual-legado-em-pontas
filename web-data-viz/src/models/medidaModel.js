var database = require("../database/config");

function buscarKpis() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(idUsuario) FROM usuario) as total,
            (SELECT IFNULL(ROUND(AVG(pontuacao), 1), 0) FROM pontuacao) as media,
            (SELECT perfil FROM personalidade GROUP BY perfil ORDER BY COUNT(*) DESC LIMIT 1) as perfil;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosGraficos() {
    var instrucaoSql = `
        SELECT 
            CASE 
                WHEN perfil = 1 THEN 'Olenewa'
                WHEN perfil = 2 THEN 'Dalal'
                WHEN perfil = 3 THEN 'Botafogo'
                WHEN perfil = 4 THEN 'Kerche'
                WHEN perfil = 5 THEN 'Haydée'
                WHEN perfil = 6 THEN 'Sagioro'
                ELSE 'Outro'
            END as nome_bailarina, 
            COUNT(*) as quantidade 
        FROM personalidade 
        GROUP BY perfil;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpis,
    buscarDadosGraficos
}
