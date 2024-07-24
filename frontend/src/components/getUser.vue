<script setup>
import { onMounted } from "vue";

onMounted(async () => {
  document.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault();
    const idInput = document.querySelector("#id");

    fetch(`http://localhost:3000/user/${idInput.value}`)
      .then((response) => response.formData())
      .then((data) => {
        const email = data.get("email");
        const image = URL.createObjectURL(data.get("image"));

        const divEmail = document.querySelector("#pEmail");
        const divImage = document.querySelector("#imgImage");

        divEmail.innerHTML = email;

        divImage.src = image;
      })
      .catch((error) => console.log("erro: " + error));
  });
});
</script>

<template>
  <div>
    <input type="number" name="id" id="id" />
    <button>Get</button>
    <div>
      <p id="pEmail"></p>
      <img id="imgImage" />
    </div>
  </div>
</template>

<style scoped>
* {
  color: black;
}
</style>
