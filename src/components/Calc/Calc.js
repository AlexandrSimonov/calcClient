import axios from "axios";

export default {
  name: "calc",
  mounted() {
    if (this.$store.state.access_token === "") {
      this.$router.push("/");
    } else {
      this.$store.commit("title", "Калькулятор");

      this.$store.commit("menu", [{name: "История", link: "/menu"}]);

      this.devs.push({
        id: 1,
        name: "",
        hours: 0,
        coef: 1
      });

      axios
        .get("http://localhost:3000/api/dev_list", {
          params: {
            access_token: this.$store.state.access_token
          }
        })
        .then(res => {
          this.devs_list = res.data;
        });

      axios
        .get("http://localhost:3000/api/formula", {
          params: {
            access_token: this.$store.state.access_token
          }
        })
        .then(res => {
          this.formula = res.data.formula;
          this.coefs_list = res.data.coefs;
        });
    }
  },
  data() {
    return {
      formula: "",
      devs_list: [],
      coefs_list: [],
      err: "",
      devs: [],
      itog: 0
    };
  },
  methods: {
    changeValue() {
      this.result();
    },
    addCard() {
      this.devs.push({
        id: this.devs[this.devs.length - 1].id + 1,
        name: "",
        hours: 0,
        coef: 1
      });

      this.result();
    },
    deleteCard(id) {
      for (let i = 0; i < this.devs.length; i++) {
        if (this.devs[i].id === id) {
          this.devs.splice(i, 1);
        }
      }

      if (this.devs.length === 0) {
        this.devs.push({
          id: 1,
          name: "",
          hours: 0,
          coef: 1
        });
      }

      this.result();
    },
    result() {
      let result = 0;
      let devsSum = 0;

      this.devs.forEach(dev => {
        if (dev.name === "") {
          this.err = "Нужно выбрать разработчика";
        } else {
          devsSum += Number.parseFloat(this.devs_list.find(el => dev.name === el.name).rate) *
            Number.parseFloat(dev.hours) *
            Number.parseFloat(dev.coef);
          this.err = "";
        }
      });

      let formulaRep = this.formula;

      formulaRep = formulaRep.replace(new RegExp("devs", "gm"), devsSum);

      this.coefs_list.forEach(el => {
        formulaRep = formulaRep.replace(new RegExp(el.name, "gm"), el.value);
      });

      if (this.err === "") {
        this.itog = Math.floor(eval(formulaRep));

        axios.post("http://localhost:3000/api/add_history", {
          access_token: this.$store.state.access_token,
          result: this.itog,
          developers: (() => {
            return this.devs.map(el => {
              return {name: el.name, hours: el.hours, coef: el.coef};
            });
          })(),
          coefs: (() => {
            return this.coefs_list.map(el => {
              return {name: el.name, value: el.name};
            });
          })()
        });
      }
    }
  }
};
