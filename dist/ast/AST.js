"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
const Instruccion_1 = require("./Instruccion");
class AST extends Instruccion_1.Instruccion {
    constructor(instrucciones) {
        super(0, 0);
        this.instrucciones = instrucciones;
    }
    translate() {
        let cadena = "";
        this.instrucciones.forEach(element => {
            cadena += element.translate();
        });
        return cadena;
    }
    generarGrafo(g, padre) {
        //---------------LISTA INSTRUCCION--------------+
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[Label=\"" + inst.getNombreHijo() + "\"]'\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            inst.generarGrafo(g, nombreHijo);
        }
    }
    getNombreHijo() {
        throw new Error("Method not implemented.");
    }
}
exports.AST = AST;
