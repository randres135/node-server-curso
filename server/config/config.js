

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

//mongodb+srv://mongo135:<password>@cluster0.bst0x.mongodb.net/<dbname>?retryWrites=true&w=majority