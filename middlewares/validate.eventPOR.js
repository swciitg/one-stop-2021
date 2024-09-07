const porModel = require('../models/porModel');
const eventModel = require('../models/eventModel');

exports.validateEventPOR = async (req, res, next) => {
    try {
        let club_org = req.body.club_org;
        let rollNo = req.body.rollNo;

        let por = await porModel.findOne({ rollNo: rollNo, club_org: club_org });
        if (!por) {
            return res.status(400).json({
                success: false,
                message: "You are not a part of this club/organization"
            });
        }
        next();
    }
    catch (error) {
        console.log(error.message);
    }
}