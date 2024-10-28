<!--
 * @Author: 闫闪闪 3303009278@qq.com
 * @Date: 2024-02-22 10:31:53
 * @LastEditors: 闫闪闪 3303009278@qq.com
 * @LastEditTime: 2024-03-08 14:02:03
 * @FilePath: \ADS\ads\src\layout\header\components\externalLink.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="link">
    <div
      v-for="item in items"
      :key="item.label"
      class="link-item"
      @click="linkClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { linkDataType } from '../index.d'
const items = ref([
  {
    label: 'Dropshipping Fulfillment',
    url: 'https://app.usadrop.com/'
  },
  {
    label: 'Co-Funder',
    url: 'https://funder.usadrop.com/home/index'
  },
  {
    label: 'Payment',
    url: 'https://app.usadrop.com/'
  },
  {
    label: 'Quickfund',
    url: 'https://app.usadrop.com/'
  }
])
const linkClick = (linkData: linkDataType) => {
  window.open(linkData.url)
}
</script>

<style lang="scss" scoped>
.link {
  // height: 100%;
  // border: 1px solid blue;
  .link-item {
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: 0 16px;
    font-size: 14px;
    // border-right: 1px solid #e9e9ec;
    &:hover {
      background-color: #f1f4ff;
    }
  }
}
</style>
