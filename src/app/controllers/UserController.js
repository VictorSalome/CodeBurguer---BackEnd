// store => cadastra/adiciona
// index => Listar vários
// show => Listar apenas UM
// update => Atualizar
// delete => Deletar

import { v4 as uuidv4 } from "uuid";
import User from "../models/User";
import * as Yup from "yup";

class UserController {
  async store(request, response) {
    const { name, email, password, admin } = request.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const userExist = await User.findOne({
      where: { email },
    });

    if (userExist) {
      return response.status(409).json({ error: "User already exists" });
    }

    const newUser = await User.create({
      id: uuidv4(),
      name,
      email,
      password,
      admin,
    });

    return response.status(201).json({ id: newUser.id, name, email, admin });
  }
}

export default new UserController();
