import axios from "axios";

export default {
  name: "login",
  mounted() {
    if (this.$store.state.access_token !== "") {
      this.$router.push("/calc");
    } else {
      this.$store.commit("title", "Вход");
    }
  },
  methods: {
    auth() {
      if (this.email !== "" && this.password !== "") {
        axios
          .post("http://localhost:3000/api/employee/auth", {
            email: this.email,
            password: this.password
          })
          .then(res => {
            console.log(res.data);
            if (res.data.error) {
              this.err = res.data.error;
              this.password = "";
            } else {
              this.err = "";
              this.email = "";
              this.password = "";
              this.$store.commit("access_token", res.data.access_token);
              this.$router.push("/calc");
            }
          });
      }
    }
  },
  data() {
    return {
      email: "",
      password: "",
      err: ""
    };
  }
};
