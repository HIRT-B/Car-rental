const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./data/db');
const port = 3000

const app = express();
app.use(cors());
app.use(bodyParser.json());


//comment

app.get('/cars' , (req,res)=>{
    const sql = 'SELECT * FROM car'
    db.query(sql,(err,result)=>{
        if(err){
            res.status(400).json({message:'problem with server !'})
        }
        res.status(200).json(result)
    })
})

app.get('/cars/:id', (req,res)=>{
    const {id} = req.params
    const sql = 'SELECT * FROM car WHERE id=?'
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(400).json({message:'problem with server !'})
        }
        if(result.length === 0){
            res.status(404).json({message : "car doesn't exist !"})
        }
        res.status(200).json(result)
    })
})

app.post('/new-car',(req,res)=>{
    const {brand,serie,immatriculation,modele,launchYear,status} = req.body
    if(!brand || !serie || !immatriculation || !modele || !launchYear || !status){
       return res.status(400).json({message:'not found'})
    }

    const sql = 'INSERT INTO car (brand,serie,immatriculation,modele,launchYear,status) VALUES (?,?,?,?,?,?) '
    db.query(sql,[brand,serie,immatriculation,modele,launchYear,status],(err,result)=>{
        if(err){
            res.status(400).json({message : 'problem with server !'})
        }
        res.status(200).json({message : 'car was add seccussfuly !'})
    })
})

app.put('/update-car/:id',(req,res)=>{
     const {brand,serie,immatriculation,modele,launchYear,status} = req.body
    if(!brand || !serie || !immatriculation || !modele || !launchYear || !status){
       return res.status(400).json({message:'not found'})
    }
    const id = req.params.id
    const sql = 'UPDATE car SET brand=?, serie=?, immatriculation=?, modele=?, launchYear=?,  status=? WHERE id=?'
    db.query(sql,[brand,serie,immatriculation,modele,launchYear,status,id],(err,result) =>{
        if(err){
            res.status(400).json({message : 'problem with server !'})
        }
        res.status(200).json({message : 'car updated seccussfuly !'})

    })

})

app.delete('/delete-car/:id',(req,res)=>{
    const {id} = req.params
    const sql = 'DELETE FROM car WHERE id=? '
    db.query(sql,[id],(err,result)=>{
        if(err){
            res.status(400).json({message:'server not found'})
        }
        res.status(200).json({message:'car was deleted'})
    })

})

//USERS









app.listen(port,()=>{
    console.log('server run at :' +port)
})