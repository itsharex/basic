import { defineFakeRoute } from 'vite-plugin-fake-server/client'
import Mock from 'mockjs'

export default defineFakeRoute([
  {
    url: '/mock/user/login',
    method: 'post',
    response: ({ body }) => {
      return {
        error: '',
        status: 1,
        data: Mock.mock({
          account: body.account,
          token: `${body.account}_@string`,
          failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60,
          avatar: '',
        }),
      }
    },
  },
  {
    url: '/mock/user/permission',
    method: 'get',
    response: ({ headers }) => {
      let permissions: string[] = []
      if (headers.Token?.indexOf('admin') === 0) {
        permissions = [
          'permission.browse',
          'permission.create',
          'permission.edit',
          'permission.remove',
        ]
      }
      else if (headers.Token?.indexOf('test') === 0) {
        permissions = [
          'permission.browse',
        ]
      }
      return {
        error: '',
        status: 1,
        data: {
          permissions,
        },
      }
    },
  },
  {
    url: '/mock/user/password/edit',
    method: 'post',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          isSuccess: true,
        },
      }
    },
  },
])
