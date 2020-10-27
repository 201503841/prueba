  
import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";
import { Tipo } from "../Tipo";

export class Declaracion extends Instruccion {
    id: String;
    valor: Instruccion;
    type: Tipo;

    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param type tipo de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param valor valor de la expresion asociada a la variable
     */
    constructor(type: Tipo, id: String, valor: Instruccion, line: Number, column: Number) {
        super(line, column)
        this.id = id;
        this.type = type;
        this.valor = valor;
    }

    translate() {
        // int a = 0;
        if (this.valor==null) {
            return "var " +this.id +";\n";
        } else{
            return "var "+ this.id+" = "+ this.valor.translate() +";\n";
        }
        
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        let padreAux = padre; //Auxiar con nombre del padre
        
        //Tipo
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + this.type.toString() + "\"];\n";
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
    getNombreHijo(): String {
        return "DECLARACION"
    }
}