<template>

  <el-container>
    <el-header style="font-size: 12px;">
      <img src="../assets/logo.png"
           style="width: 200px; margin-top: 5px;" />
      <div style=" text-align: right; margin-top: -35px;"><el-dropdown>
          <i class="el-icon-setting"
             style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <div @click="zhuxiao"><el-dropdown-item>注销</el-dropdown-item></div>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right: 20px">{{name.name}}</span>
      </div>

    </el-header>
    <el-container>
      <el-aside width="200px"
                style="background-color: rgb(255, 255, 255)">
        <el-menu :default-openeds="[opends]">
          <template v-for="item in menuList">
            <el-submenu v-if="item.child.length"
                        :index="item.sortOrder"
                        :key="item.sortOrder">
              <template slot="title">
                <i :class="item.icon"></i>
                {{ item.menuName }}
              </template>
              <el-menu-item style="color: rgb(0, 0, 0);"
                            v-for="(items, key) in item.child"
                            :key="key"
                            :index="items.key"
                            @click="handleSelect(item.child[key],item)">
                <i :class="item.child[key].icon"></i>
                {{ items.menuName }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item style="color: rgb(0, 0, 0);"
                          v-else
                          :index="item.key"
                          :key="item.key"
                          @click="handleSelect(item.child[item.key],item)">
              <i :class="item.icon"></i>
              {{ item.menuName }}
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main style=" border: 1px solid #ffffff">
        <div class="body">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<style>
.el-header {
  background-color: #a8a8a8;
  color: rgb(0, 0, 0);
}
.logo {
  width: 200px;
}
.el-aside {
  color: rgb(255, 255, 255);
}
</style>

<script>
import { post } from '@/config/network'
export default {
  data () {
    return {
      name: this.$store.getters.getUser,
      token: this.$store.getters.getToken,
      opends: window.sessionStorage.getItem("opends") != null ? window.sessionStorage.getItem("opends") : "1",
      menuList: [
        // {
        //   menuName: "首页",
        //   sortOrder: "1",
        //   authorityPath: "/home",
        //   icon:"el-icon-s-home",
        //   child: []
        // }, {
        //   menuName: "配置中心",
        //   sortOrder: "3",
        //   authorityPath: "/index",
        //   icon:"el-icon-monitor",
        //   child: []
        // }, {
        //   menuName: "设备管理",
        //   sortOrder: "2",
        //   authorityPath: "/equipment",
        //   icon:"el-icon-video-camera",
        //   child: []
        // },  {
        //   menuName: "系统管理",
        //   sortOrder: "4",
        //   authorityPath: "/system",
        //   icon:"el-icon-setting",
        //   child: [{
        //     menuName: "用户管理",
        //     sortOrder: "1",
        //     authorityPath: "/user",
        //     icon:"el-icon-s-custom",
        //     child: []
        //   },
        //   {
        //     menuName: "角色管理",
        //     sortOrder: "2",
        //     authorityPath: "/role",
        //     icon:"el-icon-s-check",
        //     child: []
        //   }, {
        //     menuName: "菜单管理",
        //     sortOrder: "3",
        //     authorityPath: "/menu",
        //     icon:"el-icon-menu",
        //     child: []
        //   }, {
        //     menuName: "字典管理",
        //     sortOrder: "4",
        //     authorityPath: "/diction",
        //     icon:"el-icon-s-data",
        //     child: []
        //   }, {
        //     menuName: "定时任务管理",
        //     sortOrder: "5",
        //     authorityPath: "/timedTask",
        //     icon:"el-icon-timer",
        //     child: []
        //   }]
        // },{
        //   menuName: "空间管理",
        //   sortOrder: "5",
        //   authorityPath: "/meto",
        //   icon:"el-icon-office-building",
        //   child: []
        // }, {
        //   menuName: "个人中心",
        //   sortOrder: "6",
        //   authorityPath: "/meto",
        //   icon:"el-icon-notebook-1",
        //   child: []
        // }, {
        //   menuName: "关于我们",
        //   sortOrder: "7",
        //   authorityPath: "/meto",
        //   icon:"el-icon-user",
        //   child: []
        // }
      ]
    }
  },
  methods: {
    zhuxiao () {
      window.sessionStorage.clear()
      var currentPath = window.document.location.origin;
      console.log(currentPath);
      window.open(currentPath, '_parent')
    },
    handleSelect (items, item) {
      this.opends = item.sortOrder
      window.sessionStorage.setItem("opends", item.sortOrder);
      if (items != null && this.$route.path == items.url || item != null && this.$route.path == item.authorityPath)
      {
        return
      }
      if (items != null)
      {
        this.$router.replace(items.authorityPath);
      } else
      {
        this.$router.replace(item.authorityPath);
      }
    },
    onSearch () {
      var data = {
        action:'menu'
      };
      post("/digital/menu/findAllList", data, this.token).then(
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

          this.menuList = res.data
        }
      ).catch(
        err => {
          console.log(err)
        }
      );
    },
    
  },
  created () {
    this.onSearch();
  },

};
</script>