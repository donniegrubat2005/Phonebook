<template>
  <div class="row">
    <div class="col-xl-12 col-md-12">
      <div class="container-fluid">
        <div class="card rounded-0">
          <div class="card-header">
            <div class="card-title">
              <span class="page-title">
                <h5>{{ $route.meta.title }}</h5>
              </span>
              <span class="back-button">
                <button class="btn btn-default rounded-0" @click.prevent="returntoList()">
                  <i class="fas fa-arrow-left">Back</i>
                </button>
              </span>
            </div>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  v-model="contact.first_name"
                  class="form-control rounded-0"
                />
              </div>

              <div class="form-group">
                <label for="lastname">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  v-model="contact.last_name"
                  class="form-control rounded-0"
                />
              </div>
              <div class="form-group">
                <label for="gender">Gender</label>
                <select name="gender" v-model="contact.gender" class="form-control rounded-0">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div class="form-group">
                <label for="lastname">Date of Birth</label>
                <input
                  type="text"
                  name="dateofbirth"
                  v-model="contact.date_of_birth"
                  class="form-control rounded-0"
                />
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <textarea
                  name="address"
                  v-model="contact.address"
                  class="form-control rounded-0"
                  rows="4"
                />
              </div>
              <button
                class="btn btn-primary float-left float-sm-left btn-rounded"
                type="button"
                @click.prevent="update()"
              >Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contact: {},
      error: {},
    };
  },
  methods: {
    update() {
      let uri = "/api/contacts/" + this.$route.params.id;
      axios
        .patch(uri, this.contact)
        .then((response) => {
          this.contact = response.data;
          this.$toastr.success("Updated Successfully!", "Updated!");
          this.returntoList();
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toastr.warning(this.error, "Error!");
        });
    },

    returntoList() {
      this.$router.push({ name: "contactlist" });
    },
  },

  created() {
    let uri = "/api/contacts/" + this.$route.params.id + "/edit";
    axios
      .get(uri)
      .then((response) => {
        this.contact = response.data;
      })
      .catch((error) => (this.errors = error.response.data.errors));
  },
};
</script>

<style></style>
