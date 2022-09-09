var SegfaultHandler = require("segfault-handler");
SegfaultHandler.registerHandler("crash.log");
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
var errorHandler = require("errorhandler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

//*------------------ Routes -------------------------//
const userRouter = require("./routes/user");
const postRouter = require("./routes/posts");
const likesRouter = require("./routes/likes");
const commentsRouter = require("./routes/comments");

const followersRouter = require("./routes/followers");

app.use("/", postRouter);
app.use("/", followersRouter);
app.use("/user/", userRouter);
app.use("/post/", likesRouter);
app.use("/post/", commentsRouter);

//*------------------------listener-------------------------//

app.listen(process.env.PORT || 8080, () => {
  console.log(`Running on port ${process.env.PORT || 8080}`);
});
