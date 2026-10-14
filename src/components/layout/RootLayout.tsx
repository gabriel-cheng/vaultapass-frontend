import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { RouteTitle } from "./RouteTitle";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <RouteTitle />

      <div className="flex-1">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
