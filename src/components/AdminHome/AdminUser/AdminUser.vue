<template>
  <h1 class="text-center text-primary">
    Người dùng
  </h1>
  <table class="table table-hover">
    <thead class="bg-primary text-white">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Tên tài khoản
        </th>
        <th scope="col">
          Vai trò
        </th>
        <th scope="col">
          Email
        </th>
        <th
          scope="col"
          class="col-md-2"
        >
          Hình ảnh
        </th>
        <th scope="col">
          Trạng thái
        </th>
        <th scope="col">
          Xếp hạng
        </th>
        <th
          scope="col"
          class="w-25 text-center"
        >
          Quản lý
        </th>
      </tr>
    </thead>
    <tbody v-if="users.length > 0">
      <tr
        v-for="user in users"
        :key="user.id"
      >
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td v-if="user.role === 0">
          admin
        </td>
        <td v-else>
          user
        </td>
        <td>{{ user.email }}</td>
        <td>
          <img
            :src="user.image_path"
            class="w-50"
            :alt="user.username"
          >
        </td>
        <td
          v-if="user.status === 1"
          class="text-primary"
        >
          Kích hoạt
        </td>
        <td
          v-else
          class="text-danger"
        >
          Bị khóa
        </td>
        <td>{{ user.userType }}</td>

        <td class="text-center">
          <router-link
            class="btn btn-outline-primary"
            :to="{ name: 'AdminUserDetail', params: { id: user.id } }"
          >
            Sửa
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>

  <h3
    v-if="users.length == 0"
    class="text-center text-danger"
  >
    Không có người dùng!
  </h3>

  <router-link
    :to="{ name: 'AdminHome' }"
    class="btn btn-outline-primary float-right"
  >
    Quay lại
  </router-link>
</template>

<script>
export default {
  name: 'AdminUser',
  data() {
    return {
      users: []
    }
  },
  beforeMount() {
    this.getAllUsers()
  },
  methods: {
    async getAllUsers() {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/users',
          {
            headers: {
              'Content-Type': 'application/json',
              'bookstore-access-token': accessToken,
              'bookstore-refresh-token': refreshToken
            }
          }
        )

        const resData = await res.json()

        if (res.status === 200) {
          this.users = resData
        }

        if (res.status === 404 || res.status === 500) {
          alert(resData.message)
        }

        if (
          res.status === 401 &&
          resData.message === 'Access token đã hết hạn'
        ) {
          let d = new Date()
          d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
          let expires = 'expires=' + d.toUTCString()
          document.cookie =
            'accessToken=' +
            resData.newAccessToken +
            ';' +
            expires +
            ';path=/' +
            ';secure'

          await this.getAllUsers()
        }
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style></style>
