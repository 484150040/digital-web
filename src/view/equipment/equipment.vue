<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>系统设备管理</h1>
        <div class="daoru">
          <el-upload class="avatar-uploader"
                     action="https://jsonplaceholder.typicode.com/posts/"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload">
            <el-button slot="trigger"
                       size="small"
                       type="primary"
                       class="daoru">导入</el-button>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="24">
        设备code：<el-input class="form"
                  v-model="form.code"
                  placeholder="请输入内容"></el-input>
        设备品牌：<el-input class="form"
                  v-model="form.brand"
                  placeholder="请输入内容"></el-input>
        设备名称：<el-input class="form"
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
        <el-button icon="el-icon-search"
                   @click="select"
                   circle></el-button>

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
                           label="设备名称"
                           width="150">
          </el-table-column>

          <el-table-column prop="code"
                           label="设备code"
                           width="150">
          </el-table-column>

          <el-table-column prop="position"
                           label="位置"
                           width="150">
          </el-table-column>
          <el-table-column prop="ipAddress"
                           label="IP地址"
                           width="150">
          </el-table-column>
          <el-table-column prop="subnetMask"
                           label="子网掩码"
                           width="150">
          </el-table-column>
          <el-table-column prop="gateway"
                           label="网关"
                           width="150">
          </el-table-column>
          <el-table-column prop="brand"
                           label="设备品牌"
                           width="150">
          </el-table-column>
          <el-table-column prop="createTime"
                           label="创建时间"
                           width="160">
          </el-table-column>
          <el-table-column prop="isvalidValue"
                           label="是否有效"
                           width="100">
          </el-table-column>
          <el-table-column label="操作"
                           width="140">
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
      <el-form :inline="true" :model="forms">
        <el-form-item label="设备名称："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备品牌："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.brand"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备Code："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.code"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="位置："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.position"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="IP地址："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.ipAddress"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="存储IP地址："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.storageIp"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="子网掩码："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.subnetMask"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网关："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.gateway"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Vlan："
                      :label-width="formLabelWidth">
          <el-input v-model="forms.vlan"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有效："
                      :label-width="formLabelWidth">
          <el-select placeholder="请选择标识"
                     v-model="forms.isvalid">
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

import { post, put, deleteData, setPost } from '@/config/network'
import { getNowDateTime } from '@/config/dateUtiles'
export default {
  name: "configIndex",
  components: {

  },
  data () {
    return {
      token: this.$store.getters.getToken,
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
        brand: '',
        code: '',
        position: '',
        storageIp: '',
        gateway: '',
        subnetMask: '',
        ipAddress: '',
        vlan: '',
        modifyTime: '',
        isvalid: ''
      },
      form: {
        name: '',
        brand: '',
        code: '',
        pageSize: 10,
        pageIndex: 0,
        startTime: '',
        endDate: '',
        isvalid: ''
      },
    }
  }, methods: {
    insert () {
      var data = {
        name: '',
        id: '',
        brand: '',
        code: '',
        position: '',
        storageIp: '',
        gateway: '',
        subnetMask: '',
        ipAddress: '',
        vlan: '',
        isvalid: ''
      }
      this.title = "新增设备信息";
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
      deleteData("/digital/equipment/" + data.id, this.token).then(
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
      this.title = "编辑设备信息";
      this.forms = row;
      console.log();
    },
    primary () {

      var data = this.forms;
      this.dialogFormVisible = false
      if (data.id.length > 0)
      {
        data.modifyTime = getNowDateTime(new Date());
        put("/digital/equipment/" + data.id, data, this.token).then(
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
        post("/digital/equipment", data, this.token).then(
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
      post("/digital/equipment/findAllPage", data, this.token).then(
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
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      var data = {
        file: file
      };
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      setPost("/digital/equipment/importExcel", data, this.token).then(
        res => {
          this.onSearch()
          this.$message({
            message: '导入成功！',
            type: 'success'
          });
        }
      ).catch(
        err => {
          console.log(err)
          this.$message.error('删除错误！');
        }
      );
      return isJPG && isLt2M;
    }
  }, created () {
    this.onSearch();
  }, props: {

  }, computed: {

  },
}
  </script>
<style>
.daoru {
  float: right;
  margin-top: -30px;
}
.form {
  width: 250px;
  margin: 20px;
}
.table {
  margin-top: 30px;
}
</style>