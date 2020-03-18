<template>
  <div id="jiesuan">
    <h3>{{dateilName}}</h3>
    <ul>
      <li v-for="(v,i) in this.wpOj" :key="i">
        <div class="js-list-lf">
          <span>{{v.wpm}}</span>
        </div>
        <div class="js-list-rt">
          <span>X{{v.count}}</span>
          <span>￥{{v.wpjg * v.count}}</span>
        </div>
      </li>
    </ul>
    <div class="ft-box">
      <span>￥{{addPrice}}</span>
      <button class="ft-btn" @click="toHt">支付</button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Vue from "../bus";
export default {
  name: "jeisuan",
  data() {
    return {
      wpm: "",
      wpjg: "",
      Name: "",
      addPrice: 0
    };
  },
  methods:{
      toHt(){
          this.$http.post("http://localhost:3000/wpDate",{wpObject:this.wpOj},{emulateJSON: true}).then(function(resData){
              alert(resData.body);
          })
          console.log(this.wpOj);
      }
  },
  computed: {
    ...mapState(["wpOj"]),
    dateilName() {
      for (var i = 0; i < this.wpOj.length; i++) {
        return (this.Name = this.wpOj[i].dateilName);
      }
    }
  },
  created() {
    Vue.$emit("ftshow", false);
    for (var i = 0; i < this.wpOj.length; i++) {
      this.addPrice += this.wpOj[i].wpjg * this.wpOj[i].count;
    }
  }
};
</script>
<style scoped>
h3 {
  width: 90%;
  padding: 1.25rem 0.625rem;
  margin: 0 auto;
  border-bottom: 1px solid rgb(238, 238, 238);
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 0.625rem;
}
.js-list-lf {
  display: inline-block;
}
.js-list-rt {
  float: right;
}
.js-list-rt span {
  margin: 0 0.625rem;
}
.ft-box {
  width: 100%;
  padding: 0.625rem;
  background-color: gray;
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
}
.ft-btn {
  width: 20vw;
  height: 2.8125rem;
  color: white;
  background-color: rgb(97, 201, 97);
  position: absolute;
  right: 1.225rem;
  top: 0;
  font-size: 1rem;
}
</style>