const { HabAdmin } = require("../../models/habModels/habAdminModel");

const getAllSMCEmails = async (req, res) => {
    try {
        const admin = await HabAdmin.findOne();
    
        if (!admin) {
            return res.status(500).json({ success: false, message: "Admin settings not found" });
        }
        // check if smcEmails exists
        if (!admin.smcEmails) {
            return res.status(500).json({ success: false, message: "SMC Emails not found" });
        }
        const { smcEmails } = admin;
    
        res.status(200).json({ success: true, smcEmails });
    
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};

module.exports = { getAllSMCEmails };