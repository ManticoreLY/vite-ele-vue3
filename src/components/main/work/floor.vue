<script setup>
import { ElMessage } from 'element-plus'
import { ref, nextTick } from 'vue'
import base from '@/api/index'
import floorApi from '@/api/floor'

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

function queryFloor(buildingId) {
  floorApi.listBuildingFloor(buildingId).then(res => {
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
  model.value.title = '编辑楼层'
  model.value.visible = true
  model.value.isEdit = true

  form.value = Object.assign(form.value, item)
}

function relateJob(item) {
  jobVisible.value = true
  nextTick(() => {
    relatedForm.value.floorList.push(item);
    relatedForm.value.jobIdList = Array.from(new Set(item.jobId.split(',')));
  })
}
function removeItem(jobId) {
  floorApi.remove(jobId).then(() => {
    ElMessage.success('数据已移除')
    list()
  })
}

const model = ref({
  title: '用户修改',
  visible: false,
  isEdit: false
})


const form = ref({
  floorName: '', //
  floorInfo: '',
  buildingId: '', //
})

function handleClose() {
  model.value.title = ''
  model.value.visible = false
  model.value.isEdit = false

  form.value = Object.assign(form.value, {
    floorName: '', //
    floorInfo: '',
    buildingId: '', //
  })
}

function handleSave() {
  if (model.value.isEdit) {
    floorApi.update(form.value).then(() => {
      ElMessage.success('数据已更新！')
      queryFloor(query.value.buildingId)
      handleClose()
    })
  } else {
    floorApi.save(form.value).then(() => {
      ElMessage.success('数据已添加！')
      queryFloor(query.value.buildingId)
      handleClose()
    })
  }
}

const selectedRows = ref([])

function handleSelectionChange(list) {
  selectedRows.value = list
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
    queryFloor(query.value.buildingId)
    beforeClose()
  }, err => {
    ElMessage.error(err);
  })
}


</script>

<template>
  <div class="flex">
    <el-form :model="query" inline>
      <el-form-item>
        <el-button tag="div" role="button" v-for="item in buildingList" :key="item.buildingId" :type="query.buildingId === item.buildingId ? 'primary' : 'plain'" @click="queryFloor(item.buildingId)">{{ item.buildingName }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" icon="Plus" @click="addItem">新建楼层</el-button>
        <el-button type="primary" icon="SetUp" @click="relateItemInBatch">批量关联工序</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-divider />
  <el-table :data="dataList" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" />
    <el-table-column label="序号" type="index" width="80"></el-table-column>
    <el-table-column label="楼层号" prop="floorName"></el-table-column>
    <el-table-column label="工序" prop="jobName"></el-table-column>
    <el-table-column label="备注信息" prop="floorInfo"></el-table-column>
    <el-table-column label="操作" #default="{ row }">
      <el-button type="text" @click="editItem(row)">编辑</el-button>
      <el-button type="text" @click="relateJob(row)">选择工序</el-button>
      <el-button type="text" @click="removeItem(row.floorId)">删除</el-button>
    </el-table-column>
  </el-table>

  <el-dialog v-model="model.visible" :title="model.title" width="600px" :before-close="handleClose">
    <el-form :model="form" size="large" label-width="96px">
      <el-form-item label="楼层号">
        <el-input v-model="form.floorName" placeholder="请输入楼层号"></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="form.floorInfo" placeholder="请输入备注信息"></el-input>
      </el-form-item>
      <el-form-item label="选择楼栋">
        <el-select v-model="form.buildingId" placeholder="请选择所属楼栋">
          <el-option v-for="item in buildingList" :key="item.buildingId" :value="item.buildingId" :label="item.buildingName"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button plain @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSave">确定</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="jobVisible" title="关联工序" width="600px" :before-close="beforeClose">
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
  </el-dialog>

</template>

<style scoped lang="scss">

</style>