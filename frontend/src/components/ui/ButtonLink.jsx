import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children, className }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out transform ${className}`}
  >
    {children}
  </Link>
);
