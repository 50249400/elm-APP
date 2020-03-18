<template>
  <div id="detailPage">
    <header>
      <img class="hd-img" :src="dateilImg | formatImg" alt />
      <div class="hd-right">
        <h3>{{dateilName}}</h3>
        <ul class="pjText">
          <li>评价{{dateilRating}}</li>
          <li>月售{{dateilNum}}</li>
          <li>蜂鸟专送约30分钟</li>
        </ul>
      </div>
    </header>
    <div class="navigation-box">
      <ul>
        <li @click="dc=true,pj=false,sj=false" :class="{active : dc==true}">点餐</li>
        <li @click="dc=false,pj=true,sj=false" :class="{active : pj==true}">评价</li>
        <li @click="dc=false,pj=false,sj=true" :class="{active : sj==true}">商家</li>
      </ul>
    </div>
    <div class="dc">
      <ul class="dc-list">
        <li
          v-for="(v,i) in food"
          :key="i"
          @click="msgShow(i)"
          :class="{ dcactive : dcIndex == i}"
        >{{v.name}}</li>
      </ul>
      <div class="dc-rt">
        <ul class="dc-rt-list">
          <li v-for="(value,i) in fdList" :key="i">
            <img :src="value.image_path | formatImg" alt="footImg" />
            <div class="dc-rt-text">
              <h4>{{value.name}}</h4>
              <span>￥{{value.lowest_price}}</span>
            </div>
            <button class="gwc-btn" @click="wupin(i,xzNum)">加&nbsp;入&nbsp;购&nbsp;物&nbsp;车</button>
          </li>
        </ul>
      </div>
    </div>
    <footer>
      <p v-show="weixuangou">未选购任何商品</p>
      <p v-show="xuangou">￥{{addPrice}}</p>
      <div class="wpNum" v-if="wpNumShow">{{wpNum}}</div>
      <button class="ft-btn" @click="toJieSuan">去结算</button>
    </footer>
    <div class="cd-menu-box" v-for="(v,i) in wpArray" :key="i">
      <span class="wpm">{{v.wpm}}</span>
      <div class="cd-menu-box-rt">
        <span style="margin-right:10px">￥{{v.wpjg * v.count}}</span>
        <span class="jz" @click="reduce(i)">-</span>
        <span>{{v.count}}</span>
        <span class="jz" @click="add(i)">+</span>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "../bus";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "detailPage",
  data() {
    return {
      msg: "这是详细页面",
      dateilId: "",
      dateilImg: "",
      dateilName: "",
      dateilRating: "",
      dateilNum: "",
      dc: true,
      pj: false,
      sj: false,
      food: [],
      foodList: [],
      dcIndex: 0,
      wpNum: 0,
      wpNumzt: false,
      xuangou: false,
      weixuangou: true,
      wpArray: [],
      xzNum: 1,
      addPrice: 0
    };
  },
  methods: {
    msgShow(index) {
      this.dcIndex = index;
    },
    setObject() {
      this.$store.commit("setObject", this.wpArray);
    },
    wupin(index) {
      var wpObject = {
        dateilName: this.dateilName,
        wpm: this.food[this.dcIndex].foods[index].name,
        wpjg: Number(this.food[this.dcIndex].foods[index].lowest_price),
        count: 1
      };
      this.wpNum++;
      this.wpArray = this.wpArray.concat(wpObject);
      if (this.wpNum > 0) {
        this.xuangou = true;
        this.weixuangou = false;
        this.wpNumzt = true;
        this.addPrice += wpObject.wpjg;
      }
      this.setObject();
    },
    PriceEach(str) {
      for (var i = 0; i < this.wpArray.length; i++) {
        return str;
      }
    },
    add(index) {
      this.wpArray[index].count++;
      this.PriceEach((this.addPrice += this.wpArray[index].wpjg));
      this.setObject();
    },
    reduce(index) {
      this.wpArray[index].count--;
      this.PriceEach((this.addPrice -= this.wpArray[index].wpjg));
      if (this.wpArray[index].count < 0) {
        this.wpArray[index].count = 0;
        this.addPrice = 0;
      }
      this.setObject();
    },
    toJieSuan() {
      this.$router.push({ path: "/jiesuan" });
      this.$router.go(0);
    }
  },
  computed: {
    ...mapState(["wpOj"]),
    fdList() {
      return (this.foodList = this.food[this.dcIndex].foods);
    },
    wpNumShow() {
      if (this.wpNum > 0) {
        return (this.wpNumzt = true);
      }
    }
  },
  filters: {
    formatImg(str) {
      if (str.endsWith("png")) {
        return (
          "https://cube.elemecdn.com/" +
          str.slice(0, 1) +
          "/" +
          str.slice(1, 3) +
          "/" +
          str.slice(3) +
          ".png"
        );
      } else {
        return (
          "https://cube.elemecdn.com/" +
          str.slice(0, 1) +
          "/" +
          str.slice(1, 3) +
          "/" +
          str.slice(3) +
          ".jpeg"
        );
      }
    }
  },
  created() {
    this.dateilId = this.$route.query._shopListID;
    this.dateilImg = this.$route.query._shopListImg;
    this.dateilName = this.$route.query._shopListName;
    this.dateilRating = this.$route.query._shopListRating;
    this.dateilNum = this.$route.query._shopListNum;
    this.$http
      .get("/elm/shopping/v2/menu?restaurant_id=" + this.dateilId)
      .then(function(resData) {
        // console.log(resData);
        this.food = resData.body;
        console.log(this.food);
      });
    if (this.wpOj.length > 0) {
      this.wpArray = this.wpOj;
      this.wpNum = this.wpArray.length;
      this.xuangou = true;
      this.weixuangou = false;
      this.wpNumzt = true;
      for (var i = 0; i < this.wpArray.length; i++) {
        this.addPrice += this.wpArray[i].wpjg * this.wpArray[i].count;
      }
    }
    Vue.$emit("ftshow", false);
  }
};
</script>
<style scoped>
.hd-img {
  width: 5rem;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.pjText {
  font-size: 0.75rem;
  color: gray;
}
.pjText li {
  float: left;
  margin-right: 0.9375rem;
}
header {
  margin: 1.875rem;
}
.hd-right {
  width: 50vw;
  float: right;
}
.navigation-box {
  height: 1.75rem;
}
.navigation-box ul li {
  width: calc(100vw / 3);
  float: left;
  text-align: center;
}
.active {
  border-bottom: 2px solid #1296db;
  color: #1296db;
}
.dc-list {
  width: 25vw;
  float: left;
}
.dc-list li {
  height: 3.125rem;
  padding: 0.3125rem;
  overflow: hidden;
  background-color: rgb(244, 244, 244);
}
.dcactive {
  background-color: white !important;
  font-weight: bolder;
}
.dc-rt {
  width: 75vw;
  float: left;
}
.dc-rt-list {
  padding: 0.625rem;
}
.dc-rt-list li {
  margin: 0.625rem 0;
  overflow: auto;
}
.dc-rt-list li img {
  width: 30%;
  float: left;
}
.dc-rt-text {
  width: calc(70% - 0.625rem);
  margin-left: 0.625rem;
  float: left;
}
.gwc-btn {
  padding: 0.3125rem;
  background-color: lightcoral;
  border: 1px solid black;
  float: right;
}
footer {
  height: 1.5625rem;
  padding: 0.625rem 1.5625rem;
  background-color: rgb(72, 72, 72);
  color: gainsboro;
}
footer p {
  float: left;
  margin-right: 0.625rem;
}
footer .wpNum {
  width: 1.25rem;
  height: 1.25rem;
  background-color: tomato;
  border-radius: 50%;
  float: left;
  text-align: center;
  line-height: 1.25rem;
}
.ft-btn {
  width: 20vw;
  height: 2.8125rem;
  color: white;
  background-color: rgb(97, 201, 97);
  position: absolute;
  right: 3.125rem;
  top: 0;
  font-size: 1rem;
}
.cd-menu-box {
  padding: 0.9375rem 1.25rem;
}
.cd-menu-box-rt {
  float: right;
}
.cd-menu-box-rt .jz {
  display: inline-block;
  width: 0.9375rem;
  height: 0.9375rem;
  line-height: 0.9375rem;
  text-align: center;
  border: 1px solid #1296db;
  border-radius: 50%;
}
.cdMenu-enter-active {
  animation: menuIn 1s linear 1;
}
.cdMenu-leave-active {
  animation: menuOut 1s linear 1;
}
</style>