<template>
  <h1 class="text-center text-primary">
    Danh mục
  </h1>

  <AdminAddCategory @add-category="addCategory" />

  <!-- Table category -->
  <table class="table table-hover my-2">
    <thead class="bg-primary text-white">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Tên danh mục
        </th>
        <!-- Trạng thái = isActive -->
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
    <tbody v-if="categories.length > 0">
      <AdminCategoryItem
        v-for="category in categories"
        :key="category.id"
        :category-props="category"
        @edit-category="editCategory"
        @delete-category="deleteCategory"
      />
    </tbody>
  </table>

  <h3
    v-if="categories.length == 0"
    class="text-center text-danger"
  >
    Không có danh mục!
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

import AdminCategoryItem from './AdminCategoryItem/AdminCategoryItem.vue'
import AdminAddCategory from './AdminCategoryItem/AdminAddCategory.vue'

export default {
  name: 'AdminCategory',
  components: {
    AdminCategoryItem,
    AdminAddCategory
  },
  setup() {
    onBeforeMount(() => {
      getAllCategories()
    })

    const categories = ref([])

    const getAllCategories = async () => {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value
      try {
        const res = await fetch(
          'http://book-store-meshop.herokuapp.com/admin/categories',
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
          categories.value = resData
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

          await getAllCategories()
        }
      } catch (error) {
        alert(error.message)
      }
    }

    const addCategory = () => {
      try {
        //function add new category in AdminAddCategory components
        getAllCategories() //getAllCategories again to render new category in page
      } catch (error) {
        alert(error.message)
      }
    }

    const editCategory = () => {
      try {
        //function edit category in AdminCategoryItem components
        getAllCategories() //getAllCategories again to render new category in page
      } catch (error) {
        alert(error.message)
      }
    }

    const deleteCategory = async id => {
      const acCookie = await window.cookieStore.get('accessToken')
      const rfCookie = await window.cookieStore.get('refreshToken')
      const accessToken = acCookie.value
      const refreshToken = rfCookie.value
      try {
        const res = await fetch(
          `http://book-store-meshop.herokuapp.com/categories/${id}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'bookstore-access-token': accessToken,
              'bookstore-refresh-token': refreshToken
            }
          }
        )

        const resData = await res.json()

        const category = resData

        if (res.status === 200) {
          category.isActive = !category.isActive
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
        }

        getAllCategories()
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      categories,
      getAllCategories,
      addCategory,
      editCategory,
      deleteCategory
    }
  }
}
</script>

<style></style>
