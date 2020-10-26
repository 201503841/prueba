"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpRelacional = void 0;
const Instruccion_1 = require("../Instruccion");
const Tipo_1 = require("../Tipo");
class OpRelacional extends Instruccion_1.Instruccion {
    /**
     * @class La expresion OperacionRelacional, realiza la operacion Relacional dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion Relacional
     */
    constructor(tipoOperacion, operador1, operador2, line, column) {
        super(line, column);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }
    translate() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoOperacion.MAYOR:
                return this.operador1.translate() + " > " + this.operador2.translate();
            case Tipo_1.TipoOperacion.MENOR:
                return this.operador1.translate() + " < " + this.operador2.translate();
            case Tipo_1.TipoOperacion.MAYORIGUAL:
                return this.operador1.translate() + " >= " + this.operador2.translate();
            case Tipo_1.TipoOperacion.MENORIGUAL:
                return this.operador1.translate() + " <= " + this.operador2.translate();
            case Tipo_1.TipoOperacion.IGUALIGUAL:
                return this.operador1.translate() + " == " + this.operador2.translate();
            case Tipo_1.TipoOperacion.DISTINTO:
                return this.operador1.translate() + " != " + this.operador2.translate();
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
        //Operador2
        nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"" + this.operador2.getNombreHijo() + "\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        this.operador2.generarGrafo(g, nombreHijo);
        return null;
    }
    getNombreHijo() {
        switch (this.tipoOperacion) {
            case Tipo_1.TipoOperacion.MAYOR: {
                return "MAYOR";
            }
            case Tipo_1.TipoOperacion.MENOR: {
                return "MENOR_QUE";
            }
            case Tipo_1.TipoOperacion.MAYORIGUAL: {
                return "MAYORIGUAL";
            }
            case Tipo_1.TipoOperacion.MENORIGUAL: {
                return "MENORIGUAL";
            }
            case Tipo_1.TipoOperacion.IGUALIGUAL: {
                return "IGUALIGUAL_";
            }
            case Tipo_1.TipoOperacion.DISTINTO: {
                return "DISTINTOA";
            }
            default: {
                return "";
            }
        }
    }
}
exports.OpRelacional = OpRelacional;
