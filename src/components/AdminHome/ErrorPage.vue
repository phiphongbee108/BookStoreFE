<template>
  <h2 class="text-center text-danger">
    Error Page
  </h2>
  <p class="text-center">
    Trang mà bạn tìm kiếm không tồn tại!
  </p>
  <router-link
    class="btn btn-outline-primary float-right"
    :to="{ name: 'AdminHome' }"
  >
    Trở về trang chủ
  </router-link>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>

<style></style>
