import { Instruccion } from "../Instruccion"
import { Tipo, TipoOperacion } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class OpAritmetica extends Instruccion {
    operador1:Instruccion;
    operador2:Instruccion;
    tipoOperacion:TipoOperacion;
    /** 5 + 9
     * @class La expresion OperacionAritmetica, realiza la operacion aritmetica dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion aritmetica
     */
    constructor(tipoOperacion:TipoOperacion, operador1:Instruccion, operador2:Instruccion, line:Number, column:Number){
        super(line,column)
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }

    translate() {
        switch(this.tipoOperacion){
            case TipoOperacion.SUMA:
                return this.operador1.translate()+" + "+ this.operador2.translate();
            case TipoOperacion.RESTA:
                return this.operador1.translate()+" - "+ this.operador2.translate();
            case TipoOperacion.MULTIPLICACION:
                return this.operador1.translate()+" * "+ this.operador2.translate();
            case TipoOperacion.DIVISION:
                return this.operador1.translate()+" / "+ this.operador2.translate();
        }
        return "";
    }
    
    generarGrafo(g: ValorGrafo, padre: String) {
        //Operador1
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.operador1.getNombreHijo() + "\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.operador1.generarGrafo(g,nombreHijo);
        
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
    getNombreHijo(): String {
        switch(this.tipoOperacion){
            case TipoOperacion.SUMA: { return "SUMA"; }
            case TipoOperacion.RESTA: { return "RESTA"; }
            case TipoOperacion.MULTIPLICACION: { return "MULTIPLICACION"; }
            case TipoOperacion.DIVISION: { return "DIVISION"; }
            default:{ return "MENOS_UNARIO"; }
        }
    }
}