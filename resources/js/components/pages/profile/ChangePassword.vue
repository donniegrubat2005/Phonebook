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
                <label for="firstname">Password</label>
                <input
                  type="password"
                  name="password"
                  v-model="user.password"
                  class="form-control rounded-0"
                />
              </div>

              <div class="form-group">
                <label for="lastname">Confirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  v-model="user.password_confirmation"
                  class="form-control rounded-0"
                />
              </div>
              <button
                class="btn btn-primary float-left float-sm-left btn-rounded"
                type="button"
                @click.prevent="changePassword()"
              >Change Password</button>
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
      user: {},
      error: {},
    };
  },
  methods: {
    changePassword() {
      let uri = "/api/auth/users/" + this.$route.params.id;
      axios
        .patch(uri, this.user)
        .then((response) => {
          this.user = response.data;
          this.$toastr.success("Change Password Successfully!", "Updated!");
          this.returntoList();
        })
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toastr.warning(this.error, "Error!");
        });
    },

    returntoList() {
      this.$router.push({ name: "userlist" });
    },
  },

  created() {
    let uri = "/api/auth/users/" + this.$route.params.id + "/changepassword";
    axios
      .get(uri)
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => (this.errors = error.response.data.errors));
  },
};
</script>

<style></style>
