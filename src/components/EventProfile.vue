<template>
  <h3>PROFILE</h3>
    <div class="col mb-3 container-events" v-for="event in eventListProfile" :key="event.id">
      <event-card v-if="isProfile(event.author.login)" :event="event" />
    </div>
</template>

<script>
import EventRepository from "@/repositories/EventRepository";
import EventCard from "@/components/EventCard";
import { getStore } from "@/common/store";

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
    isProfile(authorLogin) {
      // console.log(author, this.store.state.user.login)
      return authorLogin == this.store.state.user.login;
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  margin-top: 75px;
}
</style>