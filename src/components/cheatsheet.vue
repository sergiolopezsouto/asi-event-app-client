<template>
  <h1>hola</h1>
</template>


<script>
import EventCard from "@/components/EventCard.vue"
import { computed } from '@vue/runtime-core'

export default {

    // lo que recibe del padre???
    props: [],

    // declarar componentes importados
    components: {
        EventCard,
    },

    // datos utilizados en el componente
    data() {
        return {
        eventListProfile: [],
        };
    },

// --------------------------------------------------------------------------------------------

    // lo que se ejecuta cuando se crea el componente
    async created() {
        const events = await EventRepository.getEvents();
        this.eventListProfile = events;
    },

    // lo que se ejecuta cuando se monta el componente
    mounted() {
        // codigo
    }

// --------------------------------------------------------------------------------------------

    // propiedad para definir valores calculados
    computed: {
        
        // codigo
    }

    // propeidad para definir funciones personalizadas
    methods: {
        // codigo
    },
};
</script>


<style scoped>

</style>>
