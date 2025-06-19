import { axios } from '@/utils/request'

const api = {
  memberUser: '/member/memberUser'
}

export function getMemberUserList (parameter) {
  return axios({
    url: api.memberUser + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveMemberUser (parameter) {
  return axios({
    url: api.memberUser + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delMemberUser (parameter) {
  return axios({
    url: api.memberUser + '/remove',
    method: 'post',
    params: parameter
  })
}

export const memberUserExport = api.memberUser + '/export'
