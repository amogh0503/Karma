const Pool = require('pg').Pool
const bcrypt = require('bcryptjs');
const pool = new Pool({
    user:'postgres',
    host: 'localhost',
    database: 'karma',
    password: 'root',
    port: '5432',
})

const getUser = (request, response) => {
  const {email,password} = request.body
    pool.query('SELECT password,email FROM users where email = $1 AND password = $2',[email,password], (error, results) => {
      if (error) {
        throw error
      }
      else if(results.rowCount==1)
        {
          response.json({code:202, status:'Login Success'});
        }
      else{
        response.json({code:203,status:'Login Failed'})
      }
        
  })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const createUser = (request, response) => {
    const { fname, password, phone, email, address} = request.body
  
    pool.query('INSERT INTO users (fname, password, phone, email, address) VALUES ($1, $2,$3,$4,$5)', [fname, password, phone, email, address], (error, results) => {
      if (error) { 
        throw error
      }
      response.json({code:201,status:'created'});
      //response.status(201).send(`User added with ID: ${results.insertId}`)
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
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }