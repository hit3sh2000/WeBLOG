const JWT = require('jsonwebtoken')


//for assigning a Access Token
module.exports = {
    signAccessToken: (id) => {
        return new Promise((resolve, reject) => {
            const payload = { id }
            const secret = "079d8c37cb8039d01b9ab2c9dc1f89f5eddc02ea15b80ece2a09620cce4d34bd"
            JWT.sign(payload, secret, (err, token) => {
                if (err) return reject(err)
                resolve(token)
            })
        })
    },
    //for verify a Access Token
    verifyAccessToken: (req, res, next) => {
        try {
            if (!req.headers['authorization']) return res.send("token not found")
            const authHeader = req.headers['authorization']
            const bearerToken = authHeader.split(' ');
            const token = bearerToken[1]
            if (!token) {
                res.send("give token")
            } else {
                const decodetoken = JWT.verify(token, "079d8c37cb8039d01b9ab2c9dc1f89f5eddc02ea15b80ece2a09620cce4d34bd", (err, decoded) => {
                    if (err) {
                        res.json({ auth: false, message: "U failed to authenticate" })
                    } else {
                        req.user = decoded.id;
                        next();
                    }
                });
            }
        } catch (err) {
            res.send(err)
        }

    }
}