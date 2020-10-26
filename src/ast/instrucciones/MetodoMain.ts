import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class Metodo extends Instruccion {
    parametros:Instruccion;
    id: String;
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param parametros condicion del ciclo
     * @param id
     */
    constructor(parametros:Instruccion,line:Number, column:Number){
        super(line,column);
        this.parametros = parametros;
    }

    translate() {

        let cadena = "function" + this.id+"("+this.parametros.translate()+"){\n";
        return cadena+"\n}\n";
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p= padre;
        //Condicion
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"PARAMETROS\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;
        
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.parametros.getNombreHijo()+"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.parametros.generarGrafo(g,nombreHijo);
        
        
        padre = p;
        return null;
    }
    
    getNombreHijo(): String {
        return "METODO";
    }
}