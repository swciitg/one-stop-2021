// import { ComponentLoader } from "adminjs";

// const componentLoader = new ComponentLoader();

// const Components = {
//     Dashboard: componentLoader.add("Dashboard", "./pages/dashboard"),
//     // other custom components
// };

// export { componentLoader, Components };
import { ComponentLoader } from "adminjs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname (since you're using ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

const isProd = process.env.NODE_ENV === "production";

const Components = {
  Dashboard: componentLoader.add(
    "Dashboard",
    isProd
      ? path.resolve(__dirname, "../dist/admin_panel/ui/pages/dashboard.jsx")
      : path.resolve(__dirname, "./pages/dashboard.jsx")
  ),
};

export { componentLoader, Components };
