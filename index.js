const app = require("./app");
const dbConnect = require("./dbConnect");
require("dotenv").config();
const port = process.env.PORT || 5050;

dbConnect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  userCreateIndex: true,
})
  .then(() => {
    app.listen(port, () => {
      console.log(`backend server is running on ${port}`);
    });
  })

