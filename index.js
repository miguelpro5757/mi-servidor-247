const { exec } = require('child_process');
const express = require('express');
const app = express();

// Render te asigna el puerto automáticamente mediante esta variable
const PORT = process.env.PORT || 8080;

console.log("Iniciando entorno gráfico de Linux en segundo plano...");

/**
 * Este comando descarga y arranca un contenedor de Ubuntu Linux completo
 * con entorno gráfico (LXDE) y un servidor web VNC en el puerto 6080.
 */
const comandoLinux = "docker run -p 6080:80 --name mi_pc_linux dorowu/ubuntu-desktop-lxde-vnc";

const procesoLinux = exec(comandoLinux, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al ejecutar Linux: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`Info Linux: ${stderr}`);
        return;
    }
    console.log(`Salida Linux: ${stdout}`);
});

// Redirigir los logs de Linux a la consola de Render para que veas qué pasa
procesoLinux.stdout.on('data', (data) => console.log(data.toString()));
procesoLinux.stderr.on('data', (data) => console.log(data.toString()));

// Ruta principal: Redirige automáticamente el tráfico al puerto del escritorio visual
app.get('/', (req, res) => {
    // Al entrar a tu URL de Render, te mandará directo al sistema visual
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Mi PC Linux Virtual</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; background: #222; color: #fff; padding-top: 50px; }
                .btn { background: #007bff; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px; }
                .btn:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <h1>💻 ¡Tu CPU Linux 24/7 está lista!</h1>
            <p>Haz clic abajo para abrir el escritorio visual de tu servidor.</p>
            <br><br>
            <a href="http://127.0.0.1:6080" class="btn" target="_blank">Abrir Escritorio Visual</a>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Servidor puente escuchando en el puerto ${PORT}`);
});
