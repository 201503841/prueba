import { Instruccion } from "../Instruccion";
import { TipoOperacion } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class OpRelacional extends Instruccion {
    operador1:Instruccion;
    operador2:Instruccion;
    tipoOperacion:TipoOperacion;
    /**
     * @class La expresion OperacionRelacional, realiza la operacion Relacional dependiendo del tipo que le sea asigando
     * @param line linea de la expresion
     * @param column columna de la expresion
     * @param operador1 operador izquierdo
     * @param operador2 operador derecho
     * @param tipoOperacion tipo de operacion de la expresion Relacional
     */
    constructor(tipoOperacion:TipoOperacion, operador1:Instruccion, operador2:Instruccion, line:Number, column:Number){
        super(line,column)
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.tipoOperacion = tipoOperacion;
    }

    translate() {
        switch(this.tipoOperacion){
            case TipoOperacion.MAYOR:
                return this.operador1.translate()+" > "+ this.operador2.translate();
            case TipoOperacion.MENOR:
                return this.operador1.translate()+" < "+ this.operador2.translate();
            case TipoOperacion.MAYORIGUAL:
                return this.operador1.translate()+" >= "+ this.operador2.translate();
            case TipoOperacion.MENORIGUAL:
                return this.operador1.translate()+" <= "+ this.operador2.translate();
            case TipoOperacion.IGUALIGUAL:
                return this.operador1.translate()+" == "+ this.operador2.translate();
            case TipoOperacion.DISTINTO:
                return this.operador1.translate()+" != "+ this.operador2.translate();

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
        
        //Operador2
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.operador2.getNombreHijo() + "\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.operador2.generarGrafo(g,nombreHijo);
        return null;
    }
    getNombreHijo(): String {
        switch(this.tipoOperacion){
            case TipoOperacion.MAYOR:       {return "MAYOR";}
            case TipoOperacion.MENOR:       {return "MENOR_QUE";}
            case TipoOperacion.MAYORIGUAL:       {return "MAYORIGUAL";}
            case TipoOperacion.MENORIGUAL:       {return "MENORIGUAL";}
            case TipoOperacion.IGUALIGUAL:       {return "IGUALIGUAL_";}
            case TipoOperacion.DISTINTO:       {return "DISTINTOA";}
            default:{ return "" }
        }
    }
}