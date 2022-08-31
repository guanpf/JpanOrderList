<template>
  <div class="app-container">
    <div class="table-title flex-bet">
      <div class="flex-start">
        <span>任务管理列表</span>
        <el-select
          class="select-item"
          v-model.trim="reqParams.country"
          filterable
          reserve-keyword
          placeholder="请输入国家或地区"
          :loading="loading"
        >
          <el-option
            v-for="item in countryOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select class="select-item" v-model.trim="reqParams.status" :loading="loading">
          <el-option label="完成" value="01"> </el-option>
        </el-select>
        <el-input
          size="small"
          v-model="reqParams.dhNo"
          placeholder="请输入敦煌单号"
        ></el-input>
        <el-input
          size="small"
          v-model="reqParams.email"
          placeholder="请输入邮箱"
        ></el-input>
      </div>
      <el-button size="small" @click.native="fetchData">搜索</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        v-for="item in tableParams"
        :key="item.id"
        :prop="item.prop"
        :label="item.name"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      class="pt20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="reqParams.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTaskList } from "@/api/task";
import { parseTime } from "@/utils/index";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [],
      listLoading: false,
      reqParams: {
        size: 10,
        current: 1,
        dhNo: "", //敦煌单号
        email: "", //邮箱
        country: "", //国家
        status: "", //状态
        // keyword: "",
      },
      countryOptions: [
        {
          name: "美国",
          id: "us",
        },
      ],
      pagination: {
        total: 0,
      },
      tableParams: [
        { prop: "dhNo", name: "敦煌单号" },
        { prop: "country", name: "国家" },
        { prop: "email", name: "邮箱" },
        { prop: "status", name: "状态" },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getTaskList(this.reqParams).then((res) => {
        if (res.data && res.data.records.length > 0) {
          this.list = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.list = [];
          this.pagination.total = 0;
        }
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      this.reqParams.current = 1;
      this.reqParams.size = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.reqParams.current = val;
      this.fetchData();
    },
    update(id) {
      this.$router.push({ path: "detail", query: { id: id } });
    },
    deleteRow(id) {
      deleteOrder(id).then((res) => {
        if (res.code == 1) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.fetchData();
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.add-btn {
  margin-left: 10px;
}
::v-deep.select-item {
  .el-input {
    width: 180px;
    margin-right: 30px;
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
  }
  .el-input__suffix {
    display: flex;
    align-items: center;
  }
}
::v-deep.table-title .el-input {
  width: 180px;
  margin-right: 30px;
}
</style>
