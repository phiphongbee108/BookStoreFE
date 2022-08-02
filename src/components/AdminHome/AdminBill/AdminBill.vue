<template>
  <h1 class="text-center text-primary">
    Đơn hàng
  </h1>

  <div
    v-if="bills.length > 0"
    class="row justify-content-around"
  >
    <button
      class="btn btn-outline-info w-25"
      @click="getAllBills"
    >
      Lấy tất cả hóa đơn
    </button>

    <button
      class="btn btn-outline-danger w-25"
      @click="getUnConfirmBills"
    >
      Lấy hóa đơn chưa xác nhận
    </button>
  </div>

  <table class="table table-hover mt-2">
    <thead class="bg-primary text-white">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Tên người mua
        </th>
        <th scope="col">
          Địa chỉ
        </th>
        <th scope="col">
          Số điện thoại
        </th>
        <th scope="col">
          Tổng tiền
        </th>
        <th scope="col">
          Trạng thái
        </th>
        <th
          scope="col"
          class="w-25 text-center"
        >
          Quản lý
        </th>
      </tr>
    </thead>
    <tbody v-if="bills.length > 0">
      <tr
        v-for="bill in bills"
        :key="bill.id"
      >
        <td>{{ bill.id }}</td>
        <td>{{ bill.name }}</td>
        <td>
          {{ bill.address }} - {{ bill.ward }} - {{ bill.district }} -
          {{ bill.province }}
        </td>
        <td>{{ bill.phone }}</td>
        <td>{{ bill.total_amount }}</td>
        <td
          v-if="bill.status"
          class="text-primary"
        >
          Đã xác nhận
        </td>
        <td
          v-else
          class="text-danger"
        >
          Chưa xác nhận
        </td>
        <td class="text-center">
          <button
            v-if="!bill.status"
            class="btn btn-outline-primary"
            @click="checkBill(bill.id)"
          >
            Xác nhận
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <h3
    v-if="bills.length == 0"
    class="text-center text-danger"
  >
    Không có hóa đơn!
  </h3>

  <router-link
    :to="{ name: 'AdminHome' }"
    class="btn btn-outline-primary float-right"
  >
    Quay lại
  </router-link>
</template>

<script>
import { ref, onBeforeMount } from 'vue'

export default {
  name: 'AdminBill',
  setup() {
    const bills = ref([])

    const getAllBills = async () => {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/allBill',
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
          bills.value = resData
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

          await getAllBills()
        }
      } catch (error) {
        alert(error.message)
      }
    }

    const checkBill = async id => {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/confirmBill/${id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'bookstore-access-token': accessToken,
              'bookstore-refresh-token': refreshToken
            }
          }
        )

        const resData = await res.json()

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
        }
      } catch (error) {
        alert(error.message)
      }

      getAllBills()
    }

    const getUnConfirmBills = async () => {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value

      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/confirmBill',
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
          bills.value = resData
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

          await getUnConfirmBills()
        }
      } catch (error) {
        alert(error.message)
      }
    }

    onBeforeMount(() => {
      getAllBills()
    })

    return {
      bills,
      getAllBills,
      checkBill,
      getUnConfirmBills
    }
  }
}
</script>

<style></style>
