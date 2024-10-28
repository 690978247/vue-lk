<template>
  <div class="aid-upload">
    <el-upload
      action="/api/Upload/UploadFile"
      :headers="{ Authorization: 'Bearer ' + token }"
      v-bind="{ ...$attrs }"
      :on-preview="handlePictureCardPreview"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog top="6vh" v-model="dialogVisible" append-to-body>
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadProps } from 'element-plus'
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const emit = defineEmits(['uploadSuccess'])
const token = localStorage.getItem('token') ?? ''

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>
