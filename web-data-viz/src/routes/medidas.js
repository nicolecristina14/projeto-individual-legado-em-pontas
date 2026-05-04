var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/kpis", function (req, res) {
    medidaController.buscarKpis(req, res);
});

router.get("/graficos", function (req, res) {
    medidaController.buscarDadosGraficos(req, res);
});

module.exports = router;