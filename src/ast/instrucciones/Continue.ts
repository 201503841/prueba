import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Continue extends Instruccion {
    valor:any;
    /**
     * @class La clase Continue almacena palabra reservada
     * @param valor valor real
     */
    constructor(valor:any, line:Number, column:Number){
        super(line,column)
        this.valor = valor;
    }

    translate() {
        return this.valor + ";\n";
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+ this.valor.toString() +"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        return null;
    }
    getNombreHijo(): String {
        return "CONTINUE";
    }
}