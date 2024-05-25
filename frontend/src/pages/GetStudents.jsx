import { useEffect } from "react";
import { useStudents } from "../context/StudentContext";
import { StudentCard } from "../components/students/StudentCard";
import { ImFileEmpty } from "react-icons/im";

export default function GetStudents() {
  const { students, getStudents } = useStudents();

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <ImFileEmpty className="text-6xl text-gray-400 mb-4" />
          <h1 className="text-xl font-semibold text-gray-600">
            No existen estudiantes ingresados
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <StudentCard student={student} key={student._id} />
          ))}
        </div>
      )}
    </>
  );
}