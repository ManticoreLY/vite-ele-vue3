<script setup>
import { ElMessage } from 'element-plus'
import { ref, nextTick, reactive } from 'vue'
import FloorApi from '@/api/floor'
import JobApi from '@/api/job'
import { listWorker } from '@/api/worker'
import FloorJobApi from '@/api/floorJob'
import base from '@/api/index'

const jobList = ref([])

const selectedJobId = ref()

const workerList = ref([])

const BuildIngApi = base('building')

JobApi.list().then(res => {
  jobList.value = res.data
  if (jobList.value && jobList.value.length) listFloor(jobList.value[0].jobId)
})

listWorker().then(res => {
  workerList.value = res.data
})

const dataList = ref([])
function listFloor(jobId) {
  selectedJobId.value = jobId
  FloorApi.listFloorByJobId(jobId).then(res => {
    dataList.value = res.data
  })
}

const ruleForm = ref()

function addItem() {
  model.value.title = '添加楼层'
  model.value.isEdit = false
  model.value.visible = true
}

function editItem(item) {
  model.value.title = ''
  model.value.isEdit = true
  model.value.visible = true
  nextTick(() => {
    form.value = Object.assign(form.value, item)
  })
}

const model = ref({
  visible: false,
  title: '楼层工序设置',
  isEdit: false
})

const form = ref({
  buildingName: '',
  floorId: '',
  floorName: '',
  jobId: '',
  workerId: '',
  jobCount: 0
})

const rules = reactive({
  floorId: [{ required: true, message: '请选择楼层', trigger: 'change' }],
  jobCount: [{ required: true, message: '施工面积/量未填写', trigger: 'blur' }],
  workerId: [{ required: true, message: '未选择施工人', trigger: 'change' }]
})

const selectedBuilding = ref('')

const buildingList = ref([])

const floorList = ref([])

BuildIngApi.list().then(res => {
  buildingList.value = res.data
})

function onSelectBuilding(value) {
  FloorApi.listBuildingFloor(value).then(res => {
    floorList.value = res.data
  })
}


function onSave() {
  ruleForm.value.validate(valid => {
    if (valid) {
      if (model.value.isEdit) {
        FloorJobApi.update(form.value).then(res => {
          ElMessage.success('修改成功!')
          listFloor(selectedJobId.value)
          onClose()
        })
      } else {
        form.value.jobId = selectedJobId.value
        FloorJobApi.save(form.value).then(res => {
          ElMessage.success('添加成功!')
          listFloor(selectedJobId.value)
          onClose()
        })
      }
    }
  })

}

function onClear() {
  model.value.isEdit = false
  model.value.title = ''

  form.value = Object.assign(form.value, {
    buildingName: '',
    floorId: '',
    floorName: '',
    jobId: '',
    workerId: '',
    jobCount: 0
  })
}
function onClose() {
  onClear()
  model.value.visible = false
}

</script>

<template>
  <div class="flex">
    <el-button tag="div" role="button" v-for="(item, index) in jobList" :key="index" @click="listFloor(item.jobId)" :type="selectedJobId === item.jobId ? 'primary' : ''">{{ item.jobName }}</el-button>
<!--    <el-button type="success" @click="addItem">添加楼层</el-button>-->
  </div>
  <el-divider />

  <el-table :data="dataList" border>
    <el-table-column type="index" label="序号" width="80"></el-table-column>
    <el-table-column label="楼栋号" prop="buildingName"></el-table-column>
    <el-table-column label="楼层" prop="floorName"></el-table-column>
    <el-table-column label="施工面积/工作量" prop="jobCount"></el-table-column>
    <el-table-column label="施工人/负责人" prop="workerName"></el-table-column>
    <el-table-column label="操作" #default="{row}">
      <el-button type="text" @click="editItem(row)">编辑</el-button>
    </el-table-column>
  </el-table>

  <el-dialog v-model="model.visible" :title="model.title" width="600px" :before-close="onClose">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px">
      <el-form-item v-if="model.isEdit" label="当前楼层">
        <el-button tag="div" role="button">{{ form.buildingName }}-{{ form.floorName}}</el-button>
      </el-form-item>
      <el-form-item v-else label="选择楼层" prop="floorId">
        <el-select v-model="selectedBuilding" @change="onSelectBuilding" placeholder="请选择楼栋">
          <el-option v-for="(item, index) in buildingList" :key="index" :value="item.buildingId" :label="item.buildingName"></el-option>
        </el-select>
        <el-select v-model="form.floorId" placeholder="请选择楼层">
          <el-option v-for="(item, index) in floorList" :key="index" :value="item.floorId" :label="item.floorName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="施工面积/量" prop="jobCount">
        <el-input type="number" v-model="form.jobCount" placeholder="请输入当前楼层的工序施工面积或工作量"></el-input>
      </el-form-item>
      <el-form-item label="工作人" prop="workerId">
        <el-select v-model="form.workerId" placeholder="请选择工作人/负责人">
          <el-option v-for="(option, index) in workerList" :key="index" :value="option.workerId" :label="option.workerName"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSave">确定</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>