const review = require('../models/review')
const user = require('../models/user');
const dorm = require('../models/dorm')
module.exports.createReview = async (req, res) => {
    // const newReview = new review(req.body);
    const { Rating, Review, Dorm, User } = req.body;
    try {
        const Revieww = new review({
            Rating,
            Review,
            Dorm,
            User
        })

        let uso = await user.findById(User);
        uso.Reviews.push(Revieww);
        const sv = await uso.save();
        let us = await dorm.findById(Dorm);

        await us.Reviews.push(Revieww);

        const sss = await us.save();
        const saveReview = await Revieww.save();
        res.status(201).json(saveReview);
    } catch (error) {
        res.status(409).json({ message: err.message })
    }
}
module.exports.getAllReviews = async (req, res, next) => {
    try {
        const dorms = await dorm.find({}).populate('Reviews')
        let app = [];
        dorms.map((value) => {
            value.Reviews.map((va) => {
                if (va.approved === false) {
                    app.push(va)
                }
            })
        })

        res.status(200).json(app);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}


module.exports.deleteReview = async (req, res, next) => {
    try {
        const { dormid, userid, reviewid } = req.params;
        let revieww = await review.findById(req.params.reviewid)
        if (revieww.approved === true) {
            let dormm = await dorm.findById(req.params.dormid)
            let cons = 0;
            let nb = 0;

            await Promise.all(dormm.Reviews?.map(async (value, key) => {
                let rev = await review.findById(value._id)
                const revv = rev.approved
                if (revv === true) {
                    cons = cons + 1;
                    nb = nb + rev.Rating
                }
            }))
            if (cons == 1) {
                dormm.Rating = 0
            }
            else {
                dormm.Rating = (nb - revieww.Rating) / (cons - 1);
            }
            console.log(dormm.Rating)
             const sss = await dormm.save();
        }
         await dorm.findByIdAndUpdate(dormid, { $pull: { Reviews: reviewid } });
         await user.findByIdAndUpdate(userid, { $pull: { Reviews: reviewid } });
         const Review = await review.findByIdAndDelete(reviewid);
        res.status(200).json("Review has been deleted");
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}


module.exports.updatereview = async (req, res) => {
    try {
        let revieww = await review.findById(req.params.id)
        let dormm = await dorm.findById(req.params.dormid)

        let cons = 0;
        let nb = 0;

        await Promise.all(dormm.Reviews?.map(async (value, key) => {
            let rev = await review.findById(value._id)
            const revv = rev.approved
            if (revv === true) {
                cons = cons + 1;
                nb = nb + rev.Rating
            }
        }))
        dormm.Rating = (revieww.Rating + nb) / (cons + 1);
        const sss = await dormm.save();
        const UpdateReview = await review.findByIdAndUpdate(
            req.params.id,
            { $set: { approved: 'true' } },
            { new: true }
        );
        res.status(200).json();
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}


