import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
    Dashboard: componentLoader.add("Dashboard", "./pages/dashboard"),
    // other custom components
};

export { componentLoader, Components };
