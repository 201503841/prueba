"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoOperacion = exports.Tipo = void 0;
var Tipo;
(function (Tipo) {
    Tipo[Tipo["DOUBLE"] = 0] = "DOUBLE";
    Tipo[Tipo["STRING"] = 1] = "STRING";
    Tipo[Tipo["CHAR"] = 2] = "CHAR";
    Tipo[Tipo["VOID"] = 3] = "VOID";
    Tipo[Tipo["BOOLEAN"] = 4] = "BOOLEAN";
    Tipo[Tipo["INT"] = 5] = "INT";
})(Tipo = exports.Tipo || (exports.Tipo = {}));
var TipoOperacion;
(function (TipoOperacion) {
    TipoOperacion[TipoOperacion["SUMA"] = 0] = "SUMA";
    TipoOperacion[TipoOperacion["RESTA"] = 1] = "RESTA";
    TipoOperacion[TipoOperacion["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoOperacion[TipoOperacion["DIVISION"] = 3] = "DIVISION";
    TipoOperacion[TipoOperacion["MENOSUNARIO"] = 4] = "MENOSUNARIO";
    TipoOperacion[TipoOperacion["MAYOR"] = 5] = "MAYOR";
    TipoOperacion[TipoOperacion["MENOR"] = 6] = "MENOR";
    TipoOperacion[TipoOperacion["MAYORIGUAL"] = 7] = "MAYORIGUAL";
    TipoOperacion[TipoOperacion["MENORIGUAL"] = 8] = "MENORIGUAL";
    TipoOperacion[TipoOperacion["IGUALIGUAL"] = 9] = "IGUALIGUAL";
    TipoOperacion[TipoOperacion["DISTINTO"] = 10] = "DISTINTO";
    TipoOperacion[TipoOperacion["OR"] = 11] = "OR";
    TipoOperacion[TipoOperacion["AND"] = 12] = "AND";
    TipoOperacion[TipoOperacion["NOT"] = 13] = "NOT";
    TipoOperacion[TipoOperacion["XOR"] = 14] = "XOR";
    TipoOperacion[TipoOperacion["INCREMENTO"] = 15] = "INCREMENTO";
    TipoOperacion[TipoOperacion["DECREMENTO"] = 16] = "DECREMENTO";
})(TipoOperacion = exports.TipoOperacion || (exports.TipoOperacion = {}));
