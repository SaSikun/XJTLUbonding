<template>
  <el-row class="card2" style="line-height: 10px">

    <el-col :span="18" :offset="3">
      <!--下面就是v-for  便利取出并将post的信息赋予每个小card2   有几个post对象, 生成几个card2-->
      <div class="grid-content bg-purple" v-for="post in postList" >
        <!-- 第一个div, 将一个card分为上下两部分, 这里是头像加名字-->
        <div>
          <!--row内居中-->
          <el-row class="card22" style="margin-bottom: 0;" type="flex" align="middle" justify="start">

            <!--头像-->
            <el-col :span="2" class="pic-name" style="text-align: right" >
              <!--                 上方设置右对齐 -->
              <el-avatar icon="el-icon-user-solid" src=post.avatar  ></el-avatar>
            </el-col>
            <!-- 名字-->
            <el-col :span="1" style="margin-left: 2px">
              <h4>{{post.userName}}</h4>
            </el-col>
          </el-row>

        </div>
        <div class="card">
          <el-row>
            <el-col :span="18" style="text-align: left">
              <pre>  Title:  {{post.title}}</pre>
            </el-col>
            <el-col :span='6'>
                <el-button type="success" size="mini" round @click="SendToDetail(post.id)">See Detail</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
export default {
  name: "postList",
  data(){
    return{
      postList:[{
        userName: "dandan1",
        title: "i am post title1",
        avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        id:0,
      },
        {
          userName: "dandan2",
          title: "i am post title2",
          avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          id:1,
        },
        {
          userName: "dandan3",
          title: "i am post title3",
          avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          id:2,
        }],
    }
},
  methods:{
    print:function (id){
      console.log(id)
    },
    SendToDetail:function (id){
      console.log(id)
      this.$router.push({name:'postDetail',params:{postId:id}})
    },
    getPostList:function (){
      this.$axios.get('/getPostList').then(res=>{
        if(typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length){
          this.postList = JSON.parse(res.data.data)
        }else {
          this.postList = res.data.data
        }

      })
    }
  },
  created() {
    this.getPostList()
  }
}
</script>

<style scoped>
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
