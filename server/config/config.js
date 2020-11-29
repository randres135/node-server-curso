

/*
            PUERTO  
*/

process.env.PORT = process.env.PORT || 3000;

/*
            Entorno  
*/

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/*
            Entorno  
*/

let urlDB;

if(process.env.NODE_ENV==='dev'){
    urlDB='mongodb://localhost:27017/cafe';
}else{
    urlDB='mongodb+srv://mongo135:3bdQWgEaTr0CI6Ys@cluster0.bst0x.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URLDB= urlDB;

//mongodb+srv://mongo135:<password>@cluster0.bst0x.mongodb.net/<dbname>?retryWrites=true&w=majority