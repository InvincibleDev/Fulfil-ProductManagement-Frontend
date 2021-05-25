<template>
  <div>
    <div>
      <b-navbar style="background-color:white; height:70px; padding:30px; border: 1px solid ;box-shadow: 0px 2px #888888;" variant="faded" type="light">
        <b-navbar-brand style="font-size:xx-large; color:#000b76; font-weight:bold;"  tag="h1" class="mb-0">Acme Inc</b-navbar-brand>
        <!-- <h3 style="text-align:right !important" >Product Management</h3> -->
      </b-navbar>
    </div>
    <div>
      <!-- <div class="wrapper">
        <div class="wave-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 380"
            preserveAspectRatio="none"
          >
            <path
              fill="#000b76"
              fill-opacity="1"
              d="M0,320L48,309.3C96,299,192,277,288,261.3C384,245,480,235,576,224C672,213,768,203,864,208C960,213,1056,235,1152,218.7C1248,203,1344,149,1392,122.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>

          <b-row
            style="color: white; position: relative; top: 0; left: 0"
            class="p-5"
          >
            <b-col>
              <div style="text-align: left">
                <b-jumbotron header="Acme Inc">
                  <p>Home for all great products</p>
                </b-jumbotron>
              </div>
            </b-col>
            <b-col offset-md-3>
              <div class="problem-statement">
                <h5 style="color: lightgreen; font-weight: bold">
                  About the tool:
                </h5>
                <p style="font-size: medium">
                  Product Management tool, that allows one to maintain their
                  Products, Bulk Upload products. Perform Searching and
                  filtering through products. One can create or update
                  individual product. Create webhooks to be triggered post
                  creation or updation of a product.
                </p>
              </div>
            </b-col>
          </b-row>
        </div>
      </div> -->
      <b-container fluid class="data-container"> 
          <h3 style="color:#000b76; font-weight:bold" >All Products</h3>
          <Products style="margin-top: 35px" />
      </b-container>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import Products from "../components/Products.vue";
export default {
  name: "home",
  components: {
    Footer,
    Products,
  },
};
</script>
<style scoped>
.footer,
.push {
  height: 50px;
}

.data-container {
  margin-top: 5em;
}



@media (min-width: 320px) {
  /* smartphones, iPhone, portrait 480x320 phones */
  
}
@media (min-width: 481px) {
  /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */
  
}
@media (min-width: 641px) {
  /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */
  
}
@media (min-width: 961px) {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
}
@media (min-width: 1025px) {
  /* big landscape tablets, laptops, and desktops */
}
@media (min-width: 1281px) {
  /* hi-res laptops and desktops */
}
</style>
