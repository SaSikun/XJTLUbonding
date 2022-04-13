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

                            <li>
                                <div class="nav-button" style="line-height: 100px">
                                    <div class="text text2">
                                        <p style="margin: 0 auto">My Post list</p>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </el-col>



                <el-col :span="17" offset="2">

                    <el-table  :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)">
                        <el-table-column prop="PostTitle" label="Post Title" width="900">
                        </el-table-column>
                        <el-table-column prop="Time" label="Time" width="200">
                        </el-table-column>
                        <el-table-column prop = "id" label="Detail">
                            <template slot-scope="scope">
                                <el-button type="success" size="medium" round @click="SendToDetail(scope.row.id)">See Detail</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <div class="block" style="margin-top:15px;">
                        <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page="queryInfo.pageNumber"
                                       :page-size= "queryInfo.pagesize"
                                       layout="prev, pager, next, jumper"
                                       :total="total">
                        </el-pagination>
                    </div>

                </el-col>


            </el-row>
        </div>

</template>
<script>
    export default {
        name: 'myPostList',
        data() {

            return {

                tableData: [
                    {
                        PostTitle: "Post Content1",
                        Time: "Time1",
                        id: "/register"
                    },
                    {
                        PostTitle: "Post Content2",
                        Time: "Time2",
                        id: "200"
                    },

                ],
              queryInfo: {
                query: '',
                pageNumber: 1,
                pageSize: 5,
                typeList: [],
                typeListString: ''
              },
              total:0,
                currentPage: 1, // 当前页码
                pageSize: 7, // 每页的数据条数



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
          toMePage:function (){
            this.$router.push('/home/myInfo')
          },
          getMyPostList: async function (){
            this.queryInfo.typeListString = JSON.stringify(this.queryInfo.typeList)
            const { data: res } = await this.$http.get('/post/queryMyPost',{ params: this.queryInfo })
            if (res.meta.status !== 200) {
              return this.$message.error('数据获取失败')
            }

            this.tableData = res.data.postList
            this.total = res.data.totalpage
          },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },

          //上面的表格dongheng说能够实现跳转了能实现传参了, 但我不确定, 就是
            SendToDetail:function (id){
                this.$router.push({name:'postDetail',query: { id } || this.redirect})
            },
            //当前页改变时触发 跳转其他页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
            },
            getUserInfo: function () {
                const token = localStorage.getItem('idToken')
                this.$http.get('/getUserInfo', {headers: {'token': token}}).then(res => {
                    this.userInfo.nickName = res.data.data.nickName
                    this.userInfo.avatar = res.data.data.avatar
                })
            },
        },
        created() {
            this.getUserInfo()
          this.getMyPostList()
        }

    }
</script>

<style lang="less" scoped>


    .personalInfo {
        height: 600px;
        width: 500px;
    }

    .left-nav-list .nav-button:hover {
        //挑radius要连着下面的navbutton一起调
        background-color: #99a9bf;
    }

    .nav-button {
        height: 120px;
        width: 130px;
        border: 1px black solid;
        margin: 10%;
        border-radius: 130px;
    }

    li {
        list-style: none;
    }

    .me-row {
        margin: 0;
        padding: 0;
        line-height: 18px !important;
    }

    .el-row {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        //border-radius: 4px;
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
        //border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .middle {
        width: 100%;
        height: 100%;
        position: absolute;
        background-size: cover;
        object-fit: cover;
        -webkit-filter: blur(10px);
    }

    .card2 {
        z-index: 2;

    }


    .userpanel {
        text-align: center;
        color: white;
        font-size: medium;
        padding-top: 5%;
        padding-left: 2%;
    }

    .username {
        padding-left: 5px;
    }

    .detailbtn {
        position: relative;
        right: 0px;
        bottom: -50px;
        color: #A7BFE8;
    }

    .card {
        width: 900px;
        height: 90px;
        border: 1px solid #999;
        margin: 5px auto;
        box-shadow: 10px 10px 5px gray;
        border-radius: 30px;
        background-color: #f9fafc;
    }

    .el-pagination {
        position: absolute;
        bottom: 30px;
        margin: auto;
        left: 0;
        right: 0;
    }

    .el-dropdown-link {
        cursor: pointer;
        display: flex;
        justify-content: space-around;
    }

    .pic-name {
        line-height: 0;
    }

    a {
        text-decoration: none;
        color: blue;
        font-size: 25px;
    }

    a:visited {
        text-decoration: none;
        color: yellow;
        font-size: 25px;
    }

    .text {
        background: linear-gradient(90deg, #9F02FF 0%, #00DBDE 33.3%, rgba(131, 58, 180, 1) 66.6%, #9F02FF 100%);
        -webkit-background-clip: text; /*截取背景区域为文字*/
        color: transparent;
        background-size: 300% 100%; /*扩大背景区域*/
        animation: text 4s infinite linear;
    }

    @keyframes text {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -150% 0;
        }
    }

    .router-link-active {
        text-decoration: none;
        color: #A7BFE8;
    }

    .el-container {
        padding: 0;
        margin: 0;
        height: 100%;
    }

    .el-header {
        padding-top: 0;
        padding-bottom: 0;
        background-image: linear-gradient(to right, #A7BFE8, #6190E8, #6253FF, #6190E8, #A7BFE8);
        color: #333;
        //border-radius: 3px;
    }

    .el-col {
        height: 100%;
        margin-top: 0;
        padding-top: 0;
    }

    .el-row {
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

    .box-card {
        width: 480px;
    }

    .card-item {
        margin-bottom: 0%;
        margin-top: 0%;
    }

    .title {
        padding-left: 10%;
        padding-top: 5px;
        font-family: "Segoe UI";

        .middle {
            width: 100%;
            height: 100%;
            position: absolute;
            background-size: cover;
            object-fit: cover;
            -webkit-filter: blur(10px);
        }

        .card2 {
            z-index: 2;

        }


    }

</style>
