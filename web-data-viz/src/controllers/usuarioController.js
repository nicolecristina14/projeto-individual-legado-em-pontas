var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                            senha: resultadoAutenticar[0].senha,
                        })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var experiencia = req.body.experienciaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (experiencia == undefined) {
        res.status(400).send("Sua experiencia está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, experiencia, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarPontuacao(req, res) { 
    var idUsuario = req.body.idUsuarioServer;
    var pontos = req.body.pontosServer;
    var media = req.body.mediaServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (pontos == undefined) {
        res.status(400).send("Seu pontos está undefined!");
    } else if (media == undefined) {
        res.status(400).send("Sua média está undefined!");
    } else {
        // Chame a função correta do Model
        usuarioModel.cadastrarPontuacao(idUsuario, pontos, media)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarRanking(req, res) {
    usuarioModel.buscarRanking()
        .then(function (resultado) {
            // Se não houver erro, enviamos o resultado, mesmo que seja []
            console.log(`Resultados encontrados: ${resultado.length}`);
            res.status(200).json(resultado); 
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrarPersonalidade(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var resultado = req.body.resultadoServer;

    if (idUsuario == undefined) {
        res.status(400).send("Seu ID está indefinido!");
    } else if (resultado == undefined) {
        res.status(400).send("Seu resultado está indefinido!");
    } else {
        usuarioModel.cadastrarPersonalidade(idUsuario, resultado)
            .then(function (resposta) {
                res.status(200).json(resposta);
            }).catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function buscarKpis(req, res) {
    medidaModel.buscarKpis().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosGraficos(req, res) {
    medidaModel.buscarDadosGraficos().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarPontuacao,
    buscarRanking,
    cadastrarPersonalidade,
    buscarKpis,
    buscarDadosGraficos
}