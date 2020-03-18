<template>
  <div>
    <header>
      <span class="hd"></span>
      <div class="user">
          <h1>casnvlacxz</h1>
          <div class="phone">15959***3118</div>
      </div>
      <span class="rt-icon">&gt;</span>
    </header>
    <div class="wallet">
      <ul>
        <li>
          <p>
            <span class="four-in four">4</span>
            <span class="four">个</span>
          </p>
          <span>红包</span>
        </li>
        <li>
          <p>
            <span class="gr-in gr">170</span>
            <span class="gr">个</span>
          </p>
          <span>金币</span>
        </li>
      </ul>
    </div>
    <group>
      <cell title="我的地址" :is-link="true"></cell>
    </group>
    <group>
      <cell title="金币商城" :is-link="true"></cell>
      <cell title="分享拿20元现金" :is-link="true"></cell>
    </group>
    <group>
      <cell title="我的客服" :is-link="true"></cell>
      <cell title="下载饿了么App" :is-link="true"></cell>
      <cell title="规则中心" :is-link="true"></cell>
    </group>
    <p class="privacy"><a href="">隐私规则</a></p>
  </div>
</template>

<script>
import { Group, Cell } from "vux";
export default {
  name: "Mine",
  components: {
    Group,
    Cell
  }
};
</script>

<style>
footer .router-link-active .lgimg4 {
  background-image: url(../imgs/wodedangxuan.png);
}
header {
  background-color: #1296db;
  height: 6.25rem;
  padding: 10px 20px;
  position: relative;
}
.hd {
  width: 3.375rem;
  height: 3.375rem;
  background-image: url(../imgs/hd.png);
  background-position: 0px 0px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
  position: absolute;
  top: calc(50% - 3.375rem / 2)
}
header .user,
.rt-icon {
  float: left;
  font-size: 0.8rem;
  color: white;
}
.user{
  position: absolute;
  top: calc(50% - 76px / 2);
  left: 5.25rem;
}
.rt-icon {
  position: absolute;
  right: .9375rem;
  top: calc(50% - 32px / 2);
}
ul {
  padding: 0px;
  list-style: none;
}
.wallet{
    height: 6.25rem
}
.wallet ul li {
  width: 50%;
  float: left;
  height: 6.25rem;
  box-sizing: border-box;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.wallet li:nth-of-type(1) {
  border-right: 1px solid gainsboro;
}
.four {
  color: red;
}
.four-in,
.gr-in {
  font-size: 1.5625rem;
}
.gr {
  color: yellowgreen;
}
.privacy{
    margin: 20px;
    text-align: center;
    color: #1296db;
}
</style>