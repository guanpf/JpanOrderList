<template>
  <div class="product-content">
    <div class="big-title">产品信息</div>
    <div class="base-info">
      <template>
        <div class="flex-row-work" v-for="(item, index) in productList" :key="index">
          <i
            class="el-icon-circle-plus-outline work-inout"
            v-if="index == 0"
            @click="addWork"
          ></i>
          <i
            class="el-icon-remove-outline work-inout"
            v-if="index != 0"
            @click="removeWork(index, item.id)"
          ></i>
          <span class="work-label-name">链接：</span>
          <el-input
            class="work-name"
            placeholder="链接地址"
            v-model="item.url"
          ></el-input>

          <span class="work-label-name">数量：</span>
          <el-input
            class="work-label-score"
            placeholder="数量"
            v-model.number="item.num"
          ></el-input>

          <span class="work-label-name">关键字：</span>
          <el-input
            class="work-label-score"
            placeholder="关键字"
            v-model.number="item.searchKey"
          ></el-input>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      depName: "",
      score: "",
      productList: [
        {
          num: "",
          url: "",
          searchKey: "",
        },
      ],
      workIndex: 0,
      showEdit: false,
      showEditIcon: false,
      uploadTagList: [],
    };
  },
  mounted() {
    // if (this.info.resultStatus) {
    //   this.showEditIcon = false;
    // } else {
    //   this.showEditIcon = true;
    // }
    // if (this.info.staffCode && this.info.activityId) {
    //   this.getJobDetail();
    // } else {
    //   this.show;
    // }
  },
  methods: {
    addWork() {
      let temp = {
        num: "",
        url: "",
        searchKey: "",
      };
      this.productList.push(temp);
    },
    removeWork(index, id) {
      this.productList.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.product-content {
  padding-left: 20px;
}
.big-title {
  width: 100px;
  text-align: right;
  padding-right: 12px;
  display: block;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  color: #606266;
}

::v-deep.flex-row-work {
  padding-left: 70px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
  line-height: 30px;

  .el-input__inner {
    height: 30px;
  }

  .work-inout {
    font-size: 32px;
  }

  .work-name {
    width: 120px;
  }

  .work-label-name {
    text-align: right;
    width: 65px;
    margin: 0 10px 0 10px;
  }

  .work-label-score {
    width: 75px;

    .el-input__inner {
      height: 30px;
    }
  }

  .work-file-content {
    // margin-right: 15px;
    max-width: 360px;
    flex: 1;
  }
}

.work-upload-file {
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
}
.el-icon-edit-outline {
  margin-left: 15px;
  cursor: pointer;
  color: #00796a;
}
.all-score {
  height: 30px;
  line-height: 30px;
  margin: 5px 0 20px;
}
::v-deep.work-all-score {
  width: 100px;

  .el-input__inner {
    height: 30px;
  }
}
.work-file-item {
  cursor: pointer;
  color: #00796a;
  border-bottom: 1px solid #00796a;
}
</style>
