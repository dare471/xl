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
            <li>
              <h5>{{ Math.round(list.sumClient).toLocaleString("ru") }} тг</h5>
            </li>
          </div>
          <div id="block2" class="dashboard">
            <li>Объем закупа:</li>
            <li>
              <h5>{{ Math.round(list.volume).toLocaleString("ru") }} шт</h5>
            </li>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-container">
     <li style="font-size:14px">Поиск по наименованию:
    <p><input style="border-radius:5px; vertical-align: middle;"  placeholder="ТОО ...." v-model="name_doc" type="text"/></p></li> 
    </div>
    <div class="table-d">
      <table style="border-radius: 10px" class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Закупался</th>
            <th>Дата продажи</th>
            <th>Товар</th>
            <th>Наименование по декларации</th>
            <th>Количество</th>
            <th>Сумма &nbsp;<i class="arrow up" v-on:click="sortOrderu('up')"></i>&nbsp;<i class="arrow down" v-on:click="sortOrderd('down')"></i></th>
          </tr>
        </thead>
        <tbody v-for="listPivot in llistPivot" :key="listPivot.id">
          <tr>
            <th scope="row">{{ listPivot.Row }}</th>
            <td>{{ listPivot.provider }}</td>
            <td>{{ listPivot.dateContract }}</td>
            <td>{{ listPivot.productName }}</td>
            <td>{{ listPivot.alternativeName }}</td>
            <td>{{ Math.round(listPivot.volume).toLocaleString("ru") }}</td>
            <td>
              {{ Math.round(listPivot.sumContract).toLocaleString("ru") }} тг
            </td>
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
  name: "DetailProvider",
  data() {
    return {
      clientName: null,
      clientIin: null,
      clientAddress: null,
      clientList: null,
      clientPivot: [],
      name_doc:""
    };
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
  },
  computed:{
    llistPivot() {
      let results = this.clientPivot;
      if (this.name_doc.length) {
        results = results.filter(
          (item) => item.provider.indexOf(this.name_doc) !== -1
        );
      }else{
       console.log(results) 
      }
      return results;
    }
  },
  beforeMount(){
    setTimeout(() => {
    axios
      .post("https://api.agtech.kz/api/workplace", {
        type: "getProviderDetailXL",
        providerIin: this.$route.query.providerIin,
        userEmail:  store.getters.email
      })
      .then((response) => {
        return (this.clientList = response.data);
      });
    }, 2000);
    setTimeout(() => {
    axios
      .post("https://api.agtech.kz/api/workplace", {
        type: "getProviderPivot",
        providerIin: this.$route.query.providerIin,
        userEmail:  store.getters.email
      })
      .then((response) => {
        return (this.clientPivot = response.data);
      });
    }, 2000)
      
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter-container{
  width:100%;
  display:flex;
  justify-content: flex-start;
  margin: 15px;
}
.dashboard {
  border-radius: 10px;
  margin: 10px;
  max-width: 40%;
  padding: 10px;

  background: #d7faeb;
  float: left;
  display: grid;
  width: 300px;
  margin: 2px;
}
.arrow {
  border: solid rgb(19, 18, 18);
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
.row {
  display: flow-root;
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
table{
  width: fit-content;
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
tr {
  font-size: 14px;
  text-align: left;
}
a {
  color: #42b983;
}
</style>
