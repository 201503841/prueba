"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parentesis = void 0;
const Instruccion_1 = require("../Instruccion");
class Parentesis extends Instruccion_1.Instruccion {
    /**
     * @class La Identificador, almacena el id de la variable a la que se esta accesando
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param contenido identificador de la variable a la que se accesa
     */
    constructor(contenido, line, column) {
        super(line, column);
        this.contenido = contenido;
    }
    translate() {
        let cadena = "(" + this.contenido.translate() + ")";
        return cadena;
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.contenido.translate() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        return null;
    }
    getNombreHijo() {
        return "PARENTESIS";
    }
}
exports.Parentesis = Parentesis;
