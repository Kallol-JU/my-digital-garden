import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const getNavLinkClass = (path) => {

        const isActive = location.pathname.startsWith(path);
        return isActive
            ? "text-gray-900 underline underline-offset-[6px] decoration-1 font-medium"
            : "text-gray-500 hover:text-gray-900 transition-colors";
    };

    return (
        <div className="min-h-screen text-gray-900 font-sans">

            <div className="max-w-[720px] mx-auto px-5 pt-12 pb-20 flex flex-col">

                {!isHome && (
                    <nav className="flex justify-between items-center w-full pb-16 text-[15px]">
                        <Link to="/" className="font-bold text-gray-900 hover:text-gray-600 transition-colors">
                            Kallol's Garden 🌱
                        </Link>

                        <div className="flex gap-5 md:gap-7">
                            <Link to="/projects" className={getNavLinkClass('/projects')}>projects</Link>
                            <Link to="/writings" className={getNavLinkClass('/writings')}>writings</Link>
                            <Link to="/timeline" className={getNavLinkClass('/timeline')}>timeline</Link>
                            <Link to="/list100" className={getNavLinkClass('/list100')}>list 100</Link>
                        </div>
                    </nav>
                )}

                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}