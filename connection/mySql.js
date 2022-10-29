const sequelize = require('sequelize');

const mySql = new sequelize(
    'comp','root','',{
        host : "localhost",
        dialect: 'mysql'
    }
)

mySql.authenticate().then( () => {
    console.log("Connection has been established successfully! ");
}).catch((error)=>{
    console.error("unble to connect", error);
})