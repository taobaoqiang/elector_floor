<template>
  <div
    class="list-table"
    style="width: 100%;"
  >

    <div class="ipt">
      <el-input
        placeholder="请输入地址"
        v-model="iptValue"
        suffix-icon="el-icon-search color-icon "
        @change="remoteMethod"
      >
      </el-input>
    </div>
    <el-table
      :data="tableData"
      stripe
      :height="height-100"
      @cell-click="setCenter"
      style="width: 100%"
      header-cell-class-name="header-title-list"
    >
      <el-table-column
        type="index"
        label="序号"
        :index="indexMethod"
        width="50"
      ></el-table-column>
      <el-table-column
        v-for="(el ,index) in  tableTitle"
        :key='index'
        :prop="el[0]"
        :label="el[1]"
      ></el-table-column>
      <el-table-column
        label="状态"
        width="80"
      >
        <template v-slot="scope">
          <!-- <img src="../assets/icon/icon01.png" alt=""> -->
          <img
            width="25"
            height="25"
            :src="elevctorImg(scope.row.elevator_situation)"
            alt="电梯状态"
          />

        </template>
      </el-table-column>
    </el-table>

    <div class="page-int">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        hide-on-single-page
        @prev-click="prevFn"
        @next-click="nextFn"
        @current-change="current"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { _ConvertFrom } from "../utils/map.js";
import {mapState} from "vuex"

export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$on("clearValue", this.clearValue);
    });
  },

  data() {
    return {
      pageSize: 20,
      currentPage: 1,
    
      iptValue: "",
      tableTitle: [
        ["community_block_name", "小区"],
        ["building_address", "地址"]
      ]
    };
  },
  computed:{
    ...mapState({
      clickTmpAddress : state => state.clickTmpAddress
    })
  },
  methods: {
    //清空输入
    clearValue() {
      this.iptValue = "";
    },

    //自定义序号
    indexMethod(index) {
      return index + (this.currentPage - 1) * this.pageSize + 1;
    },

    remoteMethod(value) {
      this.$emit("searchFn", value);
      return value;
    },

    //地图设置试点
    async setCenter(row) {
      // 阻止多次点击
      let flag = true;
      let lngLat = "";

      // 禁止多次点击 切换btn 列表 关联
      if (row.id === this.clickTmpAddress) return;
      this.$store.commit('setClickTmpAddress',{clickTmpAddress : row.id})
   
      if (!row.building_east_longitude || !row.building_north_latitude) {
        flag = false;
        let res = await _ConvertFrom.geocoder(row.building_address);
        lngLat = [res[0].location.lng, res[0].location.lat];
      } else {
        lngLat = [row.building_east_longitude, row.building_north_latitude];
      }

      this.$emit("setCenter", lngLat, row.building_address, flag);
    },

    // 上一页
    prevFn() {
      this.$emit("page", "prev");
    },

    // 下一页
    nextFn() {
      this.$emit("page", "next");
    },

    // 当前页
    current(e) {
      this.$emit("page", "current", e);
      this.currentPage = e;
    },

    elevctorImg(index) {
      let src = "";
      let tmpIndex = index || 1;

      // return '../assets/icon/icon01.png'

      switch (tmpIndex) {
        case 1: {
          // 可安装 黄色
          return require("../static/icon/icon02.png");
          break;
        }

        case 7: {
          return require("../static/icon/icon05.png");
          break;
        }
        case 3: {
          return require("../static/icon/icon03.png");
          break;
        }
        case 4: {
          return require("../static/icon/icon04.png");
          break;
        }
        case 5: {
          return require("../static/icon/icon01.png");
          break;
        }

        default: {
          return "../static/icon/icon05.png";
          break;
        }
      }
    }
  }
};
</script>
<style scoped>
.list-table {
  padding: 2px 5px;
}
.page-int {
  margin-top: 10px;
}
.ipt {
  height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  margin: 0 auto;
}
</style>