<template>
  <v-data-table
    :headers="headers"
    :items="collection"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title v-if="tableInfo">{{tableInfo.slag}}</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :color="'orange'"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Додати запис
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col v-for="(value, propertyName, index) in editedItem" :key="index"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem[`${value.value}`]"
                      :label="value.text"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:body="props">
      <tr v-for="(index, i) in props.items" :key="i">
        <td v-for="(header, i) in headers" :key="i">
          <v-checkbox v-if="header.type === 'Boolean'"
            v-model="index[header.value]"
            readonly
            :color="'orange'"
            dark
          ></v-checkbox>
          <v-img v-else-if="header.type === 'File'"
            max-height="100"
            max-width="100"
            :src="require(`@/assets/logo.png`)"
          >
            <div class="fill-height bottom-gradient"></div>
          </v-img>
          <v-select v-else-if="header.type === 'Array'"
            :items="convertArrayFieldToString(index[header.value])"
            label="Список"
            solo
            multiple
          ></v-select>
          <div v-else-if="header.value === 'actions'">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </div>
          <div v-else>
            {{index[header.value]}}
          </div>
        </td>
      </tr>
    </template>
    
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="getTableFrame"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>


<script>

export default {
  props: {
    'tableName': {
      type: String,
      required: true
    }
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [],
    collection: [],
    editedIndex: -1,
    tableInfo: null,
    editedItem: {},
    defaultItem: {},
    checkbox: true
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Навий запис' : 'Редагувати запис'
    },
    currentTable () {
      return this.$store.getters.tableList;
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
        val || this.closeDelete()
    },
    '$route' () {
      console.log(this.$route)
      this.buildTable();
    },
    currentTable() {
      this.buildTable();
    }
  },
  created () {
    if(this.$store.getters.tableList.length != 0)
    {
      this.buildTable();
    }
  },

  methods: {
    getTableFrame () {
      return new Promise((resolve) => {
        this.collection = [];
        this.headers = [];
        this.editedItem = {};
        this.defaultItem = {};
        this.tableInfo = this.$store.getters.tableList.find(t => t.name === this.tableName);
        for(let item of this.tableInfo.collectionFileds) {
          if(item.toDisplay) {
            let field = {
              text: item.slag,
              value: item.name,
              type: item.fieldType
            }
            this.headers.push(field);
          }
        }
        this.headers.push({ text: 'Дії', value: 'actions', sortable: false });
        this.addFieldsConfigurationColumn();
        for(let item of this.headers) {
          if(item.value != 'actions') {
            this.editedItem[`${item.value}`] = {
            value: 0,
            text: item.text
          };
          }
        }
        this.defaultItem = this.editedItem;
        
        resolve()
      })
    },
    convertArrayFieldToString(list) {
      let lines = [];
      for(let item of list) {
        let line = '';
        for (const [key, value] of Object.entries(item)) {
          console.log(key)
          line += `${key} : ${value.toString()} | `
        }
        lines.push(line);
      }
      return lines;
    },
    addFieldsConfigurationColumn() {
      let currentUrl = window.location.pathname.split('/')
      if(currentUrl[currentUrl.length - 1] === 'collections') {
        this.headers = this.headers.filter(i => i.value != 'actions');
        this.headers.push({text: 'Поля', value: 'collectionFileds', type: 'Array', sortable: false})
      }
    },
    buildTable() {
      this.getTableFrame()
        .then(() => {
        this.$http.get('/tables/read', {
          params: {
            tableName: this.tableName,
          }
        })
          .then(response => {
            this.collection = response.data.collection;
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    editItem (item) {
      this.editedIndex = this.collection.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.collection.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.collection.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.collection[this.editedIndex], this.editedItem)
      } else {
        this.collection.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped>
  table.v-table thead tr {
    color: red !important;
  }
  tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, .05);
  }
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
  }

  .repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
                        rgba(255,0,0,.25),
                        rgba(255,0,0,.25) 5px,
                        rgba(0,0,255,.25) 5px,
                        rgba(0,0,255,.25) 10px
                      );
  }
  td {
    border: 1px solid #333;
    padding: 5px;
  }

</style>
