const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const nunjucks = require("nunjucks");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();
connectDB();

const app = express();

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/datatables/js', express.static(__dirname + '/node_modules/datatables.net/js'));
app.use('/datatables/css', express.static(__dirname + '/node_modules/datatables.net-dt/css'));

// VIEW MECHANISM
nunjucks.configure("views", {
  autoescape: true,
  express: app,
  watch: true,
});
app.use(express.static(path.join(__dirname, "public")));

// MIDDLEWARE TO PROCESS JSON DATA
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/transactions", transactionRoutes);

// VIEW ROUTES
const customerViewRoutes = require("./routes/viewRoutes/customerViewRoutes");
app.use("/customers", customerViewRoutes);
const transactionViewRoutes = require("./routes/viewRoutes/transactionViewRoutes");
app.use("/transactions", transactionViewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
