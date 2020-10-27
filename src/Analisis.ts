import Gramatica = require('../Gramatica/gramatica');
import { AST } from "./ast/AST";
import { GrafoAST } from "./ast/grafo/GrafoAST";

export function AnalizarJava(entrada:string):String{
    console.log("***********************************")
    console.log(entrada);
    
    console.log("***********************************")
    let codigo = ` 
    public class Prueba {
        
    }
    `;
    // Analisis Lexico y Sintactico
    let ast = Gramatica.parse(codigo) as AST;
    //let ast = Gramatica.parse(entrada) as AST;
    
    console.log(ast);
    //Generacion de grafo
    let nuevoCodigo = ast.translate();
    console.log("\n\n---------------- TRADUCCION ----------------\n");
    console.log(nuevoCodigo);
    console.log("\n--------------------------------------------\n");
    
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo()
    console.log("\n\n------------------- GRAFO -------------------\n");
    console.log(txtDotAST);
    console.log("\n--------------------------------------------\n");
    return nuevoCodigo;
}