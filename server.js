const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors({ origin: "http://localhost:3000" }));

const UsuarioRoutes = require("./Routes/Usuario");
app.use("/Usuario", UsuarioRoutes);

const BotellaRoutes = require("./Routes/Botella");
app.use("/Botella", BotellaRoutes);

const IngredienteRoutes = require("./Routes/Ingrediente");
app.use("/Ingrediente", IngredienteRoutes);

const RecipienteRoutes = require("./Routes/Recipiente");
app.use("/Recipiente", RecipienteRoutes);

const BartenderRoutes = require("./Routes/Bartender");
app.use("/Bartender", BartenderRoutes);

const ExtraRoutes = require("./Routes/Extras");
app.use("/Extra", ExtraRoutes);

app.listen(port, console.log("listening on port ", port));
