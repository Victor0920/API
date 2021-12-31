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

const insertOne = async (agent) => {
  try {
    console.log(agent.contexts);
    const userId = agent.context.session.split("/").slice(-1);
    const context = agent.contexts[0];
    const qrCode = context.parameters["number.original"];
    const tupperValue = context.parameters.any;

    console.log(context);

    const device = await Device.findOne({ users: { $in: [userId] } });

    const tupperWithSameQr = device.active_tuppers.find(
      (tupper) => tupper.qr_code == qrCode
    );

    if (tupperWithSameQr) {
      const indexOfTupperWithSameQr = device.active_tuppers.findIndex(
        (tupper) => tupper.qr_code == qrCode
      );

      device.active_tuppers[indexOfTupperWithSameQr] = {
        ...tupperWithSameQr,
        qr_code: qrCode,
        value: tupperValue,
        created_by: userId,
      };
    } else {
      device.active_tuppers.push({
        qr_code: qrCode,
        value: tupperValue,
        created_by: userId,
      });
    }

    await device.save();

    agent.add(
      `El táper que contiene ${tupperValue} ha sido almacenado con éxito`
    );
  } catch (error) {
    console.log(error);
    agent.add(
      "Ha habido un error al guardar el táper. Inténtalo de nuevo más tarde."
    );
  }
};

const findAll = async (agent) => {
  try {
    const userId = agent.context.session.split("/").slice(-1);
    const device = await Device.findOne({ users: { $in: [userId] } });
    const activeTuppers = device.active_tuppers;

    let text;

    if (activeTuppers.length === 0) {
      text = "Ahora mismo no tienes ningún táper almacenado.";
    } else {
      text = `Ahora mismo tienes ${
        activeTuppers.length > 1
          ? activeTuppers.length + " tápers almacenados"
          : "un táper almacenado"
      }. `;

      let groupedTuppers = [];

      for (const tupper of activeTuppers) {
        if (
          activeTuppers.filter(
            (t) =>
              t.updated_at.toISOString().split("T")[0] ===
              tupper.updated_at.toISOString().split("T")[0]
          ).length > 1
        ) {
          const tupperWithSameDate = activeTuppers.filter((t) => {
            if (
              t.updated_at.toISOString().split("T")[0] ===
                tupper.updated_at.toISOString().split("T")[0] &&
              t.qr_code != tupper.qr_code
            ) {
              return t;
            }
          })[0];

          if (
            groupedTuppers.filter(
              (t) =>
                t.date.toISOString().split("T")[0] ===
                tupper.updated_at.toISOString().split("T")[0]
            ).length === 0
          ) {
            groupedTuppers.push({
              date: tupper.updated_at,
              values: [tupper.value, tupperWithSameDate.value],
            });
          }
        } else {
          groupedTuppers.push({
            date: tupper.updated_at,
            values: [tupper.value],
          });
        }
      }

      for (const tupper of groupedTuppers) {
        if (tupper.values.length > 1) {
          let values = "";
          for (const [index, value] of tupper.values.entries()) {
            if (index < tupper.values.length - 1) {
              values += `${value}, `;
            } else {
              values += `y ${value}`;
            }
          }
          text += `Los que contienen ${values} fueron almacenados el ${tupper.date.getDate()} de ${
            months[tupper.date.getMonth()]
          }. `;
        } else {
          text += `El que contiene ${
            tupper.values[0]
          } fue almacenado el ${tupper.date.getDate()} de ${
            months[tupper.date.getMonth()]
          }. `;
        }
      }
    }

    agent.add(text);
  } catch (error) {
    console.log(error);
    agent.add(
      "Ha habido un error en la búsqueda de tápers. Inténtalo de nuevo más tarde."
    );
  }
};

const findOne = async (agent) => {
  try {
    const userId = agent.context.session.split("/").slice(-1);
    const qrCode = agent.parameters.number;

    const device = await Device.findOne({ users: { $in: [userId] } });

    const selectedTupper = device.active_tuppers.find(
      (tupper) => tupper.qr_code == qrCode
    );

    let text;

    if (selectedTupper) {
      text = `Este táper contiene ${
        selectedTupper.value
      } y fue guardado el ${selectedTupper.updated_at.getDate()} de ${
        months[selectedTupper.updated_at.getMonth()]
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
    const qrCode = agent.parameters.number;

    const device = await Device.findOne({ users: { $in: [userId] } });

    const selectedTupper = device.active_tuppers.find(
      (tupper) => tupper.qr_code == qrCode
    );

    let text;

    if (selectedTupper) {
      const removeIndex = device.active_tuppers.findIndex(
        (tupper) => tupper.qr_code == qrCode
      );
      device.active_tuppers.splice(removeIndex, 1);
      await device.save();

      text = `El táper que contenía ${selectedTupper.value} ha sido eliminado.`;
    } else {
      text = "Este táper no estaba registrado.";
    }

    agent.add(text);
  } catch (error) {
    agent.add(
      "Ha habido un error en el borrado del táper. Inténtalo de nuevo más tarde."
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

    agent.add("La información de todos los tápers ha sido eliminada");
  } catch (error) {
    agent.add(
      "Ha habido un error en el borrado de los tápers. Inténtalo de nuevo más tarde."
    );
  }
};

module.exports = {
  insertOne,
  findAll,
  findOne,
  deleteOne,
  deleteAll,
};
