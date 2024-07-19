<script setup>
import { onMounted } from "vue";

onMounted(async () => {
  document.querySelector("#signin").addEventListener("submit", (event) => {
    event.preventDefault();

    const imageInput = document.querySelector("#image");
    const emailInput = document.querySelector("#email");
    const senhaInput = document.querySelector("#senha");

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);
    formData.append("email", emailInput.value);
    formData.append("senha", senhaInput.value);

    fetch("http://localhost:3000/user", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("erro: " + error));
  });
});
</script>

<template>
  <div>
    <form id="signin" enctype="multipart/form-data">
      <input
        type="file"
        name="image"
        id="image"
        accept=".png, .jpg, .jpeg"
        required
      />
      <input type="text" name="email" id="email" placeholder="email" required />
      <input
        type="password"
        name="senha"
        id="senha"
        placeholder="senha"
        required
      />
      <input type="submit" />
    </form>
  </div>
</template>

<style></style>
