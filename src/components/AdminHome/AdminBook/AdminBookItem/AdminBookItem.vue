<template>
  <tr>
    <td>{{ bookProps.id }}</td>
    <td>{{ bookProps.name }}</td>
    <td v-if="bookProps.isActive">
      <router-link
        :to="{ name: 'AdminBookDetail', params: { id: bookProps.id } }"
      >
        <img
          :src="bookProps.imgPath"
          class="imgBook"
          :alt="bookProps.name"
          role="button"
        >
      </router-link>
    </td>
    <td v-else>
      <img
        :src="bookProps.imgPath"
        class="imgBook"
        :alt="bookProps.name"
      >
    </td>
    <td>{{ bookProps.category }}</td>
    <td>{{ bookProps.remain }}</td>
    <td
      v-if="bookProps.isActive"
      class="text-primary"
    >
      Kích hoạt
    </td>
    <td
      v-else
      class="text-danger"
    >
      Bị Khóa
    </td>
    <td
      v-if="bookProps.isActive"
      class="text-center"
    >
      <router-link
        class="btn btn-outline-info my-2"
        :to="{ name: 'AdminBookDetail', params: { id: bookProps.id } }"
      >
        Chi tiết
      </router-link>
      <button
        class="btn btn-outline-danger mx-2 my-2"
        @click="deleteItem"
      >
        Khóa
      </button>
    </td>
    <td
      v-else
      class="text-center"
    >
      <button
        class="btn btn-outline-primary mx-2 my-2"
        @click="deleteItem"
      >
        Mở khóa
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'AdminBookItem',
  props: ['bookProps'],
  setup(props, context) {
    const deleteItem = () => {
      context.emit('delete-book', props.bookProps.id)
    }
    return {
      deleteItem
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.imgBook {
  width: 100%;
}
</style>
