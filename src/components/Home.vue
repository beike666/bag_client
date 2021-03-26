<template>
    <el-container class="home-container">
        <!--        头部-->
        <el-header>
            <div>
                <img src="../assets/image/logo.jpg" alt="">
                <span>软件工程个人项目-D{0-1}背包问题</span>
            </div>
            <el-button>常龙龙</el-button>
        </el-header>
        <el-container>
            <!--            左侧导航-->
            <el-aside :width="isCollapse?'64px':'200px'">
                <!--                折叠按钮-->
                <div class="toggle-button"><i :class="isCollapse?'el-icon-caret-right':'el-icon-caret-left'" @click="toggleCollapse"></i></div>
                <el-menu
                        :default-active="activePath"
                        class="el-menu-vertical-demo"
                        background-color="#333744"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        :unique-opened="true"
                        router>
                    <el-menu-item index="scatter" @click="saveActivePath('scatter')">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">一、数据散点图</span>
                    </el-menu-item>
                    <el-menu-item index="order" @click="saveActivePath('order')">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">二、数据排序</span>
                    </el-menu-item>
                    <el-menu-item index="arithmetic" @click="saveActivePath('arithmetic')">
                        <i class="el-icon-data-line"></i>
                        <span slot="title">三、算法求解</span>
                    </el-menu-item>
                    <el-menu-item index="save" @click="saveActivePath('save')">
                        <i class="el-icon-data-line"></i>
                        <span slot="title">四、结果文件存储</span>
                    </el-menu-item>

                </el-menu>
            </el-aside>
            <!--            右侧区域-->
            <el-main>
                <!--                路由定位-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return{
        // 侧边栏是否显示的变量
        isCollapse:false,
        // 默认激活的菜单项
        activePath:''
      }
    },
    methods:{
      // 折叠与显示侧边栏
      toggleCollapse(){
        this.isCollapse=!this.isCollapse;
      },
      // 保存当前激活的菜单项
      saveActivePath(activePath){
        window.sessionStorage.setItem("activePath",activePath);
        this.activePath=activePath;
      }
    },
    created () {
      this.activePath=window.sessionStorage.getItem("activePath");
    }
  }
</script>

<style lang="less" scoped>
    .home-container{
        height: 100%;
    }
    .el-header{
        background: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 20px;
        > div{
            display: flex;
            align-items: center;
            > img{
                width:50px;
                height: 50px;
                border-radius: 50%;
            }
            > span{
                margin-left: 15px;
            }
        }
    }
    .el-aside{
        background: #333744;
        .el-menu{
            border-right:0;
        }
    }
    .toggle-button{
        background-color: #4a5064;
        color: #fff;
        font-size: 15px;
        cursor:pointer;
        line-height: 24px;
        text-align: center;
    }
    .el-main{
        background: #eaedfa;
    }
</style>
