<template>
    <div class="hello">
    <div class="filter-container">
    <h5>Доступные поставщики</h5>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Наименование хозяйства</th>
              <th scope="col">ИИН</th>
              <th scope="col">Адрес</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="list in clientList" :key="list.id">
              <th scope="row">{{list.Row}}</th>
              <td v-on:click="navigation(list.providerIin)">{{list.clientName}}</td>
              <td>{{Math.round(list.providerIin)}}</td>
              <td>{{list.providerAddress}}</td>
              <!--<td>{{Math.round(list.sumProvider).toLocaleString('ru')}} тг</td>-->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <script>
  import router from "@/router/index";
  import axios from "axios";
import store from '@/store/index.js';
  export default {
    name: "ProviderList",
    data() {
      return {
        clientList: '',
      };
    },
    props: {
      msg: String,
    },
    methods: {
      navigation: function (providerIin) {
        router.push({ name: 'providerDetail', query: { providerIin: Math.round(providerIin) } })
      },
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
            return fa - fb;
        });
      }
      return results;
    },
    },
    mounted(){
      setTimeout(() => {
        axios
        .post("https://api.agtech.kz/api/workplace",
            {
                "type": "getProviderXL",
                "userEmail":  store.getters.email
            })
        .then((response) => {
            return this.clientList = response.data
        }
        );
    }, 2000)
    }
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .filter-container{
    margin:25px
  }
  thead {
    color: white;
  }
  .table-container {
    text-align:left;
    margin: 25px;
    border-radius: 10px;
    background: #42b983;
    font-family: "Times New Roman", Times, serif;
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
  