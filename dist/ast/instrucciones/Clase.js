"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clase = void 0;
const Instruccion_1 = require("../Instruccion");
class Clase extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param id condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(id, instrucciones, line, column) {
        super(line, column);
        this.id = id;
        this.instrucciones = instrucciones;
    }
    translate() {
        if (this.instrucciones == null) {
            return "class(){\n}\n";
        }
        else {
            let cadena = "class " + this.id + "{\n";
            for (const ins of this.instrucciones) {
                cadena += ins.translate();
            }
            return cadena + "}\n";
        }
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        nombreHijo = "nodo" + g.contador;
        //----------- LISTA DE INSTRUCCIONES -----------
        g.grafo += "  " + nombreHijo + "[label=\"SENTECIAS_GLOBALES\"];\n";
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
        return "CLASE";
    }
}
exports.Clase = Clase;
