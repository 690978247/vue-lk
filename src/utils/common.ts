// 下载excel
export function downloadFile(data: any, download: any) {
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  // 获取heads中的filename文件名
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = download
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
  // 释放掉blob对象
  window.URL.revokeObjectURL(href)
}

/**
 * 自动定位到表单报错项
 */
export function moveToErr() {
  const isError = document.getElementsByClassName('el-form-item__error')
  if (isError.length) {
    isError[0].scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    })

    // 这个当滑动到报错项之后自动获取输入框的焦点，方便用户直接进行输入，延迟 800ms 是因为需要都能到定位成功后在进行获取焦点体验更好一些
    setTimeout(() => {
      isError[0].getElementsByTagName('input')?.[0]?.focus()
    }, 800)
  }
}
export const UseSearch = (key: string, json?: boolean) => {
  const location = window.location
  const search = new URLSearchParams(location.search)
  const value = json ? JSON.parse(search.get(key) ?? '') : search.get(key)
  return value
}
