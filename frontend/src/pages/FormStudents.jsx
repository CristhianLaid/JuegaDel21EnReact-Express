import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useStudents } from "../context/StudentContext";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default function FormStudents() {
  const { createStudent, getStudent, updateStudent } = useStudents();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateStudent(params.id, {
          ...data,
          nota1: parseFloat(data.nota1),
          nota2: parseFloat(data.nota2),
          date: dayjs.utc(data.date).format(),
        });
      } else {
        console.log("al grabar:", data);
        createStudent({
          ...data,
          nota1: parseFloat(data.nota1),
          nota2: parseFloat(data.nota2),
          date: dayjs.utc(data.date).format(),
        });
      }

      navigate("/students");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    console.log(params.id);
    const loadStudent = async () => {
      if (params.id) {
        const student = await getStudent(params.id);
        setValue("nombre", student.nombre);
        setValue("nota1", student.nota1);
        setValue("nota2", student.nota2);
      }
    };
    loadStudent();
  }, []);

  return (
    <Card className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="nombre"
            className="text-lg font-semibold text-gray-700"
          >
            Nombre
          </Label>
          <Input
            type="text"
            name="nombre"
            placeholder="Ingrese nombre"
            {...register("nombre", {
              required: { value: true, message: "Nombre es requerido" },
            })}
            autoFocus
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {errors.nombre && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.nombre.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="nota1"
            className="text-lg font-semibold text-gray-700"
          >
            Nota 1:
          </Label>
          <Input
            type="number"
            name="nota1"
            placeholder="Escriba la nota 1..."
            {...register("nota1", {
              required: { value: true, message: "Nota 1 es requerida" },
            })}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {errors.nota1 && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.nota1.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="nota2"
            className="text-lg font-semibold text-gray-700"
          >
            Nota 2:
          </Label>
          <Input
            type="number"
            name="nota2"
            placeholder="Escriba la nota 2..."
            {...register("nota2", {
              required: { value: true, message: "Nota 2 es requerida" },
            })}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          {errors.nota2 && (
            <p className="text-red-500 font-semibold text-sm">
              {errors.nota2.message}
            </p>
          )}
        </div>

        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md font-semibold">
          Grabar Registro
        </Button>
      </form>
    </Card>
  );
}
