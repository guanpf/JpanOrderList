<template>
  <div class="app-container">
    <div class="num">{{ $route.query.id ? "修改" : "添加" }}订单</div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="刷单次数" prop="num">
        <el-input v-model.number="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="memo">
        <el-input v-model="ruleForm.memo"></el-input>
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-select
          v-model.trim="ruleForm.country"
          filterable
          reserve-keyword
          placeholder="请输入国家或地区"
          :remote-method="getAllGoods"
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
        <!-- <el-input v-model="ruleForm.goods"></el-input> -->
      </el-form-item>
      <div>
        <Product ref="product"></Product>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{
          $route.query.id ? "保存" : "立即创建"
        }}</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOrder } from "@/api/order";
import { getAllGoods } from "@/api/goods";
import { getAllSupplier } from "@/api/supplier";
import Product from "./components/product.vue";
export default {
  components: { Product },
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
      loading: false,
      countryOptions: [
        {
          name: "美国",
          id: "us",
        },
      ],
      supplierOptions: [],
      ruleForm: {
        memo: "", //备注
        num: 1, //刷单次数
        country: "", //国家
        proList: [],
        // "createTime": "2021-06-19 12:44:55",
        // "state": 1
      },
      rules: {
        num: [
          {
            required: true,
            message: "请填写采购记录",
            trigger: "blur",
          },
        ],
        memo: [
          {
            required: true,
            message: "请填写备注",
            trigger: "blur",
          },
        ],
        country: [
          {
            required: true,
            message: "请填写国家",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    // this.fetchData()
    if (this.$route.query.id) {
      // this.getDetail();
    }
  },
  methods: {
    getAllGoods(goodsName) {
      this.countryOptions = [
        {
          name: "美国",
          id: "us",
        },
      ];
      //   if (goodsName !== "") {
      //     this.loading = true;
      //     let params = {
      //       keyword: goodsName,
      //     };
      //     getAllGoods(params).then((res) => {
      //       if (res.code == 0) {
      //         this.countryOptions = res.data;
      //       }
      //     });
      //     this.loading = false;
      //   }
    },
    getAllSupplier(supplierName) {
      if (supplierName !== "") {
        this.loading = true;
        let params = {
          keyword: supplierName,
        };
        getAllSupplier(params).then((res) => {
          if (res.code == 0) {
            this.supplierOptions = res.data.records;
          }
        });
        this.loading = false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.ruleForm
          console.log(150, this.$refs.product.productList);
          this.ruleForm.proList = this.$refs.product.productList;
          addOrder(this.ruleForm).then((res) => {
            if (res.code == 1) {
              this.$message({
                type: "success",
                message: "创建成功",
              });
              this.$router.go(-1);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getDetail() {
      getDetail(this.$route.query.id).then((res) => {
        if (res.code == 0) {
          this.ruleForm = res.data;
          this.getAllGoods(res.data.goodsName);
          this.getAllSupplier(res.data.supplierName);
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
.app-container {
  .el-input {
    width: 250px;
  }
}
.num {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  font-size: 18px;
}
</style>
