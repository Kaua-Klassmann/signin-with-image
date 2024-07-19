import Yup from "yup";
import fs from "fs";
import path from "path";

import Usuario from "../models/Usuario.js";

class UsuarioController {
  async index(req, res) {
    const usuario = await Usuario.findAll();

    return res.json(usuario);
  }

  async store(req, res) {
    function deleteImage() {
      const filePath = path.join("public/images", req.file.filename);
      fs.unlink(filePath, () => {
        return;
      });
    }

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      senha: Yup.string().min(6).required(),
    });

    if (!(await schema.isValid(req.body))) {
      deleteImage();
      return res.status(400).json({ error: "Validation schema" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Validation schema" });
    }

    const { email, senha } = req.body;

    const userExists = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      deleteImage();
      return res.status(400).json({ error: "User already exists" });
    }

    const newFileName = `${req.body.email.split("@")[0]}.${
      req.file.mimetype.split("/")[1]
    }`;
    const newPath = path.join(req.file.destination, newFileName);

    fs.rename(req.file.path, newPath, () => {
      return;
    });

    await Usuario.create({ email, senha });

    return res.json({ message: "User created successfully" });
  }
}

export default new UsuarioController();
