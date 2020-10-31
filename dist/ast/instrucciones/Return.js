"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruccion_1 = require("../Instruccion");
class Return extends Instruccion_1.Instruccion {
    /** print("hola")
     * @class La instruccion print, imprime el valor de una expresion en consola
     * @param line linea de la instruccion print
     * @param column columna de la instruccion print
     * @param expresion expresion que se va imprimir
     */
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    translate() {
        if (this.expresion == null) {
            return "Return();\n";
        }
        else {
            return "Return(" + this.expresion.translate() + ");\n";
        }
    }
    generarGrafo(g, padre) {
        if (this.expresion == null) {
            //Condicion
            let nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"vacio\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            padre = nombreHijo;
        }
        else {
            let nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.expresion.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.expresion.generarGrafo(g, nombreHijo);
            return null;
        }
    }
    getNombreHijo() {
        return "RETURN";
    }
}
exports.Return = Return;
