import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";


export class Metodo extends Instruccion {
    parametros:Array<Instruccion>;
    instrucciones: Array<Instruccion>;
    id: String;



    /**
     * @class La instruccion METODO realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param parametros condicion del ciclo
     * @param id
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     */
    constructor(id:String, parametros:Array<Instruccion>, instrucciones: Array<Instruccion>, line:Number, column:Number){
        super(line,column);
        this.id=id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
    }

    translate() {
        if (this.instrucciones==null) {
            let cadena = "function " + this.id+" ("+this.parametros+"){\n }";
            return cadena;
        } else{
            let cadena = "function " + this.id+" ("+this.parametros+"){\n";
            for (const ins of this.instrucciones) {
                cadena += ins.translate();
            }
            return cadena+"\n }\n";
        }


        
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p= padre;
        //Condicion
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"PARAMETROS: " +this.parametros+" \"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        
        //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"INSTRUCCIONES\"];\n";
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
        return "METODO";
    }
}