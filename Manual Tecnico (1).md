  **TEMA:**      **PAGINA:**
  -------------- ------------------------------------------------ --
                 
  Introducción   2
                 
  objetivos      3
                 
  Análisis       4
                 Descripción del Problema
                 Análisis de Requerimientos de Usuario
                 Planteo Inicial de la Solución
                 Buenas Prácticas de Programación a Implementar
                 
  Diseño         6
                 
  Soporte        8
                 
  conclusiones   9

**INTRODUCCION**
================

En el siguiente manual se detallará la información técnica de forma
clara y concisa acerca del funcionamiento de un translate en Docker. La
aplicación consta de una estructura en 3 contenedores.

Dicha aplicación se base en la traducción de un archivo de entrada en
java se tendrá la opción de traducirlo a JavaScript o Python dependiendo
lo que el cliente desee. Si se escribe algo incorrecto en el archivo de
entrada la aplicación muestra que errores se encuentran en el archivo ya
sean errores léxicos o sintácticos.

**OBJETIVOS**
=============

-   Desarrollar una aplicación rápida, manejar altos volúmenes
    de información.

-   Manejar la conexión contenedores que permita la comunicación
    adecuada entre el cliente y los analizadores.

-   Traducir correctamente el archivo de entrada al lenguaje deseado.3

-   Mostrar gráficamente el reporte del AST.

**ANALISIS**
============

DESCRIPCION DEL PROBLEMA
------------------------

Se desea desarrollar un intérprete que permita el análisis de un lenguaje java de entrada y esperar como salida la traducción a JavaScript o Python.
----------------------------------------------------------------------------------------------------------------------------------------------------

ANALISIS DE REQUERIMIENTOS DEL USUARIO.
---------------------------------------

-   Creación de una página web amigable, agradable y de fácil uso para
    el usuario, además que su ejecución sea de forma sencilla y rápida.

-   Implementación de analizadores léxicos y sintácticos.

-   Implementación de contenedores.

-   Al finalizar se deberá crear reportes en cuales se podrá visualizar
    los errores encontrados por los analizadores.

**PLANTEO INICIAL DE LA SOLUCION**
----------------------------------

Se desea desarrollar un traductor utilizando herramientas para análisis
léxico y sintáctico y otro traductor sin uso de herramientas. Para dar
solución se comienza con la creación de la página web la cual vera
nuestro cliente como interfaz gráfica posterior a esto comenzamos con el
traductor con herramienta utilizando jison y el analizador sin
herramienta en el formato de typescript de manera que ambos acepten
archivo de entrada en formato java. Cabe mencionar que cliente y ambos
analizadores se encuentran en diferentes contenedores para simular a 3
computadoras diferentes.

En ambos analizadores generara un reporte del árbol sintáctico así como
reporte de errores léxicos, sintácticos y reporte de tokens.

**BUENAS PRACTICAS DE PROGRAMACION A IMPLEMENTAR**
--------------------------------------------------

Al momento de realizar cada uno de los algoritmos o implementar
distintos métodos para resolver cada uno de los problemas, es bueno
verificar que el software se esté desarrollando de la que, deseada o
esperada, así mismos con las clases, algoritmos, ciclos, etc. que se
vayan implementando no interfieran con el buen funcionamiento de los que
ya tenemos creados y funcionando correctamente.

Para que la interfaz gráfica presentada y la funcionalidad del programa
transcurra sin el menor problema se deberá realizar un análisis
estructurado y lógico de lo que deberá realizar nuestro programa, para
ello es necesario implementar de forma apropiada los distintos métodos
para la solución de los problemas que presente la creación de nuestro
programa, además el hecho de planificar y revisar las acciones que
realiza nuestro programa al momentos de ejecutarse nos permite encontrar
con mayor facilidad errores de compilación o ejecución, corregir los
mismo y así evitar que futuros problemas se nos presente conforme se
avanza con la creación del programa.

Por último, el investigar en diferentes fuentes de consulta el uso de
algún método especifico o funciones propias de nuestro lenguaje de
programación, ayuda en la forma de resolver un problema, ya que existen
varias maneras de resolverlo, pero algunas se ajustan de mejor manera a
nuestras necesidades o circunstancias en las que se esté trabajando.

**CONCLUSIONES**
================

-   Se pudo generar un programa que permita la lectura de archivos java.

-   Se manejó la herramienta Graphiz para mostrar el árbol sintáctico.

-   Se utilizo Docker para la realización de los 3 contenedores
    (cliente, analizador para JavaScript, analizador para Python).

-   Interactuar virtualmente y entretenimiento del usuario.

-   Se utilizo Go para levantar la pagina web en HTML que contiene la
    interfaz grafica que visualizara el cliente.
