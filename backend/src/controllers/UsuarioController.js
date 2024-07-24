import Yup from "yup";
import fs from "fs";
import path from "path";
import FormData from "form-data";

import Usuario from "../models/Usuario.js";

class UsuarioController {
  async show(req, res) {
    const { id } = req.params;

    const user = await Usuario.findByPk(id, {
      attributes: ["email"],
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const imagePath = path.join(
      "public/images",
      user.email.split("@")[0] + ".jpeg"
    );

    const form = new FormData();

    form.append("email", user.email);
    form.append("image", fs.createReadStream(imagePath));

    res.set(form.getHeaders());
    return form.pipe(res);
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

    const newFileName = `${req.body.email.split("@")[0]}.jpeg`;
    const newPath = path.join(req.file.destination, newFileName);

    fs.rename(req.file.path, newPath, () => {
      return;
    });

    await Usuario.create({ email, senha });

    return res.json({ message: "User created successfully" });
  }
}

export default new UsuarioController();
