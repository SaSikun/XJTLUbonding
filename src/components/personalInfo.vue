<template xmlns:el-col="http://www.w3.org/1999/html" xmlns:font-style="http://www.w3.org/1999/xhtml">

    <!-- 这个10就是让行距变小大概, 默认160   -->
    <div>
      <div class="middle" :style="backgroundDiv"></div>
      <el-row class="me-row" :gutter="20" type="flex" align="middle" style="margin-top: 100px">
          <!--          这里我加了hover,  颜色选的丑的一批, 后面诺, 交给你了, 加油奥里给
                        对了click也可以加, 然后效果什么的都可以调 什么鼠标变手 阴影之类的
          -->
        <div>
          <ul class="left-nav-list">
            <li><div class="nav-button">
              <div class="text2" style="margin-top: 25px">
                <p style="margin: 8px auto">Personal</p>
                <p style="margin: 8px auto">Information</p>
              </div>
            </div>
            </li>

            <li><div class="nav-button" style="line-height: 100px" @click="toMyPost()">
              <!--                line height = height 居中-->
              <div class="text2" @click="toMyPost()">
                <p style="margin: 0 auto" @click="toMyPost()">My Post list</p>
              </div>
            </div></li>

            <li><div class="nav-button" style="line-height: 100px">
              <div class="text2" >
                <p style="margin: 0 auto">Liked History</p>
              </div>
            </div>
            </li>

            <li><div class="nav-button" >
              <div class="text2" style="margin-top: 25px">
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

        <el-col :span="15">
          <div>
            <div class="middle-avatar" style="margin-top: -50px">
              <el-avatar :size="180" :src="riden"></el-avatar>
              <br><br><br>
              <el-button type="primary" icon="el-icon-edit">Change</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="1" >
          <el-divider direction="vertical" style="height:10em"></el-divider>
        </el-col>

        <el-col :span="10">
          <div>
            <div class="personalInfo" style="margin: 0 auto; border: 2px solid blueviolet">
          <div class="upper-lever"
              style="height: 75%; box-sizing: border-box; padding: 40px 20px">
              <div style="text-align: left">
                <ul>
                <!--                 这里字体字号也交给你了诺-->
                <li style="list-style: none;"><p>Nickname: {{personalInfo.nickName}}</p></li>
                <li style="list-style: none;"><p>Gender:   {{personalInfo.gender}}</p></li>
                <li style="list-style: none;"><p>Grade:    {{personalInfo.grade}}</p></li>
                <li style="list-style: none;"><p>Major:    {{personalInfo.major}}</p></li>
                <li style="list-style: none;"><p style="padding: 0;margin:0">Personal</p><p style="padding: 0;margin:0">Description: </p><p style="padding: 0;margin-top:5px">{{personalInfo.PersonalizedInfo}}</p></li>
              </ul>
              </div>
          </div>

            <div class="bottom-lever" style="height: 25%; line-height: 150px" >
              <el-button style="margin: 10px auto;" type="primary" icon="el-icon-edit" size="medium" plain
                         @click="showEditWindow">Modify personalInfo
              </el-button>
              <!--                    title="Modify your Information"-->
              <el-dialog
                  :visible.sync="dialogVisible"
                  width="35%"
                  style="line-height: 30px;">
                <h3>!!Modify Your Information!!</h3>
                <el-form ref="InfoModificationForm" hide-required-asterisk="true" :label-position="labelPosition" label-width="100px" :model="InfoModificationForm" :rules="InfoModificationFormRules">
                  <el-form-item label="nickName" prop="nickName">
                    <el-input v-model="InfoModificationForm.nickName" placeholder="Let's get a cool name"></el-input>
                  </el-form-item>
                  <el-form-item label="gender" prop="gender" >
                    <el-input v-model="InfoModificationForm.gender" placeholder="Are you male or female? Or middle"></el-input>
                  </el-form-item>
                  <el-form-item label="grade" prop="grade" >
                    <el-input v-model="InfoModificationForm.grade" placeholder="Tell us your grade?"></el-input>
                  </el-form-item>
                  <el-form-item label="major" prop="major">
                    <el-input v-model="InfoModificationForm.major" placeholder="Find people in same major!"></el-input>
                  </el-form-item>
                  <el-form-item label="Description" prop="PersonalizedInfo" >
                    <el-input type="textarea"
                              v-model="InfoModificationForm.PersonalizedInfo"
                              :autosize="{ minRows: 3, maxRows: 5}"
                              placeholder="Introduce yourself to other one"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">Cancel</el-button>
                     <el-button type="primary" @click="submit(InfoModificationForm)">Submit</el-button>
                  </span>
              </el-dialog>
            </div>
            </div>
          </div>
        </el-col>>


      </el-row>
    </div>


</template>
<script>
import riden from '@/assets/riden.jpg'
export default {
  name:'mePage',
  data(){
    return{
        //这里不知道为什么我电脑只能识别绝对路径，还得辛苦你改一下了
        backgroundDiv: {
          backgroundImage: "url(" + require("../assets/xjtluBG.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "2500px auto",
          marginTop: "10px",
        },
      riden:riden,
      labelPosition:'left',
      dialogVisible: false,
      InfoModificationForm:{
        id:0,
        nickName:'',
        gender:'',
        grade:'',
        major:'',
        PersonalizedInfo:''
      },
      personalInfo:{
        nickName:'',
        gender:'',
        grade:'',
        major:'',
        PersonalizedInfo:'',
      },
      PersonId: {
          id:0
      },
      AvatarB64:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userInfo:{
        nickName:'DefaultAdmin',
        avatar:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      },
      InfoModificationFormRules:{
        nickName: [
          { required: true, message: 'please input your username', trigger: 'blur' },
          { min: 3, max: 12, message: 'length should >= 3 and < 12', trigger: 'blur' }
        ],
        gender: [
          { required: false, trigger: 'blur' },
          { min: 0, max: 10, message: 'length should not over than 10', trigger: 'blur' }
        ],
        grade: [
          { required: false, trigger: 'blur' },
          { min: 0, max: 10, message: 'length should not over than 10', trigger: 'blur' }
        ],
        major: [
          { required: false,  trigger: 'blur' },
          { min: 0, max: 10, message: 'length should not over than 10', trigger: 'blur' }
        ],
        PersonalizedInfo: [
          { required: false, trigger: 'blur' },
          { min: 0, max: 100, message: 'length should not over than 100', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
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
    toMyPost:function (){
      this.$router.push('/home/myPost')
    },
    showEditWindow:function(){
      this.PersonId.id = localStorage.getItem('idToken')
      this.$http.get('/user/getPersonalInfo', {params:this.PersonId}).then(res=>{
        if(res.status===200){
          this.InfoModificationForm.id=this.PersonId.id
          this.InfoModificationForm.nickName=res.data.data.username
          this.InfoModificationForm.gender=res.data.data.gender
          this.InfoModificationForm.grade=res.data.data.grade
          this.InfoModificationForm.major=res.data.data.major
          this.InfoModificationForm.PersonalizedInfo=res.data.data.personalInfo
        }
      })

      console.log(this.InfoModificationForm,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      this.dialogVisible=true
    },

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
    submit(formName){
    const token = localStorage.getItem('idToken')
      //this.$refs[formName].validate(async (valid)=>{
        //if(valid){
          //await
          this.$http.get('/user/updateInfo', {params:this.InfoModificationForm}).then(res=>{
            //修改成功
            if(res.data.status===200){
              //消失弹框
              this.dialogVisible= false
              //弹出祝贺1.5秒
              setTimeout("alert('success modified LOL!!')",1500)
              //还不存在, 后续改router
              //刷新
              this.$router.go(0)
            }else{
              alert('userName has been used, sorry~')
            }
          })
        //}else {
          //alert('Could you pls check again T-T')
        //}
      //})
    }
  },
  created() {
    //header栏的,后面整合删掉

    this.getPersonalInfo()
  }
}

</script>

<style lang="less" scoped>
el-divider{
  height: 10em;
}

.personalInfo{
  height: 600px;
  width: 500px;
  background-color: white;
  font-family: "Comic Sans MS";
  font-size: large;
}

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


//左边波纹效果*//


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
  //挑radius要连着下面的navbutton一起调
}
.nav-button{
  height: 100px;
  width: 200px;
  border:2px black solid;
  margin: 2px auto;
  border-radius: 20px;
}
li{
  list-style: none;
}

//姑且先加了logout按钮*//


.logout{
  font-style: italic;
}
.logout:hover {
  background: linear-gradient(90deg, rgb(240, 25, 72) 0%, rgba(255, 120, 71) 50%, rgb(240, 25, 72) 100%);
  background-size: 300% 100%; /*扩大背景区域*/
  animation: text 4s infinite linear;
  text-shadow: #676769 4px 4px 5px;
  @keyframes logout {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -150% 0;
    }
  }
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
  padding: 10px 0;
  background-color: #f9fafc;
}

.card2{
  z-index: 2;
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
a {
  text-decoration: none;
  color: blue;
  font-size: 25px;
}
a:hover{
  text-decoration: none;
  color: white;
  font-size: 25px;
}
.text{
  background: linear-gradient(90deg, #9F02FF 0%, #00DBDE 33.3%, rgba(131,58,180,1) 66.6%, #9F02FF 100%);
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
.box-card {
  width: 480px;
}
.card-item{
  margin-bottom: 0%;
  margin-top: 0%;
}
.title {
  padding-left: 10%;
  padding-top: 5px;
  font-family: "Segoe UI";

}
</style>
