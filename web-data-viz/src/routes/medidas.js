var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/kpis/:idUsuario", function (req, res) {
    medidaController.buscarKpis(req, res);
});

router.get("/evolucao/:idUsuario", function (req, res) {
    medidaController.buscarEvolucao(req, res);
});

router.get("/graficos", function (req, res) {
    medidaController.buscarDadosGraficos(req, res);
});

module.exports = router;