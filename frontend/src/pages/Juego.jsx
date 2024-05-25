import { useState, useEffect } from "react";
import { crearNuevoMazo, elegirCarta } from "../services/llamadaApi.js";
import { motion } from "framer-motion";

const Juego = () => {
  // Estados para mantener la información del juego.
  const [idBaraja, setIdBaraja] = useState("");
  const [puntuacionJugador, setPuntuacionJugador] = useState(0);
  const [puntuacionComputadora, setPuntuacionComputadora] = useState(0);
  const [puntuacionRondaActual, setPuntuacionRondaActual] = useState(0);
  const [cartasJugador, setCartasJugador] = useState([]);
  const [cartasPc, setCartasPc] = useState([]);
  const [mensaje, setmensaje] = useState("");
  const [plantarJugador, setPlantarJugador] = useState(false);
  const [botonPlantar, setbotonPlantar] = useState(false);
  const [empezarJuego, setEmpezarJuego] = useState(true);

  // useEffect para preparar el juego al cargar la aplicación.
  useEffect(() => {
    async function prepararJuego() {
      try {
        // Creamos una nueva baraja y guardamos su id
        const nuevaBaraja = await crearNuevoMazo();
        setIdBaraja(nuevaBaraja.deck_id);
      } catch (error) {
        console.error(error.message);
      }
    }

    prepararJuego();
  }, []);

  const empezar = async () => {
    setEmpezarJuego(false);
    setbotonPlantar(true);
    for (let i = 0; i < 2; i++) {
      const carta = await elegirCarta(idBaraja);
      const valorCarta = obtenerValorCarta(carta.value);
      setPuntuacionJugador((prevPuntuacion) => prevPuntuacion + valorCarta);
      setCartasJugador((prevCartas) => [...prevCartas, carta.image]);
      setPuntuacionRondaActual(
        (prevPuntuacionActual) => prevPuntuacionActual + valorCarta
      );
      console.log("Cartas del jugador:", carta);
    }
    for (let i = 0; i < 2; i++) {
      const carta = await elegirCarta(idBaraja);
      const valorcarta = obtenerValorCarta(carta.value);
      setPuntuacionComputadora(
        (prevPuntuacionPc) => prevPuntuacionPc + valorcarta
      );
      setCartasPc((prevCartasPc) => [...prevCartasPc, carta.image]);
      console.log("Cartas de la Pc:", carta);
    }
  };
  const determinarGanador = () => {
    if (puntuacionJugador === 21) {
      setmensaje("Tienes 21, has ganado!");
    } else if (puntuacionComputadora === 21) {
      setmensaje("Has perdido, la computadora a echo 21");
    } else if (puntuacionJugador > 21) {
      setmensaje("Su puntuación es mayor a 21, has perdido");
    } else if (puntuacionComputadora > 21) {
      setmensaje("La computadora ha perdido, tu ganas!");
    } else if (puntuacionJugador === puntuacionComputadora) {
      setmensaje("Hubo un empate");
    } else if (puntuacionJugador > puntuacionComputadora) {
      setmensaje("¡Felicitaciones! Has ganado");
    } else {
      setmensaje("Que mal, has perdido");
    }
  };

  // Función para que el jugador tome una carta.
  const tomarCarta = async () => {
    try {
      // Elegimos una carta de la baraja utilizando su ID.
      const carta = await elegirCarta(idBaraja);

      const valorCarta = obtenerValorCarta(carta.value);
      const nuevaPuntuacionRonda = puntuacionRondaActual + valorCarta;

      if (nuevaPuntuacionRonda > 21) {
        setmensaje("Su puntuacion es mayor a 21, has perdido");
        setbotonPlantar(false);
        setPuntuacionJugador((prevPuntuacion) => prevPuntuacion + valorCarta);
        setPuntuacionRondaActual(nuevaPuntuacionRonda);
        setCartasJugador([...cartasJugador, carta.image]);
      } else {
        setPuntuacionJugador((prevPuntuacion) => prevPuntuacion + valorCarta);
        setPuntuacionRondaActual(nuevaPuntuacionRonda);
        setCartasJugador([...cartasJugador, carta.image]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  // Función para que la computadora tome una carta automáticamente.
  const tomarCartaComputadora = async () => {
    if (puntuacionComputadora) {
      try {
        const carta = await elegirCarta(idBaraja);
        const valorCarta = obtenerValorCarta(carta.value);
        setPuntuacionComputadora(puntuacionComputadora + valorCarta);
        setCartasPc([...cartasPc, carta.image]);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (plantarJugador && puntuacionComputadora < 17) {
      const interval = setInterval(() => {
        tomarCartaComputadora();
      }, 800);

      return () => clearInterval(interval);
    } else if (plantarJugador) {
      determinarGanador(); // Llamamos a determinarGanador() cuando la computadora se planta.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantarJugador, puntuacionComputadora]);

  const plantar = async () => {
    setPuntuacionJugador(puntuacionRondaActual);
    setPuntuacionRondaActual(0);
    setPlantarJugador(true);
    setbotonPlantar(false);
    await tomarCartaComputadora(); // Permitir que la computadora complete su turno.
  };

  // Función para reiniciar el juego.
  const reiniciarJuego = async () => {
    try {
      // Creamos una nueva baraja y guardamos su ID.
      const nuevaBaraja = await crearNuevoMazo();
      setIdBaraja(nuevaBaraja.deck_id);

      setPuntuacionJugador(0);
      setPuntuacionComputadora(0);
      setPuntuacionRondaActual(0);
      setCartasJugador([]);
      setCartasPc([]);
      setmensaje("");
      setEmpezarJuego(true);
      setPlantarJugador(false);
      setbotonPlantar(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Función para obtener el valor de una carta en puntos (considerando que las figuras valen 10 y el As 11).
  const obtenerValorCarta = (valorCarta) => {
    switch (valorCarta) {
      case "KING":
      case "QUEEN":
      case "JACK":
        return 10;
      case "ACE":
        return 1;
      default:
        return parseInt(valorCarta);
    }
  };

  // Renderización de la interfaz del juego.

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center">
      <div className="bg-yellow-700 p-6 rounded-lg shadow-md mb-8 text-white text-center">
        <h1 className="text-4xl font-archivo mb-2">Juego del 21</h1>
        <div className="flex justify-between space-x-4">
          <div className="w-1/2">
            <div className="p-4 border border-white rounded-lg">
              <p className="text-lg font-semibold">Tu puntuación:</p>
              <p className="text-3xl font-extrabold uppercase">{puntuacionJugador}</p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4 border border-white rounded-lg">
              <p className="text-lg font-semibold">Puntuación computadora:</p>
              <p className="text-3xl font-extrabold uppercase">{puntuacionComputadora}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 mb-8">
        <h3 className="text-yellow-600 text-lg font-semibold">Cartas del jugador:</h3>
        <div className="flex space-x-2">
          {cartasJugador.map((carta, index) => (
            <img key={index} src={carta} alt={`cartaJugador-${index}`} className="w-24 h-auto rounded-md shadow-md" />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4 mb-8">
        <h3 className="text-yellow-600 text-lg font-semibold">Cartas de la PC:</h3>
        <div className="flex space-x-2">
          {cartasPc.map((carta, index) => (
            <img key={index} src={carta} alt={`cartaPc-${index}`} className="w-24 h-auto rounded-md shadow-md" />
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <motion.button
          onClick={empezar}
          disabled={!empezarJuego}
          className="btn-primary"
          whileHover={{ scale: 1.05, backgroundColor: "#F59E0B", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
        >
          Empezar
        </motion.button>
        <motion.button
          onClick={tomarCarta}
          disabled={!botonPlantar}
          className="btn-secondary"
          whileHover={{ scale: 1.05, backgroundColor: "#10B981", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
        >
          Pedir carta
        </motion.button>
        <motion.button
          onClick={plantar}
          disabled={!botonPlantar}
          className="btn-secondary"
          whileHover={{ scale: 1.05, backgroundColor: "#10B981", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95, y: -10, z: 10, transition: { duration: 0.3 } }}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
        >
          Plantar
        </motion.button>
        <motion.button
          onClick={reiniciarJuego}
          disabled={botonPlantar}
          className="btn-secondary"
          whileHover={{ scale: 1.05, backgroundColor: "#EF4444", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
        >
          Reiniciar juego
        </motion.button>
      </div>


      <div className="mt-8 text-yellow-300">
        <h1 className="text-2xl font-extrabold">{mensaje}</h1>
      </div>
    </div>
  );
};

export default Juego;
