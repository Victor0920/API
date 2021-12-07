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

const findAll = async (agent) => {
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
        } fue almacenado el ${tupper.updated_at.getDate()} de ${
          months[tupper.updated_at.getMonth() - 1]
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

const findOne = async (agent) => {
  try {
    const userId = agent.context.session.split("/").slice(-1);
    const QRCode = agent.parameters.number;

    const device = await Device.findOne({ users: { $in: [userId] } });

    const selectedTupper = device.active_tuppers.find(
      (tupper) => tupper.qr_code == QRCode
    );

    let text;

    if (selectedTupper) {
      text = `Este táper contiene ${
        selectedTupper.value
      } y fue guardado el ${selectedTupper.updated_at.getDate()} de ${
        months[selectedTupper.updated_at.getMonth() - 1]
      }.`;
    } else {
      text = "Este táper todavía no está registrado.";
    }

    agent.add(text);
  } catch (error) {
    agent.add(
      "Ha habido un error en la búsqueda de tápers. Inténtalo de nuevo más tarde."
    );
  }
};

const deleteOne = async (agent) => {
  try {
    const userId = agent.context.session.split("/").slice(-1);
    const QRCode = agent.parameters.number;

    const device = await Device.findOne({ users: { $in: [userId] } });

    const selectedTupper = device.active_tuppers.find(
      (tupper) => tupper.qr_code == QRCode
    );

    let text;

    if (selectedTupper) {
      const removeIndex = device.active_tuppers.findIndex(
        (tupper) => tupper.qr_code == QRCode
      );
      device.active_tuppers.splice(removeIndex, 1);
      await device.save();

      text = `Este táper que contenía ${selectedTupper.value} ha sido eliminado.`;
    } else {
      text = "Este táper no estaba registrado.";
    }

    agent.add(text);
  } catch (error) {
    agent.add(
      "Ha habido un error en la búsqueda de tápers. Inténtalo de nuevo más tarde."
    );
  }
};

const deleteAll = async (agent) => {
  try {
    const userId = agent.context.session.split("/").slice(-1);

    await Device.updateOne(
      { users: { $in: [userId] } },
      { $set: { active_tuppers: [] } }
    );

    agent.add("La información de todos los tápers han sido borrada");
  } catch (error) {
    agent.add(
      "Ha habido un error en la búsqueda de tápers. Inténtalo de nuevo más tarde."
    );
  }
};

module.exports = {
  findAll,
  findOne,
  deleteOne,
  deleteAll,
};
