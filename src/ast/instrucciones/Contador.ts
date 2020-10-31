import { Instruccion } from "../Instruccion"
import { Tipo, TipoOperacion } from "../Tipo";
import { ValorGrafo } from "../grafo/ValorGrafo";




export class Contador extends Instruccion {
    id: String;
    tipoOperacion:TipoOperacion;


    /**
     * @class La instruccion declaracion, inserta una nueva variable en la tabla de simbolos
     * @param id identificador de la variable
     * @param line linea donde se declaro la variable
     * @param column columna donde se declaro la variable
     * @param tipoOperacion valor de la expresion asociada a la variable
     */
    constructor(id: String, tipoOperacion: TipoOperacion, line: Number, column: Number) {
        super(line, column)
        this.id = id;
        this.tipoOperacion = tipoOperacion;
    }

    translate() {

        switch(this.tipoOperacion){
            case TipoOperacion.INCREMENTO:
                return this.id+"++; ";
            case TipoOperacion.DECREMENTO:
                return this.id+"--;";
          
        }
        return "";
  
    }
    generarGrafo(g: ValorGrafo, padre: String) {
        //Tipooperacion
        let nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\" Tipo: " + this.tipoOperacion.toString() + "\"];\n";
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

        return null;




    }
    getNombreHijo(): String {
        return "CONTADOR"
    }
}