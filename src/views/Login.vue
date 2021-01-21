<template>
  <div class="login">
    <div class="loginTop">
      Login
    </div>
    <br />
    <br />
    <b-container class="wrapperMain">
      <p><b> Hi, Welcome back! </b></p>
      <br />
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-form-group
          id="input-group-2"
          class="inputLabel"
          label="Email:"
          label-for="input-2"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-2"
            class="inputForm"
            style="color: black; font-weight: bold"
            v-model="form.user_email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          class="inputLabel"
          label="Password:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            class="inputForm"
            style="color: black; font-weight: bold"
            v-model="form.user_password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <div class="forgot" style=" text-align: right; color: #7e98df;">
          <router-link to="/"> Forgot password? </router-link>
        </div>
        <div style="  text-align: center;">
          <b-button class="loginButton" type="submit" variant="primary"
            >Login</b-button
          >
        </div>
        <div class="separator">
          <p>Login With</p>
        </div>
        <div style="  text-align: center; ">
          <b-button
            style="background-color: white; color: #7e98df"
            class="loginButton"
            type="submit"
            variant="primary"
            @click="google"
          >
            <img
              src="../assets/icon/googleLogo.png"
              style="margin-right:10px"
            />
            Google</b-button
          >
        </div>
        <div style="text-align: center; margin-top: 30px">
          Don’t have an account?
          <router-link to="/register"> Sign Up </router-link>
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        user_email: "",
        user_password: ""
      }
    };
  },
  methods: {
    ...mapActions(["login"]),

    onSubmit() {
      this.login(this.form)
        .then(result => {
          console.log(result);
          this.$router.push("/");
        })
        .catch(error => {
          this.$toasted.error(error.data.msg);
        });
    },

    google() {
      this.$swal("This Feature is coming soon");
    }
  }
};
</script>

<style scoped>
.wrapperMain {
  width: 80%;
  margin-bottom: 60px;
}
.login {
  text-align: left;
}
.loginTop {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin-top: 30px;
  color: #7e98df;
}
.inputLabel {
  color: #848484;
  margin-top: 20px;
}
.inputForm {
  border: white solid 2px;
  border-bottom: black 2px solid;
  margin-top: 20px;
}
.forgot {
  margin-top: 30px;
}
.loginButton {
  margin-top: 30px;
  background-color: #7e98df;
  font-size: 25px;
  font-weight: bold;
  color: white;
  width: 60%;
  height: 80px;
  border-radius: 300px;
}
.separator {
  color: #848484;
  text-align: center;
  margin-top: 30px;
  font-size: 22px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) calc(50% - 1px),
    rgba(192, 192, 192, 1) calc(50%),
    rgba(0, 0, 0, 0) calc(50% + 1px)
  );
}
.separator p {
  width: 30%;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
}
@media screen and (max-width: 500px) {
  .loginButton {
    font-size: 18px;
    height: 60px;
    width: 80%;
  }
  .separator {
    font-size: 16px;
  }
}
</style>
