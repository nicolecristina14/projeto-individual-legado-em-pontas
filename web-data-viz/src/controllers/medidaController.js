var medidaModel = require("../models/medidaModel");
 
function buscarKpis(req, res) {
    var idUsuario = req.params.idUsuario; // Captura o ID da URL
 
    medidaModel.buscarKpis(idUsuario).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage || "Erro interno no servidor");
    });
}
 
function buscarEvolucao(req, res) {
    var idUsuario = req.params.idUsuario;
 
    medidaModel.buscarEvolucao(idUsuario).then(function (resultado) {
        // CORRIGIDO: retorna array vazio ao invés de 500 quando usuário não tem pontuações
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage || "Erro interno no servidor");
    });
}
 
function buscarDadosGraficos(req, res) {
    // Esta função busca a distribuição global de perfis (não precisa de ID)
    medidaModel.buscarDadosGraficos().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log("\nErro ao buscar dados dos gráficos:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage || "Erro interno no servidor");
    });
}
 
module.exports = {
    buscarKpis,
    buscarEvolucao,
    buscarDadosGraficos
}