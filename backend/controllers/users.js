const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const dorm = require('../models/dorm');
const review = require('../models/review');
const school = require('../models/school')

const secret = 'assclappicus';

module.exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const theUser = await User.findOne({ email });
        if (!theUser) return res.status(404).json({ message: "User does not exist" });
        
        const isPasswordCorrect = await bcrypt.compare(password, theUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: theUser.email, id: theUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: theUser, token });

    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }

}

module.exports.signup = async (req, res) => {

    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const OGUser = await User.findOne({ email });

        if (OGUser) return res.status(400).json({ message: "User already exists" });

        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
}
module.exports.allusers = async (req, res) => {
    try {
        const userr = await User.find({})
        res.status(200).json(userr)

    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}
module.exports.MakeAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const userr = await User.findByIdAndUpdate(id,

            { $set: { verified: 'true' } }, { new: true });
        res.status(200).json();


    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}
module.exports.deleteuser = async (req, res) => {
    try {
        const { id } = req.params;
        const userrr = await User.findById(id)
        userrr?.Dorms?.map(async (value, key) => {
            const dor = await dorm.findById(value._id)
            dor.Schools?.map(
                async (value, key) => {
                    await school.findByIdAndUpdate(value._id, { $pull: { Dorms: dor._id } });
                }
            )
            await dorm.findByIdAndDelete(value._id)

        })
        // userrr?.Reviews?.map(async (value, key) => {

        //     await review.findByIdAndDelete(value._id)

        // })

        await User.findByIdAndDelete(id)
        res.status(200).json("user has been deleted");
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}


