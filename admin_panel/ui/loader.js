const { ComponentLoader } = require("adminjs");

const componentLoader = new ComponentLoader();

const Components = {
    Dashboard: componentLoader.add("Dashboard", "./pages/dashboard"),
    // other custom components
};
exports.componentLoader = componentLoader;
exports.Components = Components;
