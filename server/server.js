const express = require('express');

const parser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression')
const path = require('path');

const Shoe = require('../db/Shoe.js');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(parser.json());
app.use(morgan('dev'));
app.use(compression());

// SERVER METHODS //
app.get('/:shoeID/images', ({ params }, res) => {
  const id = params.shoeID;
  const shoeID = id.substring(1, id.length);
  Shoe.find({ shoeID }, (err, shoe) => {
    if (err) {
      console.log(err);
    }
    res.send(shoe);
  });
});


// APP LISTENING PROTOCOL
const PORT = 3005;
app.listen(PORT, () => {
  console.log(`>>>>> Express server listening on port ${PORT}...`);
});
