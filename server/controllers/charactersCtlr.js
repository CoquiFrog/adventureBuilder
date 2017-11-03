module.exports={
    getAllCharacters:  (req,res)=>{
        const db = req.app.get('db');
        db.getAllCharacters(req.user.user_id)
        .then((result)=>{
            res.status(200).send(result);
        })
        .catch((err)=>console.log(err,`see getAllCharacters endpoint`))
    },
    getSelectedCharacter: (req,res)=>{
        const db = req.app.get('db');
        db.getSelectedCharacter(req.params.characterId)
        .then((result)=>{
            res.status(200).send(result[0]);
        })
        .catch((err)=>console.log(err,`see getSelectedCharacter endpoint`))
    },
    createCharacter: (req, res)=>{
        const db = req.app.get('db');
        const {user_id} = req.user // req.user once auth0
        const {characterName, gender, dexterity, strength, charisma, healthPoints, classId}= req.body;
        db.addCharacter([characterName, gender, dexterity, strength, charisma, healthPoints, classId, user_id]).then(result =>{
            res.status(200).send(result[0]);
        })
        .catch((err)=>console.log(err,`see addCharacter endpoint`))
    },
    changeHP: (req,res)=>{
        const db = req.app.get('db');
        db.changeHP(req.body.health_points,req.body.character_id)
           .then((result)=>{
                if (result[0].health_points > 0){
                         res.status(200).send(result[0])
                } else {
                         db.killCharacter(req.body.character_id)
                         .then(result=>res.status(200).send(result[0]))
                          .catch((err)=>console.log(err,`see changeHP.killCharacter endpoint`))
                }
        })
        .catch((err)=>console.log(err,`see changeHP.changeHP endpoint`))
   
    }
}