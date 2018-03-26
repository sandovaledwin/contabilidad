var fs       = require( "fs" );
var fileName = "./output/results.json"
var contents = fs.readFileSync( fileName, "utf8" );
var data     = JSON.parse( contents );

var year     = '2017'
var ingresos = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
var egresos  = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
var recDate  = null;
var output   = "";

data.forEach( element => {

    if( element.date ){
        
        recDate = new Date( element.date.substring( 0, 10 ).replace( "-", "/" ) );
        
        //console.log( recDate.getFullYear() + "/" + recDate.getMonth() + "/" + recDate.getDay() );
        
        if( recDate.getFullYear() == year ){

            if( element.type  == "ingreso" ){ 
                console.log( "Ingreso" );
                console.log( recDate.getMonth() );
                console.log( element );
                ingresos[ recDate.getMonth() ] += element.amount;     
            }

            if( element.type  == "gasto"   ){ 
                egresos[ recDate.getMonth() ] += element.amount;     
            }            

        }

    }

});

console.log( "Ingresos Mensuales:" );
console.log( ingresos );

console.log( "Gastos Mensuales:" );
console.log( egresos );

output = "let year     = " + year + ";\n" +
         "let ingresos = " + JSON.stringify( ingresos ) + ";\n" +
         "let gastos   = " + JSON.stringify( egresos  ) + ";\n";

fs.writeFile( "./output/ingresosGastosMensuales.js", output, function( err ) {
          
    if(err) {
        return console.log( err );
    }

    console.log( "The file was saved!" );

});