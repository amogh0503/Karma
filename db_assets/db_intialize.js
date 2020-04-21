const Pool = require('pg').Pool
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const secret = require('../config.js')
const saltRounds = 10;

const pool = new Pool({
    user:'postgres',
    host: 'localhost',
    database: 'karma',
    password: 'root',
    port: '5432',
})

const getUser = (request, response) => {                                                      //Login
  const {email,password} = request.body
    pool.query('SELECT password FROM users where email = $1',[email],(error, results) => {
      user = (results.rows[0])
      if (error) {
        throw error
      }
      else
      { bcrypt.compare(password, user.password, function (err, results) {
        if (results == true) {
            const token = jwt.sign(
            { id: email},
            secret,
            { expiresIn:'20d' }
            );                                                  // JWT session upon signing
          response.json({code:202, status:'Login Success',sign:token}); 
          console.log(token) 
          } 
        else {
            response.json({code:203, status:'Login failure'});
        }
      })
        
        }
  }) 
}


const contactUser = (request, response) => {
   const {fname,email,subject,message} = request.body
      pool.query('INSERT INTO contacts(fname,email,subject,message) VALUES($1,$2,$3,$4)',[fname,email,subject,message],(error,results) => {
        if(error){
          throw error
        }
        else{
          response.json({code:204, status:'Contact Success'});
      } 
  })
}

const getUserById = (request, response) => {                                             
    const id = parseInt(request.params.id)
                                                                                        
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      else {
        response.status(200).json(results.rows)
      }
      })
  }


const createUser = (request, response) => {                            // Register
    const { fname, password, phone, email, address} = request.body
    bcrypt.hash(password, saltRounds, function (err,   hash) {
    pool.query('INSERT INTO users (fname, password, phone, email, address) VALUES ($1, $2,$3,$4,$5)', [fname, hash, phone, email, address], (error, results) => {
      if (error) { 
        throw error
      }
      else{          
           const token = jwt.sign(
            { id: email},
            secret,
            { expiresIn:'20d' }
            );
            response.json({code:201,status:'created',sign:token});
            console.log(token)
      }
    })
  })
}

  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [fname, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.json({code:201,status:'created'});
        //response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }


  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }


  module.exports = {
    getUser,
    contactUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }