<template>
  <div >
      <b-navbar style="background-color:white; height:70px; padding:30px; border: 1px solid ;box-shadow: 0px 2px #888888;" variant="faded" type="light">
        <b-navbar-brand style="font-size:xx-large; color:#000b76; font-weight:bold;"  tag="h1" class="mb-0">Acme Inc</b-navbar-brand>
      </b-navbar>
     <div class="m-2">
        
    <b-container>
        <h1 style="color:rgba(12,15,102,1)" >Webhook</h1>
        <p>Create and Edit Webhooks </p>
      <b-row>
        <b-col>   
            <form class="form-control" style="display: inline-block;" ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                style="font-weight:bold;display: inline-block; margin:20px"
                label="Event"
                label-for="Event-input"
                invalid-feedback="Event is required"
                :state="event_state"
                >
                <b-form-select 
                id="Event-input"
                style="display: inline-block; padding:10px;" 
                size="sm"
                v-model="webhook.event" 
                :options="webhook_options"
                required
                ></b-form-select>

                </b-form-group>
                <b-form-group
                style="font-weight:bold;display: inline-block; margin:20px"
                label="Target Url"
                label-for="url-input"
                invalid-feedback="Product Description is required"
                :state="target_url_state"
               
                >
                <b-form-input
                    type="url"
                     style="display: inline-block;"
                    id="url-input"
                    v-model="webhook.target_url"
                    required
                     ref="target_url"
                ></b-form-input>
                </b-form-group>
                <button class="btn btn-lg action-btn" block >Submit</button>
            </form>
        </b-col>
      </b-row>
    </b-container>
    <br><br><br>
    <b-row>
      <b-col>

    <b-table-simple hover bordered :sticky-header="true" caption-top responsive>
    <caption>All Webhooks</caption>
    <colgroup><col><col></colgroup>
    <colgroup><col><col><col></colgroup>
    <colgroup><col><col></colgroup>
    <b-thead style=" position:sticky " >
      <b-tr >
        <b-th>id</b-th>
        <b-th>Event</b-th>
        <b-th>Target Url</b-th>
        <b-th>Actions</b-th>
      </b-tr>
    </b-thead>
    <template v-if="loading">
            <div style="align-self:center" class="text-center text-success my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong style="margin-left: 15px">Loading...</strong>
            </div>
          </template>
    <b-tbody v-else>
      <b-tr :key="webhook.product_sku" v-for="webhook in data">
        <b-th style="text-align: center; ">{{webhook.id}}</b-th>
        <b-th style="text-align: right; ">{{webhook.event}}</b-th>
        <b-th style="text-align: left;">{{webhook.target_url}}</b-th>
        <b-td>
          <div style="display: inline-block;" >
              <b-icon class="inline" font-scale="1.3" style="color:black" icon="pencil" @click="editWebhook(webhook)" ></b-icon>
              <b-icon class="inline" font-scale="1.3" style="color:red" icon="trash" @click="deleteWebhook(webhook)" ></b-icon>
          </div>
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>

        <button class="action-btn" v-if="prev_url" @click="getWebhooks(prev_url)" > Previous </button>
        <button class="action-btn" v-if="next_url" @click="getWebhooks(next_url)" > Next </button>

      </b-col>
    </b-row>
  </div>
   </div> 
</template>

<script>
export default {
  name: "Webhook",
  data() {
    return {
      loading: true,
      data: [],
      next_url:null,
      prev_url:null,
      webhook:{
        'id':'',
        'event':'',
        'target_url':'',
      },
      event_state:null,
      target_url_state:null,
      add_webhook_flag:true,
      webhook_options:[
          "PRODUCT_CREATE_EVENT",
          "PRODUCT_UPDATE_EVENT"
      ]
    };
  },
  methods: {
    getWebhooks(url) {
      this.loading=true
      this.$store
        .dispatch("getAllWebhooks", url)
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

    deleteWebhook(webhook){
        this.loading = true
      this.$store
      .dispatch("deleteWebhook", webhook.id)
      .then((res) => {
          this.loading = false
          if (res.status == 204){
            this.data = this.data.filter(data => data != webhook)
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

    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        if (this.webhook.event == '') this.event_state = valid
        if (this.webhook.target_url == '') this.target_url_state = valid
        return valid
    },
    editWebhook(webhook){
      this.add_webhook_flag=false
      this.webhook = {'id':webhook.id,
                      'event':webhook.event,
                      'target_url':webhook.target_url
                      }
     window.scrollTo(0,0);
     console.log(this.$refs.target_url.$el)
     this.$refs.target_url.$el.focus();
    },
    sendEditWebhookRequest(webhook){
        this.loading = true
        this.$store
      .dispatch("editWebhook", webhook)
        .then((res) => {
            this.loading = false
          console.log(res)
        if (res){
            this.data = this.data.map(webhook =>
                      webhook.id === res.id
                        ? { ...webhook, event: res.event, target_url: res.target_url}
                        : webhook
                    );
            this.webhook={
                'id':'',
                'event':'',
                'target_url':'',
                }
              this.add_webhook_flag = true;
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
      if (this.add_webhook_flag){
        this.addWebhook()
      }
      else{
        this.sendEditWebhookRequest(this.webhook)
      }
    },
    addWebhook(){
      this.loading = true
      delete this.webhook.id; 
      this.$store
      .dispatch("addWebhook", this.webhook)
      .then( (res) => {
        this.loading = false
        if(res){
          this.data = [...this.data, res]
          this.webhook = {
                          'id':'',
                          'event':'',
                          'target_url':'',
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
              text: "Add Webhook Failed, Try Again",
            });
      })
    },
  },
  created() {
    this.getWebhooks("");
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

</style>