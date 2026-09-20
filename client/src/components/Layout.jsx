import { Outlet, Link, useLocation } from "react-router-dom";
import ChatWidget from "./ChatWidget";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const getNavLinkClass = (path) => {
    const isActive = location.pathname.startsWith(path);
    return isActive
      ? "text-gray-900 underline underline-offset-[6px] decoration-1 font-medium"
      : "text-gray-500 hover:text-gray-900 transition-colors";
  };

  return (
    <div className="min-h-screen text-gray-900 font-sans">
      {/* Reduced top padding slightly on mobile with pt-8 md:pt-12 */}
      <div className="max-w-[720px] mx-auto px-5 pt-8 md:pt-12 pb-20 flex flex-col">
        {!isHome && (
          /* Stacked flex-col on mobile, row on sm screens. Added gap-5 for spacing when stacked */
          <nav className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-5 pb-12 md:pb-16 text-[15px]">
            <Link
              to="/"
              className="font-bold text-gray-900 hover:text-gray-600 transition-colors"
            >
              Kallol's Garden 🌱
            </Link>

            {/* Added flex-wrap so links wrap to a new line on tiny screens like iPhone SE */}
            <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-7">
              <Link to="/projects" className={getNavLinkClass("/projects")}>
                projects
              </Link>
              <Link to="/writings" className={getNavLinkClass("/writings")}>
                writings
              </Link>
              <Link to="/timeline" className={getNavLinkClass("/timeline")}>
                timeline
              </Link>
              <Link to="/list100" className={getNavLinkClass("/list100")}>
                list 100
              </Link>
            </div>
          </nav>
        )}

        <main className="w-full">
          <Outlet />
        </main>
      </div>
      {isHome && <ChatWidget />}
    </div>
  );
}
