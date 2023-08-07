<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import AccountApi from '@/api/account'
import { listWorker } from '@/api/worker'

const query = ref({
  businessId: '',
  personId: '',
  start: '',
  end: ''
})

const dateParams = ref([])

const personList = ref([])

listWorker().then(res => {
  personList.value = res.data
})

const businessList = ref([])

AccountApi.listBusiness().then(res => {
  businessList.value = res.data
})

const accountList = ref([])

const cashTotal = ref(0)
function list() {
  if (dateParams.value && dateParams.value[1]) {
    query.value.start = dateParams.value[0] + ' 00:00:00'
    query.value.end = dateParams.value[1] + ' 23:59:59'
  } else {
    query.value.start = ''
    query.value.end = ''
  }
  AccountApi.query(query.value).then(res => {
    accountList.value = res.data
    if (accountList.value.length) {
      cashTotal.value = 0
      accountList.value.forEach(item => {
        cashTotal.value += item.cash
      })
    }
  })
}

list()

const model = ref({
  visible: false,
  title: '',
  isEdit: false
})

function addItem() {
  model.value.visible = true
  model.value.title = '新增账目'
  model.value.isEdit = false
}

const form = ref({
  businessId: '',
  personId: '',
  cash: ''
})
function onEdit(item) {
  model.value.visible = true
  model.value.title = '编辑账目'
  model.value.isEdit = true

  form.value = Object.assign(form.value, item)
}

function onDelete(id) {
  ElMessageBox.confirm('', '是否确认删除该账目?').then(() => {
    AccountApi.remove(id).then(() => {
      ElMessage.success('数据已删除')
      list()
    })
  })
}

const querySearch = (string, cb) => {
  if (string === '') cb();
  else {
    AccountApi.queryBusinessList(string).then(res => {
      const list = res.data
      cb(list)
    })
  }
}

const state = ref('')

function handleSelect(item) {
  console.log(item)
  form.value.businessId = item.businessId
}

function saveBusinessItem() {
  AccountApi.saveBusiness({ businessName: state.value }).then(res => {
    ElMessage.success('新类型添加成功!')
  })
}

function removeBusinessItem(id) {
  AccountApi.removeBusiness(id)
}

function onSave() {
  if (model.value.isEdit) {
    AccountApi.update(form.value).then(res => {
      ElMessage.success("数据已更新!")
      list()
      onClose()
    })
  } else {
    AccountApi.save(form.value).then(() => {
      ElMessage.success('数据已添加!')
      list()
      onClose()
    })
  }
}

function onClose() {
  model.value = Object.assign(model.value, {
    visible: false,
    title: '',
    isEdit: false
  })

  form.value = Object.assign(form.value, {
    businessId: '',
    personId: '',
    cash: ''
  })
}

</script>

<template>
  <div class="flex justify-between">
    <el-form :model="query" inline>
      <el-form-item label="业务类型">
        <el-select v-model="query.businessId" placeholder="请选择" clearable>
          <el-option v-for="(item, index) in businessList" :key="index" :value="item.businessId" :label="item.businessName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主体人">
        <el-select v-model="query.personId" placeholder="请选择" clearable>
          <el-option v-for="(item, index) in personList" :key="index" :value="item.workerId" :label="item.workerName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker v-model="dateParams" type="daterange" value-format="YYYY-MM-DD" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="list">开始查询</el-button>
        <el-button type="success" icon="Plus" @click="addItem">开始记账</el-button>
      </el-form-item>
    </el-form>
    <div style="color: #008aff;font-size: 24px; font-weight: 800;">金额合计: {{ cashTotal }}元</div>
  </div>
  <el-divider />

    <el-table :data="accountList" border>
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="业务名" prop="businessName"></el-table-column>
      <el-table-column label="金额" prop="cash"></el-table-column>
      <el-table-column label="主体人" prop="personName"></el-table-column>
      <el-table-column label="创建日期" prop="createDt"></el-table-column>
      <el-table-column label="修改日期" prop="updateDt"></el-table-column>
      <el-table-column label="操作" #default="{ row }">
        <el-button type="text" @click="onEdit(row)">编辑</el-button>
        <el-button type="text" @click="onDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="model.visible" :title="model.title" width="600px" :before-close="onClose">
      <el-form :model="form" label-width="96px">
        <el-form-item label="业务类型">
          <el-autocomplete
              v-model="state"
              value-key="businessName"
              :fetch-suggestions="querySearch"
              popper-class="my-autocomplete"
              placeholder="请输入"
              @select="handleSelect">
            <template #append>
              <el-button @click="saveBusinessItem">添加</el-button>
            </template>
            <template #default="{ item }">
              <div class="flex justify-between">
                <span>{{ item.businessName }}</span>
                <el-button type="text" icon="Close" @click="removeBusinessItem(item.businessId)"></el-button>
              </div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="主体人">
          <el-select v-model="form.personId" placeholder="请选择主体人">
            <el-option v-for="(item, index) in personList" :key="index" :value="item.workerId" :label="item.workerName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="form.cash" type="number" placeholder="请填写具体金额">
            <template #suffix>元</template>
          </el-input>
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