<template>
  <div class="app-container">
    <div class="title">{{$route.query.id?'修改':'添加'}}商品</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="info">
        <el-input v-model="ruleForm.info"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{$route.query.id?'保存':'立即创建'}}</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add,getDetail,update } from '@/api/goods'

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
      ruleForm:{
        "id":'',
        "name": "",
        "price": "",
        "info": "",
        // "createTime": "2021-06-19 12:44:55",
        // "state": 1
      },
      rules:{
          name: [
            { required: true, message: '请填写商品名称', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请填写商品价格', trigger: 'blur' }
          ],
          info: [
            { required: true, message: '请填写商品描述', trigger: 'blur' }
          ],
      }
    }
  },
  created() {
    // this.fetchData()
    if(this.$route.query.id){
      this.getDetail()
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.ruleForm
          if(this.$route.query.id){
            update(this.ruleForm).then(res=>{
              if(res.code == 0){
                this.$message({
                  type:'success',
                  message:"更新成功"
                })
                this.$router.go(-1)
              }
            })
          }else{
            add(this.ruleForm).then(res=>{
              if(res.code == 0){
                this.$message({
                  type:'success',
                  message:"创建成功"
                })
                this.$router.go(-1)
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getDetail(){
      getDetail(this.$route.query.id).then(res=>{
        if(res.code == 0){
          console.log(res.data)
            this.ruleForm = res.data
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .app-container{
    .el-input{
      width:250px;
    }
  }
  .title{
    height:60px;
    line-height: 60px;
    padding:0 20px;
    font-size:18px;
  }
</style>
