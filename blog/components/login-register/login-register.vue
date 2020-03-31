<template src="./login-register.html"></template>
<script>
import httpRequest from "@/mixins/httpRequest";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  mixins: [httpRequest],
  data() {
    return {
      loading: false,
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" })
    };
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  methods: {
    // Only show error after a field is touched.
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.HttpServerRequest("POST", "/auth/login", values)
            .then(res => {
              console.log(res);
              this.$router.push("/dashboard/posts")
            })
            .catch(err => {
              console.log({ err });
            });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "./login-register.scss";
</style>