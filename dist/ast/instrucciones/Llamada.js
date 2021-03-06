"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
const Instruccion_1 = require("../Instruccion");
class Llamada extends Instruccion_1.Instruccion {
    /**
     * @class Instruccion Llamada
     * @param line linea de la instruccion
     * @param column columna de la instruccion
     * @param id
     * @param parametros oarametros
     */
    constructor(id, parametros, line, column) {
        super(line, column);
        this.id = id;
        this.parametros = parametros;
    }
    translate() {
        let cadena = this.id + " (";
        for (const ins of this.parametros) {
            cadena += ins.translate() + ",";
        }
        cadena += ");";
        return cadena;
    }
    generarGrafo(g, padre) {
        let p = padre;
        //Condicion
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo" + g.contador;
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
        return null;
    }
    getNombreHijo() {
        return "LLAMADA";
    }
}
exports.Llamada = Llamada;
