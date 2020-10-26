"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValorGrafo = void 0;
class ValorGrafo {
    /**
     *
     * @param contador CONTADOR DE NODOS
     * @param grafo CADENA QUE TIENE EL DOT O GRAFO
     */
    constructor(contador, grafo) {
        this.contador = contador;
        this.grafo = grafo;
    }
    getContador() {
        return this.contador;
    }
    getGrafo() {
        return this.grafo;
    }
    setContador(contador) {
        this.contador = contador;
    }
    setGrafo(grafo) {
        this.grafo = grafo;
    }
}
exports.ValorGrafo = ValorGrafo;
