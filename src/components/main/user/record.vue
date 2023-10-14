<script setup>
import { queryUserList } from '@/api/user'
import { ref } from 'vue'
import {　listAll } from '@/api/record'

const query = ref({
  userId: '',
  start: '',
  end: ''
})

const userList = ref([])

queryUserList({userName: '', phoneNum: '', status: 1}).then(res => {
  userList.value = res.data
})

const dateParams = ref([])

const shortcuts = [
  {
    text: '近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '近三月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]


const dataList = ref([])

function findAll() {
  if (dateParams.value[1]) {
    query.value.start = dateParams.value[0]
    query.value.end = dateParams.value[1]
  }
  listAll(query.value).then(res => {
    dataList.value = res.data
  })
}
findAll()
</script>

<template>
  <div class="flex">
    <el-form :model="query" inline>
      <el-form-item label="选择用户">
        <el-select v-model="query.userId" placeholder="请选择用户" clearable>
          <el-option v-for="(item, index) in userList" :key="index" :label="item.userName" :value="item.userId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker v-model="dateParams" type="daterange" value-format="YYYY-MM-DD" range-separator="-" :shortcuts="shortcuts" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="findAll">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="dataList">
    <el-table-column type="index" label="#"></el-table-column>
    <el-table-column prop="userName" label="用户名"></el-table-column>
    <el-table-column prop="behavior" label="用户操作"></el-table-column>
    <el-table-column prop="createDt" label="时间"></el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>