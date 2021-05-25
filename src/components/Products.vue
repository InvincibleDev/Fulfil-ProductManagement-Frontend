<template>
  <div>

     <b-modal
      id="add-edit-product"
      ref="modal"
      :title=" add_product_flag ? 'Add Product' : 'Edit Product'"
      @show="resetModal"
      @ok="handleOk"
      v-if="product"
      hide-backdrop
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
        style="font-weight:bold"
          label="Name"
          label-for="name-input"
          invalid-feedback="Product Name is required"
          :state="name_state"
        >
          <b-form-input
            id="name-input"
            v-model="product.product_name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
        style="font-weight:bold"
          label="Description"
          label-for="desc-input"
          invalid-feedback="Product Description is required"
          :state="description_state"
        >
           <b-form-input
            id="desc-input"
            v-model="product.product_description"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
        style="font-weight:bold"
          label="Product Active/Inactive"
          label-for="active-input"
        >
           <div style="background-color:white" class="switch_box box_4">
            <div class="input_wrapper">
              <input type="checkbox" v-model="product.is_active" class="switch_4">
              <svg class="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67">
              <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"/>
            </svg>
              <svg class="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
              <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/>
            </svg>
              </div>
		</div>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="add-file"
      ref="modal"
      title=" CSV Upload "
      @ok="handleUploadOk"
      hide-backdrop
    >
      <form ref="form" @submit.stop.prevent="handleFileUpload">
        <b-form-group
        style="font-weight:bold"
          label="CSV File"
          label-for="csv-input"
        >
          <b-form-file id="csv-input" accept=".csv" v-model="csv_file"></b-form-file>
        </b-form-group>
      </form>
    </b-modal>
    
    <b-row>
      <div>
          <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
              <form class="card card-sm"  @submit.stop.prevent="searchProduct">
                <div class="card-body row no-gutters align-items-center">
                  <div class="col">
                    <input
                      class="form-control form-control-lg form-control-borderless"
                      placeholder="Product Name/Description"
                      v-model="search_text"
                    />
                    
                  </div>
                  <!--end of col-->
                  <div class="col-auto">
                    <button
                      v-if=" !search_clicked "
                      class="btn btn-sm btn-success"
                      style="background-color: #000b76; padding:10px 12px"
                    >
                      Search
                    </button>
                    <a
                      v-else
                      class="btn btn-sm btn-success"
                      style="background-color: red; padding:10px 12px"
                      @click="clearSelection"
                      >Clear
                      </a>
                    <b-dropdown size="lg" variant="button" toggle-class="text-decoration-none" no-caret>
                      <template #button-content>
                        <span class="sr-only"><b-icon icon="funnel-fill" font-scale="1.5" style="color:#000b76" ></b-icon></span>
                      </template>
                      <b-dropdown-item @click="filterActiveProducts">Toggle Active Products</b-dropdown-item>
                    </b-dropdown>
                  </div>
                  <!--end of col-->
                </div>
              </form>
              <div> 
               </div>
            </div>
            <!--end of col-->
          </div>
        </div>
    </b-row>

  <b-container>
    <b-row>
      <b-col > 
        <button class="btn btn-md action-btn ml-auto" v-b-modal.add-file > CSV Upload </button>
        <button class="btn btn-md action-btn" v-b-modal.add-edit-product @click="add_product_flag=true" > Add Product </button>
        <button class="btn btn-md action-btn ml-auto" @click="deleteAll()" > Delete All</button>
        <router-link to="/webhook" ><button class="btn btn-md action-btn" to="/webhook" > Webhooks </button> </router-link>
      </b-col>
    </b-row>
    <b-row v-if="delete_task && delete_task_progress != 100" >
      <div style="text-align:left" >
        <p class="inline"  style="font-style:small; text-align:left" > Status : <span style="font-weight:bold" > {{delete_task_status}} </span></p>
        <b-icon class="inline " icon="x" style="color:red" scale="2" @click="delete_task=false" ></b-icon>
      </div>
      <b-progress :value="delete_task_progress" :max="100" show-progress variant="danger" animated></b-progress>
    </b-row>

    <br>

    <b-row v-if="file_upload && bulk_add_task_progress <= 0"  >
      <div style="text-align:left" >
        <p class="inline"  style="font-style:small; text-align:left" > Status : <span style="font-weight:bold" > Uploading File </span></p>
      </div>
        <b-progress show-progress variant="success" animated max="100" :value="uploadPercentage"></b-progress>
    </b-row>
    <b-row v-if="bulk_add_task && bulk_add_task_progress != 100"  >
      <div style="text-align:left" >
        <p class="inline"  style="font-style:small; text-align:left" > Status : <span style="font-weight:bold" > {{add_task_status}} </span></p>
        <b-icon class="inline " icon="x" style="color:red" scale="2" @click="bulk_add_task=false" ></b-icon>
      </div>
        <b-progress  :value="bulk_add_task_progress" :max="100" show-progress variant="success" animated></b-progress>
    </b-row>
  </b-container>

    <b-row>
      <b-col>
        <template v-if="data.length == 0">
            <div style="align-self:center" class="text-center text-danger my-2">
              <strong style=" text-align:center">No Product Found, Add More Products</strong>
            </div>
          </template>
        <b-table-simple style="min-height:800px !important" hover bordered :sticky-header="true" caption-top responsive>
    <caption>All Products</caption>
    <colgroup><col><col></colgroup>
    <colgroup><col><col><col></colgroup>
    <colgroup><col><col></colgroup>
    <b-thead style=" position:sticky " >
      <b-tr >
        <b-th>SKU</b-th>
        <b-th>Name</b-th>
        <b-th>Description</b-th>
        <b-th>Active Status</b-th>
        <b-th>Actions</b-th>
      </b-tr>
    </b-thead>
    <template v-if="loading">
            <div style="align-self:center" class="text-center text-success my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong style="margin-left: 15px">Loading...</strong>
            </div>
          </template>
    <template v-else-if="search_not_found">
            <div style="align-self:center" class="text-center text-success my-2">
              <strong style=" text-align:center">No Matching Product Found</strong>
              <a
                      class="btn btn-sm btn-danger"
                      style="margin:15px"
                      @click="clearSelection"
                      >Clear</a
                    >
            </div>
          </template>
    <b-tbody v-else>
      <b-tr :key="product.product_sku" v-for="product in data">
        <b-th style="text-align: left; ">{{product.product_sku}}</b-th>
        <b-th style="text-align: right;">{{product.product_name}}</b-th>
        <b-td style="text-align: left;" >{{product.product_description}}</b-td>
        <b-td style="text-align: left;" >
          <div style="" class="switch_box box_4">
            <div class="input_wrapper">
              <input type="checkbox" v-model="product.is_active" @change="toggleActiveStatus(product)" class="switch_4">
              <svg class="is_checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.67 426.67">
              <path d="M153.504 366.84c-8.657 0-17.323-3.303-23.927-9.912L9.914 237.265c-13.218-13.218-13.218-34.645 0-47.863 13.218-13.218 34.645-13.218 47.863 0l95.727 95.727 215.39-215.387c13.218-13.214 34.65-13.218 47.86 0 13.22 13.218 13.22 34.65 0 47.863L177.435 356.928c-6.61 6.605-15.27 9.91-23.932 9.91z"/>
            </svg>
              <svg class="is_unchecked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982">
              <path d="M131.804 106.49l75.936-75.935c6.99-6.99 6.99-18.323 0-25.312-6.99-6.99-18.322-6.99-25.312 0L106.49 81.18 30.555 5.242c-6.99-6.99-18.322-6.99-25.312 0-6.99 6.99-6.99 18.323 0 25.312L81.18 106.49 5.24 182.427c-6.99 6.99-6.99 18.323 0 25.312 6.99 6.99 18.322 6.99 25.312 0L106.49 131.8l75.938 75.937c6.99 6.99 18.322 6.99 25.312 0 6.99-6.99 6.99-18.323 0-25.313l-75.936-75.936z" fill-rule="evenodd" clip-rule="evenodd"/>
            </svg>
              </div>
		      </div>
        </b-td>
        <b-td>
          <div style="display: inline-block;" >
              <!-- <b-form-checkbox class="inline" v-model="product.is_active" @click="toggleActive(product)" name="check-button" switch>
              </b-form-checkbox> -->
              <b-icon class="inline" font-scale="1.3" style="color:black" icon="pencil" @click="editProduct(product)" ></b-icon>
              <b-icon class="inline" font-scale="1.3" style="color:red" icon="trash" @click="deleteProduct(product)" ></b-icon>
          </div>
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>

        <button class="action-btn" v-if="prev_url" @click="getProducts(prev_url)" > Previous </button>
        <button class="action-btn" v-if="next_url" @click="getProducts(next_url)" > Next </button>

      </b-col>
    </b-row>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "Products",
  data() {
    return {
      v4: this.$uuid.v4(),
      loading: true,
      data: [],
      backup_data:null,
      next_url:null,
      prev_url:null,
      product:{
        'product_sku':'',
        'product_name':'',
        'product_description':'',
        'is_active':true,
      },
      name_state:null,
      description_state:null,
      search_text:'',
      search_clicked:false,
      search_not_found:false,
      is_active_filter:true,
      add_product_flag:false,
      bulk_add_task_progress:0,
      delete_task_progress:0,
      bulk_add_task:false,
      delete_task:false,
      delete_task_status:'Deleting',
      add_task_status:'Creating',
      interval:null,
      csv_file:null,
      uploadPercentage:0,
      file_upload:false,
      SITE_PREFIX:"http://127.0.0.1:8000"
    };
  },
  methods: {
    getProducts(url) {
      this.loading=true
      this.$store
        .dispatch("getAllProducts", url)
        .then((res) => {
          this.loading = false;
          if (res.results) {
            console.log(res);
            this.data = res.results;
            this.prev_url = res.previous ? res.previous : null
            this.next_url = res.next ? res.next : null
          } else {
            this.$notify({
              group: "error",
              title: "Error",
              text: res.error,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$notify({
            group: "error",
            title: "Error",
            text: "Something Went Wrong",
          });
        });
    },
    editProduct(product){
      this.add_product_flag=false
      this.product = {'product_sku':product.product_sku,
                      'product_name':product.product_name,
                      'product_description':product.product_description,
                      'is_active':product.is_active}
      this.$bvModal.show('add-edit-product')
    },
    deleteProduct(product){
      this.$store
      .dispatch("deleteProduct", product.product_sku)
      .then((res) => {
          if (res.status == 204){
            this.data = this.data.filter(data => data != product)
          }else{
            this.$notify({
              group: "error",
              title: "Error",
              text: "Delete Failed, Try Again"
            })
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$notify({
            group: "error",
            title: "Error",
            text: "Something Went Wrong",
          });
        });

    },
    toggleActiveStatus(product){
      this.sendEditProductRequest(product)
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        if (this.product.product_name == '') this.nameState = valid
        if (this.product.product_description == '') this.description_state = valid
        return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleUploadOk(bvModalEvt){
       bvModalEvt.preventDefault()
       this.handleFileUpload()

       this.$nextTick(() => {
        this.$bvModal.hide('add-file')
      })
    },
    sendEditProductRequest(prod){
      console.log(prod)
      this.$store
      .dispatch("editProduct", prod)
        .then((res) => {
          console.log(res)
        if (res){
            this.data = this.data.map(product =>
                      product.product_sku === prod.product_sku
                        ? { ...product, product_name: res.product_name, product_description: res.product_description, is_active:res.is_active }
                        : product
                    );
        }else{
          this.$notify({
            group: "error",
            title: "Error",
            text: "Edit Failed, Try Again"
          })
        }
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
        this.$notify({
          group: "error",
          title: "Error",
          text: "Something Went Wrong",
        });
      });
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      if (this.add_product_flag){
        this.addProduct()
      }
      else{
        this.sendEditProductRequest(this.product)
      }
      this.$nextTick(() => {
        this.$bvModal.hide('add-edit-product')
      })
    },
    searchProduct(){
      if(! this.search_text) return
      this.search_clicked=true
      this.search_not_found=false
      this.loading = true
      this.$store
      .dispatch("searchProducts", this.search_text)
      .then((res) => {
        this.loading = false
        if (res.count > 0){
          this.backup_data = [...this.data]
          this.data = res.results
          this.search_not_found=false
        }else{
          this.search_not_found=true
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$notify({
            group: "error",
            title: "Error",
            text: "Something Went Wrong",
          });
        });
    },
    clearSelection(){
      this.search_text = ''; 
      this.search_clicked = this.search_not_found = false
      if (this.backup_data)
        this.data = this.backup_data
    },
    filterActiveProducts(){
      this.loading=true
      this.is_active_filter = !this.is_active_filter
      this.$store
      .dispatch("filterProducts",{"parameter":"is_active","value":this.is_active_filter})
      .then((res) => {
          this.loading = false;
          if (res.results) {
            console.log(res);
            this.data = res.results;
            this.prev_url = res.previous ? res.previous : null
            this.next_url = res.next ? res.next : null
          } else {
            this.$notify({
              group: "error",
              title: "Error",
              text: res.error,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.$notify({
            group: "error",
            title: "Error",
            text: "Something Went Wrong",
          });
        });
    },
    addProduct(){
      this.loading = true
      if(this.product.product_sku === '') this.product.product_sku = this.$uuid.v4()

      this.$store
      .dispatch("addProduct", this.product)
      .then( (res) => {
        this.loading = false
        this.add_product_flag=false
        if(res){
          this.data = [this.product, ...this.data]
          this.product = {
                          'product_sku':'',
                          'product_name':'',
                          'product_description':'',
                          'is_active':true,
                        }
        }else{
          this.$notify({
              group: "error",
              title: "Error",
              text: res.error,
            });
        }
      })
      .catch((err) => {
        console.log(err)
        this.$notify({
              group: "error",
              title: "Error",
              text: "Add Product Failed, Try Again",
            });
      })
    },
    deleteAll(){
      if(confirm("Confirm to delete all Products")){
        this.$store
        .dispatch("deleteAllProducts")
        .then((res) => {
          this.showTaskProgres(res.task_id)
        })
        .catch((err) => {
          console.log(err)
        this.$notify({
              group: "error",
              title: "Error",
              text: "Delete all Product Failed, Try Again",
            });
        })
      }
    },
    handleFileUpload(){
      this.file_upload=true

      let formData = new FormData();

      formData.append('file', this.csv_file);

      axios.post(this.SITE_PREFIX + '/fileupload/',
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: function( progressEvent ) {
            this.uploadPercentage = parseInt( Math.round( ( progressEvent.loaded / progressEvent.total ) * 100 ));
          }.bind(this)
        }
      ).then((res) => {
        console.log(res)
        this.showUploadTaskProgres(res.data.task_id)
      })
        
      .catch((err) =>{
        console.log(err);
      });
    },
    showUploadTaskProgres(task_id){
      this.interval = setInterval(() => {
        this.$store
        .dispatch("getTaskProgress", task_id)
        .then((res) => {
          console.log(res)
          this.bulk_add_task = true
          if (res.status === "CREATING"){
            this.bulk_add_task_status = "Adding Products"
            this.bulk_add_task_progress = res.progress_percentage
          }
          if (res.status === "UPDATING"){
            this.bulk_add_task_status = "Updating Existing Products"
            this.bulk_add_task_progress = res.progress_percentage
          }  
          if (res.status === "FAILED") {
            this.bulk_add_task_status = "Failed"
            this.bulk_add_task_progress = res.progress_percentage;
            clearInterval(this.interval)
             this.getProducts("");
            this.$notify({
              group: "error",
              title: "Error",
              text: "Upload Task Failed, Try Again",
            });
            }
          if (res.status === "PENDING") {
            this.bulk_add_task_status = "Waiting"
            this.bulk_add_task_progress = 0.1;
            }
          if (res.status === "SUCCESS") {
            this.bulk_add_task_progress = 100;
            this.bulk_add_task_status = "Completed Successfully"
            clearInterval(this.interval)
             this.getProducts("");
            this.$notify({
              group: "error",
              title: "Success",
              text: "Upload Successful",
            });
            }
        })
        .catch((err) => {
          clearInterval(this.interval)
          console.log(err)
          this.$notify({
              group: "error",
              title: "Error",
              text: "Unable to Show Upload Progress",
            });
        })
    }, 3000 );
    },
    showTaskProgres(task_id){
      this.interval = setInterval(() => {
        this.$store
        .dispatch("getTaskProgress", task_id)
        .then((res) => {
          console.log(res)
          this.delete_task = true
          if (res.status === "PROGRESS") 
          this.delete_task_status = "Deleting"
            this.delete_task_progress = res.progress_percentage
          if (res.status === "FAILED") {
            this.delete_task_status = "Failed"
            this.delete_task_progress = res.progress_percentage;
            clearInterval(this.interval)
             this.getProducts("");
            this.$notify({
              group: "error",
              title: "Error",
              text: "Delete Task Failed, Try Again",
            });
            }
          if (res.status === "PENDING") {
            this.delete_task_status = "Waiting"
            this.delete_task_progress = 0.1;
            }
          if (res.status === "SUCCESS") {
            this.delete_task_progress = 100;
            this.delete_task_status = "Completed Successfully"
            clearInterval(this.interval)
             this.getProducts("");
            this.$notify({
              group: "error",
              title: "Success",
              text: "Delete Successfull",
            });
            }
        })
        .catch((err) => {
          clearInterval(this.interval)
          console.log(err)
          this.$notify({
              group: "error",
              title: "Error",
              text: "Unable to Show Delete Progress",
            });
        })
    }, 3000 );
    },
  },
  created() {
    this.getProducts("");
  },
};
</script>

<style scoped>

.inline{
  display: inline-block;
  margin-left:8px;
  cursor: pointer;
}

.action-btn{
  overflow: visible;
  height: fit-content;
  border: 1px solid  rgba(12,15,102,1);
  white-space: nowrap;
  text-align: center;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  background-color: rgba(12,15,102,1) !important;
  color: white !important;
  padding: 10px 40px;
  margin:10px;
}

.action-btn:hover{
  color: rgba(12,15,102,1) !important;
  background-color: white !important;
}

/* switch styling */
.box_4{
	background: #fff;
}

.input_wrapper{
  width: 80px;
  height: 40px;
  position: relative;
  cursor: pointer;
}

.input_wrapper input[type="checkbox"]{
  width: 80px;
  height: 40px;
  cursor: pointer;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background: #315e7f;
  border-radius: 2px;
  position: relative;
  outline: 0;
  -webkit-transition: all .2s;
  transition: all .2s;
}

.input_wrapper input[type="checkbox"]:after{
  position: absolute;
  content: "";
  top: 3px;
  left: 3px;
  width: 34px;
  height: 34px;
  background: #dfeaec;
  z-index: 2;
  border-radius: 2px;
  -webkit-transition: all .35s;
  transition: all .35s;
}

.input_wrapper svg{
  position: absolute;
  top: 50%;
  -webkit-transform-origin: 50% 50%;
          transform-origin: 50% 50%;
  fill: #fff;
  -webkit-transition: all .35s;
  transition: all .35s;
  z-index: 1;
}

.input_wrapper .is_checked{
  width: 18px;
  left: 18%;
  -webkit-transform: translateX(190%) translateY(-30%) scale(0);
          transform: translateX(190%) translateY(-30%) scale(0);
}

.input_wrapper .is_unchecked{
  width: 15px;
  right: 10%;
  -webkit-transform: translateX(0) translateY(-30%) scale(1);
          transform: translateX(0) translateY(-30%) scale(1);
}

/* Checked State */
.input_wrapper input[type="checkbox"]:checked{
  background: #23da87;
}

.input_wrapper input[type="checkbox"]:checked:after{
  left: calc(100% - 37px);
}

.input_wrapper input[type="checkbox"]:checked + .is_checked{
  -webkit-transform: translateX(0) translateY(-30%) scale(1);
          transform: translateX(0) translateY(-30%) scale(1);
}

.input_wrapper input[type="checkbox"]:checked ~ .is_unchecked{
  -webkit-transform: translateX(-190%) translateY(-30%) scale(0);
          transform: translateX(-190%) translateY(-30%) scale(0);
}
/* Switch styling end */
</style>