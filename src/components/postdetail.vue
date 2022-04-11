<template>

  <el-container style="height: 100%; border: 1px solid #eee">
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
          <div class = "pic">
            <el-table empty-text = "No pictures!" :data="picture">
              <el-table-column prop="post_pic" label="Pic">
                <div class="demo-image__preview">
                  <el-image
                          style="width: 200px; height: 200px"
                          :src="picture"
                          :preview-src-list="picture">
                  </el-image>
                </div>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class = "comment_button"><!--comment button-->
          <el-button type="success" @click="dialog = true">Comment!</el-button>
        </div>

        <div class = "comment">
          <el-table :data="commentData" stripe><!--Comments-->
            <el-table-column prop="user" label="User" width="140">
            </el-table-column>
            <el-table-column prop="comment" label="comment">
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-drawer
              title="Create Comment!"
              :before-close="handleClose"
              :visible.sync="dialog"
              direction="btt"
              custom-class="demo-drawer"
              ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="Comment Content" :label-width="formLabelWidth">
              <el-input v-model="form.content" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">Cancel</el-button>
            <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? 'Submitting...' : 'Submit!' }}</el-button>
          </div>
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
  height: 80%;
}
.comment{
  height: 80%;
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
  padding: 50px;
}

::v-deep .comment .el-table .cell{
  line-height: 20px;
  padding: 20px;
}
::v-deep .pic .el-table .cell{
  text-align: center;
  padding: 20px;
}

</style>

<script>
  export default {
    name:'postDetail',

    props:['postId'],
    data() {

      const comments = [];

      // const post = {
      //   author: 'Default',
      //   post_title: 'I fucked up today',
      //   post_content: "Sing praises of her heavenly descent!\nSpread the word of her heavenly descent!\nSing praises of her heavenly descent!\nAll be in awe of her heavenly descent!"
      // };
      return {

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
        formLabelWidth: '80px',
        timer: null,
        //假数据，暂时这样写死
        commentNum:0,
        avatar:'',
        postData: Array(1).fill(post),
        //图片链接，多张图片有bug
        picture: Array(1).fill('https://pic.imgdb.cn/item/623d6cdd27f86abb2ab9e2b4.jpg'),
        commentData: Array(this.commentNum).fill(comments)

      }
    },
    methods:{
      getPostDetail:function (id){
        this.$http.get('/post/getPostDetail',{params:{'id':id}}).then(res=>{
          this.post.author = res.data.writer
          this.post.post_title = res.data.title
          this.post.post_content = res.data.content
          console.log(res.data.content)
          this.post.avatar =  res.data.data.avatar
          console.log(this.post)
          this.postData.push(this.post)
          // this.post.commentNum = res.data.data.commentAmount
          // this.post.comments = res.data.data.comment

        })
      },
      toHome:function (){
        this.$router.push('/home')
      }
    },

    created() {

       this.post.id = parseInt(this.$route.query.id)
      this.getPostDetail(this.postId)
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
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  }
</script>
