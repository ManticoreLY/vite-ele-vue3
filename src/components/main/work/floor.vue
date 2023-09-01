<script setup>
import { ElMessage } from 'element-plus'
import { ref, nextTick } from 'vue'
import base from '@/api/index'
import floorApi from '@/api/floor'
import floorJobApi from '@/api/floorJob'
import { listWorker } from '@/api/worker'

const buildingApi = base('building')

const buildingList = ref([])

const workerList = ref([])

function onTabChange(tab) {
  query.value.buildingId = tab.paneName
  queryFloor()
}

function listBuilding() {
  buildingApi.list().then(res => {
    buildingList.value = res.data
    if (buildingList.value && buildingList.value.length) {
      query.value.buildingId = buildingList.value[0].buildingId
      queryFloor()
    }
  })
}

listBuilding()

listWorker().then(res => {
  workerList.value = res.data
})

const query = ref({
  buildingId: ''
})

function queryFloor() {
  const buildingId = query.value.buildingId
  floorApi.findByBuildingId(buildingId).then(res => {
    dataList.value = res.data
    query.value.buildingId = buildingId
  })
}

const dataList = ref([])

function addItem() {
  model.value.title = '新建楼层'
  model.value.visible = true
  model.value.isEdit = false

  form.value = Object.assign(form.value, { buildingId: query.value.buildingId })
}

function editItem(item) {
  model.value.title = '修改楼层'
  model.value.visible = true
  model.value.isEdit = true

  form.value = Object.assign(form.value, item)
}

function relateJob(item) {
  jobVisible.value = true
  nextTick(() => {
    relatedForm.value.floorList.push(item);
    relatedForm.value.jobIdList = item.floorJobs.map(t => t.jobId)
  })
}
function removeItem(jobId) {
  floorApi.remove(jobId).then(() => {
    ElMessage.success('数据已移除')
    queryFloor()
  }, err => {
    ElMessage.error(err)
  })
}

const model = ref({
  title: '用户修改',
  visible: false,
  isEdit: false
})


const form = ref({
  floorName: '', //
  orderIndex: '',
  floorInfo: '',
})

const batchForm = ref({
  floorNameList: [],
  buildingId: ''
})

const batchModelVisible = ref(false)

const batchModel = ref({
  from: '',
  to: '',
  letter: ''
})

function onBatchSave() {
  if (isNaN(batchModel.value.from) || isNaN(batchModel.value.to)) {
    ElMessage.error('起止楼层数必须是数字');
    return
  }
  const from = parseInt(batchModel.value.from)
  const to = parseInt(batchModel.value.to)
  if (to <= from) {
    ElMessage.error('结束楼层数必须大于起始楼层楼');
    return
  }
  for(let i = from; i <= to; i++) {
    batchForm.value.floorNameList.push(i + batchModel.value.letter)
  }
  batchForm.value.buildingId = query.value.buildingId
  floorApi.saveInBatch(batchForm.value).then(res => {
    ElMessage.success('批量添加楼层成功!')
    queryFloor()
    batchModelVisible.value = false
  }, err => {
    ElMessage.error(err)
  })
}

function handleClose() {
  model.value.title = ''
  model.value.visible = false
  model.value.isEdit = false

  form.value = Object.assign(form.value, {
    floorName: '', //
    orderIndex: '',
    floorInfo: '',
  })
}

const jobEditVisible = ref(false)

function handleSave() {
  if (model.value.isEdit) {
    floorApi.update(form.value).then(() => {
      ElMessage.success('数据已更新！')
      queryFloor()
      handleClose()
    })
  } else {
    floorApi.save(form.value).then(() => {
      ElMessage.success('数据已添加！')
      queryFloor()
      handleClose()
    })
  }
}

const selectedRows = ref([])

function handleSelectionChange(list) {
  selectedRows.value = list
}

const expandTableData = ref([])
function handleExpandChange(row) {
  floorJobApi.listJobs(row.floorId).then(res => {
    expandTableData.value = res.data
  })
}

function relateItemInBatch() {
  if (!selectedRows.value.length) {
    ElMessage.error("请选择需要关联的楼层!")
    return
  }
  jobVisible.value = true
  relatedForm.value.floorList = selectedRows.value
}

const jobApi = base('job')

const jobList = ref([])

jobApi.list().then(res => {
  jobList.value = res.data
})

const jobVisible = ref(false)

const beforeClose = () => {
  relatedForm.value.floorList = []
  relatedForm.value.jobIdList = []

  jobVisible.value = false
}

const relatedForm = ref({
  floorList: [],
  jobIdList: []
})


function saveRelatedForm() {
  floorApi.setFloorJob(relatedForm.value).then(() => {
    ElMessage.success('关联成功!')
    queryFloor()
    beforeClose()
  }, err => {
    ElMessage.error(err)
  })
}

const floorJob = ref({
  id: '',
  jobName: '',
  jobCount: '',
  finishCount: '',
  status: '',
  workerId: ''
})

function onValueChange(value) {
  if (value) {
    floorJob.value.finishCount = floorJob.value.jobCount
  }
}

function editRow(row) {
  jobEditVisible.value = true
  floorJob.value = Object.assign(floorJob.value, row)
}

function saveJobEdit() {
  floorJobApi.update(floorJob.value).then(res => {
    ElMessage.success("数据更新成功")
    queryFloor()
    cancelJobEdit()
  })
}

function cancelJobEdit() {
  floorJob.value = Object.assign(floorJob.value, {
    id: '',
    jobName: '',
    jobCount: '',
    finishCount: '',
    status: '',
    workerId: ''
  })
  jobEditVisible.value = false
}


</script>

<template>
  <el-tabs v-model="query.buildingId" class="demo-tabs" @tab-click="onTabChange">
    <el-tab-pane v-for="item in buildingList" :key="item.buildingId" :label="item.buildingName" :name="item.buildingId"></el-tab-pane>
  </el-tabs>
  <el-button type="primary" icon="plus" size="large" title="新建楼层" circle style="position: fixed; right: 20px; bottom: 20px; z-index: 2;" @click="addItem"></el-button>
  <el-button type="success" icon="FolderAdd" size="large" title="批量添加" circle style="position: fixed; right: 80px; bottom: 20px; z-index: 2;" @click="batchModelVisible = true"></el-button>
  <el-table :data="dataList" @expand-change="handleExpandChange">
    <el-table-column type="expand" label="#">
      <template #default="{row}">
        <el-table :data="row.floorJobs" border :show-header="false" style="margin: 10px 20px; width: 96%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="jobName" width="180"></el-table-column>
          <el-table-column prop="jobCount" width="180">
            <template #default="scope">
              {{ scope.row.jobCount || 0 }}{{ scope.row.jobUnit }}
            </template>
          </el-table-column>
          <el-table-column prop="finishCount" width="180">
            <template #default="scope">
              <span v-if="scope.row.status === 1" style="color: #d21f40">已完成</span>
              <span v-else>{{ scope.row.finishCount || 0 }}{{ scope.row.jobUnit }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="workerName" width="180"></el-table-column>
          <el-table-column #default="scope">
            <el-button type="text" @click="editRow(scope.row)">编辑</el-button>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label="排序" prop="orderIndex" width="80" align="center"></el-table-column>
    <el-table-column label="楼层" prop="floorName"></el-table-column>
<!--    <el-table-column label="备注信息" prop="floorInfo"></el-table-column>-->
    <el-table-column label="操作" #default="{ row }">
      <el-button type="text" @click="editItem(row)">修改</el-button>
      <el-button type="text" @click="relateJob(row)">选择工序</el-button>
      <el-button type="text" @click="removeItem(row.floorId)">删除</el-button>
    </el-table-column>
  </el-table>

  <el-dialog v-model="model.visible" :title="model.title" width="600px" :before-close="handleClose">
    <el-form :model="form" size="large" label-width="96px" style="max-width: 94%">
      <el-form-item label="楼层">
        <el-input v-model="form.floorName" placeholder="请输入楼层号"></el-input>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.orderIndex" type="number" placeholder="排序字段，数值越小排名越靠前"></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="form.floorInfo" placeholder="请输入备注信息"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button plain @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSave">确定</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="batchModelVisible" title="批量添加楼层" width="600px">
    <el-form size="large" label-width="80px">
      <el-form-item label="楼层名称" class="flex">
        <el-input v-model="batchModel.from" placeholder="起始" style="width: 80px"></el-input>
        &nbsp;&nbsp;
        <el-input v-model="batchModel.letter" style="width: 60px"></el-input>
        <span style="width: 40px; text-align: center">-</span>
        <el-input v-model="batchModel.to" placeholder="结束" style="width: 80px"></el-input>
        &nbsp;&nbsp;
        <el-input v-model="batchModel.letter" style="width: 60px"></el-input>
      </el-form-item>
      <el-form-item>
        <div style="color: #999; ">输入起始和结束楼层,必须是数据,第二个输入框为楼层名称的后接字符.</div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onBatchSave">确定</el-button>
      <el-button type="" @click="batchModelVisible = false">关闭</el-button>
    </template>
  </el-dialog>

  <el-drawer v-model="jobVisible" title="关联工序" width="600px" :before-close="beforeClose">
    <el-form :model="relatedForm">
      <el-form-item label="当前楼层">
        <el-button tag="div" role="button" v-for="(item, index) in relatedForm.floorList" :key="index">{{ item.floorName }}</el-button>
      </el-form-item>
      <el-form-item label="选择工序">
        <el-checkbox-group v-model="relatedForm.jobIdList" class="flex-col">
          <el-checkbox v-for="item in jobList" :key="item.jobId" :label="item.jobId">{{ item.jobName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button plain @click="beforeClose">取消</el-button>
      <el-button type="primary" @click="saveRelatedForm">确定</el-button>
    </template>
  </el-drawer>

  <el-dialog v-model="jobEditVisible" title="编辑工序" width="600px">
    <el-form :model="floorJob" size="large" label-width="96px" style="max-width: 80%">
      <el-form-item label="工序名称">
        <el-button tag="div" role="button">{{ floorJob.jobName }}</el-button>
      </el-form-item>
      <el-form-item label="工作量">
        <el-input v-model="floorJob.jobCount" placeholder="填写当前工序的工作面积或工作量"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="floorJob.status" @change="onValueChange" active-text="完成" inactive-text="未完成" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="完成量">
        <el-input v-model="floorJob.finishCount" placeholder="填写当前工序的已完成工作面积或工作量"></el-input>
      </el-form-item>
      <el-form-item label="负责工人">
        <el-select v-model="floorJob.workerId" placeholder="请选择负责的工人或员工">
          <el-option v-for="item in workerList" :key="item.workerId" :label="item.workerName" :value="item.workerId"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="saveJobEdit">确定</el-button>
      <el-button @click="cancelJobEdit">取消</el-button>
    </template>
  </el-dialog>

</template>

<style scoped lang="scss">

</style>