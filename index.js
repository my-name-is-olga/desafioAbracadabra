const express = require("express");
const port = 3000;
const app = express();
const usuarios = [
"Juan",
"Jocelyn",
"Astrid",
"Maria",
"Ignacia",
"Javier",
"Brian",
];

//validación usuario
app.use("/abracadabra/juego/:usuario", validacionUsuario);

//validación usuarios
const validacionUsuario = (req, res, next) => {
  const usuario = req.params.usuario;
  const usuarioEncontrado = usuarios.some(nombreUsuario => nombreUsuario.usuario === usuario);
  if (usuarioEncontrado) {
    next();
  } else {
    res.status(404).send("Usuario no encontrado");
  }
};

app.use(express.static("public"));

//muestra usuarios
app.get("/abracadabra/usuarios", (req, res) => {
  res.json( usuarios );
});

//une con el html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html"); 
});

//con esto poder validar a los usuarios
app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//ruta número aleatorio
app.get("/abracadabra/conejo/:n", (req, res) => {
  const numeroRandom = Math.floor(Math.random() * (5 - 1)) + 1;
  const n = Number(req.params.n);

  n === numeroRandom
    ? res.sendFile(__dirname + "/public/assets/conejito.png")
    : res.sendFile(__dirname + "/public/assests/voldemort.png");
});

//ruta genérica
app.get("*", (req, res) => {
  res.send("Esta página no existe");
});

//esucha al servidor
app.listen(3000, () => {
  console.log(`Servidor levantado correctamente en puerto ${3000}`, port);
});
