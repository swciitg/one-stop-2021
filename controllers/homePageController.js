import homePage from "../models/homePageModel.js";

export const getHomePageData = (req, res) => {
    homePage
        .find()
        .then((data) => {
            let quickLinks = data[0].quickLinks;
            quickLinks.sort((a, b) => a.priorityNumber - b.priorityNumber);
            let cardsDataList = data[0].cardsDataList;
            cardsDataList.sort((a, b) => a.priorityNumber - b.priorityNumber);
            cardsDataList = cardsDataList.map((item) => {
                return {
                    "imageUrl": item.imageUrl,
                    "redirectUrl": item.redirectUrl
                }
            });
            quickLinks = quickLinks.map((item) => {
                return {
                    "name": item.title,
                    "icon": item.logo,
                    "link": item.url
                }
            });
            res.json({cardsDataList, quickLinks});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                "message": err.message || "Error Occurred",
            });
        });
};

export const getQuickLinksData = (req, res) => {
    homePage
        .find()
        .then((data) => {
            data = data[0].quickLinks;
            data.sort((a, b) => a.priorityNumber - b.priorityNumber);
            data = data.map((item) => {
                return {
                    "name": item.title,
                    "icon": item.logo,
                    "link": item.url
                }
            });
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                "message": err.message || "Error Occurred",
            });
        });
};