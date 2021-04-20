<template>
    <div class="contain">

        <el-card class="box-card">
            <!--        任务要求-->
            <el-alert
                    :title="requirement"
                    type="info"
                    show-icon>
            </el-alert>
            <el-row :gutter="10" style="margin-top: 15px">
                <el-col :span="6">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable>
                        <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <el-table
                    :data="dataList"
                    style="width: 100%;margin-top: 15px">
                <el-table-column
                        type="index"
                        label="#">
                </el-table-column>
                <el-table-column
                        prop="volume"
                        label="数据"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="team"
                        label="第几组">
                    <template slot-scope="scope">
                        <el-button type="success" plain>第{{scope.row.team}}组</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="哪个文件"
                        label="file">
                    <template slot-scope="scope">
                        <el-tag type="" v-if="scope.row.file==='idkp1-10.txt'" effect="dark">idkp1-10.txt</el-tag>
                        <el-tag type="success" v-if="scope.row.file==='sdkp1-10.txt'" effect="dark">sdkp1-10.txt</el-tag>
                        <el-tag type="info" v-if="scope.row.file==='udkp1-10.txt'" effect="dark">udkp1-10.txt</el-tag>

                        <el-tag type="warning" v-if="scope.row.file==='wdkp1-10.txt'" effect="dark">wdkp1-10.txt</el-tag>
                    </template>
                </el-table-column>
            </el-table>
            <!--            分页-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-sizes="[5, 6, 7, 8]"
                    :page-size="queryInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>

        </el-card>

    </div>
</template>

<script>
  export default {
    name: "Volume",
    data(){
      return{
        requirement:"volume表数据的展示",
        queryInfo:{
          query:'',
          pageNum:1,
          pageSize:5
        },
        dataList:[],
        // 数据总数
        total:0,
      }
    },
    created() {
      this.getData();
    },
    methods:{
      // 获取数据
      getData(){
        this.$http.get("volume/getAllData",{
          params:{
            pageNum:this.queryInfo.pageNum,
            pageSize:this.queryInfo.pageSize,
            query:this.queryInfo.query,
          }
        }).then(res=>{
          if(res.data.status!=200){
            return this.$message.error("获取数据失败");
          }
          // console.log(res.data);
          this.dataList=res.data.data;
          this.total=res.data.total;
        })
      },
      // 当分页大小改变时
      handleSizeChange(newSize){
        this.queryInfo.pageSize=newSize;
        this.getData();
      },
      // 当页码发生改变时
      handleCurrentChange(newPage){
        this.queryInfo.pageNum=newPage;
        this.getData();
      },
    }
  }
</script>

<style>

</style>
