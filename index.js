const express = require('express');
const app = express();

// Koyeb le asigna el puerto a la máquina usando process.env.PORT
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('¡Mi CPU Virtual en Koyeb está activa y funcionando 24/7!');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo con éxito en el puerto ${PORT}`);
});
