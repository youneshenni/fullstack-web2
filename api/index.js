const express = require('express');

const router = express.Router();
const { verify, sign } = require('jsonwebtoken')

const users = [
    {
        id: 1,
        username: 'admin',
        password: 'admin'
    },
    {
        id: 2,
        username: 'admin2',
        password: 'admin2'
    }
]

router.post('/login', express.json(), (req, res) => {
    const { username, password } = req.body;
    const result = users.find(user => user.username === username && user.password === password);
    if (result) {
        res.cookie('jwt', sign({
            id: result.id,
            username: result.username
        }, 'secret', {
            expiresIn: '1h'
        }))

        res.status(201).send('Login success');
    }
    else {
        res.status(404).send('Login failed');
    }

})

router.get('/session', (req, res) => {
    try {
        const payload = verify(req.cookies.jwt, 'secret');

        res.status(201).json(payload);
    } catch (e) {
        console.error(e)
        res.status(401).send('Unauthorized');
    }
})

module.exports = router;
