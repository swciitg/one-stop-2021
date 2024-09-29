const messMenu = require("../../models/messMenuModel");
const verifyRoles = require("../utils");
const roles = require("../roles");
const multer = require('multer');  // For file uploads
const fs = require('fs');
const csvParser = require('csv-parser');

let allowedRoles = [roles.SUPERADMIN, roles.MESS];

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

module.exports = {
    resource: messMenu,
    options: {
        listProperties: ["hostel", "monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        filterProperties: ["hostel", "monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        editProperties: ["hostel", "monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        showProperties: ["hostel", "monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            uploadCSV: {
                actionType: 'resource',
                icon: 'Document',
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles),
                handler: async (request, response, context) => {
                    if (request.method === 'post') {
                        const file = request.payload.file;
                        const results = [];

                        fs.createReadStream(file.path)
                            .pipe(csvParser())
                            .on('data', (data) => results.push(data))
                            .on('end', async () => {
                                try {
                                    const hostelData = {};

                                    results.forEach((row) => {
                                        const { hostel, day, meal, mealDescription, startTiming, endTiming } = row;
                                        if (!hostelData[hostel]) {
                                            hostelData[hostel] = {};
                                        }

                                        if (!hostelData[hostel][day]) {
                                            hostelData[hostel][day] = { breakfast: null, lunch: null, dinner: null };
                                        }

                                        const mealData = {
                                            mealDescription,
                                            startTiming: new Date(startTiming),
                                            endTiming: new Date(endTiming),
                                        };

                                        hostelData[hostel][day][meal] = mealData;
                                    });

                                    for (const hostel in hostelData) {
                                        const menu = hostelData[hostel];

                                        await messMenu.findOneAndUpdate(
                                            { hostel },
                                            {
                                                hostel,
                                                monday: menu.monday,
                                                tuesday: menu.tuesday,
                                                wednesday: menu.wednesday,
                                                thursday: menu.thursday,
                                                friday: menu.friday,
                                                saturday: menu.saturday,
                                                sunday: menu.sunday,
                                            },
                                            { upsert: true, new: true }
                                        );
                                    }

                                    fs.unlinkSync(file.path);

                                    return {
                                        notice: {
                                            message: 'CSV uploaded and menu updated successfully!',
                                            type: 'success',
                                        },
                                    };
                                } catch (error) {
                                    console.error(error);
                                    return {
                                        notice: {
                                            message: 'Error processing CSV file!',
                                            type: 'error',
                                        },
                                    };
                                }
                            });
                    }

                    return {
                        notice: {
                            message: 'Upload CSV file to update mess menu.',
                            type: 'info',
                        },
                    };
                },
                component: AdminJS.bundle('../../components/upload-csv'), 
            }
        }
    }
};
