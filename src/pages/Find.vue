<template>
  <div>
    <header class="find-hd">
      <div v-for="(v,i) in hdHeader[1]" :key="i">
        <div class="hd-box-title">
          <p>
            <span class="hd-title" :style="'color:' + v.title_color">{{v.title}}</span>
          </p>
          <p class="p-sub">
            <span class="subtitle">{{v.subtitle}}</span>
          </p>
        </div>
        <div class="hd-box-img">
          <img :class="'hd-img' + v.id" :src="v.main_pic_hash | formatImg" />
        </div>
      </div>
    </header>
    <section class="find">
      <div class="activity-header">
        <span>限时好礼</span>
        <p class="act-header-title">金币换好礼</p>
      </div>
      <div class="activity-happ">
        <ul>
          <li class="activity-list" v-for="(v,i) in activety" :key="i">
            <span class="corner_marker">{{v.corner_marker}}</span>
            <img :src="v.image_hash | formatImg" alt />
            <p class="activity-list-title">{{v.title}}</p>
            <p><span class="points_required">{{v.points_required}}金币</span>
            <s class="original_price">￥{{v.original_price}}</s>
            </p>
            <!-- {{v.corner_marker}}小标签，限时优惠...
            {{v.image_hash}}图片
            {{v.title}} 商品主题 三元品质联盟红包....
            {{v.original_price}}原价
            {{v.points_required}}金币数-->
          </li>
        </ul>
      </div>
      <div class="activity-more">查看更多&gt;</div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Find",
  data() {
    return {
      hdHeader: "",
      activety: ""
    };
  },
  created() {
    this.$http
      .get("/elm/member/v1/discover?platform=2&block_index=0")
      .then(function(resData) {
        // console.log(resData.data);
        this.hdHeader = resData.data;
        console.log(this.hdHeader[1]);
      });
    this.$http.get("/elm/member/gifts/suggest").then(function(resData) {
      // console.log(resData.data);
      this.activety = resData.data;
      console.log(this.activety);
    });
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
  }
};
</script>

<style>
footer .router-link-active .lgimg2 {
  background-image: url(../imgs/faxian-2.png);
}
.find-hd {
  padding: .625rem;
  height: 8.75rem;
  background-color: white;
}
.find-hd > div {
  width: 50%;
  height: 50%;
  float: left;
}
.find-hd > div:nth-of-type(3) {
  float: right;
}
.hd-box-title {
  width: 55%;
  padding: 0.625rem;
  float: left;
}
.subtitle {
  color: gray;
  font-size: 0.75rem;
}
.hd-box-img:nth-of-type(1) img{
  width: 1.875rem;

}
.p-sub {
  position: relative;
  top: -0.4375rem;
}
.hd-box-img img{
  width: 30%;
}
.hd-box-img{
  position: relative;
}
.hd-box-img .hd-img6{
  width: 5rem;
  position: absolute;
  right: .625rem;
  top: 3.75rem;
}
.activity-happ{
  overflow: hidden;
}
section.find {
  margin-top: 0.625rem;
  background-color: white;
  overflow: hidden;
}
.activity-header {
  padding: 0.5rem 0;
  text-align: center;
  font-weight: bolder;
  color: rgb(41, 41, 41);
}
.activity-header > span::before,
.activity-header > span::after {
  width: 0.625rem;
  height: 1px;
  display: inline-block;
  content: "";
  background-color: black;
  margin: 0.3125rem;
}
.act-header-title {
  font-size: 10px;
  color: rgb(181, 181, 181);
  font-weight: 100;
  position: relative;
  top: -0.1875rem;
}
ul {
  padding: 0px;
  list-style: none;
}
.activity-list {
  width: 33%;
  float: left;
  margin: .1875rem 0;
  text-align: center;
}
.corner_marker {
  font-size: 0.625rem;
  background-color: rgb(41, 41, 41);
  color: gainsboro;
  padding: 0.125rem;
  position: relative;
  left: -1.25rem;
}
.activity-list img {
  width: 100%;
}
.activity-list-title {
  font-size: 0.6875rem;
  color: rgb(80, 80, 80);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.points_required{
  font-size: .8125rem;
  color: rgb(199, 73, 73);
  position: relative;
  left: -.8125rem;
}
.original_price{
  font-size: .625rem;
  color: rgb(133, 130, 130);
  position: relative;
  left: -.9375rem;
  top: -.125rem;
}
.activity-more{
  margin-top: 1.875rem;
  color: rgb(133, 130, 130);
  text-align: center;
  font-size: .875rem;
  font-weight: 200;
}
</style>