"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contador = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class Contador extends Instruccion_1.Instruccion {
    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param tipoOperacion valor de la expresion asociada a la variable
     */
    constructor(id, tipoOperacion, line, column) {
        super(line, column);
        this.id = id;
        this.tipoOperacion = tipoOperacion;
    }
    translate() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoOperacion.INCREMENTO:
                return this.id + "++" + ";";
            case Tipo_1.TipoOperacion.DECREMENTO:
                return this.id + "--" + ";";
        }
        return "";
    }
    generarGrafo(g, padre) {
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + this.id.toString() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        // Id
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"ID\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        let padreHijo = nombreHijo;
        //Identificador
        nombreHijo = "nodo" + g.contador;
        /*let losIds = ""
        for(let i = 0; i<listaIds.length; i++){
            losIds += listaIds[i]+",";
        }
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + losIds + "\"];\n";
        */
        g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
        g.grafo += "  " + padreHijo + " -> " + nombreHijo + ";\n";
        g.contador++;
        if (this.valor != null) {
            //Expresion
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.valor.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.valor.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        return "CONTADOR";
    }
}
exports.Contador = Contador;
