<template>
  <v-dialog v-model="categoryDialog" max-width="320" persistent>
    <v-card dark>
      <form @submit.prevent="submitCategory" autocomplete="off">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="addCategory"
                  label="Category Name"
                  clearable
                  required
                ></v-text-field>
              </v-col>
              <v-col class="pt-1 mt-1" cols="12" sm="6" md="4">
                <v-alert
                  v-if="categoryExistsError"
                  dense
                  color="primary"
                  type="error"
                >
                  Category exists
                </v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeModal">
            Cancel
          </v-btn>
          <v-btn type="submit" color="primary" :disabled="!addCategory" text>
            Enter
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddCategoryModal',
  props: {
    categoryDialog: Boolean,
    //addCategory: Boolean,
    categories: Array,
  },
  data() {
    return {
      categoryExistsError: false,
      addCategory: null,

      submitCategory(e) {
        const newCategory = {
          name: this.addCategory,
          meetings: [],
        };

        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i].name == this.addCategory) {
            console.log('Category exists');
            this.categoryExistsError = true;
            break;
          } else {
            this.categoryExistsError = false;
          }
        }

        if (!this.categoryExistsError) {
          this.$emit('add-category', newCategory);
          this.addCategory = '';
          this.categoryExistsError = false;
          this.$emit('close-add-cat-modal');
        } else {
          this.addCategory = '';
        }
      },
    };
  },
  methods: {
    closeModal: function() {
      this.$emit('close-add-cat-modal');
    },
  },
};
</script>
