var database = require("../database/config");
 
function buscarKpis(idUsuario) {
    var instrucaoSql = `
        SELECT 
            (SELECT IFNULL(MAX(pontuacao), 0) FROM pontuacao WHERE fkUsuario = ${idUsuario}) as media_pessoal,
            (SELECT perfil FROM personalidade WHERE fkUsuario = ${idUsuario} ORDER BY idPersonalidade DESC LIMIT 1) as meu_perfil,
            (SELECT IFNULL(ROUND(AVG(pontuacao), 1), 0) FROM pontuacao) as media_global;
    `;
    return database.executar(instrucaoSql);
}
 
function buscarEvolucao(idUsuario) {
    var instrucaoSql = `
        SELECT 
            pontuacao, 
            DATE_FORMAT(dataHora, '%d/%m') as data_formatada
        FROM pontuacao 
        WHERE fkUsuario = ${idUsuario}
        ORDER BY dataHora ASC;
    `;
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
    return database.executar(instrucaoSql);
}
 
module.exports = {
    buscarKpis,
    buscarEvolucao,
    buscarDadosGraficos
}