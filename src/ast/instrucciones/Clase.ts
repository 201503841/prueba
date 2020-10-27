import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";


export class Clase extends Instruccion {

    instrucciones: Array<Instruccion>;
    id: String;
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param id condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(id:String, instrucciones: Array<Instruccion>, line:Number, column:Number){
        super(line,column);
        this.id=id;
        this.instrucciones = instrucciones;
    }

    translate() {
        if (this.instrucciones==null) {
            return "class(){\n}\n";
        } else{
            let cadena = "class "+this.id+"{\n";
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
        return cadena+"}\n";   
        }
        
    }

    generarGrafo(g: ValorGrafo, padre: String) {

       let nombreHijo = "nodo" + g.contador;
       g.grafo += "  " + nombreHijo + "[label=\" Id: " + this.id + "\"];\n";
       g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
       g.contador++;

        
        nombreHijo="nodo"+g.contador;
        
        //----------- LISTA DE INSTRUCCIONES -----------
        g.grafo += "  "+nombreHijo +"[label=\"SENTECIAS_GLOBALES\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        padre = nombreHijo;

        for (let x = 0; x < this.instrucciones.length; x++) {
            let inst = this.instrucciones[x];
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);
        }
        
        //----------------------------------------------
        return null;
    }
    
    getNombreHijo(): String {
        return "CLASE";
    }
}