import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const uri = process.env.MONGODB_URI || "mongodb://localhost/javascriptTask";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });
