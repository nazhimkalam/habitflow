const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/errorHandler");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests/minute
});

app.use(limiter);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
  
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
});
