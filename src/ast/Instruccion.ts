import {ValorGrafo} from "./grafo/ValorGrafo"

export abstract class Instruccion {
    public line:Number= 0;
    public column: Number=0;

    constructor(line:Number, column:Number){
        this.line=line;
        this.column = column;
    }

    //METODO PARA TRADUCIR CODIGO
    abstract translate():String;
    
    //METODOS PARA GENERACION DE REPORTE
    abstract generarGrafo(g:ValorGrafo, padre:String):any;
    abstract getNombreHijo():String;
}