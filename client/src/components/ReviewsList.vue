<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    
    <v-toolbar
      color="orange"
      dark
    >
      <v-toolbar-title>Коментарі</v-toolbar-title>
      <v-spacer></v-spacer>
        <auth-modal :title="'Додати коментар або фото'"></auth-modal>
    </v-toolbar>

    <v-container fluid>
        <v-list three-line>
            <template v-for="item in items">
                <v-list-item
                :key="item.title"
                >
                <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                    <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-container>
  </v-card>
</template>

<script>

import AuthModal from '@/components/AuthModal';

export default {
    data: () => ({
      items: [
        {
          title: 'Administrator - 2020-05-13 04:28:21',
          subtitle: "sdslfjlkfjsldjflskjdflksjlkdfjslkjdflksjflksjlfkjsdlfkjljljl",
        },
        {
          title: 'Summer BBQ',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        {
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
        {
          title: 'Birthday gift',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
        },
        {
          title: 'Recipe to try',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        },
      ],
    }),
    components: {
        AuthModal
    }
}
</script>

<style>

</style>