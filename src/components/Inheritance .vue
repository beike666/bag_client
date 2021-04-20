<template>
    <div class="contain">
        <!--        任务要求-->
        <el-alert
                :title="requirement"
                type="info"
                show-icon>
        </el-alert>
        <el-alert
                :title="warning"
                type="warning"
                show-icon
                style="margin-top: 15px">
        </el-alert>
        <el-alert
                :title="title"
                type="success"
                show-icon
                style="margin-top: 15px">
        </el-alert>

        <el-card class="box-card">
            <a class="btn btn-info bg-sm" :href="downUrl" type="primary" size="mini">下载算法</a>
        </el-card>

    </div>
</template>

<script>
  export default {
    name: "Inheritance",
    data(){
      return{
        requirement:"任务要求：查阅资料，设计遗传算法求解D{0-1}KP，并利用此算法测试要求（3）；",
        warning:'第二、三、四个文件只有10组项集，请勿选择第11组',
        title:"下载完成以后去代码测试模块进行算法测试",
        downUrl:'http://localhost:8088/code/base/GasolvePackage.java'
      }
    },
    methods:{

    }
  }
</script>

<style>

</style>

