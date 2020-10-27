import { ValorGrafo} from "./grafo/ValorGrafo";
import { Instruccion} from "./Instruccion"




export class AST extends Instruccion{
    instrucciones: Array<Instruccion>;
    listaErrores: Array<String>;
  
    
    constructor(instrucciones:Array<Instruccion>){
        super(0,0)
        this.instrucciones=instrucciones;
    }

    
    translate(){
        let cadena="";
        
        this.instrucciones.forEach(element => {
            cadena+=element.translate();
        });
        return cadena;
    }
    generarGrafo(g: ValorGrafo, padre:String){
        //---------------LISTA INSTRUCCION--------------+
        let nombreHijo:String = "nodo"+g.contador;
        g.grafo += "  "+nombreHijo + "[label=\"LISTA_CLASES\"];\n";
        g.grafo += "  "+padre + " -> "+nombreHijo+";\n";
        g.contador++;
        padre = nombreHijo;

        for(let x=0; x< this.instrucciones.length; x++){
            let inst=this.instrucciones[x];
            nombreHijo="nodo"+g.contador;
            g.grafo+= "  "+nombreHijo + "[label=\""+inst.getNombreHijo()+"\"];\n";
            g.grafo+= "  "+padre +" -> "+ nombreHijo+";\n";
            g.contador++;
            inst.generarGrafo(g,nombreHijo);

        }

    }
    getNombreHijo():String{
        throw new Error("Method not implemented.");
    }
}