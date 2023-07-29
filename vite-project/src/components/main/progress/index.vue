<script setup>
import { ElMessage } from 'element-plus'
import { ref, nextTick } from 'vue'
import base from '@/api'
import FloorJobApi from '@/api/floorJob'

const buildingApi = base('building')

const buildingList = ref([])

function listBuilding() {
  buildingApi.list().then(res => {
    buildingList.value = res.data
    if (buildingList.value && buildingList.value.length) {
      queryFloor(buildingList.value[0].buildingId)
    }
  })
}

listBuilding()

const query = ref({
  buildingId: ''
})

const dataList = ref([])

const rowIndexArray = ref([])

const initValue = ref('')

function queryFloor(buildingId) {
  FloorJobApi.queryFloorJobInfo(buildingId).then(res => {
    query.value.buildingId = buildingId
    dataList.value = res.data
    rowIndexArray.value = [] // 数组初始化
    dataList.value.forEach((item, index) => {
      if (initValue.value === '' || item.floorId !== initValue.value) {
        rowIndexArray.value.push(index)
        initValue.value = item.floorId
      } else if (index === dataList.value.length - 1) {
        rowIndexArray.value.push(index + 1)
      }
    })
  })
}

function objectSpanMethod({row, column, rowIndex, columnIndex}) {
  if (columnIndex === 0 || columnIndex === 1 || columnIndex === 6) {
    const i = rowIndexArray.value.indexOf(rowIndex)
    if (i > -1) {
      return { rowspan: rowIndexArray.value[i+1] - rowIndexArray.value[i], colspan: 1 }
    }
    return { rowspan: 0, colspan: 0 }
  }
}

function updateProgress(item) {
  FloorJobApi.generateProgress(item.floorId).then(res => {
    ElMessage.success('进度已更新, 请刷新数据')
  }, err => {
    ElMessage.error(err)
  })
}

function saveFinishCount(item) {
  if (item.finishCount > item.jobCount) {
    ElMessage.error("已完成数不能大于施工面积量");
    return
  }
  FloorJobApi.saveFinishCount(item.id, item.finishCount).then(res =>{
    ElMessage.success('数据已更新')
  }, err => {
    ElMessage.error(err)
  })
}


</script>

<template>
  <div class="flex">
    <el-form :model="query" inline>
      <el-form-item>
        <el-button tag="div" role="button" v-for="item in buildingList" :key="item.buildingId" :type="query.buildingId === item.buildingId ? 'primary' : 'plain'" @click="queryFloor(item.buildingId)">{{ item.buildingName }}</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-divider />
  <el-table :data="dataList" :span-method="objectSpanMethod" border table-layout="auto">
    <el-table-column label="楼层号" prop="floorName" align="center" width="120"></el-table-column>
    <el-table-column label="楼层进度" align="center" width="240">
      <template #default="{row}">
        <el-progress type="dashboard" :percentage="100 * row.progressPer">
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">楼层完成度</span>
          </template>
        </el-progress>
      </template>
    </el-table-column>
    <el-table-column label="工序" prop="jobName" width="200"></el-table-column>
    <el-table-column label="施工面" prop="jobCount" width="200">
      <template #default="{row}">
        <span v-if="row.jobCount">{{ row.jobCount }}{{ row.jobUnit }}</span>
      </template>
    </el-table-column>
    <el-table-column label="已完成" prop="finishCount" width="260px">
      <template #default="{row}">
        <el-input v-model="row.finishCount" @keyup.enter="saveFinishCount(row)">
          <template #suffix>{{ row.jobUnit }}</template>
          <template #append>
            <el-button type="primary" @click="saveFinishCount(row)">Save</el-button>
          </template>
        </el-input>
      </template>
    </el-table-column>
    <el-table-column label="负责人/操作人" prop="workerName"></el-table-column>
    <el-table-column label="操作" #default="{ row }">
      <el-button type="text" @click="updateProgress(row)">更新进度</el-button>
    </el-table-column>
  </el-table>

</template>

<style scoped lang="scss">
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>