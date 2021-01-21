<template>
  <div class="login">
    <div class="loginTop">
      <div>
        <router-link to="/">
          <img src="../assets/icon/leftArrow.png" alt="" />
        </router-link>
      </div>
      <div>Register</div>
      <div></div>
    </div>
    <br />
    <br />
    <b-container class="wrapperMain">
      <p><b> Let’s create your account!</b></p>
      <br />
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-form-group
          id="input-group-2"
          class="inputLabel"
          label="Name:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            class="inputForm"
            style="color: black; font-weight: bold"
            v-model="form.username"
            type="text"
            required
            placeholder="Enter your name"
          ></b-form-input>
        </b-form-group>

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
            v-model="form.email"
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
            v-model="form.password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <div style="  text-align: center;">
          <b-button class="loginButton" type="submit" variant="primary"
            >Register</b-button
          >
        </div>
        <div class="separator">
          <p>Register With</p>
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
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        user_name: "",
        user_email: "",
        user_password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$router.push({
        name: "Chat",
        params: {
          ...this.form
        }
      });
    },
    onReset() {
      //proses reset
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
  display: flex;
  justify-content: space-around;
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
