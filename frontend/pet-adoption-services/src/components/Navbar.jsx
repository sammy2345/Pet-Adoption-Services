import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "px-3 py-1 rounded-md bg-slate-900 text-white text-sm"
      : "px-3 py-1 rounded-md text-sm text-slate-700 hover:bg-slate-200";

  return (
    <header className="bg-white shadow-sm">
      <nav className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between w-full">
        <Link to="/" className="font-bold text-lg text-slate-900">
          Pet Adoption Services
        </Link>

        <div className="flex gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/pets" className={navLinkClass}>
            Pets
          </NavLink>
          <NavLink to="/adopt" className={navLinkClass}>
            Adopt
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
