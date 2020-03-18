<template>
  <div id="app">
    <footer v-show="ftshow">
      <router-link to="/index">
      <div class="lgimg1"></div>
      <p>首页</p>
      </router-link>
      <router-link to="/find">
      <div class="lgimg2"></div>
      <p>发现</p>
      </router-link>
      <router-link to="/orderform">
      <div class="lgimg3"></div>
      <p>订单</p>
      </router-link>
      <router-link to="/mine">
      <div class="lgimg4"></div>
      <p>我的</p>
      </router-link>
    </footer>
    <router-view></router-view>
  </div>
</template>


<script>
import Vue from './bus'
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem
  },
  data(){
    return{
      ftshow: true
    }
  },
  created(){
    Vue.$on("ftshow",(flag)=>{
      this.ftshow = flag;
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html{
  font-size: 1.25rem;
}
body {
  background-color: #fbf9fe;
}
#app:after{
  display: block;
  height: 3.125rem;
  content: "";
}
footer {
  width: 100%;
  height: 3.125rem;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  border-top: 1px solid gainsboro;
}
footer a {
  width: 25%;
  height: 100%;
  // line-height: 60px;
  color: gray;
  font-size: .625rem;
  float: left;
  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
}
footer a p{
 position: relative;
 top: -5px;
}
footer .router-link-active {
  color: #1296db;
}
.lgimg1,.lgimg2,.lgimg3,.lgimg4{
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  margin-top: .4375rem;
  background-size: 100%;
}
.lgimg1{
  background-image: url(./imgs/changyonglogo40.png);
}
.lgimg2{
  background-image: url(./imgs/faxian.png);
}
.lgimg3{
  background-image: url(./imgs/tongchengicon_dingdan-kong.png);
}
.lgimg4{
  background-image: url(./imgs/wodedangxuan-2.png);
}

</style>
