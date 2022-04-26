<template xmlns:el-col="http://www.w3.org/1999/html">

        <!-- 这个10就是让行距变小大概, 默认160   -->
        <div>
            <el-row class="me-row" :gutter="20" type="flex" align="middle" style="margin-top: 100px">
                <el-col :span="5" :offset="0">
                    <div class="left-nav">
                        <!--          这里我加了hover,  颜色选的丑的一批, 后面诺, 交给你了, 加油奥里给
                                      对了click也可以加, 然后效果什么的都可以调 什么鼠标变手 阴影之类的

                        -->
                        <ul class="left-nav-list">
                            <li>
                                <div class="nav-button" @click="toMePage()">
                                    <div class="text text2" style="margin-top: 25px" @click="toMePage()">
                                        <p style="margin: 8px auto" @click="toMePage()">Personal</p>
                                        <p style="margin: 8px auto" @click="toMePage()">Information</p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div class="nav-button" style="line-height: 100px">
                                    <!--                line height = height 居中-->
                                    <div class="text text2">
                                        <p style="margin: 0 auto">My Post list</p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div class="nav-button" style="line-height: 100px">
                                    <div class="text text2">
                                        <p style="margin: 0 auto">Liked History</p>
                                    </div>
                                </div>
                            </li>

                            <li>
                                <div class="nav-button">
                                    <div class="text text2" style="margin-top: 25px">
                                        <p style="margin: 8px auto">Commented</p>
                                        <p style="margin: 8px auto">History</p>
                                    </div>
                                </div>
                            </li>

                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia-->
                          <li><div class="nav-button" style="line-height: 100px">
                            <div class="text2" >
                              <p @click="toReset()" style="margin: 0 auto">Reset</p>
                            </div>
                          </div>
                          </li>
                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-->
                          <!--!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang-->

                        </ul>
                    </div>
                </el-col>



                <el-col :span="18" :offset="3" style="line-height: 10px">
                    <!--下面就是v-for  便利取出并将post的信息赋予每个小card2   有几个post对象, 生成几个card2-->
                    <div class="grid-content bg-purple" v-for="post in tableData.slice((pageNumber-1)*pageSize, pageNumber * pageSize)" style="margin-bottom: 30px" >
                        <!-- 第一个div, 将一个card分为上下两部分, 这里是头像加名字-->
                        <div>
                            <!--row内居中-->
                            <el-row class="card22" style="margin-bottom: 0;" type="flex" align="middle" justify="start">

                                <!--头像-->
                                <el-col :span="5" class="pic-name" style="text-align: right" >
                                    <!--                 上方设置右对齐 -->
                                    <el-avatar :src="riden"  ></el-avatar>
                                </el-col>
                                <!-- 名字-->
                                <el-col :span="2" style="margin-left: 2px">
                                    <div class = "username">
                                        <h4>
                                            {{post.writerName}}
                                        </h4>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                        <div class="card" >
                            <el-row type="flex" align="middle">
                                <el-col :span="18" style="text-align: left">
                                    <div class = "title" style="font-size: 20px;font-family: Microsoft YaHei;"> <strong>Title:</strong>  {{post.title}}</div>
                                </el-col>
                                <el-col :span='5'>
                                    <!--                    这里就是最方便的地方了， 直接绑定postid，  可以通过router to 直接传参post,id到detail 虽然还没实现  作为实验， 点击即可在控制台打印id-->
                                    <div class="detailbtn">
                                        <el-button type="success" size="medium" round @click="SendToDetail(post.id)">See Detail</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>
                <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="queryInfo.pageNumber"
                        :page-size= "queryInfo.pageSize"
                        :page-sizes="[4]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                >
                </el-pagination>
            </el-row>
        </div>

</template>
<script>
import riden from '@/assets/riden.jpg'
    export default {
        name: 'myPostList',
        data() {

            return {
              PersonId: {
                id:0
              },
              personalInfo:{
                nickName:'',
                gender:'',
                grade:'',
                major:'',
                PersonalizedInfo:'',
              },
              riden:riden,
              tableData: [],
              queryInfo: {
                id:0,
                pageNumber: 1,
                pageSize: 4,
              },
                total:0,
                pageNumber: 1, //初始页
                pageSize: 4,    // 每页的数据
                input2:'',
                disabled:false,



                //用来操作弹出框
                labelPosition:'left',
                dialogVisible: false,


                AvatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

                userInfo: {
                    nickName: 'DefaultAdmin',
                    avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
                },

            }
        },

        methods: {
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
          toReset:function (){
            console.log(1)
            this.$router.push('/reset')
          },
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang
          toMePage:function (){
            this.$router.push('/home/myInfo')
          },
          getMyPostList: async function (){
            this.queryInfo.id = localStorage.getItem('idToken')
            const { data: res } = await this.$http.get('/user/getPersonalPost',{ params: this.queryInfo })
            if (res.status !== 200) {
              return this.$message.error('数据获取失败')
            }
            this.tableData = res.data.postList
            this.total = res.data.totalpage
          },

            handleSizeChange(newSize) {
                this.queryInfo.pageSize = newSize
                this.getMyPostList()
            },

          //上面的表格dongheng说能够实现跳转了能实现传参了, 但我不确定, 就是
            SendToDetail:function (id){
                this.$router.push({name:'postDetail',query: { id } || this.redirect})
            },
            //当前页改变时触发 跳转其他页
            handleCurrentChange(newPage) {
                this.queryInfo.pageNumber = newPage
                this.getMyPostList()
            },

            // getUserInfo: function () {
            //     const token = localStorage.getItem('idToken')
            //     this.$http.get('/getUserInfo', {headers: {'token': token}}).then(res => {
            //         this.userInfo.nickName = res.data.data.nickName
            //         this.userInfo.avatar = res.data.data.avatar
            //     })
            // },
          getPersonalInfo:function (){
            this.PersonId.id = localStorage.getItem('idToken')
            this.$http.get('/user/getPersonalInfo', {params:this.PersonId}).then(res=>{
              if(res.status===200){

                this.personalInfo.nickName=res.data.data.username
                this.personalInfo.gender=res.data.data.gender
                this.personalInfo.grade=res.data.data.grade
                this.personalInfo.major=res.data.data.major
                this.personalInfo.PersonalizedInfo=res.data.data.personalInfo

              }else {
                alert('unknown error of system')
              }
            })
          },
        },
        created() {
            //this.getUserInfo()
          this.getMyPostList()
        }

    }
</script>

<style lang="less" scoped>
    el-divider{
        height: 10em;
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
    //左边波纹效果*//


    .left-nav-list .nav-button1{
      margin-top: 20px;
      margin-left: 100px;
      border-radius: 50px 10px 50px 10px;
      background-color: #f9fafc;
    }

    .left-nav-list .nav-button{
      margin-top: 20px;
      margin-left: 100px;
      box-shadow: 10px 10px 5px #3d3c3c;
      border-radius: 50px 10px 50px 10px;
      background-color: #f9fafc;
    }
    .nav-button1{
      height: 100px;
      width: 200px;
      border:2px black solid;
      margin: 2px auto;
      border-radius: 20px;
    }
    .left-nav-list .nav-button:hover{
      animation: animated-border 1.5s infinite;
      @keyframes animated-border {
        0% {
          box-shadow: 0 0 0 0 rgba(253, 252, 252, 0.37);
        }
        100% {
          box-shadow: 0 0 0 20px rgba(255,255,255,0);
        }
      }
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang
        //挑radius要连着下面的navbutton一起调
    }
    .nav-button{
        height: 100px;
        width: 200px;
        border:2px black solid;
        margin: 2px auto;
        border-radius: 20px;
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
    //see detail按钮效果*//


    .seedetail{
      background-color: #7DC4CC;
    }
    .seedetail:hover {
      background: linear-gradient(90deg, #BC95C6 0%, #7DC4CC 50%, #BC95C6 100%);
      background-size: 300% 100%; /*扩大背景区域*/
      animation: text 4s infinite linear both, animated-border 1.5s infinite;
      text-shadow: #676769 4px 4px 5px;
      @keyframes logout {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: -150% 0;
        }
      }
      @keyframes animated-border {
        0% {
          box-shadow: 0 0 0 0 #A7BFE8;
        }
        100% {
          box-shadow: 0 0 0 20px rgba(255,255,255,0);
        }
      }
    }
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang

    li{
        list-style: none;
    }
    .me-row{
        margin: 0;
        padding: 0;
        line-height: 20px !important;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }

    .userpanel{
        text-align: center;
        color: white;
        font-size: medium;
        padding-top: 5%;
        padding-left: 2%;
    }
    .username{
        padding-left: 5px;
    }
    .detailbtn{
        position: relative;
        right:0px;
        bottom:-50px;
        color: #A7BFE8;
    }
    .card{
        width:900px;
        height:90px;
        opacity: 80%;
        //border: 1px solid #999;
        margin: 5px auto;
        padding: 0;
        transition: padding 500ms;
        box-shadow: 10px 10px 5px gray;
        border-radius: 30px;
        background-color: #f9fafc;
    }
    .card:hover{
        box-shadow: 20px 15px 5px gray;
        padding-top: 1%;
        padding-bottom: 1%;
    }

    .el-pagination{
        position: absolute;

        bottom: -15%;margin: auto;left: 0;right: 0;
    }
    .el-dropdown-link{
        cursor: pointer;
        display: flex;
        justify-content: space-around;
    }
    .pic-name{
        line-height: 0;

    }

    a {
        text-decoration: none;
        color: blue;
        font-size: 25px;
    }
    .text{
        background: linear-gradient(90deg, #9F02FF 0%, #00DBDE 33.3%, rgba(131,58,180,1) 66.6%, #9F02FF 100%);
        -webkit-background-clip: text; /*截取背景区域为文字*/
        color: transparent;
        background-size: 300% 100%; /*扩大背景区域*/
        animation: text 4s infinite linear;
    }
    @keyframes text{
        0%  { background-position: 0 0;}
        100% { background-position: -150% 0;}
    }
    //左侧几个按钮的字体渐变色动画*//


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
    .text2{
      background: linear-gradient(90deg, #9F02FF 0%, #00DBDE 33.3%, rgba(131,58,180,1) 66.6%, #9F02FF 100%);
      -webkit-background-clip: text; /*截取背景区域为文字*/
      color: transparent;
      background-size: 300% 100%; /*扩大背景区域*/
      font-family: "Comic Sans MS";
      font-weight: bold;
    }
    .text2:hover{
      animation: text 4s infinite linear;
      text-shadow: #676769 4px 4px 5px;
      @keyframes text2 {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: -150% 0;
        }
      }

    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang
    .router-link-active {
        text-decoration: none;
        color: #A7BFE8;
    }

    .el-container{
        padding: 0;
        margin: 0;
        height: 100%;
    }
    .el-header {
        padding-top: 0;
        padding-bottom: 0;
        background-image: linear-gradient(to right, #A7BFE8, #6190E8, #6253FF, #6190E8, #A7BFE8);
        color: #333;
        border-radius: 3px;
    }

    .el-col{
        height: 100%;
        margin-top: 0;
        padding-top: 0;
    }
    .el-row{
        padding-top: 0;
        margin-top: 0;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .title {
        padding-left: 10%;
        padding-top: 5px;
        font-family: "Segoe UI";


        .el-col {
            border-radius: 4px;
        }

        .bg-purple-dark {
            background: #99a9bf;
        }

        .bg-purple {
            background: #d3dce6;
        }

        .bg-purple-light {
            background: #e5e9f2;
        }

        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }

        .row-bg {
            padding: 0px;
            background-color: #f9fafc;
        }

    }


</style>
