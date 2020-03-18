<template>
  <div>
    <nav>
      <img class="dw" src="src/imgs/dingweiweizhi.png" />
      <p class="geographic">{{geographic}}</p>
      <input type="text" placeholder="搜索饿了么商家、商品名称" />
    </nav>
    <div class="category">
      <ul>
        <li>
          <img src="src/imgs/category/a867c870b22bc74c87c348b75528djpeg.webp" alt />
          <p>美食</p>
        </li>
        <li>
          <img src="src/imgs/category/185f7259ebda19e16123884a60ef2jpeg.webp" alt />
          <p>晚餐</p>
        </li>
        <li>
          <img src="src/imgs/category/bceb19258e3264e64fb856722c3c1jpeg.webp" alt />
          <p>代购</p>
        </li>
        <li>
          <img src="src/imgs/category/432619fb21a40b05cd25d11eca02djpeg.webp" alt />
          <p>汉堡披萨</p>
        </li>
        <li>
          <img src="src/imgs/category/696aa5cf9820adada9b11a3d14bf5jpeg.webp" alt />
          <p>甜品饮料</p>
        </li>
      </ul>
      <ul>
        <li>
          <img src="src/imgs/category/314b6da88ab6c7ae9828f91652d40jpeg.webp" alt />
          <p>速食简餐</p>
        </li>
        <li>
          <img src="src/imgs/category/6f2631288a44ec177204e05cbcb93jpeg.webp" alt />
          <p>地方小吃</p>
        </li>
        <li>
          <img src="src/imgs/category/b02bd836411c016935d258b300cfejpeg.webp" alt />
          <p>大牌惠吃</p>
        </li>
        <li>
          <img src="src/imgs/category/7bddb07503aea4b711236348e2632jpeg.webp" alt />
          <p>速食简吃</p>
        </li>
      </ul>
    </div>
    <div class="pztc">
      <section>
        <div class="pztc-left">
          <h4>品牌套餐</h4>
          <p class="pztc-tx2">配套齐全吃得好</p>
          <p class="pztc-href">立即抢购&gt;</p>
        </div>
        <img src="src/imgs/category/df43e7e53f6e1346c3fda0609f1d3png.webp" />
      </section>
    </div>
    <div class="member">
      <div class="menber-content">
        <span>超级会员</span>
        <span>每月领20元红包</span>
        <span>立即开通</span>
      </div>
    </div>
    <div class="tjsj-hd">
      <div class="tjsj-hd-title">推荐商家</div>
    </div>
    <aside class="fifler">
      <ul>
        <li>综合排序</li>
        <li>距离最近</li>
        <li>品质联盟</li>
        <li>筛选</li>
      </ul>
    </aside>
    <main>
    <div class="shoplist" v-for="(v,i) in shopList" :key="i" @click="goDateil(i)">
      <div class="shoplist-left">
        <img :src="v.image_path | formatImg"/>
      </div>
      <!-- {{v.name}}商家名称
      {{v.piecewise_agent_fee.description}}远距离配送费
      {{v.distance}} 距离 显示的是m需要装成km
      月售{{v.recent_order_num}}
      最低起送{{v.float_minimum_order_amount}}
      {{v.order_lead_time}}到达时间分钟
      {{v.rating}} 评分{{v.flavors[0].name}}分类（如：烧烤）
      {{v.activities[0].tips}}活动内容
      {{v.activities[0].icon_color}}活动前缀背景颜色
      {{v.activities[0].icon_name}}活动前缀的字-->
      <div class="shoplist-right">
        <div class="shopName">{{v.name}}</div>
        <div class="xq">
          <p class="rat">
            <span class="rating">{{v.rating}}</span>
            <span>{{v.recent_order_num + "份"}}</span>
          </p>
          <div>
            <span>{{"￥" + v.float_minimum_order_amount}}起送</span> |
            <span>{{v.piecewise_agent_fee.description}}</span>
            <div class="distance">
              <span>{{v.distance | formatDistance}}</span> |
              <span>{{v.order_lead_time + "分钟"}}</span>
            </div>
          </div>
          <p>
            <span class="foodtype" v-for="(flavors,i) in v.flavors" :key="i">{{flavors.name}}</span>
          </p>
          <div class="activity">
            <p  v-for="(value,i) in v.activities" :key="i">
            <span class="act-icon"  :style="'background-color:#'+value.icon_color">{{value.icon_name}}</span>
            <span class="ty">{{value.tips}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      geographic: "",
      shopList: [],
      offset:0,
      limit:20,
    };
  },
  methods:{
    getData(){
      this.$http
        .get(
          "/elm/shopping/restaurants?latitude=31.96205&longitude=118.85778&offset=" + this.offset + "&limit=" + this.limit + "&extras[]=activities&terminal=h5"
        )
        .then(function(resData) {
          // console.log(resData);
          this.offset += this.limit;
          this.shopList = this.shopList.concat(resData.data);
          console.log(this.shopList);
        });
    },
    goDateil(index){
      // var _shopListID = this.shopList[index].brand_id;
      // var _shopListName = this.shopList[index].name;
      // var _shopListRating = this.shopList[index].rating;
      // var _shopListNum = this.shopList[index].recent_order_num;
      var _shopList = {
        _shopListID: this.shopList[index].brand_id,
        _shopListName: this.shopList[index].name,
        _shopListRating: this.shopList[index].rating,
        _shopListNum: this.shopList[index].recent_order_num,
        _shopListImg: this.shopList[index].image_path
      }
      this.$router.push({ path:'/detailPage',query:_shopList });
      this.$router.go(0);
    }
  },
  filters:{
    formatDistance(str){
      if(str >= 1000){
        return (str / 1000).toFixed(2) + "km";
      }
      else{
        return str + "m"
      }
    },
    formatImg(str){
      if(str.endsWith('png')){
        return "https://cube.elemecdn.com/" + str.slice(0,1) + "/" + str.slice(1,3) + "/" + str.slice(3)+ ".png"
      }else{
        return "https://cube.elemecdn.com/" + str.slice(0,1) + "/" + str.slice(1,3) + "/" + str.slice(3)+ ".jpeg"
      }
    }
  },
  created() {
    this.$http.get("/elm/v2/pois/wtstbdt87jb").then(function(resData) {
      this.geographic = resData.body.address;
      console.log(resData.body.address);
    }),
    this.getData();
    window.onscroll = ()=>{
      var scrollTop = document.documentElement.scrollTop;
      var windowHeight = document.documentElement.clientHeight;
      var scrollHeight = document.documentElement.scrollHeight;
      // console.log(scrollTop);
      // console.log(windowHeight);
      // console.log(scrollHeight);
      if(scrollTop + windowHeight == scrollHeight){
        this.getData();
        this.offset = 20;
        window.scrollBy(0,-800)
        // console.log(this.limit);
      }
    }
  }
};
</script>
<style>
nav {
  padding: 0.625rem;
  height: 4.375rem;
  background-color: #1296db;
  position: relative;
}
nav > [type="text"] {
  width: 90%;
  height: 1.875rem;
  position: absolute;
  bottom: 0.6875rem;
  left: calc(50% - 91% / 2);
}
footer .router-link-active .lgimg1 {
  background-image: url(../imgs/changyonglogo40-2.png);
}
.geographic {
  width: 11.375rem;
  height: 1.875rem;
  color: white;
  font-size: 1.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dw {
  width: 1.6875rem;
  float: left;
  margin-top: 5px;
}
.category {
  height: 10.5rem;
  padding: 0 0.625rem;
}
.pztc {
  height: 6.25rem;
  padding: 0 0.625rem;
  position: relative;
}
.pztc-tx2 {
  color: gray;
  font-size: 0.8125rem;
}
.pztc-left {
  margin: 0.3125rem 0.625rem;
}
.pztc-href {
  color: goldenrod;
}
.pztc section {
  width: 100%;
  height: 100%;
  padding: 1px 0;
  background-color: rgb(240, 240, 240);
}
.pztc img {
  width: 7.5rem;
  position: absolute;
  right: 1.875rem;
  top: calc(25% - 30% / 2);
}
ul {
  padding: 0;
  list-style: none;
}
.category li {
  width: 20%;
  float: left;
  box-sizing: border-box;
  text-align: center;
  font-size: 0.75rem;
  margin: 10px 0;
}
.category li img {
  height: 2.5rem;
}
.member {
  height: 2.1875rem;
  padding: 0.625rem;
}
.menber-content {
  width: 100%;
  height: 100%;
  line-height: 2.1875rem;
  background-color: rgb(222, 206, 168);
}
.tjsj-hd {
  text-align: center;
}
.tjsj-hd .tjsj-hd-title::before,
.tjsj-hd .tjsj-hd-title::after {
  width: 0.9375rem;
  height: 1px;
  margin: 0.3125rem;
  background-color: black;
  display: inline-block;
  content: "";
}
.fifler {
  height: 1.875rem;
  line-height: 1.875rem;
}
.fifler li {
  float: left;
  width: 25%;
  text-align: center;
  font-size: 0.75rem;
}
.shoplist {
  padding: .625rem;
  margin: .625rem 0;
  overflow: hidden;
}
.shoplist:nth-of-type(1){
  margin-top: 0px;
}
.shopName {
  font-weight: bolder;
}
.rat span {
  margin: 0.625rem;
}
.xq {
  font-size: 0.6875rem;
  font-weight: 200;
}
.foodtype {
  margin: 0.3125rem;
}
.shoplist .shoplist-left{
  width: 20%;
  height: 100%;
  float: left;
}
.shoplist-left img{
  width: 85%;
}
.shoplist .shoplist-right {
  float:left;
  width: 80%;
  margin-bottom: .9375rem;
}
.distance {
  float: right;
}
.activity {
  margin-top: 0.9375rem;
}
.activity p{
  display: block;
  width: 300px;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.act-icon{
  /* width: .3125rem;
  height: .3125rem; */
  color: white;
  display: inline-block;
  margin-right: .3125rem;
}
</style>