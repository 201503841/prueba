"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalizarJava = void 0;
const Gramatica = require("../Gramatica/gramatica");
const GrafoAST_1 = require("./ast/grafo/GrafoAST");
function AnalizarJava(entrada) {
    console.log("***********************************");
    console.log(entrada);
    console.log("***********************************");
    let codigo = ` 
    public class Prueba {
        public void suma(int x, int y){
            boolean prueba = true;
            prueba = false;
            System.out.println("Esto lo verás una vez");
            int contador =0;
            while (contador<10){
                System.out.println ("Contador" + (contador + 1) );
                contador++;
            } 
            for( int x = 0; x <= a+4; x++){
                System.out.println("Sofia Valentina");
            }    
            if ( a >= 5 ){
                break;
                continue;
            } else if (a < 5){
                continue;
            }else{
                hola = 12;  
                mifuncion(x,"cadena",true);
            }
            return;
            

        }
    }

    `;
    // Analisis Lexico y Sintactico
    let ast = Gramatica.parse(codigo);
    //let ast = Gramatica.parse(entrada) as AST;
    console.log(ast);
    //Generacion de grafo
    let nuevoCodigo = ast.translate();
    console.log("\n\n---------------- TRADUCCION ----------------\n");
    console.log(nuevoCodigo);
    console.log("\n--------------------------------------------\n");
    //Inicia la generacion del grafo
    let grafoAST = new GrafoAST_1.GrafoAST(ast);
    let txtDotAST = grafoAST.getGrafo();
    console.log("\n\n------------------- GRAFO -------------------\n");
    console.log(txtDotAST);
    console.log("\n--------------------------------------------\n");
    return nuevoCodigo;
}
exports.AnalizarJava = AnalizarJava;
