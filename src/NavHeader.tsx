import { NavLink } from "react-router-dom";




import "./NavHeader.css";

export default function NavHeader() {

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">🏠Home</NavLink>
        </li>
        <li>
          <NavLink to="/participants">Participants</NavLink>
        </li>

      </ul>
    </nav>
  );
}
