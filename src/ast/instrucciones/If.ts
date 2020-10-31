import { Instruccion } from "../Instruccion"
import { ValorGrafo } from "../grafo/ValorGrafo";

export class If extends Instruccion {
    condicion:Instruccion;
    instrucciones: Array<Instruccion>;
    elses: Array<Instruccion>;
    /**
     * @class La instruccion While realiza n iteraciones, dependiendo de la condicion
     * @param line linea de la instruccion while
     * @param column columna de la instruccion while
     * @param condicion condicion del ciclo
     * @param instrucciones lista de sentencias o instrucciones dentro del while
     * @param elses
     */
    constructor(condicion:Instruccion, instrucciones: Array<Instruccion>,elses:Array<Instruccion>,line:Number, column:Number){
        super(line,column);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
        this.elses=elses;
    }

    translate() {

        let cadena = "if(" + this.condicion.translate() + "){\n";
        for (const ins of this.instrucciones) {
            cadena += ins.translate();
        }
            cadena = cadena + "}" ;    
        if (this.elses==null){
            return cadena;
        }else{

            for (var ins of this.elses) { 
                cadena+=ins.translate();
            }
            return cadena + "\n";
        }
        
    }

    generarGrafo(g: ValorGrafo, padre: String) {
        let p= padre;
        //Condicion
        let nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"CONDICION\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;
        
        nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\""+this.condicion.getNombreHijo()+"\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;
        this.condicion.generarGrafo(g,nombreHijo);
        
        
        padre = p;
        
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
        
        padre = p;
        
        //----------- LISTA DE ELSE -----------
        /* nombreHijo = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo +"[label=\"ELSE\"];\n";
        g.grafo += "  "+padre +" -> "+ nombreHijo+";\n";
        g.contador++;*/
        //padre = nombreHijo;
        for (let x = 0; x < this.elses.length; x++) {
            let inst = this.elses[x];
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
        return "IF";
    }
}