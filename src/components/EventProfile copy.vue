<template>
  <h3>PROFILE</h3>
    <div class="col mb-3 container-events" v-for="event in eventListProfile" :key="event.id">
      <event-card v-if="isProfile(event.author)" :event="event" />
    </div>
</template>

<script>
import EventRepository from "@/repositories/EventRepository";
import EventCard from "@/components/EventCard";
import getStore from "@/common/auth";

export default {
  components: {
    EventCard,
  },
  data() {
    return {
      eventListProfile: [],
      store: getStore(),
    };
  },
  async created() {
    // console.log("AQUI")
    const events = await EventRepository.getEvents();
    this.eventListProfile = events;
  },
  methods: {
    isProfile(author) {
      return author == this.store.state.user.login;
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 75px;
}
</style>



<template>
  <h3>PROFILE</h3>
</template>

<script></script>

<style lang="scss" scoped>
h3 {
  margin-top: 75px;
}
</style>
