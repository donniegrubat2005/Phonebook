<template>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                  </div>
                  <form class="user" @submit.prevent="authenticate">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control form-control-user"
                        id="inputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Email Address..."
                        v-model="login.email"
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        class="form-control form-control-user"
                        id="inputPassword"
                        placeholder="Password"
                        v-model="login.password"
                      />
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">Login</button>
                  </form>
                  <hr />
                  <div class="text-center">
                    <a class="small" href="#">Forgot Password?</a>
                  </div>
                  <div class="text-center">
                    <router-link to="/register" class="small">Create an Account</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../../../auth/auth";

export default {
  name: "login",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    authenticate() {
      this.$store.dispatch("login");

      login(this.$data.login)
        .then((res) => {
          this.$store.commit("loginSuccess", res);
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
          this.$store.commit("loginFailed", { error });
          this.$toastr.error("Invalid username and password", "Error!");
        });
    },
  },
  computed: {
    authError() {
      return this.$store.getters.authError;
    },
  },
};
</script>

<style scoped></style>
