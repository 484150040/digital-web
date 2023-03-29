<template>
  <el-container>
    <el-aside width="200px">
      <el-aside width="200px"
                style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="[opends]">
          <template v-for="item in NavigateItem">
            <el-submenu v-if="item.equipments.length"
                        :index="item.id"
                        :key="item.id">
              <template slot="title">
                {{ item.name }}
              </template>
              <el-menu-item style="color: rgb(0, 0, 0);" v-for="(items, key) in item.equipments"
                            :key="key"
                            :index="items.key" @click="handleSelect(item.equipments[key],item)">
                {{ items.name }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item style="color: rgb(0, 0, 0);" v-else
                          :index="item.key"
                          :key="item.key" @click="handleSelect(item.equipments[item.key],item)">
              {{ item.name }}
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
    </el-aside>
    <el-main style="height: 750px; border: 1px solid #eee">
      <div class="body">
        <configIndex :type="type"></configIndex>
      </div>
    </el-main>
  </el-container>
</template>

<style>
.el-aside {
  color: rgb(218, 218, 218);
}
</style>

<script>
import configIndex from "./configIndex.vue"
import { post } from '@/config/network'
export default {
  components: {
    configIndex
  },
  data () {
    
    return {
      type:{id:'0'},
      opends:"0",
      token:this.$store.getters.getToken,
      NavigateItem: [],
    }
  },
  methods: {
    handleSelect (items,item) {
      if (items!=null) {
        this.type = items
      }else{
        this.type = item
      }
      
      this.opends = item.id
    },
    findList () {
      var data = {
        parentId:"wu"
      }
      post("/digital/equipment/findList",data,this.token).then(
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
          this.NavigateItem = res
          console.log(this.NavigateItem);

        }
      ).catch(
        err => {
          console.log(err)
        }
      );

    },
  },
  created () {
    this.currentRoute1 = this.$route.path;
    this.findList();
  },
};
</script>