<template>
  <div class="image">
    {{ event.image}}
  </div>
  <div class="info">
    <h2> {{ event.title}} </h2>{{ event.title}} 
    <p>{{ event.description}}</p>
    <h4>{{ event.date}}</h4>
    <h4>{{ event.category}}</h4>
    <h6>{{ event.place}}</h6>
    <h6>{{ event.author}}</h6>
    <div>Assist: <input type="checkbox" @click.stop="() => {}" /></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {}
    }
  },
  created() {
    // this.event =
  }
}
</script>
