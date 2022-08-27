const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const passportConfig = require("./passportConfig");

//-------------------------middleware-------------------------//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: false,

    // store: new PrismaSessionStore(new PrismaClient(), {
    //   checkPeriod: 2 * 60 * 1000, //ms
    //   dbRecordIdIsSessionId: true,
    //   dbRecordIdFunction: undefined,
    // }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//* ------------Passport js configuration and middleware-------------------//
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//*------------------ Routes -------------------------//
const userRouter = require("./routes/user");
const postRouter = require("./routes/posts");

app.use("/", postRouter);
app.use("/user/", userRouter);

//*------------------------listener-------------------------//

app.listen(process.env.PORT || 8080, () => {
  console.log(`Running on port ${process.env.PORT || 8080}`);
});
