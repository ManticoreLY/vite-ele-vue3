<script setup>
import cookies from '@/utils/cookies'
import { ref } from 'vue'
import { findWorker, listWorkerJob } from '@/api/worker'

const selectedWorkerId = ref('')

const workerId = ref('')

const userId = cookies.get('userId')

function findMyWorkerId() {
  findWorker().then(res => {
    workerId.value = res.data.workerId
    queryWorkerJobInfo(workerId.value)
  })
}

findMyWorkerId()

const jobList = ref([])

const totalSalary = ref(0)
function queryWorkerJobInfo(workerId) {
  listWorkerJob(workerId).then(res => {
    jobList.value = res.data
    selectedWorkerId.value = workerId
    totalSalary.value = 0
    // totalSalary.value = jobList.value.reduce((pre, cur) => pre + cur.jobPrice * cur.finishCount);
    jobList.value.forEach(item => {
      totalSalary.value += item.jobPrice * item.finishCount
    })
  })
}
</script>

<template>
  <div class="flex justify-end">
    <div style="color: #008aff;font-size: 24px; font-weight: 800;">应得收入合计: {{ totalSalary }}元</div>
  </div>
  <el-divider />
  <el-table :data="jobList" border width="800">
    <el-table-column type="index" label="序号" width="80"></el-table-column>
    <el-table-column label="楼栋" prop="buildingName"></el-table-column>
    <el-table-column label="楼层" prop="floorName"></el-table-column>
    <el-table-column label="完成工序" prop="jobName"></el-table-column>
    <el-table-column label="工序单价" prop="jobPrice"></el-table-column>
    <el-table-column label="完成量" prop="finishCount">
      <template #default="{row}">{{ row.finishCount || 0 }}{{ row.jobUnit }}</template>
    </el-table-column>
    <el-table-column label="应得收入">
      <template #default="{row}">
        {{ row.jobPrice * row.finishCount }}元
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss">

</style>