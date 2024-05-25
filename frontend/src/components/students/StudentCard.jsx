import { useStudents } from "../../context/StudentContext";
import { Button, ButtonLink, Card } from "../ui";

export function StudentCard({ student }) {
  const { deleteStudent } = useStudents();

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md transition-transform duration-300 transform ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <header className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-purple-700">{student.nombre}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => deleteStudent(student._id)}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md font-semibold"
          >
            Delete
          </button>
          <ButtonLink
            to={`/student/${student._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md font-semibold"
          >
            Edit
          </ButtonLink>
        </div>
      </header>
      <p className="text-slate-300 mb-2">
        <span className="text-blue-400 font-bold">Nota1:</span> {student.nota1}
      </p>
      <p className="text-slate-300">
        <span className="text-blue-400 font-bold">Nota2:</span> {student.nota2}
      </p>
    </div>
  );
}