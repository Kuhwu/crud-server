const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoute');
const app = express();

mongoose.connect('mongodb+srv://jhcentino2003:H3lcrmEHLaFNC2Yt@crud.klbqg.mongodb.net/?retryWrites=true&w=majority&appName=CRUD')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use('/api', studentRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
