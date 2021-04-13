<template>
    <div class="contain">
<!--        任务要求-->
        <el-alert
                :title="requirement"
                type="info"
                show-icon>
        </el-alert>
        <el-card class="box-card">
            <el-button type="primary" @click="insert">一键存储所有文件</el-button>

            <el-button type="danger" @click="remove">一键清空数据库</el-button>
        </el-card>



    </div>
</template>

<script>
  export default {
    name: "DataBase",
    data(){
      return{
        requirement:"任务要求：将数据存储到数据库",
      }
    },
    methods:{
      // 存储数据到数据库
      insert(){
        this.$http.get("database/data/insert").then(res=>{
          if(res.data.status!=200){
            return this.$message.warning("已存储，无需再次点击");
          }
          this.$message.success("存储成功");
        }).catch(res=>{
          console.log(res)
        })
      },

      // 清空数据库
      remove(){
        this.$confirm('此操作将清空数据库, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get("database/data/remove").then(res=>{
            if(res.data.status!=200){
              return this.$message.warning("已清空，无需再次点击");
            }
            this.$message.success("成功清空");
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
  }
</script>

<style>
.el-form{
    margin: 15px;
}
.el-form-item__label{
    text-align: left !important;
}
.box-card{
    margin-top: 15px;
}
</style>
