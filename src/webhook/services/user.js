"use strict";

const Device = require("../../models/device");
const User = require("../../models/user");

const emailSpeechMap = {
  arroba: "@",
  "barra baja": "_",
  guión: "-",
  " ": "",
};

const updateOne = async (agent) => {
  try {
    const userId = agent.context.session.split("/").slice(-1);

    const name = agent.contexts.find(
      (context) => context.parameters["person.original"]
    ).parameters["person.original"];
    const phone = agent.contexts.find(
      (context) => context.parameters["telephone-number.original"]
    ).parameters["telephone-number.original"];
    const email = agent.contexts
      .find((context) => context.parameters["email.original"])
      .parameters["email.original"].replace(
        /arroba|barra baja|guión| /gi,
        function (matched) {
          return emailSpeechMap[matched];
        }
      );

    let user = await User.findById(userId);
    user.name = name;
    user.phone = phone;
    user.email = email;

    await user.save();

    agent.add(
      `Tu usuario se ha creado con éxito. Ya puedes comenzar. Por ejemplo: Puedes pedirme que te guarde un nuevo táper, preguntarme qué hay en un táper o ver la lista de tápers totales que tienes`
    );
  } catch (error) {
    console.log(error);
    console.log(error);
    agent.add(
      "Ha habido un error al crear el usuario. Inténtalo de nuevo más tarde."
    );
  }
};

module.exports = {
  updateOne,
};
