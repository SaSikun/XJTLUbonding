<template>

  <el-container v-loading.fullscreen.lock="fsLoading" style="height: 100%; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: center; font-size: 18px">
        <el-row :gutter="24" style="margin: 0;padding: 0">
          <el-col :span="6"  style="text-align: left">
            <span style="alignment: left">
              <el-button @click="toHome()"><i class="el-icon-s-home" ></i><strong>BackHome!!!</strong>></el-button>
            </span>
          </el-col>
          <el-col :span="12" style="text-align: center">
            <strong><em>Welcome to see detail!</em></strong>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div class = "post"> <!--post info-->
          <el-table :data="postData">
            <el-table-column prop="avatar" label="Avatar" width="200">
              <!--avatar links here 绑定后端来的头像链接，暂时写死-->
              <div>
                <el-avatar src="https://pic.imgdb.cn/item/615426352ab3f51d9133f071.jpg"></el-avatar>
              </div>
            </el-table-column>
            <el-table-column prop="author" label="Author" width="200">
            </el-table-column>
            <el-table-column prop="post_title" label="title">
            </el-table-column>
          </el-table>
          <div class = "content">
            <el-table :data="postData"><!--post content-->
              <el-table-column prop="post_content" label="Content">
              </el-table-column>
            </el-table>
          </div>

        </div>

        <div class = "comment_button"><!--comment button-->
          <el-button type="success" @click="dialog = true">Comment!</el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        </div>

        <div class = "comment">
          <el-table :data="commentList" stripe><!--Comments-->
            <el-table-column prop="writername" label="User" width="140">
            </el-table-column>
            <el-table-column prop="content" label="comment">
            </el-table-column>
          </el-table>
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
      </el-main>
      <el-drawer
              title="Create Comment!"
              :before-close="handleClose"
              :visible.sync="dialog"
              direction="btt"
              custom-class="demo-drawer"
              ref="drawer"
      ><!--抽屉-->
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-col :span="16">
              <el-form-item label="Comment" :label-width="formLabelWidth">
                <el-input :rows="4" type="textarea" v-model="form.content" style="height: 90%" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <el-footer>
            <div class="demo-drawer__footer">
              <el-button @click="$refs.drawer.closeDrawer()">Cancel</el-button>
              <!--提交按钮-->
              <el-button type="primary" @click="submitComment(form)" :loading="loading">{{ loading ? 'Submitting...' : 'Submit!' }}</el-button>
            </div>
          </el-footer>
        </div>
      </el-drawer>


    </el-container>
  </el-container>

</template>

<style scoped>
  .el-header {
    background-color: #6253FF;
    color: white;
    text-align: center;
    justify-content: center;
    font-size: large;
    font-style: italic;
    font-family: "UD Digi Kyokasho N-B";
    font-weight: bold;
    fill-opacity: 80%;
    line-height: 60px;
    border-radius: 7px;
    position: page;
  }
  .el-aside {
    color: #333;
  }
  .el-main{
    height: 100%;
  }
  .post{
    height: auto;
    border-color: #9F02FF;
    border-width: 3px;
    border-bottom-style: dashed;
  }
  .comment{
    height: 60%;
  }
  ::v-deep .el-table .cell {
    font-size: medium;
    white-space: pre-line;
  }
  ::v-deep .content .el-table .cell{
    line-height: 35px;
    padding: 10px;
    font-size: 20px;
    font-style: italic;
  }
  .comment_button{
    padding: 2%;
    position: relative;

  }
  ::v-deep .comment .el-table .cell{
    line-height: 20px;
    padding: 20px;
  }
</style>

<script>
  export default {
    name:'postDetail',

    data() {
      const comments = [];
      // const post = {
      //   author: 'Default',
      //   post_title: 'I fucked up today',
      //   post_content: "Sing praises of her heavenly descent!\nSpread the word of her heavenly descent!\nSing praises of her heavenly descent!\nAll be in awe of her heavenly descent!"
      // };
      return {

        fsLoading: false,
        isLiked:false,
        isCollected:false,
        likeNum:0,
        collectNum:0,
        //临时 上
        queryInfo: {
          postId:0,
          pageNumber: 1,
          pageSize: 4,
        },
        total:0,
        pageNumber: 1, //初始页
        pageSize: 4,
        post: {
          id:0,
          author: '',
          post_title: '',
          post_content: '',
          commentNum:0,
          avatar:'',
          comments:''
        },
        postData:[],
        dialog: false,
        form: {
          content: ''
        },
        postAddForm:{
          posterId:0,
          postId:0,
          content:''

        },
        formLabelWidth: '160px',
        timer: null,
        //假数据，暂时这样写死
        commentNum:0,
        avatar:'',
        //postData: Array(1).fill(post),
        commentData: Array(this.commentNum).fill(comments),
        commentList:[]
      }
    },
    methods:{

      opendetail() {
        const h = this.$createElement;

        this.$notify({
          title: 'Post page',
          duration: 6000,
          position: 'bottom-right',
          offset: 250,
          message: h('i', { style: 'color: teal'}, 'You are currently looking at a post.\n You can comment anything if you want!\n')
        });
      },

      ///!!!!!!!!!!!!!!!!!!!!!!!!!!!
      ///!!!!!!!!!!!!!!!!!!!!!!!!!!!
      ///!!!!!!!!!!!!!!!!!!!!!!!!!!!
      ///!!!!!!!!!!!!!!!!!!!!!!!!!!!like
      ifLikedAndCollected:function (){
        const token = localStorage.getItem('idToken')
        this.$http.get('/post/checkLikeCollect',{params:{'posterId':token,'postId':this.post.id}}).then(res=>{
          console.log(res)
          if(res.data.status===200){
            this.isLiked = res.data.isLiked
            this.isCollected = res.data.isCollected
          }
        }).catch(() => {
          console.log()
          // this.$message({
          //   type: "warning",
          //   message: "can not fetch data"
          //});
        });
      },
      changeLike:function (){
        const token = localStorage.getItem('idToken')
        this.isLiked= !this.isLiked
        //这里我写成这样就跟b站类似， 点赞和取消都只是加一减一
        if(this.isLiked){
          this.likeNum+=1
        }else {
          this.likeNum-=1
        }
        this.$http.get('/post/likePost',{params:{'posterId':token,'postId':this.post.id,"isLiked":this.isLiked}}).then(res=>{
          if(res.data.status===200){
            console.log("连通了")
          }
        }).catch(()=>{
          this.$message({
            type: "warning",
            message: "can not fetch data/change like"
          });
        })
      },
      changeCollect:function (){
        const token = localStorage.getItem('idToken')
        this.isCollected= !this.isCollected
        //这里我写成这样就跟b站类似， 点赞和取消都只是加一减一
        if(this.isCollected){
          this.collectNum+=1
        }else {
          this.collectNum-=1
        }
        this.$http.get('/post/likePost',{params:{'posterId':token,'postId':this.post.id,"isCollected":this.isCollected}}).then(res=>{
          if(res.data.status===200){
            console.log("连通了")
          }
        }).catch(()=>{
          this.$message({
            type: "warning",
            message: "can not fetch data/change collect"
          });
        })
      },
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      delay:function(fn,time){return new Promise(resolve=>{setTimeout(()=>{resolve(fn())},time)})},
      submitComment(form,id) {
        if(this.form.content===''){
          alert("pls do not input empty content")
        }else if(this.form.content.length>=255){
          alert("Maximum is 255")
        }else{
          const token = localStorage.getItem('idToken')
          this.postAddForm.posterId=token
          this.postAddForm.postId=this.post.id
          this.postAddForm.content = this.form.content
          this.$http.get('/post/replyWrite', {params:this.postAddForm}).then(async res=>{
            console.log(res)
            if(res.data.status===200){
              this.$message({message:'success!! congratulations',type: 'success'});
            }
            await this.delay(()=>console.log("waiting"),400)
            await this.$router.go(0)
          })
        }
      },
      getCommentList: async function (){
        this.queryInfo.postId=this.post.id
        const { data: res } = await this.$http.get('/comment/getPostComment',{ params: this.queryInfo })
        if (res.status !== 200) {
          return this.$message.error('数据获取失败')
        }

        this.commentList = res.data.commentInfo.list
        console.log(this.commentList)
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

        this.total = res.data.totalpage
        console.log("totoalis",this.total)
      },
      handleCurrentChange:function (newPage) {
        this.queryInfo.pageNumber = newPage
        this.getCommentList()
      },
      handleSizeChange:function (newPage){
        this.queryInfo.pageSize = newSize
        this.getCommentList()
      },
      getPostDetail:function (id){
        console.log(this.post.id)
        this.$http.get('/post/getPostDetail',{params:{'id':this.post.id}}).then(res=>{
          this.post.author = res.data.writer
          this.post.post_title = res.data.title
          this.post.post_content = res.data.content
          console.log(res.data.content)
          this.post.avatar =  res.data.data.avatar
          console.log(this.post)
          this.postData.push(this.post)
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!4/26 like pbi
          this.likeNum = res.data.likeNum
          this.collectNum=res.data.collectNum
          // this.post.commentNum = res.data.data.commentAmount
          // this.post.comments = res.data.data.comment
        })
      },
      toHome:function (){
        this.$router.push('/home')
      }
    },
    created() {
      this.fsLoading = true;
      setTimeout(() => {
        this.fsLoading = false;
      }, 1000);

      this.post.id = parseInt(this.$route.query.id)
      this.getPostDetail(this.post.id)
      this.getCommentList()
      setTimeout(() =>{
      this.opendetail()}, 2000)
      this.ifLikedAndCollected()
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('Commit comment?')
              .then(_ => {
                this.loading = true;
                this.timer = setTimeout(() => {
                  done();
                  // 动画关闭需要一定的时间
                  setTimeout(() => {
                    this.loading = false;
                  }, 400);
                }, 2000);
              })
              .catch(_ => {});
    },
    submitForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },


  }
</script>
