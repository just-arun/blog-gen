import Axios from "axios";

export default {
  methods: {
    async HttpServerRequest(method, path, data) {
      const initAxios = () => {
        if (data) {
          return {
            method,
            url: `${this.$store.state.config.PORT}${path}`,
            data,
            withCredentials: true
          };
        } else {
          return {
            method,
            url: `${this.$store.state.config.PORT}${path}`,
            withCredentials: true
          };
        }
      };
      return this.$axios(initAxios())
        .then(res => {
          return res;
        })
        .catch(err => {
          console.log("ERROR", err.response.statusText);
          this.$notification["error"]({
            message: err.response.statusText,
            description: err.response.data.error.message
          });
          return Promise.reject(err);
        });
    }
  }
};
