"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AST = void 0;
var Instruccion_1 = require("./Instruccion");
var AST = /** @class */ (function (_super) {
    __extends(AST, _super);
    function AST(instrucciones) {
        var _this = _super.call(this, 0, 0) || this;
        _this.instrucciones = instrucciones;
        return _this;
    }
    AST.prototype.translate = function () {
        return null;
    };
    AST.prototype.generarGrafo = function (g, padre) {
        //---------------LISTA INSTRUCCION--------------+
        var nombreHijo = "nodo" + g.contador;
        g.grafo += "  " + nombreHijo + "[label=\"INSTRUCCIONES\"];\n";
        g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
        g.contador++;
        padre = nombreHijo;
        for (var x = 0; x < this.instrucciones.length; x++) {
            var inst = this.instrucciones[x];
            nombreHijo = "nodo" + g.contador;
            g.grafo += "  " + nombreHijo + "[Label=\"" + inst.getNombreHijo() + "\"]'\n";
            g.grafo += "  " + padre + " -> " + nombreHijo + ";\n";
            g.contador++;
            inst.generarGrafo(g, nombreHijo);
        }
    };
    AST.prototype.getNombreHijo = function () {
        throw new Error("Method not implemented.");
    };
    return AST;
}(Instruccion_1.Instruccion));
exports.AST = AST;
