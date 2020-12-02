

/*
============PUERTO==================  
*/

process.env.PORT = process.env.PORT || 3000;

/*
==============ENTORNO==================== 
*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*
==============VENCIMIENTO TOKEN==================== 
SON 60 SEGUNDOS X 60 MIN X 24 HORAS
*/

process.env.CADUCIDAD_TOKEN=60*60*24*30



/*
==============SEED==================== 
*/
process.env.SEED=process.env.SEED || 'este-es-el-seed-desarrollo'


/*
==============BASE_DE_DATOS====================  
*/

let urlDB;

if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/cafe';
}else{
    urlDB=process.env.MONGO_URI;
}

process.env.URLDB= urlDB;


/*
==============Google cliente ID====================  
*/

process.env.CLIENT_ID = process.env.CLIENT_ID || '1021456825136-dts0f7a74mgeptklcvnkhc7vd483ak5s.apps.googleusercontent.com'