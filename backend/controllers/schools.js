const School = require('../models/school')

module.exports.CreateSchool = async (req, res) => {
    const newSchool = new School(req.body);
    try {
        const saveSchool = await newSchool.save();
        res.status(201).json(saveSchool);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

module.exports.getSchools = async (req, res) => {
    try {
        const schools = await School.find({}).populate('Dorms')
        res.status(200).json(schools)

    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}
module.exports.getSchool = async (req, res, next) => {
    try {
        const school = await School.findById(req.params.id).populate({
                path: 'Dorms',
                populate: {
                    path: 'Reviews'
                }
            });
        res.status(200).json(school);
    } catch (err) {
        next(err);
    }
}

module.exports.getSchoolByName = async (req, res, next) => {
    try {
        const nsa = req.params.name.replaceAll('_', ' ')
        const school = await School.findOne({ "Name": nsa }).populate('Dorms')
        res.status(200).json(school);
    } catch (err) {
        next(err);
    }
}
module.exports.DeleteSchool = async (req, res, next) => {
    try {
        const school = await School.findByIdAndDelete(req.params.id);
        res.status(200).json("School has been deleted");
    } catch (err) {
        next(err);
    }
}


module.exports.DeleteAllSchools = async (req, res, next) => {
    try {
        const school = await School.deleteMany({});
        res.status(200).json("Schools has been deleted");
    } catch (err) {
        next(err);
    }
}
module.exports.UpdateSchool = async (req, res, next) => {
    try {
        const UpdateSchool = await School.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(UpdateSchool);
    } catch (err) {
        next(err);
    }
}