const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redisClient = require("./utils/redis");
const fs = require("fs");

const app = express();
const port = 5000;

const sec = "x#&e9^y@6SbT!LmD+K#*#N&v^d?PQz#G";

const path = require("path");

// Ensure directories exist before starting the server
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
    secret: sec,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
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

// Middleware to handle requests to the root path (/)
app.use((req, res) => {
  res.status(404).send({ message: "Not found" });
});

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal server error" });
});

// Starts the server and listens on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
