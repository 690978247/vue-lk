export default [
  {
    url: '/login',
    method: 'post',
    response: ({ body }) => {
      if (body.username === 'admin' && body.password === '123456') {
        return {
          code: 200,
          message: '请求成功',
          data: {
            username: 'admin'
          }
        }
      } else {
        return {
          code: 201,
          message: '请求失败',
          data: {}
        }
      }
    }
  }
]
