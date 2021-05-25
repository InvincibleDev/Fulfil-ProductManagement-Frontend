<template>
  <footer class="footer">
    <b-row class="footer-row">
      <b-col class="first-col">Created By : Ganesh Prasad B G</b-col>
      <b-col cols="3" class="second-col">
        <a
          style="color: white"
          href="https://github.com/InvincibleDev"
          target="_blank"
          rel="noopener noreferrer"
          ><b-icon
            style="cursor: pointer"
            icon="github"
            aria-hidden="true"
          ></b-icon
        ></a>
        <a
          style="color: white"
          href="https://www.linkedin.com/in/ganeshprasadbg"
          target="_blank"
          rel="noopener noreferrer"
          ><b-icon
            icon="linkedin"
            aria-hidden="true"
            style="margin-left: 20px; cursor: pointer"
          ></b-icon
        ></a>
      </b-col>
    </b-row>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>
<style scoped>
.footer {
  margin-top: 50px;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
}
.footer-row {
  width: 100%;
  height: 50px;
}

.first-col {
  background-color: #000b76;
  color: white;
  text-align: center;
  padding: 15px;
}

.second-col {
  background-color: #000b76;
  color: white;
  text-align: left;
  padding:15px;
}
</style>