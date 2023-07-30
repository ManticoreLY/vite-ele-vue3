<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { queryBudgetList, removeBudget, saveBudgetItem, updateBudgetItem } from '@/api/budget'

const dataList = ref([])

const query = ref({
  name: ''
})

const total = ref(0)

function list() {
  queryBudgetList(query.value).then(res => {
    dataList.value = res.data
    total.value = 0;
    if (dataList.value.length) {
      dataList.value.forEach(item => {
        total.value += item.budgetSum
      })
    }
  })
}

list()

const model = ref({
  visible: false,
  title: '添加栏目',
  isEdit: false
})

const form = ref({
  budgetName: '',
  budgetPrice: '',
  budgetCount: '',
  budgetSum: ''
})

function addItem() {
  model.value.visible = true
  model.value.title = '添加栏目'
  model.value.isEdit = false
}

function onEdit(item) {
  model.value.visible = true
  model.value.title = '编辑栏目'
  model.value.isEdit = true

  form.value = Object.assign(form.value, item)
}

function onDelete(id) {
  ElMessageBox.confirm('', '是否确认删除该栏目?').then(() => {
    removeBudget(id).then(res => {
      ElMessage.success('栏目已删除!')
      list()
    })
  })
}

function onSave() {
  if (model.value.isEdit) {
    updateBudgetItem(form.value).then(res => {
      ElMessage.success('栏目已更新!')
      list()
      onClose()
    })
  } else {
    saveBudgetItem(form.value).then(res => {
      ElMessage.success('栏目已添加!')
      list()
      onClose()
    })
  }
}

function onClose() {
  model.value.visible = false
  model.value.title = ''
  model.value.isEdit = false

  form.value = Object.assign(form.value, {
    budgetName: '',
    budgetPrice: '',
    budgetCount: '',
    budgetSum: ''
  })
}
</script>

<template>
  <div class="flex justify-between">
    <el-form :model="query" inline>
      <el-form-item label="栏目名称">
        <el-input v-model="query.name" placeholder="请输入查询栏目的名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="list">查询</el-button>
        <el-button type="primary" @click="addItem">添加栏目</el-button>
      </el-form-item>
    </el-form>
    <div style="color: #008aff;font-size: 24px; font-weight: 800;">总价合计: {{ total }}元</div>
  </div>
  <el-divider />
  <el-table :data="dataList" border>
    <el-table-column type="index" label="序号" width="80"></el-table-column>
    <el-table-column label="预算主体" prop="budgetName"></el-table-column>
    <el-table-column label="单价" prop="budgetPrice"></el-table-column>
    <el-table-column label="数量" prop="budgetCount"></el-table-column>
    <el-table-column label="总价" prop="budgetSum"></el-table-column>
    <el-table-column label="创建日期" prop="createDt"></el-table-column>
    <el-table-column label="操作" #default="{ row }">
      <el-button type="text" @click="onEdit(row)">编辑</el-button>
      <el-button type="text" @click="onDelete(row.budgetId)">删除</el-button>
    </el-table-column>
  </el-table>

  <el-dialog v-model="model.visible" :title="model.title" width="600" :before-close="onClose">
    <el-form :model="form" label-width="96px">
      <el-form-item label="预算主体">
        <el-input v-model="form.budgetName" placeholder="请输入栏目名称"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input type="number" v-model="form.budgetPrice" placeholder="请输入栏目单价">
          <template #suffix>元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="数量">
        <el-input type="number" v-model="form.budgetCount" placeholder="请输入栏目数量"></el-input>
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