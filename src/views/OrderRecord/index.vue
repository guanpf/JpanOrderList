<template>
  <div class="app-container">
    <div class="table-title flex-bet">
      <div class="flex-start">
        <span>订单管理列表</span>
        <el-button
          class="add-btn"
          size="mini"
          type="primary"
          @click="$router.push('/OrderRecord/detail')"
          >添加订单</el-button
        >
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
      </div>
      <!-- <el-input
        size="small"
        v-model="reqParams.keyword"
        placeholder="请输入采购记录名称"
        @keyup.enter.native="fetchData"
      ></el-input> -->
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
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <div class="flex-start">
            <!-- <el-button
              size="mini"
              type="primary"
              @click="update(scope.row.id)"
              icon="el-icon-edit"
              >编辑</el-button
            > -->
            <el-button
              size="mini"
              type="danger"
              @click="deleteRow(scope.row.orderNo)"
              icon="el-icon-delete"
              >删除</el-button
            >
          </div>
        </template>
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
import { getOrderList, deleteOrder } from "@/api/order";
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
        country: "us",
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
        { prop: "orderNo", name: "订单编号" },
        { prop: "country", name: "国家" },
        { prop: "num", name: "刷单次数" },
        { prop: "memo", name: "备注" },
        { prop: "createTimeP", name: "创建时间" },
      ],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getOrderList(this.reqParams).then((res) => {
        if (res.data && res.data.records.length > 0) {
          this.list = res.data.records.map((item) => {
            let temp = item;
            temp.createTimeP = parseTime(item.createTime);
            return temp;
          });
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
</style>
