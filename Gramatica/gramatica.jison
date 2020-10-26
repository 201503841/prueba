/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

%{
      const { Instruccion } = require("../dist/ast/Instruccion");
	const { AST } = require("../dist/ast/AST");
	const { Asignacion } = require("../dist/ast/instrucciones/Asignacion");
      const { Clase } = require("../dist/ast/instrucciones/Clase");
      const { Contador } = require("../dist/ast/instrucciones/Contador");
	const { Declaracion } = require("../dist/ast/instrucciones/Declaracion");
      const { DeclaracionM } = require("../dist/ast/instrucciones/DeclaracionM");
	const { DoWhile } = require("../dist/ast/instrucciones/DoWhile");
      const { Else } = require("../dist/ast/instrucciones/Else");
      const { ElseIf } = require("../dist/ast/instrucciones/ElseIf");
      const { For } = require("../dist/ast/instrucciones/For");
      const { If } = require("../dist/ast/instrucciones/If");
	const { Llamada } = require("../dist/ast/instrucciones/Llamada");
      const { Metodo } = require("../dist/ast/instrucciones/Metodo");
      const { MetodoMain } = require("../dist/ast/instrucciones/MetodoMain");
      const { Print } = require("../dist/ast/instrucciones/Print");
      const { Return } = require("../dist/ast/instrucciones/Return");
      const { While } = require("../dist/ast/instrucciones/While");
	const { OpAritmetica } = require("../dist/ast/expresiones/OpAritmetica");
	const { OpLogicas } = require("../dist/ast/expresiones/OpLogicas");
	const { OpRelacional } = require("../dist/ast/expresiones/OpRelacional");
	const { Identificador } = require("../dist/ast/expresiones/Identificador");
	const { Primitivo } = require("../dist/ast/expresiones/Primitivo");
	const { Tipo } = require("../dist/ast/Tipo");
	const { TipoOperacion } = require("../dist/ast/Tipo");
%}
%lex

%options case-insensitive

%%

\s+					//ignorando los espacios en blanco
"//".*				// ignore comment line 
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]		//ignore comment Multilinea

"public"            return 'public_';
"class"             return 'class_';
"interface"         return 'interface_';
"void"              return 'void_';
"static"            return 'static_';
"main"              return 'main_';
"args"              return 'args_';


 
"int"			  return 'int_';
"String"	        return 'string_';
"boolean"		  return 'boolean_';
"double"            return 'double_';
"char"              return 'char_';


"for"               return 'for_';
"do"                return "do_";
"while"		  return 'while_';
"if"			  return 'if_';
"else"		  return 'else_';    

"System"            return 'system_';
"out"               return 'out_';
"println"           return 'println_';
"print"             return 'print_';


"false"             return 'false_';
"true"              return 'true_';
"break"             return 'break_';
"continue"          return 'continue_';
"return"            return 'return_';


"("                 return 'parAbre';
")"                 return 'parCierra';
","                 return 'coma';
"{"                 return 'llaveAbre';
"}"                 return 'llaveCierra';
";"                 return 'puntoComa';
"."                 return 'punto';
"["                 return 'cocheteAbre';
"]"                 return 'corcheteCierra';

"++"                return 'incremento';
"--"                return 'decremento';
"+"			  return 'mas';
"-"			  return 'menos';
"*"			  return 'por';
"/"		        return 'division';

"&&"			  return 'and_';
"||"			  return 'or_';
"!"			  return 'not_';
"^"                 return 'xor_';

">="                return 'mayorIgual';
"<="                return 'menorIgual';
"=="                return 'igualIgual';
"!="                return 'diferenteA';
"<"			  return 'menorQue';
">"			  return 'mayorQue';
"="			  return 'igual';

\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; /*//"*/ }


/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}

[0-9]+\b                            return 'entero';
[0-9]+("."[0-9]+)?\b                return 'decimal';
("-")[0-9]+("."[0-9]+)?\b           return 'negativo';
([a-zA-Z_])[a-zA-Z0-9_]*		return 'identificador';


<<EOF>>				      return 'EOF';
.	{ 
		console.error('Error léxico: ' + yytext + ', line: ' + yylloc.first_line + ', column: ' + yylloc.first_column); 
	}


/lex


%left 'or_'
%left 'and_'
%left 'igualIgual' 'diferenteA'
%left 'mayorQue' 'menorQue' 'mayorIgual' 'menorIgual'

%left 'mas' 'menos'
%left 'por' 'division'

%left 'incremento' 'decremento'

%left uMenos
%left 'xor_'
%right 'not_'



%start INI

%% 

INI: INSTRUCCIONES EOF {
      var root = new AST($1);
      return root;
}
;

INSTRUCCIONES: INSTRUCCIONES CLASE { $1.push($2); $$ = $1;}
            | CLASE  {$$= [$1];}          
;

CLASE: public_ TIPO_CLASE identificador llaveAbre SENTENCIAS_GLOBALES llaveCierra        { $$= new Clase($3,$5, this._$.first_line, this._$.first_column); }
     | public_ TIPO_CLASE identificador llaveAbre llaveCierra                            { $$= new Clase($3,null, this._$.first_line, this._$.first_column); }                               
     | error llaveCierra {console.error('Error sintáctico: ' + yytext + '| linea: ' + this._$.first_line + ' | columna: ' + this._$.first_column); }
;

TIPO_CLASE: class_               { $$ = $1; }
          | interface_           { $$ = $1; }
;

SENTENCIAS_GLOBALES: SENTENCIAS_GLOBALES SENTENCIAG {$1.push($2); $$=$1;}
                  | SENTENCIAG    {$$= [$1];}
                  | error puntoComa {console.error('Error sintáctico: ' + yytext + '| linea: ' + this._$.first_line + ' | columna: ' + this._$.first_column); }                 
;

SENTENCIAG: METODO                                   { $$ = $1; }
          | DECLARACION_VARIABLE puntoComa           { $$ = $1; }     
          | METODO_MAIN                              { $$ = $1; }
          | DECLARACION_METODO                       { $$ = $1; }
;

METODO: public_ TIPO identificador parAbre PARAMETROSI parCierra  BLOQUE_SENTENCIAS    { $$ = new Metodo($3,$5,$7, this._$.first_line, this._$.first_column); } 
;

METODO_MAIN: public_ static_ void_ main_ parAbre string_ cocheteAbre corcheteCierra args_ parCierra BLOQUE_SENTENCIAS { $$ = new MetodoMain($4,$11, this._$.first_line, this._$.first_column); } 
;

DECLARACION_METODO: public_ TIPO identificador parAbre PARAMETROSI parCierra puntoComa  { $$ = new DeclaracionM($3,$5, this._$.first_line, this._$.first_column); } 
;

LLAMADA_METODO: identificador parAbre PARAMETROS parCierra puntoComa                 { $$ = new Llamada($1,$3,this._$.first_line, this._$.first_column);}    
;


TIPO:int_                          { $$ = Tipo.INT; }
    | double_                      { $$ = Tipo.DOUBLE; }
    | string_                      { $$ = Tipo.STRING; }
    | char_                        { $$ = Tipo.CHAR; }
    | void_                        { $$ = Tipo.VOID; }
    | boolean_                     { $$ = Tipo.BOOLEAN; }
;

PARAMETROSI: PARAMETROSI coma TIPO identificador     { $1.push($4); $$=$1; }
           | TIPO identificador                      {$$ = [$2];}
;


PARAMETROS: PARAMETROS coma EXPRESION           { $1.push($3); $$=$1; }
          | EXPRESION                           {$$=[$1];}
          
;



BLOQUE_SENTENCIAS: llaveAbre LISTA_SENTENCIAS llaveCierra          { $$ = $2; }
                 | llaveAbre llaveCierra                           
;

LISTA_SENTENCIAS: LISTA_SENTENCIAS SENTENCIAS         {$1.push($2); $$=$1;}
                | SENTENCIAS                          {$$= [$1];}
;


SENTENCIAS: IF                                                { $$ = $1; }
          | FOR                                               { $$ = $1; }
	    | WHILE                                             { $$ = $1; }
          | DO_WHILE                                          { $$ = $1; }
          | RETURN                                            { $$ = $1; }
          | PRINT                                             { $$ = $1; }
          | DECLARACION_METODO                                { $$ = $1; }
          | DECLARACION_VARIABLE puntoComa                    { $$ = $1; }
          | ASIGNACION_VARIABLE puntoComa                     { $$ = $1; }
          | LLAMADA_METODO                                    { $$ = $1; }
          | CONTADOR puntoComa                                { $$ = $1; }


;


BLOQUE_REPETICION: llaveAbre SENTENCIAS_REPETICION llaveCierra       { $$ = $2; }
                 | llaveAbre llaveCierra                             { $$ = []; }                   
;


SENTENCIAS_REPETICION: SENTENCIAS_REPETICION REPETICION       {$1.push($2); $$=$1; }
                     | REPETICION                             { $$=[$1];}             
;

REPETICION: IF                                               { $$ = $1; }
          | FOR                                              { $$ = $1; }
          | break_ puntoComa                                 { $$ = $1; }
          | continue_ puntoComa                              { $$ = $1; }
          | WHILE                                            { $$ = $1; }
          | DO_WHILE                                         { $$ = $1; }
          | PRINT                                            { $$ = $1; }
          | DECLARACION_VARIABLE puntoComa                   { $$ = $1; }
          | ASIGNACION_VARIABLE puntoComa                    { $$ = $1; }
          | LLAMADA_METODO                                   { $$ = $1; }
          | CONTADOR puntoComa                               { $$ = $1; }
;

CONTADOR: identificador incremento                    { $$= new Contador($1, $2, this._$.first_line, this._$.first_column); }                                                                                                                             
       | identificador decremento                     { $$= new Contador($1, $2, this._$.first_line, this._$.first_column); }                                                            
;


DECLARACION_VARIABLE: TIPO identificador igual EXPRESION     { $$= new Declaracion($1, $2, $4, this._$.first_line, this._$.first_column); }
                 |TIPO identificador                         { $$= new Declaracion($1, $2, null, this._$.first_line, this._$.first_column); }
;

ASIGNACION_VARIABLE: identificador igual EXPRESION { $$ = new Asignacion($1, $3, this._$.first_line, this._$.first_column); }
;

FOR: for_ parAbre DECLARACION_VARIABLE puntoComa EXPRESION puntoComa EXPRESION parCierra BLOQUE_REPETICION   { $$ = new For($3,$5,$7,$9, this._$.first_line, this._$.first_column); }
;

WHILE: while_  CONDICION    BLOQUE_REPETICION    { $$ = new While($2, $3, this._$.first_line, this._$.first_column); }
;

DO_WHILE:  do_ BLOQUE_REPETICION while_  CONDICION  puntoComa       { $$ = new DoWhile($2, $4, this._$.first_line, this._$.first_column); }
;


IF: if_  CONDICION  BLOQUE_REPETICION             { $$ = new If($2, $3, this._$.first_line, this._$.first_column); }
  | if_  CONDICION  BLOQUE_REPETICION ELSEIF      { $$ = new If($2, $3, this._$.first_line, this._$.first_column); }
  | if_  CONDICION  BLOQUE_REPETICION ELSE        { $$ = new If($2, $3, this._$.first_line, this._$.first_column); }
;
  
ELSEIF: else_ if_  CONDICION  BLOQUE_REPETICION          { $$ = new ElseIf($2, $3, this._$.first_line, this._$.first_column); }
      | else_ if_  CONDICION  BLOQUE_REPETICION ELSEIF   { $$ = new ElseIf($2, $3, this._$.first_line, this._$.first_column); }
      | else_ if_  CONDICION  BLOQUE_REPETICION ELSE     { $$ = new ElseIf($2, $3, this._$.first_line, this._$.first_column); }
;


ELSE: else_ BLOQUE_REPETICION                 { $$ = new Else($2, this._$.first_line, this._$.first_column); } 
;

RETURN: return_ puntoComa                     { $$ = new Return( null, this._$.first_line, this._$.first_column); }
      | return_ EXPRESION puntoComa           { $$ = new Return( $2, this._$.first_line, this._$.first_column); }
;

CONDICION : parAbre EXPRESION parCierra    { $$=$2;}   
;

EXPRESION : EXPRESION mas EXPRESION		 { $$ = new OpAritmetica( TipoOperacion.SUMA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menos EXPRESION		 { $$ = new OpAritmetica( TipoOperacion.RESTA, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION por EXPRESION		 { $$ = new OpAritmetica( TipoOperacion.MULTIPLICACION, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION division EXPRESION       { $$ = new OpAritmetica( TipoOperacion.DIVISION, $1, $3, this._$.first_line, this._$.first_column); }
      //relacionales 
	| EXPRESION mayorQue EXPRESION       { $$ = new OpRelacional( TipoOperacion.MAYOR, $1, $3, this._$.first_line, this._$.first_column); }
	| EXPRESION menorQue EXPRESION       { $$ = new OpRelacional( TipoOperacion.MENOR, $1, $3, this._$.first_line, this._$.first_column); }
      | EXPRESION mayorIgual EXPRESION     { $$ = new OpRelacional( TipoOperacion.MAYORIGUAL, $1, $3, this._$.first_line, this._$.first_column); }
      | EXPRESION menorIgual EXPRESION     { $$ = new OpRelacional( TipoOperacion.MENORIGUAL, $1, $3, this._$.first_line, this._$.first_column); }
      | EXPRESION igualIgual EXPRESION     { $$ = new OpRelacional( TipoOperacion.IGUALIGUAL, $1, $3, this._$.first_line, this._$.first_column); }
      | EXPRESION diferenteA EXPRESION     { $$ = new OpRelacional( TipoOperacion.DISTINTO, $1, $3, this._$.first_line, this._$.first_column); }
      //logicas		 
	| EXPRESION or_ EXPRESION	       { $$ = new OpLogicas( TipoOperacion.OR, $1, $3, this._$.first_line, this._$.first_column); }	
	| EXPRESION and_ EXPRESION		 { $$ = new OpLogicas( TipoOperacion.AND, $1, $3, this._$.first_line, this._$.first_column); }
	| not_ EXPRESION	                   { $$ = new OpLogicas( TypeOperation.NOT, $2, null, this._$.first_line, this._$.first_column); }
      | EXPRESION xor_ EXPRESION           { $$ = new OpLogicas( TipoOperacion.XOR, $1, $3, this._$.first_line, this._$.first_column); }
	| menos EXP %prec uMenos		 { $$ = new OpAritmetica( TypeOperation.MENOSUNARIO, $2, null, this._$.first_line, this._$.first_column); }
	| parAbre EXPRESION parCierra	       { $$ = $2; }
	| PRIMITIVO					 { $$ = $1; }	
      | CONTADOR                           { $$ = $1; }
;

PRIMITIVO : decimal		             { $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| cadena		                   { $$ = new Primitivo( $1, this._$.first_line, this._$.first_column); }
	| true_			             { $$ = new Primitivo( true, this._$.first_line, this._$.first_column); }
	| false_		                   { $$ = new Primitivo( false, this._$.first_line, this._$.first_column); }
	| identificador                      { $$ = new Identificador( $1, this._$.first_line, this._$.first_column); }
      | entero                             {$$=Number($1);}
      
;

PRINT: system_ punto out_ punto IMPRESION  CONDICION puntoComa       { $$ = new Print( $6, this._$.first_line, this._$.first_column); }     
;

IMPRESION: println_                           { $$ = $1; }
         | print_                             { $$ = $1; }

;