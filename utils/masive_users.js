const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Asegúrate de tener un modelo de usuario definido

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a la base de datos exitosa');

    // Generar 50 usuarios ficticios
    const usuariosFicticios = [];
    const categorias = ['Cuarta', 'Quinta', 'Sexta', 'Septima', 'Octava']; // Define las categorías que deseas

    for (let i = 0; i < 80; i++) {
      const passwordEncriptada = bcrypt.hashSync('password123', 10); // Encripta la contraseña
      const usuario = {
        name: `Usuario${i + 1}`,
        email: `usuario${i + 1}@example.com`,
        password: passwordEncriptada,
        categoria: categorias[Math.floor(Math.random() * categorias.length)], // Selecciona una categoría aleatoria
        genero: Math.random() < 0.5 ? 'Masculino' : 'Femenino', // Genera un género aleatorio
        telefono: '123456789' // Número de teléfono ficticio
      };
      usuariosFicticios.push(usuario);
    }

    // Insertar los usuarios ficticios en la base de datos
    User.insertMany(usuariosFicticios)
      .then(() => {
        console.log('Usuarios ficticios agregados exitosamente');
        mongoose.connection.close(); // Cerrar la conexión a la base de datos cuando se termine la inserción
      })
      .catch(err => {
        console.error('Error al agregar usuarios ficticios:', err);
        mongoose.connection.close();
      });
  })
  .catch(err => console.error('Error al conectar a la base de datos:', err));
