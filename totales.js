var fs       = require( "fs" );
var fileName = "./output/results.json"
var contents = fs.readFileSync( fileName, "utf8" );
var data     = JSON.parse( contents );
var recDate  = null;
var year     = '2018'
var agua               = 0;
var luz                = 0;
var sueldosPagados     = 0;
var cuotaMantenimiento = 0;
var reparaciones       = 0;
var marketing          = 0;
var predial            = 0;
var equipamiento       = 0;
var abarrotes          = 0;
var lavanderia         = 0;
var limpieza_casa      = 0;
var gas                = 0;
var television         = 0;
var ingresosTotales    = 0;
var egresosTotales     = 0;
var utilidadBruta      = 0;
var gastos             = 0;

data.forEach( element => {

    if( element.date ){
        
        recDate = new Date( element.date.substring( 0, 10 ).replace( "-", "/" ) );
        
        //console.log( recDate.getFullYear() + "/" + recDate.getMonth() + "/" + recDate.getDay() );
        
        if( recDate.getFullYear() == year ){

            if( element.category == "abarrotes"     ){ abarrotes  += element.amount;          }

            if( element.category == "equipamiento"  ){ equipamiento  += element.amount;       }

            if( element.category == "impuestos"     ){ predial  += element.amount;            }

            if( element.category == "agua"          ){ agua  += element.amount;               }

            if( element.category == "luz"           ){ luz  += element.amount;                }

            if( element.category == "sueldos"       ){ sueldosPagados  += element.amount;     }

            if( element.category == "mantenimiento" ){ reparaciones  += element.amount;       }

            if( element.category == "cuota_coto"    ){ cuotaMantenimiento  += element.amount; }
            
            if( element.category == "marketing"     ){ marketing  += element.amount;          }

            if( element.category == "television"    ){ television  += element.amount;         }

            if( element.category == "gas"           ){ gas  += element.amount;                }

            if( element.category == "limpieza_casa" ){ limpieza_casa  += element.amount;      }

            if( element.category == "lavanderia"    ){ lavanderia  += element.amount;         }

            if( element.type     == "ingreso"       ){ ingresosTotales += element.amount;     }

            if( element.type     == "gasto"         ){ egresosTotales  += element.amount;     }

        }

    }

});

Number.prototype.format = function(n, x) {
    var re = '(\\d)(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$1,');
};

utilidadBruta = ingresosTotales - egresosTotales;

console.log( "*----------------------------------------------------------------------------*" );
console.log( "*                                                                            *" );
console.log( "*                      REPORTE INGRESOS Y EGRESOS                            *" );
console.log( "*                                  " + year + "                                      *" );
console.log( "*                                 GENERAL                                    *" );
console.log( "*                                                                            *" );
console.log( "*----------------------------------------------------------------------------*" );
console.log( "Total de Ingresos: $", ingresosTotales.format( 2 ) );
console.log( "Total de Egresos:                $", egresosTotales.format(  2 ) );
console.log( "                    __________________________" );
console.log( "Total General:     $", utilidadBruta.format(   2 ) );
console.log( "" );
console.log( "" );
console.log( "" );

gastos = sueldosPagados + 
         limpieza_casa  + 
         lavanderia     + 
         cuotaMantenimiento +
         reparaciones +
         marketing    +
         abarrotes    +
         equipamiento +
         predial      +
         agua         +
         luz          +
         television   +
         gas;

console.log( "*----------------------------------------------------------------------------*" );
console.log( "*                                                                            *" );
console.log( "*                     REPORTE DETALLADO DE GASTOS                            *" );
console.log( "*                               " + year + "                                         *" );
console.log( "*                                                                            *" );
console.log( "*----------------------------------------------------------------------------*" );
console.log( "Sueldos Pagados:         $" + sueldosPagados.format( 2 ) + " (%" + ( ( sueldosPagados / gastos ) * 100 ).format(2) + ")" );
console.log( "Limpieza Casa:           $" + limpieza_casa.format( 2 )  + " (%" + ( ( limpieza_casa / gastos ) * 100 ).format(2) + ")" );
console.log( "Lavanderia:              $" + lavanderia.format( 2 )     + " (%" + ( ( lavanderia / gastos ) * 100 ).format(2) + ")" );
console.log( "Cuotas de Mantenimiento: $" + cuotaMantenimiento.format( 2 ) + " (%" + ( ( cuotaMantenimiento / gastos ) * 100 ).format(2) + ")" );
console.log( "Reparaciones:            $" + reparaciones.format( 2 )   + " (%" + ( ( reparaciones / gastos ) * 100 ).format(2) + ")" );
console.log( "Publicidad:              $" + marketing.format( 2 )      + " (%" + ( ( marketing / gastos ) * 100 ).format(2) + ")" );
console.log( "Abarrotes:               $" + abarrotes.format( 2 )      + " (%" + ( ( abarrotes / gastos ) * 100 ).format(2) + ")" );
console.log( "Equipamiento:            $" + equipamiento.format( 2 )   + " (%" + ( ( equipamiento / gastos ) * 100 ).format(2) + ")" );
console.log( "Impuesto Predial:        $" + predial.format( 2 )        + " (%" + ( ( predial / gastos ) * 100 ).format(2) + ")" );
console.log( "Agua:                    $" + agua.format( 2 )           + " (%" + ( ( agua / gastos ) * 100 ).format(2) + ")" );
console.log( "Luz:                     $" + luz.format( 2 )            + " (%" + ( ( luz / gastos ) * 100 ).format(2) + ")" );
console.log( "Televisión:              $" + television.format( 2 )     + " (%" + ( ( television / gastos ) * 100 ).format(2) + ")" );
console.log( "Gas:                     $" + gas.format( 2 )            + " (%" + ( ( gas / gastos ) * 100 ).format(2) + ")" );
console.log( "                    __________________________" );
console.log( "Total de Gastos:     $", gastos.format( 2 ) );
