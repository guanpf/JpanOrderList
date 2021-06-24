<template>
  <div class="app-container">
    <div class="table-title flex-bet">
      <div class="flex-start">
        <span >采购记录列表</span>
        <el-button class="add-btn" size="mini" type="primary" @click="$router.push('/OrderRecord/detail')">添加采购记录</el-button>
      </div>
      <el-input size="small" v-model="reqParams.keyword" placeholder="请输入采购记录名称" @keyup.enter.native="fetchData"></el-input>
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
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <div class="flex-start">
            <el-button size="mini" type="primary" @click="update(scope.row.id)" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteRow(scope.row.id)" icon="el-icon-delete">删除</el-button>
          </div>
        </template>
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
import { getList,deleteApi } from '@/api/orderRecord'

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
        {prop:'title',name:"采购记录"},
        {prop:'buyNumber',name:"数量"},
        {prop:'price',name:"价格"},
        {prop:'goods',name:"商品id"},
        {prop:'goodsName',name:"商品"},
        {prop:'supplier',name:"供货商"},
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
    },
    update(id){
      this.$router.push({path:"detail",query:{id:id}})
    },
    deleteRow(id){
      deleteApi(id).then(res=>{
        if(res.code == 0){
            this.$message({
              type:'success',
              message:"删除成功"
            })
            this.fetchData()
        }
      })
    }
  }
}
</script>
<style scoped>
  .add-btn{
    margin-left:10px;
  }
</style>
