<template>
  <div class="app-container">
    <div class="table-title flex-bet">
      <div>供应商列表</div>
      <el-input size="small" v-model="reqParams.keyword" placeholder="请输入供应商名称" @keyup.enter.native="fetchData"></el-input>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      >
      <el-table-column v-for="item in tableParams" :key="item.id" :prop="item.prop" :label="item.name">
      </el-table-column>
    </el-table>
    <el-pagination
      class="pt20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="reqParams.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      reqParams:{
        pageSize:10,
        currentPage:1,
        keyword:''
      },
      pagination:{
        total:0
      },
      tableParams:[
        {prop:'id',name:"ID"},
        {prop:'name',name:"名称"},
        {prop:'phone',name:"电话"},
        {prop:'address',name:"地址"},
        {prop:'createTime',name:"创建时间"},
        {prop:'state',name:"状态"}
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.reqParams).then(res => {
        this.list = res.data.records
        this.pagination.total = res.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.reqParams.currentPage = 1
      this.reqParams.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.reqParams.currentPage = val
      this.fetchData()
    }
  }
}
</script>
