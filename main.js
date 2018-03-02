
var fs       = require('fs');
var Excel    = require('exceljs');
var workbook = new Excel.Workbook();
var fileName = "./input/gaviotas-contabilidad.xlsx"

var output    = [];
var houseId   = 1;
var houseName = "SAN VICENTE";
var sueldos   = 0;
var ingresos  = 0;
var abarrotes  = 0;
var luz  = 0;

//[null,"CASA","MES","CONCEPTO","NOCHES DE HOSPEDAJE","TOTAL DE PERSONAS","FECHA","INGRESOS","EGRESOS","TOTAL"]

workbook.xlsx.readFile( fileName )
.then( function( worksheet ) {

  var worksheet = workbook.getWorksheet('Sheet1');

  worksheet.eachRow( { includeEmpty: true }, function( row, rowNumber ) {

    if( rowNumber > 1 ){

      var expense  = {
        "id" : 1,
        "house" : "",
        "description" : "",
        "category" : "",
        "date" : "",
        "amount" : 0.00,
        "type" : "gasto"
      };

      //console.log('Row ' + rowNumber + ' = ' , JSON.stringify(row.values) );
      //console.log('Expense = ' , row.getCell( 8 ).value );

      if( row.getCell( 1 ).value ){

        houseId             = row.getCell( 1 ).value === 'SAN VICENTE' ? 1 : 2 ;
        houseName           = row.getCell( 1 ).value;

        expense.description = row.getCell( 3 ).value;
        expense.amount      = row.getCell( 7 ).value;
        expense.date        = row.getCell( 6 ).value;
        expense.type        = "ingreso";
        expense.category    = "renta";
        expense.house       = houseName;
        expense.id          = houseId;
        ingresos           += row.getCell( 7 ).value;

      }

      // validation of expenses
      if( row.getCell( 8 ).value || row.getCell( 8 ).value == 0 ){

        expense.description = row.getCell( 3 ).value;
        expense.amount      = row.getCell( 8 ).value;
        expense.date        = row.getCell( 6 ).value;
        expense.house       = houseName;
        expense.id          = houseId;

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "marsella" ) > -1 ){
          expense.house     = "MARSELLA";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "san vicente" ) > -1 ){
          expense.house     = "SAN VICENTE";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "publicidad"  ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "google"      ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "facebook"    ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "chulipresio" ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "web"         ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "dominio"     ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "clasificado" ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "hosting"     ) > -1 ){
          expense.category  = "marketing";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "agua" ) > -1 ){
          expense.category  = "agua";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "luz" ) > -1 ){
          expense.category  = "luz";
          luz += row.getCell( 8 ).value;
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "lavado"   ) > -1 ){
          expense.category  = "lavanderia";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "limpieza"   ) > -1 ){
          expense.category  = "limpieza_casa";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "admin"     ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "aguinaldo" ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "apoyo"     ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "bono"      ) > -1 ){
          expense.category  = "sueldos";
          sueldos += row.getCell( 8 ).value;
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "gas"   ) > -1 ){
          expense.category  = "gas";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "impuesto"    ) > -1 ){
          expense.category  = "impuestos";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "papel"       ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "consumibles" ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "trapeadores" ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "abarrotes"   ) > -1){
          expense.category  = "abarrotes";
          abarrotes += row.getCell( 8 ).value;
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "instalación"     ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "circuito"        ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "antiderrapantes" ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "mantenimiento"   ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "centro de car"   ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "fertilizante"    ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "reparaciones"    ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "relleno de tier" ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "plomeria"        ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "pilas"           ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "impermiavilizac" ) > -1 || 
            row.getCell( 3 ).value.toLowerCase().indexOf( "pintura"         ) > -1 || 
            row.getCell( 3 ).value.toLowerCase().indexOf( "pintar"          ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "pila"            ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "mano de obra"    ) > -1 ||            
            row.getCell( 3 ).value.toLowerCase().indexOf( "reparación"      ) > -1 ){
          expense.category  = "mantenimiento";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "cuota" ) > -1 ){
          expense.category  = "cuota_coto";
        }        

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "vtv"     ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "cable"   ) > -1 ){
          expense.category  = "television";
        }

        if( row.getCell( 3 ).value.toLowerCase().indexOf( "juego de sabanas"     ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "cubre colchones"      ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "compra de licuadora"  ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "envió de sabanas"     ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "almohadas y sabanas"  ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "compra de tarja"      ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "compra de televisión" ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "almohadas nuevas"     ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "licuadora"            ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "sartenes"             ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "plancha"              ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "de cocina"            ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "tarjetas"             ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "muebles coppel"       ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "sofa cama para"       ) > -1 ||
            row.getCell( 3 ).value.toLowerCase().indexOf( "juego de toallas"     ) > -1 ){
              expense.category  = "equipamiento";
            }

      }

      output.push( expense );

      //console.log( expense );


      if( rowNumber == worksheet.rowCount ){
        
        //console.log( output );
        /** 
        console.log( "Total de Ingresos: $", ingresos );
        console.log( "Total de Sueldos Pagados: $", sueldos );
        console.log( "Total Gastado en Abarrotes: $", abarrotes );
        console.log( "Total Gastado en Luz: $", luz );
        **/

        fs.writeFile( "./output/results.json", JSON.stringify( output ), function( err ) {
          
          if(err) {
              return console.log( err );
          }
      
          console.log( "The file was saved!" );

        });

      }


    } // endIf rowNumber > 1

  });

});
