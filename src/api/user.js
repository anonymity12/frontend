import request from '@/utils/request'

export function userLogin(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data
  })
}

export function pingpong(data) {
  return request({
    url: '/api/ping',
    method: 'get',
    data
  })
}

// http://101.43.166.211:8081/flies/yy/getAll
export function getFlyInfo(data) {
  return request({
    url: '/flies/' + data + '/getAll',
    method: 'get'
  })
}
// http://101.43.166.211:8081/ranks/' + this.flyOwner + '/getMyRank'
export function getMyRank(who) {
  return request({
    url: '/ranks/' + who + '/getMyRank',
    method: 'get',
  })
}
// this.$axios.post(`http://101.43.166.211:8081/flies/growStatus/${row.id}`)
export function postGrowCmd(itemId) {
  return request({
    url: '/flies/growStatus/' + itemId,
    method: 'post',
  })
}
// this.$axios.post(`http://101.43.166.211:8081/flies/releaseStatus/${row.id}`)
export function postReleaseCmd(itemId) {
  return request({
    url: '/flies/releaseStatus/' + itemId,
    method: 'post',
  })
}

// "http://101.43.166.211:8081/flies/" + this.owner + "/newItem";
export function addNewFly(owner, data) {
  return request({
    url: '/flies/' + owner + '/newItem',
    method: 'post',
    data
  })

}
// "http://101.43.166.211:8081/users/validParent"
export function validParent(data) {
  return request({
    url: '/users/validParent',
    method: 'post',
    data
  })
}

//获取用户列表
export function userList(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

//添加用户
export function userAdd(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

//修改用户
export function userUpdate(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

//删除用户
export function userDelete(id) {
  return request({
    url: '/user/delete',
    method: 'post',
    params: {
      id
    }
  })
}

//批量删除用户
export function userBatchDelete(data) {
  return request({
    url: '/user/delete/batch',
    method: 'post',
    data
  })
}

// ------- sixlog related apis ⬇️ ------
export function getLogs(size, nthPage) {
  return request({
    url: '/api/sixlog/' + size + '/' + nthPage,
    method: 'get',
  })
}

export function getSixLogTotalAmount() {
  return request({
    url: '/api/sixlog/getTotalAmount',
    method: 'get'
  })
}
// add new sixlog
export function callSendSixLogApi(data) {
  return request({
    url: '/api/sixlog/add',
    method: 'post',
    data
  })
}
// ------- sixlog related apis ⬆️ ------

// ------- life related apis ⬇️ ------

export function getLifeIndicator() {
  return request({
    url: '/users/lifeIndicator',
    method: 'get'
  })
}

// ------- life related apis ⬆️ ------