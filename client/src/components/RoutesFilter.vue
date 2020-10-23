<template>
  <v-row>
      <v-col>
          <v-select
          :items="['hello2', 'hello', 'hello', 'hello']"
          label="Всі гірські вершини"
          solo
        ></v-select>
      </v-col>
      <v-col>
          <v-select
          :items="['hello2', 'hello', 'hello', 'hello']"
          label="Всі категорії"
          solo
        ></v-select>
      </v-col>
      <v-col>
          <v-select
          :items="['hello2', 'hello', 'hello', 'hello']"
          label="Всі населені пункти"
          solo
        ></v-select>
      </v-col>
      <v-col>
            <v-text-field
                label="Пошук"
                :rules="rules"
                hide-details="auto"
                ></v-text-field>
      </v-col>
      <v-col>
          <v-btn block dark color="orange">Фільтр</v-btn>
      </v-col>
      <v-col>
          <v-btn
      
      fab
      dark
      small
      color="red"
    >
      <v-icon dark>
        mdi-close
      </v-icon>
    </v-btn>
      </v-col>
  </v-row>
</template>

<script>
export default {
    data: () => ({
      rules: [
        value => (value && value.length >= 3) || 'Мінімум 3 знаки',
      ]
    })
}
</script>

<style>

</style>