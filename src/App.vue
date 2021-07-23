<template>
  <div id="app">
    <div class="cardContainer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>todoList</span>
          <el-checkbox
            v-model="checkAll"
            style="float: right"
            @change="handleChange"
            >全选</el-checkbox
          >
          <el-input
            v-model="iptText"
            placeholder="请输入内容"
            size="small"
            style="margin-top: 5px"
          >
            <el-button
              slot="append"
              icon="el-icon-thumb"
              @click="addItemApp()"
            ></el-button>
          </el-input>
        </div>
        <el-checkbox-group
          v-model="checkedTodoList"
          @change="handleCheckedTodoListChange"
        >
          <div
            class="itemsContainer"
            v-for="item in tempTodoList"
            :key="item.id"
          >
            <div class="item">
              <el-checkbox :label="item.id">{{ item.msg }}</el-checkbox>
              <i
                class="el-icon-delete"
                style="float: right"
                @click="delTodoItemApp(item.id)"
              ></i>
            </div>
          </div>
        </el-checkbox-group>
        <div class="buttomContainer">
          <el-button plain size="mini" round @click="allTodoList"
            >all({{ allCount }})</el-button
          >
          <el-button
            type="primary"
            plain
            size="mini"
            round
            @click="doneTodolist"
            >已完成({{ isDone }})</el-button
          >
          <el-button
            type="success"
            plain
            size="mini"
            round
            @click="undoneTodolist"
            >未完成({{ unDone }})</el-button
          >
          <el-button type="warning" plain size="mini" round @click="clearDone"
            >清空已完成</el-button
          >
        </div>
        <pie-chart :dateSource="dateSource" ref="mypieChart"></pie-chart>
      </el-card>
    </div>
  </div>
</template>

<script>
import pieChart from "./components/mypie.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "app",
  components: {
    pieChart,
  },
  created() {
    console.log(this.todoList);
    this.init();
  },
  data() {
    return {
      checkAll: false,
      checkedTodoList: [],
      iptText: "",
      tempTodoList: [],
/*       dateSource: [], */
    };
  },
  methods: {
    ...mapMutations([
      "allChange",
      "itemChangeHandle",
      "delTodoItem",
      "addItem",
      "clearAllDone",
    ]),
    init() {
      this.tempTodoList = this.todoList;
      this.checkedTodoList = [];
      this.todoList.forEach((item) => {
        if (item.done) this.checkedTodoList.push(item.id);
      });
/*       this.dateSource = [
        {
          name: "idDone",
          value: this.isDone,
        },
        {
          name: "unDone",
          value: this.unDone,
        },
      ]; */
    },
    handleChange(val) {
      /*    this.checkAll = !this.checkAll;
      this.isIndeterminate = !this.isIndeterminate; */
      /* this.checkedTodoList = val.length ? this.todoList.length : []; */
      /*       if (val) {
        this.todoList.forEach((item) => {
          item.done = true;
        });
      } else {
        this.todoList.forEach((item) => {
          item.done = false;
        });
      } */

      this.allChange(val);
      this.init();
    },
    handleCheckedTodoListChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.todoList.length;
      this.itemChangeHandle({ checkedCount, value });
    },
    delTodoItemApp(id) {
      this.delTodoItem(id);
      this.init();
    },
    addItemApp() {
      if (this.iptText.trim().length > 0) {
        this.addItem(this.iptText);
        this.iptText = "";
      }
      this.init();
    },
    allTodoList() {
      //this.router.push({name: 'app'})
      this.init();
      console.log("全部事项");
    },
    doneTodolist() {
      //this.router.push({name: 'isDone'})
      this.tempTodoList = this.todoList.filter((item) => {
        if (item.done) return item;
      });
      console.log("已完成事项");
    },
    undoneTodolist() {
      //this.$router.push({ path: "/unDone" });
      //this.todoList
      this.tempTodoList = this.todoList.filter((item) => {
        if (!item.done) return item;
      });
      console.log(this.tempTodoList);
      console.log("未完成了");
    },
    clearDone() {
      this.clearAllDone();
      this.init();
      console.log("清空已完成");
    },
  },
  computed: {
    ...mapState(["todoList"]),
    allCount() {
      return this.todoList.length;
    },
    isDone() {
      var len = 0;
      this.todoList.forEach((item) => {
        if (item.done) len++;
      });
      return len;
    },
    unDone() {
      var len = 0;
      this.todoList.forEach((item) => {
        if (!item.done) len++;
      });
      return len;
    },
    dateSource() {
      //console.log(this.isDone, this.unDone)
      //location.reload()
/*       var temp = window.localStorage.getItem("temp") ? window.localStorage.getItem("temp") : 0
      if (this.unDone != temp) {
        location.reload()
        temp = this.unDone
      } */
      return [
        {
          name: "isDone",
          value: this.isDone,
        },
        {
          name: "unDone",
          value: this.unDone,
        },
      ];
    },
  },
  watch : {
    dateSource: function() {
      console.log(this.$refs.mypieChart.update())
    }
  }
};
</script>

<style scoped>
#app {
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.itemsContainer :hover {
  cursor: pointer;
}

.cardContainer {
  width: 500px;
}

.el-checkbox-group {
  font-size: inherit;
}

.buttomContainer {
  padding-top: 20px;
}
</style>
