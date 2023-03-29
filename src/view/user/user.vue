<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>用户管理</h1>
      </el-col>
      <el-col :span="24">
        用户手机<el-input class="form"
                  v-model="form.number"
                  placeholder="请输入内容"></el-input>
        用户名：<el-input class="form"
                  v-model="form.username"
                  placeholder="请输入内容"></el-input>
        用户名称：<el-input class="form"
                  v-model="form.name"
                  placeholder="请输入内容"></el-input>
        <span class="demonstration">创建时间：</span>
        <el-date-picker class="form"
                        v-model="form.startTime"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary"
                   @click="select"
                   plain>搜索</el-button>
        <el-button type="primary"
                   @click="insert"
                   plain>新增</el-button>
      </el-col>
      <el-col :span="24">
        <el-table class="table"
                  :data="tableData"
                  style="width: 100%">
          <el-table-column type="index"
                           width="50">
          </el-table-column>
          <el-table-column prop="number"
                           label="用户手机"
                           width="150">
          </el-table-column>
          <el-table-column prop="name"
                           label="用户名称"
                           width="150">
          </el-table-column>

          <el-table-column prop="username"
                           label="用户名"
                           width="150">
          </el-table-column>
          <el-table-column prop="password"
                           label="密码"
                           width="200">
          </el-table-column>
          <el-table-column prop="email"
                           label="用户邮箱"
                           width="200">
          </el-table-column>
          <el-table-column prop="createTime"
                           label="创建时间"
                           width="200">
          </el-table-column>

          <el-table-column prop="loginTime"
                           label="最近登录时间"
                           width="200">
          </el-table-column>
          <el-table-column prop="loginCount"
                           label="最近登录次数"
                           width="120">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small"
                         type="primary"
                         @click="open(scope.$index, scope.row)"
                         plain>编辑</el-button>
              <el-button size="small"
                         type="warning"
                         @click="deleteOne(scope.$index, scope.row)"
                         icon="el-icon-delete"
                         plain></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>

    <!-- 弹窗样式 -->

    <el-dialog :title="title"
               :visible.sync="dialogFormVisible">

      <el-form :inline="true"
               :model="forms">
        <el-row>
          <el-col :span="24"><el-form-item label="用户名称："
                          :label-width="formLabelWidth">
              <el-input v-model="forms.name"
                        placeholder="请输入内容"
                        style="width:220px"
                        autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="用户名："
                          :label-width="formLabelWidth">
              <el-input v-model="forms.username"
                        placeholder="请输入内容"
                        style="width:220px"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码："
                          :label-width="formLabelWidth">
              <el-input v-model="forms.password"
                        placeholder="请输入内容"
                        style="width:220px"
                        autocomplete="off"
                        show-password></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱："
                          :label-width="formLabelWidth">
              <el-input v-model="forms.email"
                        placeholder="请输入内容"
                        style="width:220px"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户手机："
                          :label-width="formLabelWidth">
              <el-input v-model="forms.number"
                        placeholder="请输入内容"
                        style="width:220px"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址："
                          :label-width="formLabelWidth">
              <el-input v-model="forms.addr"
                        placeholder="请输入内容"
                        style="width:220px"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="国家："
                          :label-width="formLabelWidth">
              <el-select placeholder="请选择标识"
                         v-model="forms.country">
                <el-option v-for="(item) in countryList"
                           :label="item.name"
                           :value="item.id"
                           :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="省："
                          :label-width="formLabelWidth">
              <el-select placeholder="请选择标识"
                         v-model="forms.province">
                <el-option v-for="(item) in provinceList"
                           :label="item.name"
                           :value="item.id"
                           :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市："
                          :label-width="formLabelWidth">
              <el-select placeholder="请选择标识"
                         v-model="forms.city">
                <el-option v-for="(item) in cityList"
                           :label="item.name"
                           :value="item.id"
                           :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮政编码："
                          :label-width="formLabelWidth">
              <el-input v-model="forms.number"
                        placeholder="请输入内容"
                        style="width:220px"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否有效："
                          :label-width="formLabelWidth">
              <el-select placeholder="请选择标识"
                         v-model="forms.status">
                <el-option v-for="(item) in isvalidList"
                           :label="item.name"
                           :value="item.id"
                           :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色信息："
                          :label-width="formLabelWidth">
              <el-select v-model="value"
                         @input="roleSearch"
                         multiple
                         placeholder="请选择">
                <el-option v-for="item in options"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table class="table"
                      :data="forms.roleList"
                      style="width: 100%">
              <el-table-column type="index"
                               width="50">
              </el-table-column>
              <el-table-column prop="name"
                               label="角色名称"
                               width="200">
              </el-table-column>

              <el-table-column prop="content"
                               label="角色描述"
                               width="200">
              </el-table-column>
              <el-table-column prop="content"
                               label="父级角色名称"
                               width="200">
              </el-table-column>
              <el-table-column prop="createTime"
                               label="创建时间"
                               width="200">
              </el-table-column>

            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除提示 -->
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <span>确定删除？</span>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="primaryDelete">确 定</el-button>
      </span>
    </el-dialog>

    <el-pagination background
                   @current-change="handleCurrentChange"
                   :current-page.sync="currentPage1"
                   :page-size="form.pageSize"
                   layout="total, prev, pager, next"
                   :total="totalElements">
    </el-pagination>
  </div>

</template>

 <script>

import { post, put, deleteData } from '@/config/network'
import { getNowDateTime } from '@/config/dateUtiles'
import md5 from 'js-md5'
export default {
  name: "configIndex",
  components: {

  },
  data () {
    return {
      token: this.$store.getters.getToken,
      value: [],
      options: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      isvalidList: [{
        id: 2,
        name: "无效"
      }, {
        id: 1,
        name: "有效"
      }],
      countryList: [{
        id: 1,
        name: "中国"
      }],
      provinceList: [{
        id: 1,
        name: "浙江省"
      }],
      cityList: [{
        id: 1,
        name: "杭州市"
      }],
      tableData: [],
      currentPage1: 1,
      totalElements: 0,
      dialogVisible: false,
      dialogFormVisible: false,
      title: "",
      formLabelWidth: '120px',
      forms: {
        addr: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
        name: '',
        username: '',
        number: '',
        prisonId: '',
        username: '',
        password: '',
        email: '',
        status: '',
        roleList: [],
        modifyTime: '',
        createTime: ''
      },
      password: '',
      form: {
        name: '',
        username: '',
        number: '',
        pageSize: 10,
        pageIndex: 0,
        startTime: '',
        endDate: ''
      },
    }
  }, methods: {
    insert () {
      var data = {
        addr: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
        name: '',
        username: '',
        number: '',
        prisonId: '',
        username: '',
        password: '',
        email: '',
        status: '',
        modifyTime: '',
        createTime: '',
        roleList: []
      }
      this.value = null;
      this.title = "新增用户信息";
      this.dialogFormVisible = true
      this.forms = data;

    },
    deleteOne (index, row) {
      this.dialogVisible = true;
      this.forms = row;
    },
    primaryDelete () {
      this.dialogVisible = false;
      var data = this.forms;
      deleteData("/digital/user/" + data.id, this.token).then(
        res => {
          this.onSearch()
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
        }
      ).catch(
        err => {
          console.log(err)
          this.$message.error('删除错误！');
        }
      );

    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    open (index, row) {
      this.dialogFormVisible = true
      this.title = "编辑用户信息";
      this.password = row.password;
      row.password = ''
      this.forms = row;
      this.roleSearch()
    },
    primary () {
      var data = this.forms;
      this.dialogFormVisible = false
      console.log(data);
      if (data.id.length > 0)
      {
        if (data.password == '')
        {
          data.password = this.password;
        } else
        {
          data.password = md5(data.username + data.password);
        }
        data.modifyTime = getNowDateTime(new Date());
        put("/digital/user/" + data.id, data, this.token).then(
          res => {
            this.onSearch();
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
          }
        ).catch(
          err => {
            console.log(err)
          }
        );
      } else
      {
        data.createTime = getNowDateTime(new Date());
        data.password = md5(data.username + data.password);
        post("/digital/user", data, this.token).then(
          res => {
            this.onSearch();
            this.$message({
              message: '新增成功！',
              type: 'success'
            });
          }
        ).catch(
          err => {
            console.log(err)
          }
        );

      }

    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.form.pageIndex = val - 1
      this.onSearch();
    },
    select () {
      this.onSearch()
    },
    onSearch () {
      if (this.form.startTime.length > 0)
      {
        this.form.endDate = this.form.startTime[1];
        this.form.startTime = this.form.startTime[0];
      }
      var data = this.form;
      post("/digital/user/findAllPage", data, this.token).then(
        res => {
          if (!res)
          {
            this.$message({
              message: 'token失效请重新成功！',
              type: 'errer'
            });
            // this.$router.replace("/");
            var currentPath = window.document.location.href;
            //获取主机地址之后的目录
            var pathName = window.document.location.pathname;
            var pos = currentPath.indexOf(pathName);
            //获取主机地址
            var localhostPath = currentPath.substring(0, pos);
            window.open(localhostPath, '_parent')
          }
          for (let index = 0; index < res.data.content.length; index++)
          {
            if (res.data.content[index].isvalid == 1)
            {
              res.data.content[index].isvalidValue = '有效';
            } else
            {
              res.data.content[index].isvalidValue = '无效';
            }
            res.data.content[index].createTime = getNowDateTime(res.data.content[index].createTime)
            res.data.content[index].modifyTime = getNowDateTime(res.data.content[index].modifyTime)
          }
          this.totalElements = res.data.totalElements
          this.tableData = res.data.content
        }
      ).catch(
        err => {
          console.log(err)
        }
      );
    },
    onRoleSearch () {
      var data = {
        roleIdList: []
      };
      post("/digital/role/findAllList", data, this.token).then(
        res => {
          if (!res)
          {
            this.$message({
              message: 'token失效请重新成功！',
              type: 'errer'
            });
            // this.$router.replace("/");
            var currentPath = window.document.location.href;
            //获取主机地址之后的目录
            var pathName = window.document.location.pathname;
            var pos = currentPath.indexOf(pathName);
            //获取主机地址
            var localhostPath = currentPath.substring(0, pos);
            window.open(localhostPath, '_parent')
          }

          this.options = res.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      );
    },
    roleSearch () {
      if (this.value == null || this.value.length == 0)
      {
        this.forms.roleList = null
        return
      }
      var data = {
        roleIdList: this.value
      };
      post("/digital/role/findAllList", data, this.token).then(
        res => {
          if (!res)
          {
            this.$message({
              message: 'token失效请重新成功！',
              type: 'errer'
            });
            // this.$router.replace("/");
            var currentPath = window.document.location.href;
            //获取主机地址之后的目录
            var pathName = window.document.location.pathname;
            var pos = currentPath.indexOf(pathName);
            //获取主机地址
            var localhostPath = currentPath.substring(0, pos);
            window.open(localhostPath, '_parent')
          }
          this.forms.roleList = res.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      );
    },
  }, created () {
    this.onSearch();
    this.onRoleSearch();
  }, props: {

  }, computed: {

  },
}
  </script>
<style>
.form {
  width: 250px;
  margin: 20px;
}
.table {
  margin-top: 30px;
}
</style>