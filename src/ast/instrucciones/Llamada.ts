import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";
import { Primitivo } from "../expresiones/Primitivo";

export class Llamada extends Instruccion {
    parametros:Array<Instruccion>;
    id: String;
    
    /**
     * @class Instruccion Llamada
     * @param line linea de la instruccion 
     * @param column columna de la instruccion 
     * @param id
     * @param parametros oarametros
     */
    constructor(id:String,parametros:Array<Instruccion>,line:Number, column:Number){
        super(line,column);
        this.id=id;
        this.parametros=parametros;

    }

    translate() {

        
         let cadena = this.id+" (";
         for (const ins of this.parametros){
             cadena += ins.translate() + ",";
         }
            cadena+= ");";
         return cadena;

      
        
    }

    generarGrafo(g: ValorGrafo, padre: String) {

        let p= padre;
        //Condicion
        
        let nombreHijo = "nodo"+g.contador;
         g.grafo += "  "+nombreHijo +"[label=\" Id: "+this.id+"\"];\n";
         g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
         g.contador++;
         
         padre = nombreHijo;

         
         //----------- LISTA DE INSTRUCCIONES -----------
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"PARAMETROS\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;

        padre = nombreHijo;
        for (let x = 0; x < this.parametros.length; x++) {
            let inst = this.parametros[x];
            nombreHijo = "nodo"+g.contador;
            g.grafo += "  "+nombreHijo +"[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);
        }

         

        
        return null


    }
    
    getNombreHijo(): String {
        return "LLAMADA";
    }
}