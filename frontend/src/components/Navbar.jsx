import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-700 py-4 px-10 rounded-b-xl">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">
          <Link to={isAuthenticated ? "/students" : "/"}>Estudiantes</Link>
        </h1>
        <ul className="flex gap-x-4">
          {isAuthenticated ? (
            <>
              <li className="text-white font-medium">
                ¡Hola, {user.email}!
              </li>
              <li>
                <ButtonLink
                  to="/add-student"
                  className="bg-red-500 hover:bg-green-600"
                >
                  Ingresar Estudiante
                </ButtonLink>
              </li>
              <li>
                <ButtonLink
                  to="/blackjack"
                  className="bg-red-500 hover:bg-red-600"
                >
                  Jugar BlackJack
                </ButtonLink>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={() => logout()}
                  className="text-white hover:text-gray-300"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLink
                  to="/login"
                  className="bg-green-500 hover:bg-green-600"
                >
                  Login
                </ButtonLink>
              </li>
              <li>
                <ButtonLink
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Register
                </ButtonLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

