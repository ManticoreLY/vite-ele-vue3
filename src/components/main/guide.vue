<script setup>
import {　ref　} from 'vue'
const activeName = ref('')

</script>

<template>
    <div style="width: 100%;text-align: center;font-size: 24px;font-weight: 800; height: 80px; line-height: 80px;">系统使用引导</div>
    <el-collapse v-model="activeName">
      <el-collapse-item title="一，如何新建用户?" name="1">
        <div class="flex-col" style="align-items: start; margin: 20px;">
          <p>1, 点击菜单栏的“用户管理”菜单，显示页面后，点击“新建用户”按钮。</p>
          <img src="@/static/user_1.png" class="img-large">
          <p>2， 在弹出的界面里输入用户信息，点击“确定”按钮。</p>
          <img src="@/static/user_2.png" class="img-small">
        </div>
      </el-collapse-item>
      <el-collapse-item title="二，如何创建项目？" name="2">
        <div class="flex-col" style="align-items: start; margin: 20px;">
          <p>1, 点击菜单栏的“项目管理”菜单，显示页面后，点击“新建项目”按钮。填写项目名称，设置状态，点击“确定”按钮。</p>
          <p>注意： 登录系统后会默认选中一个当前进行中的项目，如果需要快速显示项目数据请将项目的状态设置为“正在进行中”。</p>
          <img src="@/static/project.png" class="img-large">
        </div>
      </el-collapse-item>
      <el-collapse-item title="三，如何给工人创建账号?" name="3">
        <div class="flex-col" style="align-items: start; margin: 20px;">
          <p>1, 点击右上方“切换项目”按钮， 在弹出的菜单选择对应的项目。</p>
          <img src="@/static/woker_3.png" class="img-normal">
          <p>2, 点击菜单栏的“工人管理”菜单，显示页面后，点击“新建工人”按钮。</p>
          <img src="@/static/worker_2.png" class="img-large">
          <p>3， 在弹出的界面里输入工人信息，关联对应的账户后，点击“确定”按钮。</p>
          <img src="@/static/worker_1.png" class="img-small">
        </div>
      </el-collapse-item>
      <el-collapse-item title="四，如何配置项目数据?" name="4">
        <div class="flex-col" style="align-items: start; margin: 20px;">
          <p>1, 点击菜单栏“楼栋配置”菜单， 显示页面后，点击“新建楼栋”按钮。填写好信息后，点击“确定”按钮。</p>
          <img src="@/static/setting_1.png" class="img-large">
          <p>2, 点击菜单栏的“楼层工序管理”菜单，显示页面后，点击需要配置的楼栋按钮，点击“新建楼层”按钮，在弹出框填写好信息后点“确定”按钮。</p>
          <img src="@/static/setting_2.png" class="img-large">
          <p>3， 点击菜单栏“工序管理”菜单，点击“新建工序”按钮，填写好信息后点“确定”。(如果楼层存在交错工作，需要另外新建一个工序)</p>
          <img src="@/static/setting_3.png" class="img-large">
          <p>4， 切换到“楼层工序管理”页面，点击“选择工序”按钮，给楼层配置所需的工序。</p>
          <img src="@/static/setting_4.png" class="img-large">
          <p>5， 点击“工程序配置”菜单，切换到对应工序按钮后，点击“编辑”，填写当前楼层的工序的工作量，选择对应的负责人，然后点击“确定”按钮。</p>
          <img src="@/static/setting_5.png" class="img-large">
        </div>
      </el-collapse-item>
      <el-collapse-item title="五，如何查看项目进度？" name="5">
        <div class="flex-col" style="align-items: start; margin: 20px;">
          <p>1, 点击菜单栏的“进度管理”菜单，切换上方的楼栋按钮，会看到前面楼栋的数据。在对应的楼层里填写对应工序的工作完成量，点击“确定”按钮提交数据，然后点击后方的“更新进度”按钮后，会根据当前楼层整体工作量计算工程进度。</p>
          <img src="@/static/progress.png" class="img-large">
        </div>
      </el-collapse-item>
    </el-collapse>

</template>

<style lang="scss" scoped>
.img-large{
  width: 80%;
  height: auto;
}
.img-normal{
  width: 60%;
  height: auto;
}
.img-small{
  width: 40%;
  height: auto;
}
.img-mini{
  width: 20%;
  height: auto;
}
</style>