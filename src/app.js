// import express from 'express';
const express = require("express"); // cjs -common java script
const morgan = require("morgan");
const cors = require("cors");
const apiv1Routes = require("./routes/apiv1.routes");
const errorRoutes = require("./routes/error.routes");
require("dotenv").config();
const { exec } = require('child_process');

const PORT = process.env.PORT ?? 8001;

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ok");
});

apiv1Routes(app);
errorRoutes(app);

app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  await new Promise((resolve, reject) => {
    const migrate = exec(
      'sequelize db:migrate',
      { env: process.env },
      err => (err ? reject(err) : resolve())
    );

    // Forward stdout+stderr to this process
    migrate.stdout.pipe(process.stdout);
    migrate.stderr.pipe(process.stderr);
  });
});