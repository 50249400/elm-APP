import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    wpOj : JSON.parse(sessionStorage.getItem("shopList")),
}
const mutations = {
    setObject(state,step){
        sessionStorage.setItem("shopList",JSON.stringify(step));
    }
}
const actions = {
    setObject(context){
        context.commit("setObject");
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions
})