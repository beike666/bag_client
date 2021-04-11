<template>
    <div class="container">
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
        <!--        请求表单-->
        <el-form inline ref="queryFormRef" :model="queryForm" :rules="queryFormRule" label-width="110px">
            <el-form-item label="我要请求" prop="fileName">
                <el-select v-model="queryForm.fileName" placeholder="请选择">
                    <el-option
                            v-for="item in fileNames"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="这个文件中第" prop="group">
                <el-select v-model="queryForm.group" placeholder="请选择">
                    <el-option
                            v-for="item in groups"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组的数据"></el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryData">请求数据</el-button>
            </el-form-item>
        </el-form>
<!--        排序结果-->
        <el-card class="box-card">
            <el-table
                    :data="orderData"
                    style="width: 100%">
                <el-table-column
                        label="#"
                        type="index">
                </el-table-column>
                <el-table-column
                        prop="item"
                        label="项集"
                        width="300">
                    <template slot-scope="scope">
                        <el-row :gutter="10">
                         <el-col :span="6" v-for="(item1,index) in scope.row.item" :key="index">
                             <p><el-tag type="success">{{item1.profit}}</el-tag></p>
                             <hr>
                             <p><el-tag type="danger">{{item1.weight}}</el-tag></p>
                         </el-col>
                        </el-row>

                    </template>
                </el-table-column>
                <el-table-column
                        prop="rate"
                        label="项集第三项的价值:重量比">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "Scatter",
    data(){
      return{
        requirement:"任务要求：能够对一组D{0-1}KP数据按项集第三项的价值:重量比进行非递增排序",
        warning:'第二、三、四个文件只有10组项集，请勿选择第11组',
        queryForm:{
          // 哪个文件
          fileName:'',
          // 第几组
          group:null
        },
        // 验证规则
        queryFormRule:{
          fileName:[
            {required:true,message:'请选择文件名',trigger:'blur'}
          ],
          group:[
            {required:true,message:'请选择第几组数据',trigger:'blur'}
          ]
        },
        // 文件名称列表
        fileNames:[
          {
            value: 'idkp1-10.txt',
            label: 'idkp1-10.txt'
          }, {
            value: 'sdkp1-10.txt',
            label: 'sdkp1-10.txt'
          }, {
            value: 'udkp1-10.txt',
            label: 'udkp1-10.txt'
          }, {
            value: 'wdkp1-10.txt',
            label: 'wdkp1-10.txt'
          }
        ],
        // 每个文件都有多少组
        groups:[
          {
            value: 1,
            label: '1'
          },
          {
            value: 2,
            label: '2'
          },
          {
            value: 3,
            label: '3'
          },
          {
            value: 4,
            label: '4'
          },
          {
            value: 5,
            label: '5'
          },
          {
            value: 6,
            label: '6'
          },
          {
            value: 7,
            label: '7'
          },
          {
            value: 8,
            label: '8'
          },
          {
            value: 9,
            label: '9'
          },
          {
            value: 10,
            label: '10'
          },
          {
            value: 11,
            label: '11'
          }
        ],
        // 散点数据
        orderData:[]
      }
    },
    methods:{
      // 请求排序数据
      queryData(){
        this.$refs.queryFormRef.validate(valid=>{
          if(!valid){
            return this.$message.warning("请先完善请求数据");
          }
          this.$http.post("order",this.queryForm).then(res=>{
            if(res.data.status==201){
              return this.$message.warning("数据库为空，请先存储数据");
            }
            if(res.data.status==202){
              this.orderData=[]
              return this.$message.error("抱歉，您的选择数据非法，请认真阅读页头警告！");
            }
            if(res.data.status==203){
              return this.$message.warning("暂无数据");
            }
            this.orderData=res.data.data;
            this.$message.success("获取成功");
          })
        })
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

</style>

