"use strict";

const express = require("express");

const PORT = 4545;

const app = express();

app.use("get", () => {});

app.listen(PORT, () => {
  console.log(`Server start on port ${PORT}`);
});
