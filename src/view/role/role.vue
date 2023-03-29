<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>角色管理</h1>
      </el-col>
      <el-col :span="24">
        角色状态：<el-select placeholder="请选择标识" class="form"
                   v-model="forms.status">
          <el-option v-for="(item) in isvalidList"
                     :label="item.name"
                     :value="item.id"
                     :key="item.id">
          </el-option>
        </el-select>
        角色名称：<el-input class="form"
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
          <el-table-column prop="name"
                           label="角色名称"
                           width="250">
          </el-table-column>

          <el-table-column prop="content"
                           label="角色描述"
                           width="250">
          </el-table-column>
          <el-table-column prop="createTime"
                           label="创建时间"
                           width="250">
          </el-table-column>
          <el-table-column prop="modifyTime"
                           label="更新时间"
                           width="250">
          </el-table-column>
          <el-table-column prop="statusValue"
                           label="是否有效"
                           width="250">
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
      <el-form :model="forms" :inline="true">
        
        <el-form-item label="角色名称："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.name" style="width:220px"
                    autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="角色描述："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.content" style="width:220px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级角色："
                      :label-width="formLabelWidth">
          <el-select placeholder="请选择标识"
                     v-model="forms.parentId">
            <el-option v-for="(item) in tableData"
                       :label="item.name"
                       :value="item.id"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色状态："
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
export default {
  name: "configIndex",
  components: {

  },
  data () {
    return {
      token:this.$store.getters.getToken,
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
      tableData: [],
      currentPage1: 1,
      totalElements: 0,
      dialogVisible: false,
      dialogFormVisible: false,
      title: "",
      formLabelWidth: '120px',
      forms: {
        name: '',
        prisonId: '',
        parentId: '',
        modifyTime: '',
        status: ''
      },
      form: {
        name: '',
        prisonId: '',
        parentId: '',
        modifyTime: '',
        status: '',
        pageSize: 10,
        pageIndex: 0,
        startTime: '',
        endDate: ''
      },
    }
  }, methods: {
    insert () {
      var data = {
        name: '',
        id: '',
        prisonId: '',
        parentId: '',
        modifyTime: '',
        status: ''
      }
      this.title = "新增角色信息";
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
      deleteData("/digital/role/" + data.id,this.token).then(
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
      this.title = "编辑角色信息";
      this.forms = row;
      console.log();
    },
    primary () {

      var data = this.forms;
      this.dialogFormVisible = false
      if (data.id.length > 0)
      {
        data.modifyTime = getNowDateTime(new Date());
        put("/digital/role/" + data.id, data,this.token).then(
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
        post("/digital/role", data,this.token).then(
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
      post("/digital/role/findAllPage", data,this.token).then(
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
            window.open(localhostPath,'_parent')
          }
          for (let index = 0; index < res.data.content.length; index++)
          {
            if (res.data.content[index].status == 1)
            {
              res.data.content[index].statusValue = '有效';
            } else
            {
              res.data.content[index].statusValue = '无效';
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
    
  }, created () {
    this.onSearch();
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