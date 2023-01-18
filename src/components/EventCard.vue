<template>
  <div class="container card">
    <div @click="goesTo">
      <div class="card-body">
        <p class="card-text" v-if="event.title">
          {{ event.title }}
        </p>
        <p class="card-text">
          {{ formatDate }}
        </p>
      </div>
    </div>
    <div>Assist: <input type="checkbox" @click.stop="() => {}" /></div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formatDate() {
      if (this.event.date === null) {
        return "";
      }
      const formatDate = new Date(this.event.date);
      return formatDate.toLocaleDateString("en-US");
    },
  },
  methods: {
    goesTo() {
      this.$router.push(`/events/${this.event.id}`);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0 25px;
}
</style>
