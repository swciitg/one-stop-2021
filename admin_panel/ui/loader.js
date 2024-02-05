const { ComponentLoader } = require("adminjs");

const componentLoader = new ComponentLoader();

const Components = {
    Dashboard: componentLoader.add("Dashboard", "./pages/dashboard"),
    UploadImageEdit : componentLoader.add("UploadImageEdit", "./components/upload-image.edit"),
    UploadImageList : componentLoader.add("UploadImageList", "./components/upload-image.list"),
    // other custom components
};
exports.componentLoader = componentLoader;
exports.Components = Components;
