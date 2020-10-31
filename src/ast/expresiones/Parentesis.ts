import { Instruccion } from "../Instruccion";
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Parentesis extends Instruccion {
    contenido:Instruccion;
    /**
     * @class La Identificador, almacena el id de la variable a la que se esta accesando
     * @param line linea del primitivo
     * @param column columna del primitivo
     * @param contenido identificador de la variable a la que se accesa
     */
    constructor(contenido:Instruccion, line:Number, column:Number){
        super(line,column)
        this.contenido = contenido;
    }

    translate() {
        let cadena= "(" + this.contenido.translate() + ")"
        return cadena;
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+ this.contenido.translate() +"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        return null;
    }
    getNombreHijo(): String {
        return "PARENTESIS";
    }
}
