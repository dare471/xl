<template>
  <div class="hello">
    <div class="container">
      <div class="row" v-for="list in clientList" :key="list.id">
        <div class="col-sm-9" style="max-width: 100%">
          <h4 style="color: white">
            Наименование хозяйства:
            <p>{{ list.clientName }}</p>
          </h4>
          <li style="color: white">
            Адрес:
            <p>{{ list.clientAddress }}</p>
          </li>
          <hr style="background: white" />
          <div id="block1" class="dashboard">
            <li>Сумма закупа:</li>
            <li><h5>{{ Math.round(list.sumClient).toLocaleString("ru")}} тг</h5></li>
          </div>
          <div id="block2" class="dashboard">
            <li>Объем закупа:</li>
            <li><h5>{{ Math.round(list.volume).toLocaleString("ru")}} шт</h5></li>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-container"></div>
    <div class="table-d">
      <table style="border-radius: 10px" class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Закупался</th>
            <th>Дата закупа</th>
            <th>Товар</th>
            <th>Наименование по декларации</th>
            <th>Количество</th>
            <th> Сумма&nbsp; <i class="arrow up" v-on:click="sortOrderu('up')"></i>&nbsp;<i class="arrow down" v-on:click="sortOrderd('down')"></i></th>
          </tr>
        </thead>
        <tbody v-for="listPivot in clientPivot" :key="listPivot.id">
          <tr>
            <th scope="row">{{ listPivot.Row }}</th>
            <td>{{ listPivot.provider }}</td>
            <td>{{ listPivot.dateContract }}</td>
            <td>{{ listPivot.productName }}</td>
            <td>{{ listPivot.alternativeName }}</td>
            <td>{{ Math.round(listPivot.volume).toLocaleString("ru")}}</td>
            <td>{{ Math.round(listPivot.sumContract).toLocaleString("ru")}} тг</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from '@/store/index.js';
export default {
  name: "DetailClients",
  data() {
    return {
      clientName: null,
      clientIin: null,
      clientAddress: null,
      clientList: null,
      clientPivot: null,
    };
  },

  beforeMount() {
    axios
      .post("https://api.agtech.kz/api/workplace", {
        type: "getClientDetailXL",
        clientIin: this.$route.query.clientIin,
        userEmail: store.getters.email
      })
      .then((response) => {
        return (this.clientList = response.data);
      });
    axios
      .post("https://api.agtech.kz/api/workplace", {
        type: "getClientPivot",
        clientIin: this.$route.query.clientIin,
        userEmail: store.getters.email,
      })
      .then((response) => {
        return (this.clientPivot = response.data);
      });
  },
  methods:{
    sortOrderu: function (message) {
      let results = this.clientPivot;
      if (message) {
        results = results.sort((a, b) => {
            let fa = parseInt(a.sumContract),
            fb = parseInt(b.sumContract);
            return fa - fb;
        });
      }
      return results;
    },
    sortOrderd: function (message) {
      let results = this.clientPivot;
      if (message) {
        results = results.sort((a, b) => {
            let fa = parseInt(a.sumContract),
            fb = parseInt(b.sumContract);
            return fb - fa;
        });
      }
      return results;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard{
  border-radius: 10px;
  margin: 10px;
  max-width:30%;
  padding: 10px;
  background: #d7faeb;
  float:left;
  display:block;
  width:300px;
  margin:2px;
}

thead {
  background: #d7faeb;
}
.table-d {
  margin: 15px;
  border-radius: 10px;
  background: #d7faeb;
}
th {
  color: black;
}
.container {
  margin-left: 10px;
  width: 60%;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px rgb(149, 194, 177);
}
.row {
  background-color: #42b983;
  text-align: left;
  text-color: white;
  padding: 30px;
  border-radius: 10px;
}
h3 {
  text-align: left;
}
.text-col-6 {
  text-align: left;
}
.filter-container {
  margin: 25px;
}
thead {
  color: white;
}
.arrow {
  border: solid rgb(255, 255, 255);
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}
.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}
.table-container {
  margin: 25px;
  border-radius: 10px;
  background: #42b983;
}
tbody {
  background: white;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
