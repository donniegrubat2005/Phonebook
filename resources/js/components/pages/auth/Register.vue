<template>
  <div class="container">
    <div class="card o-hidden border-0 shadow-lg my-5">
      <div class="card-body p-0">
        <!-- Nested Row within Card Body -->
        <div class="row">
          <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div class="col-lg-7">
            <div class="p-5">
              <div class="text-center">
                <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
              </div>
              <form @submit.prevent="register" class="user">
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="inputFirstName"
                      v-model="user.first_name"
                      placeholder="First Name"
                    />
                    <div
                      v-if="
                                                submitted &&
                                                    !$v.user.first_name.required
                                            "
                      class="errors"
                    >First Name is required</div>
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="text"
                      class="form-control form-control-user"
                      id="inputLastName"
                      v-model="user.last_name"
                      placeholder="Last Name"
                    />
                    <div
                      v-if="
                                                submitted &&
                                                    !$v.user.last_name.required
                                            "
                      class="errors"
                    >Last Name is required</div>
                  </div>
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control form-control-user"
                    id="inputEmail"
                    v-model="user.email"
                    placeholder="Email Address"
                  />
                  <div v-if="submitted && $v.user.email.$error" class="errors">
                    <span v-if="!$v.user.email.required">Email is required</span>
                    <span v-if="!$v.user.email.email">Email is invalid</span>
                    <span v-if="!$v.user.email.email">Email is invalid</span>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-sm-6 mb-3 mb-sm-0">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      id="inputPassword"
                      v-model="user.password"
                      placeholder="Password"
                    />
                    <div
                      v-if="
                                                submitted &&
                                                    $v.user.password.$error
                                            "
                      class="errors"
                    >
                      <span
                        v-if="
                                                    !$v.user.password.required
                                                "
                      >Password is required</span>
                      <span
                        v-if="
                                                    !$v.user.password.minLength
                                                "
                      >
                        Password must be at least 3
                        characters
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <input
                      type="password"
                      class="form-control form-control-user"
                      id="inputConfirmPassword"
                      v-model="user.password_confirmation"
                      placeholder="Confirm Password"
                    />
                    <div
                      v-if="
                                                submitted &&
                                                    $v.user
                                                        .password_confirmation
                                                        .$error
                                            "
                      class="errors"
                    >
                      <span
                        v-if="
                                                    !$v.user
                                                        .password_confirmation
                                                        .required
                                                "
                      >
                        Confirm Password is
                        required
                      </span>
                      <span
                        v-else-if="
                                                    !$v.user
                                                        .password_confirmation
                                                        .sameAsPassword
                                                "
                      >Passwords must match</span>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary btn-user btn-block">Register Account</button>
              </form>
              <hr />
              <div class="text-center">
                <a class="small" href="#">Forgot Password?</a>
              </div>
              <div class="text-center">
                <router-link to="/" class="small" href="#">
                  Already have an account?
                  Login!
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
      submitted: false,
    };
  },
  validations: {
    user: {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      password: { required, minLength: minLength(3) },
      password_confirmation: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },

  methods: {
    register(e) {
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      axios
        .post("/api/auth/register", this.$data.user)
        .then((response) => {
          this.$router.push({ name: "login" });
        })
        .catch((error) => (this.errors = error.response.data.errors));
    },
  },
};
</script>

<style></style>
