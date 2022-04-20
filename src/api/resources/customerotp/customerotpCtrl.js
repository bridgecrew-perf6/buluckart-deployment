import crypto from "crypto"
import jwt from 'jsonwebtoken';
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
import twilioService from "../../../twilioservice"
import { Sequelize } from "sequelize"
import { db } from '../../../models';

const Op = Sequelize.Op

//hash Otp function
async function hashOtp(data) {
    return crypto
        .createHmac('sha256', process.env.HASH_SECRET)
        .update(data)
        .digest('hex');

}

//otp generate function
async function generateOtp() {
    const otp = await crypto.randomInt(1000, 9999);
    return otp;
}
async function verifyOtp(hashedOtp, data) {
    let computedHash = await hashOtp(data);
    return computedHash === hashedOtp;
}



function generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
        expiresIn: '1h',
    });
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
        expiresIn: '1y',
    });
    return { accessToken, refreshToken };
}

async function storeRefreshToken(token, customerId) {
    try {
        await db.refreshSchema.create({
            tokens: token,
            custId: customerId

        });
    } catch (err) {
        console.log(err.message);
    }
}

async function verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
}
async function findcustomer(filter) {
    const customer = await db.customerModel.findOne(filter);
    return customer;
}

async function createcustomer(data) {
    const customer = await db.customerModel.create(data);
    return customer;
}
//send api function
async function sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
        res.status(400).json({ message: 'Phone field is fromd!' });
    }

    const otp = await generateOtp();

    const ttl = 1000 * 60 * 2; // 2 min
    const expires = await Date.now() + ttl;
    const data = await `${phone}.${otp}.${expires}`;
    const hash = await hashOtp(data);

    try {

        const otps = await twilioService.sendBySms(phone, otp);
        //  console.log(otps)
        // await customerModel.create({
        //      hash: `${hash}.${expires}`,
        //             phone,
        //             otp,

        // })
        res.json({
            hash: `${hash}.${expires}`,
            phone,
            otp,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'message sending failed' });
    }

}
//verify Otp Function
async function verifyotp(req, res) {
    const phone = req.body.phone;
    const hash = req.body.hash;
    const otp = req.body.otp;
    let isCreated = false;


    if (!otp || !hash || !phone) {
        res.status(400).json({ message: 'All fields are fromd!' });
    }

    const [hashedOtp, expires] = await hash.split('.');
    if (Date.now() > +expires) {
        res.status(400).json({ message: 'OTP expired!' });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = await verifyOtp(hashedOtp, data);
    if (!isValid) {
        res.status(400).json({ message: 'Invalid OTP' });
    }

    let customer;
    try {

        customer = await db.customerModel.findOne({ where: { phone: phone } })
        if (!customer) {
            isCreated = true;
            customer = await createcustomer({ phone });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Db error' });
    }

    const { accessToken, refreshToken } = generateTokens({
        id: customer.customerId,
        activated: false,
    });

    await storeRefreshToken(refreshToken, customer.id);

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    });

    res.cookie('accessToken', accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    });

    res.json({ id: customer.id, message: "auth completed", auth: true, isNewCustomer: isCreated, name: customer.Name, email: customer.email });

}
async function logout(req, res) {
    await res.clearCookie('refreshToken')
        .clearCookie('accessToken')
        .json({ message: "logout success" })

};
//activate Otp Function
async function activate(req, res) {
    console.log(req.body)
    console.log(req.file)
    // Activation logic
    try {
        const auth = true
        const updatetag = await db.customerModel.update({
            Name: req.body.Name,
            avatar: req.file ? req.file.location : '',
            email: req.body.email,
            gender: req.body.gender,
            activated: auth

        },
            { where: { id: req.params.id } });
        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',


        });
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to update data',
            errors: error,

            status: 400
        });
    }
}
//create customer user by admin
async function admincreatecustomer(req, res) {
    console.log(req.body)
    console.log(req.file)
    // Activation logic
    try {
        const auth = true
        await db.customerModel.create({
            Name: req.body.Name,
            email: req.body.email,
            phone: req.body.phone,
            activated: auth

        });

        return res.status(201).send({
            status: 200,
            message: 'Data update Successfully',


        });
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to update data',
            errors: error,

            status: 400
        });
    }
}


async function getAllcustomerList(req, res, next) {
    await db.customerModel.findAll()
        .then(customer => {
            if (customer) {
                return res.status(200).json({ success: true, data: customer });
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })
}

async function profilegetbyid(req, res, next) {
    await db.customerModel.findOne({ where: { id: req.params.id } })
        .then(customer => {
            if (customer) {
                return res.status(200).json({ success: true, data: customer });
            }
            else
                res.status(500).json({ 'success': false });
        })
        .catch(err => {
            console.log(err)
            next(err);
        })

}

async function deletecustomer(req, res, next) {
    try {
        const tagDetails = await db.customerModel.destroy({
            where: { id: req.query.id }
        });
        await res.status(200).send({
            message: "delete successfull"
        })
    }
    catch (error) {
        return res.status(400).send({
            message: 'Unable to update data',
            errors: error,
            status: 400
        });
    }
}


async function googleLogin(req, res) {
    try {
        const { tokenId } = req.body

        const verify = await client.verifyIdToken({ idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID })

        const { email_verified, email, name, picture } = verify.payload

        // const password = email + process.env.GOOGLE_SECRET

        // const passwordHash = await bcrypt.hash(password, 12)

        if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

        const user = await db.customerModel.findOne({ where: { phone: phone } })

        if (user) {
            // const isMatch = await bcrypt.compare(password, user.password)
            // if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.json({ msg: "Login success!" })
        } else {
            const newUser = new Users({
                name, email, avatar: picture
            })

            await db.customerModel.create(newUser)

            const refresh_token = createRefreshToken({ id: newUser._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.json({ msg: "Login success!" })
        }


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
async function facebookLogin(req, res) {
    try {
        const { accessToken, userID } = req.body

        const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

        const data = await fetch(URL).then(res => res.json()).then(res => { return res })

        const { email, name, picture } = data

        const password = email + process.env.FACEBOOK_SECRET

        const passwordHash = await bcrypt.hash(password, 12)

        const user = await db.customerModel.findOne({ where: { email: email } })

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.json({ msg: "Login success!" })
        } else {
            const newUser = new Users({
                name, email, password: passwordHash, avatar: picture.data.url
            })

            await newUser.save()

            const refresh_token = createRefreshToken({ id: newUser._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })

            res.json({ msg: "Login success!" })
        }


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export default {
    sendOtp,
    activate,
    verifyotp,
    getAllcustomerList,
    profilegetbyid,
    googleLogin,
    facebookLogin,
    logout,
    deletecustomer,
    admincreatecustomer
}