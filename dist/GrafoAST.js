"use strict";
exports.__esModule = true;
exports.GrafoAST = void 0;
var ValorGrafo_1 = require("../src/ast/grafo/ValorGrafo");
var GrafoAST = /** @class */ (function () {
    function GrafoAST(arbol) {
        this.arbol = arbol;
    }
    GrafoAST.prototype.getGrafo = function () {
        var grafo = "diagraph G{\n\n ";
        grafo += " nodo0[label=\"AST\"];\n";
        var g = new ValorGrafo_1.ValorGrafo(1, grafo);
        this.arbol.generarGrafo(g, "nodo0");
        g.grafo += "\n}";
        return g.grafo;
    };
    return GrafoAST;
}());
exports.GrafoAST = GrafoAST;
