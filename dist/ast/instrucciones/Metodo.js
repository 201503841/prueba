"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metodo = void 0;
const Instruccion_1 = require("../Instruccion");
class Metodo extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param parametros condicion del ciclo
     * @param id
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(id, parametros, instrucciones, line, column) {
        super(line, column);
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }
    translate() {
        let cadena = "function" + this.id + "(";
        for (const ins of this.parametros) {
            cadena += ins.translate() + ",";
        }
        cadena += "){\n";
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
        return cadena + "\n}\n";
    }
    generarGrafo(g, padre) {
        let p = padre;
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"PARAMETROS\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.parametros.length; x++) {
            let inst = this.parametros[x];
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + inst.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            inst.generarGrafo(g, nombreHijo);
        }
        padre = p;
        //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo" + g.contador;
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
        return "METODO";
    }
}
exports.Metodo = Metodo;
