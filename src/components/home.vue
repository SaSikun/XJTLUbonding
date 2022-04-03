<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="5" class="header-row">

          <div style="float: left; margin-top: 18px" >
            <router-link to="/postList">
              <i class="el-icon-s-home" ></i>
<!--     这里用来跳转首页, 颜色可以调整 在下面的a里面是静态颜色, active是点进去, css你自己设计吧 符合咱们的风格 图标大小也可以调整-->
            </router-link>
              <h1 style="display: inline"><strong>XJTLU</strong><em>Blonding</em></h1>

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
          <router-link to="Send">
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
    <el-main class="postListMain" >

      <router-view></router-view>

    </el-main>
  </el-container>
</template>
<script>
export default {
  name:'home',
  data(){
    return{
      input2:'',
      disabled:false,
      userInfo:{
        nickName:'DefaultAdmin',
        avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      },

    }
  },
  methods:{
    getUserInfo:function (){
        const token = localStorage.getItem('idToken')
        this.$axios.get('/getUserInfo',{headers:{'token':token}}).then(res=>{
          this.userInfo.nickName=res.data.data.nickName
          this.userInfo.avatar = res.data.data.avatar
        })
    },
  },
  created() {
    this.getUserInfo()

  }

}
</script>

<style lang="less" scoped>
.el-dropdown-link{
  cursor: pointer;
  display: flex;
  justify-content: space-around;
}

a {
  text-decoration: none;
  color: #d3dce6;
}

.router-link-active {
  text-decoration: none;
  color: #42b983;
}

.el-container{
  padding: 0;
  margin: 0;
  height: 100%;
}
.el-header {
  padding-top: 0;
  padding-bottom: 0;
  background-color: #B3C0D1;
  color: #333;

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
</style>
