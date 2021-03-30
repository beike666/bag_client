<template xmlns="http://www.w3.org/1999/html">
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
        <el-form inline ref="queryFormRef" :model="queryForm" :rules="queryFormRule" label-width="140px">
            <el-form-item label="我要求解" prop="fileName">
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
            <el-form-item label="组数据的最优解"></el-form-item>
            <el-form-item label="，将要使用" prop="type">
                <el-select v-model="queryForm.type" placeholder="请选择">
                    <el-option
                            v-for="item in types"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="，并将结果另存为" prop="fileType">
                <el-select v-model="queryForm.fileType" placeholder="请选择">
                    <el-option
                            v-for="item in fileType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件"></el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryData">请求数据</el-button>
            </el-form-item>
        </el-form>
        <!--        结果-->
        <el-card class="box-card">
            <div v-if="isVisible">
                <p>
                    求得的最优解是: <span class="sign">{{answer}}</span>
                </p>
                <p>
                    求解时间是: <span class="sign">{{runtime}}s</span>
                </p>
            </div>

        </el-card>
    </div>
</template>

<script>
  export default {
    name: "Save",
    data(){
      return{
        requirement:"任务要求：用户能够自主选择动态规划算法、回溯算法求解指定D{0-1} KP数据的最优解和求解时间（以秒为单位）",
        warning:'第二、三、四个文件只有10组项集，请勿选择第11组',
        queryForm:{
          // 哪个文件
          fileName:'',
          // 第几组
          group:null,
          // 算法类型
          type:null,
          // 保存什么文件
          fileType:null
        },
        // 验证规则
        queryFormRule:{
          fileName:[
            {required:true,message:'请选择文件名',trigger:'blur'}
          ],
          group:[
            {required:true,message:'请选择第几组数据',trigger:'blur'}
          ],
          type:[
            {required:true,message:'请选择算法类型',trigger:'blur'}
          ],
          fileType:[
            {required:true,message:'请选择保存文件类型',trigger:'blur'}
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
        // 算法类型
        types:[
          {
            value: 0,
            label: '动态规划算法'
          },
          {
            value: 1,
            label: '回溯算法'
          }
        ],
        // 保存文件类型
        fileType:[
          {
            value: '.txt',
                label: '.txt'
          },
          {
            value: '.xlsx',
                label: '.xlsx'
          }
        ],
        // 结果是否可见
        isVisible:false,
        // 最优解
        answer:0,
        // 运行时间
        runtime:0
      }
    },
    methods:{
      // 请求数据
      queryData(){
        this.$refs.queryFormRef.validate(valid=>{
          if(!valid){
            return this.$message.warning("请先完善请求数据");
          }
          this.$http.post("/get/answer/save",this.queryForm).then(res=>{
            if(res.data.status==201){
              return this.$message.warning("暂无数据");
              this.isVisible=false;
            }
            if(res.data.status==202){
              this.isVisible=false;
              return this.$message.error("抱歉，您的选择数据非法，请认真阅读页头警告！");
            }
            console.log(res.data)
            this.answer=res.data.answer;
            this.runtime=res.data.runtime;
            this.isVisible=true;
            this.$message.success("获取成功");
            this.$http.get(res.data.downUrl,{responseType:'blob'}).then(res=>{
              let content=res.data;
              let eleLink = document.createElement("a");
              eleLink.download=new Date().toLocaleString()+this.queryForm.fileType;
              eleLink.style.display='none';
              // 把字符串地址转成blob地址
              let blob=new Blob([content]);
              eleLink.href=URL.createObjectURL(blob);
              // 把链接地址传到document里
              document.body.appendChild(eleLink);
              // 触发点击
              eleLink.click();
              // 然后移除这个新加的控件
              document.body.removeChild(eleLink);
            })
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
    .sign{
        color: red;
        font-size: 20px;
    }

</style>

