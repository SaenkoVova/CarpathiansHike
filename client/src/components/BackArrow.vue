<template>
    <div>
        <p>
            <router-link :to="link" tag="span" style="cursor: pointer;" class="d-flex align-center">
            <v-icon>mdi-arrow-left</v-icon>
            <span>{{getTitle}}</span>
            </router-link>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        'location': {
            type: String,
            required: true
        },
        'link': {
            type: String,
            required: true
        }
    },
    computed: {
        getTitle () {
            return `Назад до ${this.location}`;
        }
    }
}
</script>

<style>

</style>