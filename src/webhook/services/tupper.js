"use strict";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const Device = require("../../models/device");

const getTupper = async (agent) => {
  try {
    const userId = agent.context.session.split("/").slice(-1);
    const device = await Device.findOne({ users: { $in: [userId] } });
    const activeTuppers = device.active_tuppers;

    let text;

    if (activeTuppers.length === 0) {
      text = "Ahora mismo no tienes ningún táper almacenado.";
    } else {
      text = `Ahora mismo tienes ${activeTuppers.length} tápers ${
        activeTuppers.length > 1 ? "almacenados" : "almacenado"
      }. `;

      for (const tupper of activeTuppers) {
        text += `El que contiene ${
          tupper.value
        } fue almacenado el ${tupper.created_at.getDate()} de ${
          months[tupper.created_at.getMonth() - 1]
        }. `;
      }
    }

    agent.add(text);
  } catch (error) {
    agent.add(
      "Ha habido un error en la búsqueda de tápers. Inténtalo de nuevo más tarde."
    );
  }
};

module.exports = {
  getTupper,
};
