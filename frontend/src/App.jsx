import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import GetStudents from "./pages/GetStudents";
import Login from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Authprovider } from "./context/AuthContext.jsx";
import Register from "./pages/Register.jsx";
import FormStudents from "./pages/FormStudents.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { StudentProvider } from "./context/StudentContext.jsx";
import Juego from "./pages/Juego.jsx";

function App() {
  return (
    <Authprovider>
      <StudentProvider>
        <BrowserRouter>
          <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/students" element={<GetStudents />} />
                  <Route path="/add-student" element={<FormStudents />} />
                  <Route path="/student/:id" element={<FormStudents />} />
                  <Route path="/blackjack" element={<Juego />} />
                </Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </StudentProvider>
    </Authprovider>
  );
}

export default App;

