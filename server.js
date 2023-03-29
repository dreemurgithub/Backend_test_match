require('dotenv').config()
const express = require('express');
const app = express();
// const origin = ['http://localhost:3000']
const origin = [];
if (JSON.parse(process.env.production)) {
    origin.push('https://fir-match-making.web.app')
    origin.push('https://fir-match-making.firebaseapp.com')
} else {
    origin.push('http://localhost:3000')
}
app.use(express.json())


const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: `${process.env.database}/chess`,
    collection: 'sessions'
});
store.on('error', function (error) {
    console.log(error);
});
app.use((req, res, next) => {
    if (origin.includes(req.get('origin'))) {
        app.set('trust proxy', 1)
        res.setHeader("Access-Control-Allow-Origin", true);
        // res.header('Access-Control-Allow-Credentials', true)
        next()
    }
});

app.use(require('express-session')({
    secret: 'some_secret_stuff',
    cookie: {
        maxAge: 1000 * 60 * 15,  // 6 hours
        secure: JSON.parse(process.env.production) ? true : 'auto',
        sameSite: JSON.parse(process.env.production) ? 'none' : 'lax' ,
    },
    store: store,
    resave: false,
    saveUninitialized: false
    //TODO test on replit to find correct way to set cookie for chrome
}));

const cors = require('cors')
app.use(cors({
    credentials: true,
    origin: origin
}))
app.use((req, res, next) => {
    if (req.url === '/user/login' || req.url === '/' || req.url==='/user/ios' ) {
        next();return   }
    if (req.session.role === 'admin' || req.session.role === 'giaovien' || req.session.role === 'quanli') {
        next(); return; }
})




const router_student = require('./controller/pairing/student')
app.use(router_student)
const router_user = require('./controller/user')
app.use(router_user)

app.listen(5000)

