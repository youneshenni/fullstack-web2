const express = require('express');
const { sign, verify } = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const api = require('./api')



const app = express();
app.use(cookieParser())


app.use('/api', api);


app.get('*', (req, res) => {
    try {
        res.sendFile('index.html', { root: __dirname + '/public' });
    } catch (e) {
        res.redirect('/login');
    }
}
);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
}
);
