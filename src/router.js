import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/Home";
import Scatter from "./components/Scatter";
import Order from "./components/Order";
import Arithmetic from "./components/Arithmetic";
import Save from "./components/Save";
import DataBase from "./components/DataBase";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path:'/database',
          component:DataBase
        },
        {
          path:'/scatter',
          component:Scatter
        },
        {
          path:'/order',
          component:Order
        },
        {
          path:'/arithmetic',
          component:Arithmetic
        },
        {
          path:'/save',
          component:Save
        },
      ]
    }
  ]
})
