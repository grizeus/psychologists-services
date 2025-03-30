import { NavLink } from "react-router-dom";

const cssBuilder = ({ isActive }) =>
  ` ${isActive && "after:bg-sun after:absolute after:top-6 after:left-1/2 after:size-2 after:-translate-x-1/2 after:rounded-full after:content-['']"} relative`;

const NavBar = () => {
  // NOTE: replace this with authentication logic later
  const isAuthenticated = false;
  return (
    <nav className="">
      <ul className="flex gap-10 leading-tight">
        <li>
          <NavLink to="/" className={cssBuilder}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/psychologists" className={cssBuilder}>
            Psychologists
          </NavLink>
        </li>
        {isAuthenticated && (
        <li>
          <NavLink to="/favorites" className={cssBuilder}>
            Favorites
          </NavLink>
        </li>)}
      </ul>
    </nav>
  );
};

export default NavBar;
