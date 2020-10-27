"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.miAuxiliar = exports.analizar = void 0;
const Analisis_1 = require("./Analisis");
exports.analizar = (req, res) => {
    //console.log("query: ",req.query.codigo)
    let codigo = req.query.codigo;
    console.log(codigo);
    //let respuesta = codigo;
    let respuesta = Analisis_1.AnalizarJava(codigo);
    //console.log("params: ",req.params)
    let a = [{ 'analisis': respuesta }, { 'grafo': 'reporteAST' }, { 'errores': 'reporteErrores' }];
    res.send(a);
};
/*
{
    codigo: "class id { ... }"
}
*/
exports.miAuxiliar = (req, res) => {
    console.log("params: ", req.params);
    res.send("no me motiva a echarle ganas al curso :'v");
};
