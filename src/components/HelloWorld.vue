<template>
  <div class="hello">
  <div class="filter-container">
  <h5>Топ клиенты по закупу</h5>
    <form style="margin:20px">
      <div class="row">
        <div class="col">
          <input type="text" v-model="name_doc" class="form-control" placeholder="Поиск по названию" />
        </div>
        <div class="col">
          <input type="text" v-model="iin" class="form-control" placeholder="Поиск по ИИН" />
        </div>
      </div>
    </form>
    </div>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Наименование хозяйства</th>
            <th scope="col">ИИН</th>
            <th scope="col">Адрес</th>
            <th scope="col">Сумма закупа&nbsp;<i class="arrow up" v-on:click="sortOrderu('up')"></i>&nbsp;<i class="arrow down" v-on:click="sortOrderd('down')"></i></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="list in llistPivot" :key="list.id">
            <th scope="row">{{list.Row}}</th>
            <td v-on:click="navigation(list.clientIin)">{{list.clientName}}</td>
            <td>{{Math.round(list.clientIin)}}</td>
            <td>{{list.clientAddress}}</td>
            <td>{{Math.round(list.sumClient).toLocaleString('ru')}} тг </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
//import { getClientXL } from "@/api/apiQuery";
import router from "@/router";
import axios from 'axios' 
import store from '@/store/index.js';
export default {
  name: "HelloWorld",
  data() {
    return {
      clientList: '',
      email:  store.getters.email,
      name_doc: '',
      iin: ''
    };
  },
  props: {
    msg: String,
  },
  computed:{
    llistPivot() {
      let results = this.clientList;
      if (this.name_doc.length) {
        results = results.filter(
          (item) => item.clientName.indexOf(this.name_doc) !== -1
        );
      }
      if (this.iin.length) {
        results = results.filter(
          (item) => item.clientIin.indexOf(this.name_doc) !== -1
        );
      }else{
       console.log(results) 
      }
      return results;
    }
  },
  methods: {
    sortOrderu: function (message) {
      let results = this.clientList;
      if (message) {
        results = results.sort((a, b) => {
            let fa = parseInt(a.sumClient),
            fb = parseInt(b.sumClient);
            return fa - fb;
        });
      }
      return results;
    },
    sortOrderd: function (message) {
      let results = this.clientList;
      if (message) {
        results = results.sort((a, b) => {
            let fa = parseInt(a.sumClient),
            fb = parseInt(b.sumClient);
            return fb - fa;
        });
      }
      return results;
    },
    getClientXL(){
      setTimeout(() => {
      axios
        .post("https://api.agtech.kz/api/workplace",
            {
                "type": "getClientXL",
                "userEmail": store.getters.email,
            })
        .then((response) => {
            return this.clientList = response.data  
        }
        );
      }, 2000)
      },
    navigation: function (clientIin) {
      router.push({ name: 'clientDetail', query: { clientIin: Math.round(clientIin) } })
    }
  },
  mounted(){
    this.clientList = this.getClientXL()
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
  text-align:left;
  margin: 25px;
  border-radius: 10px;
  background: #42b983;
  font-family: "Times New Roman", Times, serif;
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
