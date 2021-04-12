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
        <el-card class="box-card">
            <el-row :gutter="50">
                <el-col :span="10" class="constraint">
                    <p>
                        <el-tag type="success">问题描述：</el-tag>
                        &nbsp;&nbsp;D{0-1}KP数据集由一组项集组成，每个项集有3项物品可供背包装入选择，其中第三项价值是前两项之和，第三项的重量小于其他两项之和，算法求解过程中，如果选择了某个项集，则需要确定选择项集的哪个物品，每个项集的三个项中至多有一个可以被选择装入背包，D{0-1} KP问题要求计算在不超过背包载重量 的条件下，从给定的一组项集中选择满足要求装入背包的项，使得装入背包所有项的价值系数之和达到最大；
                        <span class="viewCode" @click="drawer = true">查看示例代码</span>
                    </p>
                    <p>
                        <el-tag type="danger">输入：</el-tag>&nbsp;&nbsp;价值字符串 重量字符串 容量
                    </p>
                    <p>
                        <span style="color: red;margin-left: 20px">例如:</span>&nbsp;&nbsp;408,921,1329 1098,1196,204 10149
                    </p>
                    <p>
                        <el-tag type="warning">输出：</el-tag>&nbsp;&nbsp;最大价值
                    </p>
                    <p>
                        <span style="color: red;margin-left: 20px">例如:</span>&nbsp;&nbsp;10453
                    </p>
                </el-col>
             <el-col :span="10" >
                 <el-upload
                         class="upload-demo"
                         drag
                         :action="codeUploadUrl"
                         :before-upload="beforeCodeUpload"
                         :on-success="handleCodeUploadSuccess">
                     <i class="el-icon-upload"></i>
                     <div class="el-upload__text">将您的代码文件拖到此处，或<em>点击上传</em></div>
                     <div slot="tip">
                         <el-alert
                                 title="只能上传java代码文件"
                                 type="warning"
                                 show-icon>
                         </el-alert>
                     </div>
                 </el-upload>
             </el-col>
            </el-row>
            <el-row :gutter="10" style="margin-top: 20px">
             <el-col :offset="3">
                 <!--        请求表单-->
                 <el-form style="margin-top: 15px" inline ref="queryFormRef" :model="queryForm" :rules="queryFormRule" label-width="110px">
                     <el-form-item label="我要测试" prop="fileName">
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
             </el-col>
            </el-row>
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

        </el-card>
<!--        示例代码区域-->
        <el-drawer
                title="示例代码"
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose">
            <codemirror v-model="content" :options="options"></codemirror>
        </el-drawer>



    </div>
</template>

<script>
  import {codemirror} from 'vue-codemirror'
  import 'codemirror/lib/codemirror.css'
  // 引入主题,配置后生效
  import 'codemirror/theme/rubyblue.css'
  // 引入java语言
  //引入语言,配置后生效
  import 'codemirror/mode/sql/sql.js'
  export default {
    name: "CodeTest",
    components: {
      codemirror
    },
    data(){
      return{
        requirement:"任务要求：平台可动态嵌入任何一个有效的D{0-1}KP 实例求解算法，并保存算法实验日志数据",
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
        // 代码上传的路径
        codeUploadUrl:"http://127.0.0.1:8088/code/file/upload",
        // 结果区域是否显示
        isVisible:false,
        // 最优解
        answer:0,
        // 运行时间
        runtime:0,
        // 示例代码区域是否显示
        drawer:false,
        // 示例区域的展开方向
        direction: 'rtl',
        //需编辑和显示的内容
        content: 'import java.util.ArrayList;\n' +
            'import java.util.List;\n' +
            '\n' +
            '\n' +
            'public class DynamicProgram {\n' +
            '\n' +
            '    public static void main(String[] args) {\n' +
            '        ArrayList<Integer> profitList = new ArrayList<>();\n' +
            '        ArrayList<Integer> weightList = new ArrayList<>();\n' +
            '        String[] split = args[0].split(",");\n' +
            '        for (String s : split) {\n' +
            '            profitList.add(Integer.parseInt(s));\n' +
            '        }\n' +
            '        String[] split1 = args[1].split(",");\n' +
            '        for (String s : split1) {\n' +
            '            weightList.add(Integer.parseInt(s));\n' +
            '        }\n' +
            '        Integer volume=Integer.parseInt(args[2]);\n' +
            '        int ret=dp(profitList,weightList,volume);\n' +
            '        System.out.println(ret);\n' +
            '\n' +
            '    }\n' +
            '\n' +
            '\n' +
            '    public static int dp(ArrayList<Integer> profitList, ArrayList<Integer> weightList, Integer currentVolume) {\n' +
            '\n' +
            '        int N=profitList.size()/3;\n' +
            '\n' +
            '        int S=3;\n' +
            '        int[][] p = new int[N+1][S];\n' +
            '        int[][] w = new int[N+1][S];\n' +
            '\n' +
            '        int index=0;\n' +
            '        for (int i = 1; i <= N; i++) {\n' +
            '            List<Integer> pi = profitList.subList(index, index + 3);\n' +
            '            int[] pa = pi.stream().mapToInt(Integer::intValue).toArray();\n' +
            '            p[i]=pa;\n' +
            '            List<Integer> wi = weightList.subList(index, index + 3);\n' +
            '            int[] wa = wi.stream().mapToInt(Integer::intValue).toArray();\n' +
            '            w[i]=wa;\n' +
            '            index=index+3;\n' +
            '        }\n' +
            '\n' +
            '        int[] dp = new int[currentVolume+1];\n' +
            '        for (int i = 1; i <= N; i++) {\n' +
            '            for (int j = currentVolume; j >= 0; j--) {\n' +
            '                for (int k = 0; k < 3; k++) {\n' +
            '                    if(j>=w[i][k]) {\n' +
            '                        dp[j] = Math.max(dp[j], dp[j - w[i][k]] + p[i][k]);\n' +
            '                    }\n' +
            '                }\n' +
            '            }\n' +
            '        }\n' +
            '        return dp[currentVolume];\n' +
            '\n' +
            '    }\n' +
            '}\n',
        // 默认配置
        options: {
          tabSize: 2, // 缩进格式
          theme: 'rubyblue', // 指定主题，对应主题库 JS 需要提前引入
          lineNumbers: true, // 是否显示行号
          //指定语言类型,如果需要编辑和显示其他语言,需要import语言js然后修改此配置
          mode: 'sql',
          line: true,
          styleActiveLine: true, // 高亮选中行
          //是否为只读,如果为"nocursor" 不仅仅为只读 连光标都无法在区域聚焦
          readOnly: true,
          hintOptions: {
            completeSingle: true // 当匹配只有一项的时候是否自动补全
          }
        },
      }
    },
    methods:{
      // 代码上传之前文件类型的检查
      beforeCodeUpload: function (file) {
        const fileName = file.name;
        const arr=fileName.split(".");
        let suffix = arr[arr.length-1];
        console.log(suffix)
        const isJava = suffix === 'java';

        if (!isJava) {
          this.$message.error('上传代码文件只能是java文件!');
        }
        return isJava;
      },
      // 代码上传成功以后
      handleCodeUploadSuccess(res,file){
        if(res.status!=200){
          return this.$message.error("上传失败");
        }
        this.$message.success("上传成功");
      },
      // 请求数据
      queryData(){
        this.$refs.queryFormRef.validate(valid=> {
          if(!valid){
            return this.$message.warning("请先完善请求数据");
          }
          this.$http.post("code/submit/test", this.queryForm).then(res => {
            if (res.data.status == 202) {
              return this.$message.warning("抱歉，您的选择数据非法，请认真阅读页头警告！");
            }
            if (res.data.status == 201) {
              return this.$message.warning("你的代码运行异常");
            }
            this.answer=res.data.answer;
            this.runtime=res.data.runTime/1000.0;
            this.isVisible=true;
            this.$message.success("请求成功");
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
      },
      // 势力区域关闭方法
      handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
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
.el-upload-dragger{
    width: 620px !important;
    height: 330px !important;
    border: 4px dashed #d9d9d9 !important;
}
.el-upload-dragger:hover {
    border-color: #409EFF !important;
}
.constraint{
    /*border: 2px solid red;*/
    margin-left: 30px;
    font-size: 14px;
    color: #333;
    line-height: 1.8;
}
.el-upload-dragger .el-icon-upload{
    margin: 100px 0px 16px !important;
}
.viewCode{
    color: red;
    font-size: 12px;
    font-style: italic;
}
.viewCode:hover{
    cursor: pointer;
}
.CodeMirror{
    font-size: 15px !important;
    height: 600px !important;
}
.el-drawer.rtl{
    width: 40% !important;
}
</style>
