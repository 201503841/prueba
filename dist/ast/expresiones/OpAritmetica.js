"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpAritmetica = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class OpAritmetica extends Instruccion_1.Instruccion {
    /** 5 + 9
     * @class La expresion OperacionAritmetica, realiza la operacion aritmetica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion aritmetica
     */
    constructor(tipoOperacion, operador1, operador2, line, column) {
        super(line, column);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    translate() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoOperacion.SUMA:
                return this.operador1.translate() + " + " + this.operador2.translate();
            case Tipo_1.TipoOperacion.RESTA:
                return this.operador1.translate() + " - " + this.operador2.translate();
            case Tipo_1.TipoOperacion.MULTIPLICACION:
                return this.operador1.translate() + " * " + this.operador2.translate();
            case Tipo_1.TipoOperacion.DIVISION:
                return this.operador1.translate() + " / " + this.operador2.translate();
        }
        return "";
    }
    generarGrafo(g, padre) {
        //Operador1
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.operador1.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.operador1.generarGrafo(g, nombreHijo);
        if (this.operador2 != null) {
            //Operador2
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            this.operador2.generarGrafo(g, nombreHijo);
        }
        return null;
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoOperacion.SUMA: {
                return "SUMA";
            }
            case Tipo_1.TipoOperacion.RESTA: {
                return "RESTA";
            }
            case Tipo_1.TipoOperacion.MULTIPLICACION: {
                return "MULTIPLICACION";
            }
            case Tipo_1.TipoOperacion.DIVISION: {
                return "DIVISION";
            }
            default: {
                return "MENOS_UNARIO";
            }
        }
    }
}
exports.OpAritmetica = OpAritmetica;
