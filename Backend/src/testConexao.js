const Firebird = require('node-firebird');
const options = require('./options');

const confirmed = Firebird.attach(options, (err,db)=>{
  if(err){
    throw err;
  }else{
      db.query('SELECT first 1 * FROM USUARIOS', (err,result)=>{
        try{
          console.log('A funcao funcionou');
          this.usuarios = result;
          console.log(result);
          db.detach();
        }catch{
          throw err;
        }
      });
    }
    return this.usuarios;
});

module.exports = confirmed;
