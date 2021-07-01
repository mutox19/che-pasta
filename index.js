const express = require('express');
const path = require('path');
const cors = require('cors');
const dotEnv = require('dotenv');
const AdminBroExpress = require('@admin-bro/express');
const myAdminBro = require('./backend/database/adminBro/admin-bro');
const mongoose = require('mongoose');
const passport = require("passport");
// DB Config
const db = require("./backend/config/keys").mongoURI;
dotEnv.config();

const app = express();

const router = AdminBroExpress.buildRouter(myAdminBro.AdminbroPanel());

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({urlencoded:true}));
app.use(myAdminBro.AdminbroPanel().options.rootPath, router);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./backend/config/passport")(passport);

app.use("/api/v1/users", require("./backend/routes/userRoutes"));
app.use('/api/v1/products', require('./backend/routes/productRoutes'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'../../client/build/index.html'));
});*/
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Serve static files from the React app
//app.use(express.static(path.join(__dirname, "../../client/build")));

const port = process.env.PORT || 3001;

const run = async () => {
  await mongoose.connect(db, { useNewUrlParser: true });
  await app.listen(port, () => {
    console.log(`Che-Pasta Mern application listening on ${port}`);
  });
};

//runs the server
run();

