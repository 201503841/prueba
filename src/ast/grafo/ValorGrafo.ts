export class ValorGrafo{
    contador:number;
    grafo:String;
/**
 *
 * @param contador CONTADOR DE NODOS 
 * @param grafo CADENA QUE TIENE EL DOT O GRAFO
 */

    constructor(contador:number,grafo:String){
        this.contador = contador;
        this.grafo=grafo;

    }

    getContador():number{
        return this.contador;
    }

    getGrafo():String{
        return this.grafo;
    }


    setContador(contador:number){
        this.contador=contador;
    }

    setGrafo(grafo:String){
        this.grafo=grafo;
    }
}