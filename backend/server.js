require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("./utils/redis");
const fs = require("fs");
const path = require("path");
const serverStartTime = require("./serverStartTime");


console.log('serverStartTime:', Date(serverStartTime));
const app = express();
const port = process.env.PORT || 5000;

const secret = process.env.FC_SECRET;

const ensureDirectoriesExist = (directories) => {
  directories.forEach((directory) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  });
};

ensureDirectoriesExist([
  path.join(__dirname, "uploads/profile_pictures"),
  path.join(__dirname, "uploads/product_images"),
]);

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }),
);

const corsOptions = {
  origin: [
    "http://localhost",
    "http://okeoma.tech",
    "http://0.0.0.0",
    "https://4lrfm7-5000.csb.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-token"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", routes);

app.use((req, res) => {
  res.status(404).send({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
