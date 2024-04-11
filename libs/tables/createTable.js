// createTable.js

const mongoose = require('mongoose');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// Conecta a la base de datos MongoDB utilizando la variable de entorno MONGODB_URI
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const tableSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  question: { type: String, required: true },
  answered: { type: Boolean, default: false },
  category: { type: String },
});

const Table = mongoose.model('Table', tableSchema);

const newEntry = new Table({
  id: 1,
  question: '¿Cómo crear una tabla en MongoDB?',
  category: 'Desarrollo web',
});

newEntry.save((err) => {
  if (err) {
    console.error('Error al guardar la entrada:', err);
  } else {
    console.log('Entrada guardada correctamente');
  }
  mongoose.connection.close();
});
