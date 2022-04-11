<template>
    <el-container>
        <el-dialog
                title="Edit information"
                :visible.sync="EditDialog"
                width="40%"
                height ="70%"
        >
            <div style = "text-align:center">
                <el-form ref="resForm" :model="resForm" :rules="resetFormRules" label-width="0px" class="login_form">
                    <el-form-item prop="newname">
                        <el-input placeholder="new nick name" v-model="resForm.nickname" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item prop="newgender">
                        <el-input placeholder="new gender" v-model="resForm.gender" ></el-input>
                    </el-form-item>
                    <el-form-item prop="newgrade">
                        <el-input placeholder="new grade" v-model="resForm.grade" ></el-input>
                    </el-form-item>
                    <el-form-item prop="newmajor">
                        <el-input placeholder="new major" v-model="resForm.major" ></el-input>
                    </el-form-item>
                </el-form>
              <span slot="footer" class="dialog-footer">
              <el-button @click="EditDialog = false">Cancel </el-button>
              <el-button type="primary" @click="Submit(regform)">Submit</el-button>
              </span>
            </div>
        </el-dialog>
        <el-header>
            <el-row>
                <el-col :span="5" class="header-row">
                    <div style="float: left; margin-top: 18px" >
                        <router-link to="/home/">
                            <i class="el-icon-s-home" ></i>
                            <!--     这里用来跳转首页, 颜色可以调整 在下面的a里面是静态颜色, active是点进去, css你自己设计吧 符合咱们的风格 图标大小也可以调整-->
                        </router-link>
                        Personal info

                    </div>
                </el-col>
                <el-col :span="6">
                    <div style="margin-top: 12px">
                        <el-input
                                placeholder="请输入内容"
                                prefix-icon="el-icon-search"
                                @keyup.enter.native=""
                                v-model="input2">

                        </el-input>
                    </div>
                </el-col>
                <el-col :span="1" style="margin-top: 12px" >
                    <el-button icon="el-icon-search" circle></el-button>
                </el-col>
                <el-col :span="6" style="margin-top: 12px; text-align: right" >
                    <router-link to="/createPost">
                        <el-button type="primary" icon="el-icon-edit" plain :disabled="disabled">
                            <!--              在send页面边灰 改变disabled的值-->
                            Add New Post
                        </el-button>
                    </router-link>
                </el-col>
                <el-col  :span="6">

                    <!--          头像加id-->
                    <div style="float: right;margin-top: 6px">
                        <el-dropdown>
              <span class="el-dropdown-link" >
                <el-avatar shape="square" :size="50" :src="userInfo.avatar" style="margin-right: 5px"></el-avatar>
                <h4 style="display: inline; margin-left: 2px">{{ userInfo.nickName }}</h4>
                <i class="el-icon-arrow-down el-icon--right" style="margin-top: 19px"></i>
              </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>Log out</el-dropdown-item>
                                <el-dropdown-item divided>Reset Password</el-dropdown-item>
                                <el-dropdown-item divided>My Info</el-dropdown-item>
                                <el-dropdown-item divided>My Post</el-dropdown-item>
                                <el-dropdown-item divided>My Like</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <!-- 这个10就是让行距变小大概, 默认160   -->
        <el-container>
            <el-aside width="25%">

                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        background-color="#D3DCE6"
                        @close="handleClose">
                    <el-menu-item index="1">
                        <i class="el-icon-edit"></i>
                        <span slot="title">Personal info</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i class="el-icon-document-copy"></i>
                        <span slot="title">My post</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-star-on"></i>
                        <span slot="title">Liked</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-document"></i>
                        <span slot="title">My comment</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div class="login_container" >
                    <div class="login_box">
                        <!--头像区域-->
                        <div class="avatar_box">
                            <img src="../assets/reimu.jpg" alt="">
                        </div>
                        <div class = "nickname">
                            <!--用户名绑定在这里-->
                            Nickname
                        </div>
                    </div>
                </div>
                <div class="login_container" >
                    <div class="login_box1">
                        <!--用户信息绑定在这里-->
                        <div class = info>
                            <el-descriptions ti :column="1">
                                <el-descriptions-item label="Gender" label-class-name="my-label" content-class-name="my-content">
                                    FUTA
                                </el-descriptions-item>
                                <el-descriptions-item label="Grade" label-class-name="my-label" content-class-name="my-content">
                                    3
                                </el-descriptions-item>
                                <el-descriptions-item label="Major" label-class-name="my-label" content-class-name="my-content">
                                    ICS
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-form label-width="0px" class="login_form">
                                <el-form-item class="btns">
                                    <el-button @click = "edit()" type="text">Edit</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    export default {
        name: 'personalinfo',
        data() {
            return {
                resForm: {
                    newname: '',
                    newgender: '',
                    newgrade: '',
                    newmajor: '',
                },
                resetFormRules: {
                    newname: [
                        {required: true, message: 'invalid name!', trigger: 'blur'},
                        {min: 3, max: 12, message: 'length: 3-12', trigger: 'blur'}
                    ],
                },
                EditDialog: false,
                backgroundDiv: {
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "2500px auto",
                    marginTop: "10px",
                },

                input2: '',
                disabled: false,
                userInfo: {
                    nickName: 'DefaultAdmin',
                    avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
                },
            }
        },
        methods: {
            created() {
                this.getUserInfo()
            },
            edit(){
                this.EditDialog = true
            }
        }
    }
</script>

<style lang="less" scoped>

    .my-label {
        font-size: large;
    }
    .my-content {
        font-size: large;
    }

    ::v-deep.info{
        line-height: 50px;
        position: absolute;
        font-size: large;
        top: 10%;
        left: 15%;
        width: 0%;
        height: 150%;
    }
    .nickname{
        font-style: italic;
        font-weight: bold;
        line-height: 70px;
    }
    .middle {
        width:100%;
        height:100%;
        position:absolute;
        background-size:cover;
        object-fit: cover;
        -webkit-filter: blur(10px);
    }
    .card2{
        z-index: 2;
    }
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
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
        border: 1px solid #999;
        margin: 5px auto;
        box-shadow: 10px 10px 5px gray;
        border-radius: 30px;
        background-color: #f9fafc;
    }
    .el-pagination{
        position: absolute;
        bottom: 30px;margin: auto;left: 0;right: 0;
    }
    .el-dropdown-link{
        cursor: pointer;
        display: flex;
        justify-content: space-around;
    }
    .pic-name{
        line-height: 0;

    }

    .login_box1{
        width:400px;
        height:200px;
        background-color: #E0E0DF;
        border-radius:3px;
        position: absolute;
        left:65%;
        top:70%;
        opacity: 80%;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        border-radius: 20px;
        box-shadow:2px 2px 8px #aaaaaa;
        transform: translate(-50%,-50%);
    }

    .login_box{
        width:300px;
        height:100px;
        background-color: #E0E0DF;
        border-radius:3px;
        position: absolute;
        left:65%;
        top:45%;
        opacity: 80%;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        border-radius: 20px;
        box-shadow:2px 2px 8px #aaaaaa;
        transform: translate(-50%,-50%);

        .avatar_box{
            height:150px;
            width:150px;
            border: 1px solid #6253FF;
            padding:10px;
            border-radius: 80%;
            background-color: #6253FF;
            position: absolute;
            left:52%;
            transform: translate(-50%,-100%);
            img{
                padding:10%;
                height:80%;
                width:80%;
                border-radius: 90%;
            }
        }
    }

    a {
        text-decoration: none;
        color: blue;
        font-size: 25px;
    }
    a:visited{
        text-decoration: none;
        color: yellow;
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
        .middle {
            width:100%;
            height:100%;
            position:absolute;
            background-size:cover;
            object-fit: cover;
            -webkit-filter: blur(10px);
        }
        .card2{
            z-index: 2;

        }
    }


</style>
