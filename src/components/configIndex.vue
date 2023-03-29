<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>消息对接工具{{isShow}}</h1>
        <div style="text-align: right; font-size: 12px;position:relative;
  top: -50px;">
          <el-button type="primary"
                     plain
                     @click="insert">新增</el-button>
        </div>

        <div class="grid-content bg-purple-dark"></div>
      </el-col>
      <el-col :span="24">
        <el-table :cell-style="cellStyle"
                  :data="tableData"
                  style="width: 100%">
          <el-table-column prop="name"
                           label="配置名称"
                           width="180">
          </el-table-column>
          <el-table-column label="配置详情"
                           width="320">
            <template slot-scope="scope">
              <el-popover trigger="hover"
                          placement="top">
                <p>配置名称: {{ scope.row.name }}</p>
                <p>配置详情: {{ scope.row.value }}</p>
                <p>配置类型: {{ scope.row.type }}</p>
                <div slot="reference"
                     class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.value }}</el-tag>
                </div>
              </el-popover>
            </template>
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
      <!-- <el-col :span="12">
        <el-table :cell-style="cellStyle"
                  :data="tableData2"
                  style="width: 100%">
          <el-table-column prop="name"
                           label="配置名称"
                           width="180">
          </el-table-column>
          <el-table-column label="配置详情"
                           width="320">
            <template slot-scope="scope">
              <el-popover trigger="hover"
                          placement="top">
                <p>配置名称: {{ scope.row.name }}</p>
                <p>配置详情: {{ scope.row.value }}</p>
                <p>配置类型: {{ scope.row.type }}</p>
                <div slot="reference"
                     class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.value }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="open(scope.$index, scope.row)">编辑</el-button>

            </template>
          </el-table-column>
        </el-table>
        <div class="grid-content bg-purple-light"></div>
      </el-col> -->
    </el-row>
    <!-- 弹窗样式 -->
    <el-dialog :title="title"
               :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="form">
        <el-form-item label="配置名称"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置类型"
                      :label-width="formLabelWidth">
          <el-input v-model="form.type"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置详情"
                      :label-width="formLabelWidth">
          <el-input v-model="form.value"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备详情"
                      :label-width="formLabelWidth">
          <el-select placeholder="请选择设备"
                     v-model="form.equipment">
            <el-option v-for="(item) in dataList"
                       :label="item.name"
                       :value="item.id"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前后端标识"
                      :label-width="formLabelWidth">
          <el-select placeholder="请选择标识"
                     v-model="form.universe">
            <el-option v-for="(item) in universeList"
                       :label="item.name"
                       :value="item.id"
                       :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="监所编号"
                      :label-width="formLabelWidth">
          <el-input v-model="form.prisonId"
                    autocomplete="off"></el-input>
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
  </div>

</template>

 <script>

import { post, put, deleteData } from '@/config/network'
export default {
  name: "configIndex",
  components: {

  },
  data () {
    return {
      formLabelWidth: '120px',
      title: "",
      token:this.$store.getters.getToken,
      dataList: [],
      universeList: [{
        id: "2",
        name: "前端标识"
      }, {
        id: "1",
        name: "后端标识"
      }],
      types: '',
      form: {
        name: '',
        id: '',
        prisonId: '',
        type: '',
        equipment: '',
        universe: '',
        value: '',
        status: ''
      },
      tableData: [],
      dialogVisible: false,
      dialogFormVisible: false,
    }
  }, methods: {
    onSearch (universe, type) {
      var data = {
        equipment: type,
        universe: universe
      }
      post("/digital/config/configListResult", data,this.token).then(
        res => {
          this.tableData = res.data
        }
      ).catch(
        err => {
          console.log(err)
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
      this.title = "编辑配置信息";
      this.form = row;
      console.log();
      this.findList();
    },
    deleteOne (index, row) {
      this.dialogVisible = true;
      this.form = row;
    },
    insert () {
      this.findList();
      var data = {
        name: '',
        id: '',
        prisonId: '',
        type: '',
        equipment: '',
        universe: '',
        value: '',
        status: ''
      }
      this.title = "新增配置信息";
      this.dialogFormVisible = true
      this.form = data;
    },
    primary () {
      if (this.form.status == 2)
      {
        this.$message({
          message: '该数据修改后需要重启服务才能生效',
          type: 'warning'
        });

      }
      this.form.status = 1;
      var data = this.form;
      this.dialogFormVisible = false
      if (data.id.length > 0)
      {
        put("/digital/config/" + data.id, data,this.token).then(
          res => {
            if (this.type != null && this.type.type == "99")
            {
              this.onSearch("2", this.type != null ? this.type.type : "");
            } else
            {
              this.onSearch("1", this.type != null ? this.type.type : "");
            }
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
        post("/digital/config", data,this.token).then(
          res => {
            if (this.type != null && this.type.type == "99")
            {
              this.onSearch("2", this.type != null ? this.type.type : "");
            } else
            {
              this.onSearch("1", this.type != null ? this.type.type : "");
            }
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
    findList () {
      if (this.types == 'wu')
      {
        var data = {
          parentId: this.types
        }
        post("/digital/equipment/findListAll", data,this.token).then(
          res => {
            console.log(res.data);
            this.dataList = res
          }
        ).catch(
          err => {
            console.log(err)
          }
        );
      } else
      {
        var data = {
          parentId: this.types
        }
        post("/digital/equipment/findAll", data,this.token).then(
          res => {
            this.dataList = res.data
          }
        ).catch(
          err => {
            console.log(err)
          }
        );
      }


    },
    primaryDelete () {
      this.dialogVisible = false;
      var data = this.form;
      deleteData("/digital/config/" + data.id,this.token).then(
        res => {
          if (this.type != null && this.type.type == "99")
          {
            this.onSearch("2", this.type != null ? this.type.type : "");
          } else
          {
            this.onSearch("1", this.type != null ? this.type.type : "");
          }

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
    cellStyle ({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (row.status == 1)
      {
        return 'background-color:#F56C6C'
      } else if (row.status == 2)
      {
        return 'background-color: #67C23A'
      } else
      {
        return 'background-color: #EBEEF5'
      }
    },

  }, created () {
    this.onSearch("", "");

  }, props: {
    type: {
      type: Object,
      default: () => { }
    }
  }, computed: {
    isShow () {
      this.types = this.type.id != '0' ? this.type.parentId : 'wu';
      if (this.type != null && this.type.id == "99")
      {
        this.onSearch("2", this.type != null ? this.type.id : "");
        return ""
      }
      this.onSearch("1", this.type.id != '0' ? this.type.id : "");
      return ""
    }
  },
}
  </script>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
  padding-left: 1%;
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
</style>