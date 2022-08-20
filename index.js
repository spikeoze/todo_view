import Express from "express";
const app = Express();
import session from "express-session";
import passport from "passport";
import cors from "cors";



//-------------------------middleware-------------------------//
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
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


app.use(passport.initialize());
app.use(passport.session());




app.get('/', (req, res)=>{
    res.send("Hello")
})






app.listen(8080, ()=>{
    console.log("Running on port 8080");
})