<template>
  <div>
    <section class="qy">
      <img src="../imgs/bbe5984003cb26fc7b445a4a15195png.png" alt />
      <p class="tx1">近三个月无外卖记录</p>
      <p class="tx2">查看三个月前的外卖订单</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "OrderForm"
};
</script>

<style>
footer .router-link-active .lgimg3 {
  background-image: url(../imgs/tongchengicon_dingdan-kong-2.png);
}
.qy {
  margin-top: 6.25rem;
  text-align: center;
}
section img {
  width: 9.375rem;
}
.tx1 {
  color: lightslategray;
}
.tx2 {
  font-size: 0.625rem;
  color: gray;
}
</style>