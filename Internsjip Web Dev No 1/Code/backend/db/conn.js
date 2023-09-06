const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const db = process.env.ATLAS_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to original database");
  });
