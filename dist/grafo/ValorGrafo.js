"use strict";
exports.__esModule = true;
exports.ValorGrafo = void 0;
var ValorGrafo = /** @class */ (function () {
    /**
     *
     * @param contador CONTADOR DE NODOS
     * @param grafo CADENA QUE TIENE EL DOT O GRAFO
     */
    function ValorGrafo(contador, grafo) {
        this.contador = contador;
        this.grafo = grafo;
    }
    ValorGrafo.prototype.getContador = function () {
        return this.contador;
    };
    ValorGrafo.prototype.getGrafo = function () {
        return this.grafo;
    };
    ValorGrafo.prototype.setContador = function (contador) {
        this.contador = contador;
    };
    ValorGrafo.prototype.setGrafo = function (grafo) {
        this.grafo = grafo;
    };
    return ValorGrafo;
}());
exports.ValorGrafo = ValorGrafo;
