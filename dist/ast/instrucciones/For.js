"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Instruccion_1 = require("../Instruccion");
class For extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param variable
     * @param valor1
     * @param valor2
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(variable, valor1, valor2, instrucciones, line, column) {
        super(line, column);
        this.instrucciones = instrucciones;
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.variable = variable;
    }
    translate() {
        let cadena = "for(" + this.variable.translate() + this.valor1.translate() + ";" + this.valor2.translate() + "){\n";
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
        return cadena + "\n}\n";
    }
    generarGrafo(g, padre) {
        let p = padre;
        //Condicion
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"VARIABLE\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.variable.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.variable.generarGrafo(g, nombreHijo);
        padre = p;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"VALOR1\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.valor1.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.valor1.generarGrafo(g, nombreHijo);
        padre = p;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"VALOR2\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.valor2.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.valor2.generarGrafo(g, nombreHijo);
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
        return "FOR";
    }
}
exports.For = For;
