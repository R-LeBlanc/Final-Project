"use strict";

const express = require("express");

const PORT = process.env.PORT || 4000;

const app = express();

// Endpoints ******************
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// this is our catch all endpoint.
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});
// **********************************

// Node spins up our server and sets it to listen on port 8000.
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
