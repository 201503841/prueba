
import { Request, Response } from "express";
import { AnalizarJava } from './Analisis';

export let analizar = (req:Request, res: Response) => {
    
    //console.log("query: ",req.query.codigo)
    let codigo:string = req.query.codigo;
    console.log(codigo);
    
    //let respuesta = codigo;
    let respuesta = AnalizarJava(codigo);
    
    //console.log("params: ",req.params)
    let a = [{'analisis': respuesta}, {'grafo': 'reporteAST'}, {'errores': 'reporteErrores'}]
    res.send(a);    
    
}

/*
{
    codigo: "class id { ... }"
}
*/

export let miAuxiliar = (req:Request, res: Response) => {
    console.log("params: ",req.params)
    res.send("no me motiva a echarle ganas al curso :'v");
}
