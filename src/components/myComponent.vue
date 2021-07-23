<template>
  <div>
    <div class="itemsContainer" v-for="item in todoList" :key="item.id">
      <div class="item">
        <el-checkbox :label="item.id">{{ item.msg }}</el-checkbox>
        <i
          class="el-icon-delete"
          style="float: right"
          @click="delTodoItemApp(item.id)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        
    }
};
</script>

<style>
</style>