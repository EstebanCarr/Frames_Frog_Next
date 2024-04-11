import { dbConnect, disconnect } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Establecer la conexión a la base de datos
    const con = await dbConnect();
    
    // Operación de base de datos simulada (por ejemplo, obtener datos)
    const data = await obtenerDatosDeLaBaseDeDatos();

    // Imprimir mensaje de conexión exitosa y datos obtenidos
    console.log("Conexión exitosa a la base de datos:", data);
    
    // Cerrar la conexión a la base de datos
    await disconnect();
    
    // Retornar una respuesta
    return new NextResponse("Operación completada exitosamente y conexión cerrada");
  } catch (error) {
    // Manejar cualquier error que pueda ocurrir durante la conexión o las operaciones de base de datos
    console.error("Error durante la conexión a la base de datos:", error);
    return new NextResponse("Error durante la conexión a la base de datos");
  }
}

async function obtenerDatosDeLaBaseDeDatos() {
  // Simulación de operación de base de datos
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Datos obtenidos de la base de datos");
    }, 1000); // Simular una operación que tarda 1 segundo
  });
}