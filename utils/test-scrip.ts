
import { PNG } from 'pngjs';


// Función para generar una imagen PNG pequeña con colores aleatorios
export function generateRandomImage(width: number, height: number): string {
    console.log('generateRandomImage');
    
    // Crea un nuevo objeto PNG con el ancho y alto especificados
    const png = new PNG({ width, height });
    // Rellena cada píxel de la imagen con un color aleatorio
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (png.width * y + x) << 2;
            png.data[idx] = Math.floor(Math.random() * 256); // Red
            png.data[idx + 1] = Math.floor(Math.random() * 256); // Green
            png.data[idx + 2] = Math.floor(Math.random() * 256); // Blue
            png.data[idx + 3] = 255; // Alpha (Opacidad completa)
        }
    }

    // Serializa la imagen PNG y devuelve los datos como una cadena Base64
    const base64Data = PNG.sync.write(png).toString('base64');
    console.log(`data:image/png;base64,${base64Data}`);
    
    return `data:image/png;base64,${base64Data}`;
}

// Ejemplo de uso de la función para generar una imagen PNG de 100x100 píxeles
//const imageData = generateRandomImage(100, 100);
//console.log(imageData); // Esto imprime la cadena Base64 de los datos de la imagen
