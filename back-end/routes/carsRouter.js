const express = require("express")
const router = express.Router()
const db = require('../data/db')
const multer = require('multer');
const path = require('path');



// GET all cars - Retrieve all cars from the database
router.get('/cars',(req,res) =>{
    db.query('SELECT * FROM cars',(err,result)=>{

        if(err) {res.status(500).json({message : "Server error while accessing the database."})} 
        console.error(err);
        res.json(result)

    })
} )

// GET a single car by ID - Retrieve specific car details by its ID
router.get('/car/:id' ,(req,res)=>{
    const id = req.params.id
    const sql = 'SELECT * FROM cars WHERE id=?'
    db.query(sql,[id],(err,result) =>{
        if(err) {res.status(500).json({message: "Server error while accessing the database."})}

       
        if(result.length === 0){
            res.status(404).json({message:"Page not found."})
        }

       
        res.json(result[0])
    })
})


// POST a new car - Add a new car record to the database
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB




router.post('/new-car', upload.array('images', 5), (req, res) => {
    console.log('Files:', req.files);
  const {
    brand,
    model,
    year,
    color,
    price,
    mileage,
    licenseplate,
    fuel_type,
    status,
    transmission
  } = req.body;

  if (!brand || !model || !year || !color || !price || !mileage || !licenseplate || !fuel_type || !status || !transmission) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  
  const filename = req.files && req.files.length > 0 ? req.files[0].filename : null;

  const insertCarSql = `INSERT INTO cars 
    (brand, model, year, color, price, mileage, licenseplate, fuel_type, status, transmission, filename) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(insertCarSql, [brand, model, year, color, price, mileage, licenseplate, fuel_type, status, transmission, filename], (err, result) => {
    if (err) {
      console.error('Error inserting car:', err);
      return res.status(500).json({ message: 'Database error inserting car' });
    }

    const newCarId = result.insertId;

    return res.status(201).json({ message: 'Car and images added successfully', carId: newCarId });
  });
});




// PUT update car - Update existing car data by ID
router.put('/update-car/:id', upload.single('images'), (req, res) => {
    console.log('File:', req.file);
  const { id } = req.params;
  const {
    brand, model, year, color, price, mileage, licenseplate, fuel_type, status, transmission
  } = req.body;

  let sql;
  let params;

  if (req.file) {
    
    sql = `UPDATE cars SET brand=?, model=?, year=?, color=?, price=?, mileage=?, licenseplate=?, fuel_type=?, status=?, transmission=?, filename=? WHERE id=?`;
    params = [brand, model, year, color, price, mileage, licenseplate, fuel_type, status, transmission, req.file.filename, id];
  } else {
    
    sql = `UPDATE cars SET brand=?, model=?, year=?, color=?, price=?, mileage=?, licenseplate=?, fuel_type=?, status=?, transmission=? WHERE id=?`;
    params = [brand, model, year, color, price, mileage, licenseplate, fuel_type, status, transmission, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Database update error' });
    }
    res.json({ message: 'Car updated successfully' });
  });
});





// DELETE a car - Remove a car record from the database by ID
router.delete('/delete-car/:id',(req,res)=>{
    const {id} = req.params
    const sql = 'DELETE FROM cars WHERE id=? '
    db.query(sql,[id],(err,result)=>{
        
        if(err){
            res.status(500).json({message:'Server error while accessing the database.'})
        }

        if (result.length === 0) {
           
            res.status(404).json({ message: 'Car not found.' });
            return;
        }


      
        res.status(200).json({message:'The car has been successfully deleted'})
    })

})



router.get('/cars/status/:status', (req, res) => {
  const status = req.params.status;

  const query = 'SELECT * FROM cars WHERE status = ?';
  db.query(query, [status], (err, results) => {
    if (err) {
      console.error('Error fetching filtered cars:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    res.json(results);
  });
});







module.exports = router