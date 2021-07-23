import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "../App.vue"
import IsDone from "../components/IsDone.vue"
import Undone from "../components/UnDone.vue"
Vue.use(VueRouter)

const routes = [{
  path: "/",
  default: "/",
  component: App,
  name: 'app'
}, {
  path: "/isDone",
  component: IsDone,
  name: 'isDone'
},{
  path: "/unDone",
  component: Undone,
  name: "unDone"
}]

const router = new VueRouter({
  routes
})

export default router