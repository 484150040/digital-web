<template>
  <div class="pingtai">
    <el-container>
      <el-header>
        <h1 class="biaoti">浩淼开发平台</h1>
        <img src="../../assets/logo.png"
             class="logo" />
      </el-header>
      <el-main>
        <div class="moban">
          <div class="tiaozheng">
            <h1>登录</h1>
            <hr>
            <div>
              <el-form ref="form"
                       :model="form"
                       label-width="80px">
                <el-form-item label="用户名">
                  <el-input class="input"
                            v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input class="input"
                            v-model="form.pwd"
                            show-password></el-input>
                </el-form-item>
                <el-radio label="1"
                          v-model="form.resource">演示</el-radio>
                <el-radio label="2"
                          v-model="form.resource">后台</el-radio>
                <el-form-item>
                  <el-button class="button"
                             type="primary"
                             @click="onSubmit" @keyup.enter="enterSearch">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

        </div>
      </el-main>
    </el-container>

  </div>
</template>
<script>
import md5 from 'js-md5'
import { post } from '@/config/network'
export default {
  data () {
    return {
      form: {
        password: '',
        pwd: '',
        username: '',
        resource: '1'
      }
    }
  },
  methods: {
    //回车搜索
        enterSearch(){
            document.onkeydown = e =>{
                //13表示回车键
                if (e.keyCode === 13) {
                //回车后执行搜索方法
                    this.onSubmit()
                }
            }
        },
    onSubmit () {
      this.form.password = md5(this.form.username + this.form.pwd);
      var data = this.form;
      this.form.pwd = null;
      post("/digital/user/login", data).then(
        res => {

          if (res.type == 'error')
          {
            this.$message.error('用户密码错误！');
          } else
          {
            window.sessionStorage.clear()
            window.sessionStorage["token"] = res.data.token;
            window.sessionStorage["user"] = JSON.stringify(res.data.user);
            this.$message({
              message: '登录成功！',
              type: 'success'
            });

            if (this.form.resource == '2')
            {
              var currentPath = window.document.location.href+'home';
               console.log(currentPath);
              window.open(currentPath,'_parent')
              // this.$router.replace("/home");
            } else
            {
              this.form.password = null;
              window.open('http://123.60.163.215:70/','_blank')
            }

          }


        }
      ).catch(
        err => {
          console.log(err)
          this.form.password = null;

          this.$message.error('登录错误！');
        }
      );
    }
  }, created () {
     this.enterSearch()
  },

}
</script>
<style>
.pingtai {
  height: 960px;
  width: 100%;
  background-image: url("https://upload.semidata.info/new.eefocus.com/article/image/2020/03/31/5e82dbb4494d3.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
}
.moban {
  height: 500px;
  width: 450px;
  margin-left: 58%;
  margin-top: 9%;
  border-radius: 10px;
  background-color: rgba(220, 254, 255, 0.329);
}
.logo {
  width: 200px;
  float: right;
  margin-top: -90px;
}
.biaoti {
  color: rgb(255, 255, 255);
  font-size: 45px;
  margin-top: 40px;
  margin-left: 50px;
  font-family: "华文行楷";
}
.tiaozheng {
  text-align: center;
  padding-top: 50px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.button {
  margin-top: 60px;
  width: 300px;
  margin-right: 50px;
}
.input {
  width: 300px;
}
.el-col {
  border-radius: 4px;
}
.tiaozheng hr {
  margin: 40px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>