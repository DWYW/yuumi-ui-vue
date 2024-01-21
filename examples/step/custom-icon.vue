<template>
  <YuumiStep :active="1">
    <YuumiStepItem title="设置账号" icon="line-edit"> 这里描述信息 </YuumiStepItem>
    <YuumiStepItem title="设置密码" icon="line-key"> 这里描述信息 </YuumiStepItem>
    <YuumiStepItem title="完成" icon="line-shield-correct"> 这里描述信息 </YuumiStepItem>
  </YuumiStep>

  <YuumiStep :active="1">
    <YuumiStepItem title="设置账号">
      <template #icon>
        <YuumiIcon icon="line-edit"></YuumiIcon>
      </template>
      这里描述信息
    </YuumiStepItem>
    <YuumiStepItem title="设置密码">
      <template #icon>
        <YuumiIcon icon="line-key"></YuumiIcon>
      </template>
      这里描述信息
    </YuumiStepItem>
    <YuumiStepItem title="完成">
      <template #icon>
        <YuumiIcon icon="line-shield-correct"></YuumiIcon>
      </template>
      这里描述信息
    </YuumiStepItem>
  </YuumiStep>
</template>
