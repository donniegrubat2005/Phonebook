<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-12 col-md-12">
        <div class="row">
          <div class="col-sm-12">
            <div class="row mb-3">
              <div class="col-sm-6">
                <h4 class="float-left">{{ $route.meta.title }}</h4>
              </div>
              <!-- <div class="col-sm-6">
                <router-link
                  to="/users/create"
                  class="btn btn-primary float-left float-sm-right btn-rounded"
                >Create User</router-link>
              </div>-->
            </div>
          </div>
          <div class="col-sm-12">
            <div class="table-responsive">
              <table ref="usertable" class="table thead-light table-borderless">
                <thead>
                  <tr>
                    <th scope="col" width="30px">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col" width="150px">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, item) in users" :key="user.id" class="table-light">
                    <th scope="row">{{ item + 1 }}</th>
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <span>
                        <router-link
                          :to="{
                                                        name: 'changepassword',
                                                        params: {
                                                            id: user.id
                                                        }
                                                    }"
                        >
                          <button
                            class="btn btn-primary"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Change Password"
                          >
                            <i class="fas fa-key ms-text-primary"></i>
                          </button>
                        </router-link>
                      </span>
                      <span>
                        <router-link
                          :to="{
                                                        name: 'editcontact',
                                                        params: {
                                                            id: user.id
                                                        }
                                                    }"
                        >
                          <button
                            class="btn btn-secondary"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Edit"
                          >
                            <i class="fas fa-pencil-alt ms-text-primary"></i>
                          </button>
                        </router-link>
                      </span>
                      <span>
                        <button
                          class="btn btn-danger"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Delete"
                        >
                          <i
                            class="far fa-trash-alt ms-text-danger"
                            @click="
                                                            remove(
                                                                item,
                                                                user.id
                                                            )
                                                        "
                          ></i>
                        </button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
      users: [],
      error: {},
      dataTable: null,
    };
  },
  methods: {
    getUsers() {
      axios
        .get("/api/auth/users")
        .then((response) => {
          this.dt = $(this.$refs.usertable).DataTable();
          setTimeout(() => (this.users = response.data));
        })
        .catch((error) => (this.error = error.response.data.error));
    },
  },

  mounted() {
    this.getUsers();
    //$("#sellertable").DataTable({});
  },
  watch: {
    users(val) {
      this.dt.destroy();
      this.$nextTick(() => {
        this.dt = $(this.$refs.usertable).DataTable();
      });
    },
  },
};
</script>

<style scoped></style>
