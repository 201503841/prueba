import { Instruccion } from "../Instruccion";
import { Tipo, TipoOperacion } from "../Tipo";

export class OpLogicas extends Instruccion {
    operador1:Instruccion;
    operador2:Instruccion;
    tipoOperacion:TipoOperacion;
    /**
     * @class La expresion OperacionLogica, realiza la operacion Logica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion Logica
     */
    constructor(tipoOperacion:TipoOperacion, operador1:Instruccion, operador2:Instruccion, line:Number, column:Number){
        super(line,column)
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }

    translate() {
        switch(this.tipoOperacion){
            case TipoOperacion.AND:
                return this.operador1.translate()+" && "+ this.operador2.translate();
            case TipoOperacion.XOR:
                return this.operador1.translate()+ " xor "+ this.operador2.translate();
            case TipoOperacion.OR:
                return this.operador1.translate()+" || "+ this.operador2.translate();
            case TipoOperacion.NOT:
                return " ! "+ this.operador1.translate();
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
        if(this.operador2 != null){
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
            case TipoOperacion.AND: { return "AND"; }
            case TipoOperacion.OR: { return "OR"; }
            case TipoOperacion.XOR: { return "XOR"; }
            default: { return "NOT"; }
        }
    }
}