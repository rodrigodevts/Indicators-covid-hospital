const client = require('node-firebird');
const options = require('../database/options');

module.exports = {
  async graphics(req,res){
    const errorsData = "Não existe dados para ser retornados";
    const sqlCured = 'SELECT count(*) as qtdCured FROM cps1 as cps inner join escalacovid as esc on esc.codigocps = cps.codigocps where cps.motivo = 1 and cps.datasaida is not null';
    const sqlConfirmed = 'SELECT count(*) as qtdConfirmed FROM ESCALACOVID';
    const sqlDeath = 'SELECT count(*) as qtdDeaths FROM cps1 as cps inner join escalacovid as esc on esc.codigocps = cps.codigocps where cps.motivo = 2 and cps.datasaida is not null';
    
    try{
      await client.attach(options, (err,db)=>{
        if(err){
          throw err;
        }else{
            db.query(sqlCured, (err,result)=>{
              try{
                console.log('Buscando curados');
                this.cured = result;
                // db.detach();
                if(result != undefined){
                  db.query(sqlConfirmed, (err,result)=>{
                    try{
                      console.log('Buscando confirmados');
                      this.confirmed = result;
                      if(result != undefined){
                        db.query(sqlDeath, (err,result)=>{
                          try{
                            console.log('Buscando óbitos');
                            this.deaths = result;
                            if(result != undefined){
                              db.detach();
                              return res.send(JSON.stringify({
                                cured,
                                confirmed,
                                deaths
                              }));
                            }else{
                              res
                                .status(400)
                                .send({errors:"Óbitos: "+errorsData});
                            }
                          }catch{
                            throw err;
                          }
                        });
                      }else{
                        res
                          .status(400)
                          .send({errors:"Confirmados: "+errorsData});
                      }
                    }catch{
                      throw err;
                    }
                  });
                }else{
                  res
                    .status(400)
                    .send({errors:"Curados: "+errorsData});
                }
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