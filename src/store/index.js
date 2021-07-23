import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* todoList: [{
        id: 1,
        msg: "事项一",
        done: false
      },
      {
        id: 2,
        msg: "事项二",
        done: false
      },
      {
        id: 3,
        msg: "事项三",
        done: true
      },
      {
        id: 4,
        msg: "事项四",
        done: true
      },
      {
        id: 5,
        msg: "事项五",
        done: true
      }
    ] */
    todoList: window.localStorage.getItem("todoList") ? JSON.parse(window.localStorage.getItem("todoList")) : []
  },
  mutations: {
    setToLocal(state) {
      var temp = JSON.stringify(state.todoList)
      window.localStorage.setItem("todoList", temp)
    },
    getLocal(state) {
      state.todoList = JSON.parse(window.localStorage.getItem("todoList"))
    },
    updateLocal() {
      this.commit("setToLocal")
      this.commit("getLocal")
    },
    allChange(state, val) {
      console.log("m")
      state.todoList.forEach((item) => {
        item.done = val;
      });
      this.commit("updateLocal")
    },
    itemChangeHandle(state, {
      checkedCount,
      value
    }) {
      state.todoList.forEach((item) => {
        item.done = false;
      });
      for (var i = 0; i < checkedCount; i++) {
        for (var j = 0; j < state.todoList.length; j++) {
          if (value[i] == state.todoList[j].id) {
            state.todoList[j].done = true;
          }
        }
      }
      console.log(state.todoList)
      this.commit("updateLocal")
    },
    delTodoItem(state, id) {
      for (var i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id == id) state.todoList.splice(i, 1);
      }
      this.commit("updateLocal")
      console.log("删除todoItem");
    },
    addItem(state, iptText) {
      console.log("添加事项");
      var id1 = state.todoList.length ? state.todoList[state.todoList.length - 1].id + 1 : 1;
      var todo = {
        id: id1,
        msg: iptText,
        done: false,
      };
      //console.log(todo)
      state.todoList.push(todo);
      this.commit("updateLocal")
    },
    clearAllDone(state) {
      state.todoList = state.todoList.filter(item => {
        if (!item.done) return item
      })
      this.commit("updateLocal")
    }
  },
  actions: {},
  modules: {}
})