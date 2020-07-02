const client = require('node-firebird');
const options = require('../database/options');

module.exports = {
  async graphics(req,res){
    const errorsData = "Não existe dados para ser retornados";
    const sqlLeitos = "select * from PERCENTUAL_INDICATORS('')";
    try{
      await client.attach(options, (err,db)=>{
        if(err){
          throw err;
        }else{
            db.query(sqlLeitos, (err,result)=>{
              try{
                console.log('Conexão funcionando');
                  this.leitos = result;

                if(result != undefined){
                  db.detach();
                  for (let i = 0; i < leitos.length; i++) {
                    const bf = (leitos[i]['LEITO1']).toString('utf8');
                    leitos[i]['LEITO1'] = bf;
                 }              
                  return res.send({leitos});
                }else
                    res.status(400).send({errors:"Óbitos: "+errorsData});
                }catch{
                  throw err;
                }
              });     
            }
          });
    }catch{
        res
        .status(400)
        .send({error:"Falha ao carregar os dados dos usuarios do servidor"});
      }
  }
}