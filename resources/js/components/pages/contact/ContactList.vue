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
              <div class="col-sm-6">
                <router-link
                  to="/contacts/create"
                  class="btn btn-primary float-left float-sm-right btn-rounded"
                >Create Contact</router-link>
              </div>
            </div>
          </div>
          <div class="col-sm-12">
            <div class="table-responsive">
              <table ref="contacttable" class="table thead-light table-borderless">
                <thead>
                  <tr>
                    <th scope="col" width="30px">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Address</th>
                    <th scope="col" width="90px">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contact, item) in contacts" :key="contact.id" class="table-light">
                    <th scope="row">{{ item + 1 }}</th>
                    <td>{{ contact.first_name }}</td>
                    <td>{{ contact.last_name }}</td>
                    <td>{{ contact.gender }}</td>
                    <td>{{ contact.date_of_birth }}</td>
                    <td>{{ contact.address }}</td>
                    <td>
                      <span>
                        <router-link
                          :to="{
                                                        name: 'editcontact',
                                                        params: {
                                                            id: contact.id
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
                                                                contact.id
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
      contacts: [],
      error: {},
      dataTable: null,
    };
  },
  methods: {
    getContacts() {
      axios
        .get("/api/contacts")
        .then((response) => {
          this.dt = $(this.$refs.contacttable).DataTable();
          setTimeout(() => (this.contacts = response.data));
        })
        .catch((error) => (this.error = error.response.data));
    },

    remove(key, id) {
      axios
        .delete(`/api/contacts/${id}`)
        .then(
          (response) => this.contacts.splice(key, 1),
          this.$toastr.success("Deleted Successfully!", "Deleted!")
        )
        .catch((error) => {
          this.error = error.response.data.error;
          this.$toastr.warning(this.error, "Error!");
        });
    },
  },

  mounted() {
    this.getContacts();
    //$("#sellertable").DataTable({});
  },
  watch: {
    contacts(val) {
      this.dt.destroy();
      this.$nextTick(() => {
        this.dt = $(this.$refs.contacttable).DataTable();
      });
    },
  },
};
</script>

<style scoped></style>
