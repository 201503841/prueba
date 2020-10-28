"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElseIf = void 0;
const Instruccion_1 = require("../Instruccion");
class ElseIf extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(instrucciones, line, column) {
        super(line, column);
        this.instrucciones = instrucciones;
    }
    translate() {
        let cadena = "else ";
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
        return cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        padre = p;
        //----------- LISTA DE INSTRUCCIONES -----------
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            inst.generarGrafo(g, nombreHijo);
        }
        //----------------------------------------------
        return null;
    }
    getNombreHijo() {
        return "ELSEIF";
    }
}
exports.ElseIf = ElseIf;
