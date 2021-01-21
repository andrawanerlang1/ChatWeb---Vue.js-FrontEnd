<template>
  <div class="login">
    <b-container>
      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-form-group id="input-group-1" label="Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.username"
            required
            placeholder="Enter username"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Email address:"
          label-for="input-2"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="Your Password:"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: ""
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
    }
  }
};
</script>

<style scoped>
.login {
  text-align: left;
}
</style>
