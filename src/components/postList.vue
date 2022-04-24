<template>

  <div style="margin-top: 60px">
    <el-row class="card2">
      <el-col :span="18" :offset="3" style="line-height: 10px">
        <!--下面就是v-for  便利取出并将post的信息赋予每个小card2   有几个post对象, 生成几个card2-->
        <div class="grid-content bg-purple" v-for="post in postList.slice((pageNumber-1)*pageSize, pageNumber * pageSize)" style="margin-bottom: 30px" >
          <!-- 第一个div, 将一个card分为上下两部分, 这里是头像加名字-->
          <div>
            <!--row内居中-->
            <el-row class="card22" style="margin-bottom: 0;" type="flex" align="middle" justify="start">

              <!--头像-->
              <el-col :span="5" class="pic-name" style="text-align: right" >
                <!--                 上方设置右对齐 -->
                <el-avatar  :src= "riden" ></el-avatar>
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

    </el-row>
    <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="queryInfo.pageNumber"
        :page-size= "queryInfo.pagesize"
        :page-sizes="[4]"
        layout="total, sizes, prev, pager, next"
        :total="total"
    >
    </el-pagination>


  </div>
</template>

<script>
  import home from '../components/home'
  import riden from '@/assets/riden.jpg'
  export default {
    comments:{
      'home':home,
    },
    data(){

      return{
        // 获取用户列表的参数对象
        queryInfo: {
          query: '',
          pageNumber: 1,
          pageSize: 4,
          typeList: [],
          typeListString: ''
        },
        riden:riden,
        circleUrl: "../assets/riden.jpg",
        total:0,
        pageNumber: 1, //初始页
        pageSize: 4,    // 每页的数据
        input2:'',
        disabled:false,
        postList:[],
        postList2:[{
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
    mounted() {
      this.queryevent.$on('query',(data)=>{
        console.log('收到了数据',data)
        this.queryInfo.query=data
        console.log(this.queryInfo.query,"this.queryInfo.query")
        this.getPostList()
      })
    },
    methods:{
      print:function (id){
        console.log(id)
      },
      SendToDetail:function (id){
        console.log(id)
        this.$router.push({name:'postDetail',query:{id}  || this.redirect})
      },
      handleCurrentChange: function(newPage){
        this.queryInfo.pageNumber = newPage
        this.getPostList()
      },
      handleSizeChange: function(newSize){
        this.queryInfo.pageSize = newSize
        this.getPostList()
      },
      getPostList: async function (){
        //this.$refs.
        this.queryInfo.typeListString = JSON.stringify(this.queryInfo.typeList)
        const { data: res } = await this.$http.get('/post/queryPost',{ params: this.queryInfo })
        if (res.meta.status !== 200) {
          return this.$message.error('数据获取失败')
        }

        this.postList = res.data.postList
        this.total = res.data.totalpage
        console.log(this.total,"totalis")
        console.log(this.postList,"aaaaaaaaaaaaaaaaa")


      }
    },
    created() {
      this.getPostList()
    },

    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getPostList()
    },

    handleCurrentChange(newPage) {
      this.queryInfo.pageNumber = newPage
      this.getPostList()
    },
  }
</script>

<style lang="less" scoped>

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
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
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!shang
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
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!xia
//这里是添加了浮动效果和边框形状改变的效果

.card:hover{
  box-shadow: 20px 15px 5px gray;
  border-radius: 50px 10px 50px 10px;

}
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
