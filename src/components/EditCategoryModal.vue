<template>
  <v-dialog v-model="editCategoryDialog" max-width="320" persistent>
    <v-card dark>
      <form @submit.prevent="editCategory" autocomplete="off">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="categoryName"
                  label="Category Name"
                  clearable
                  required
                ></v-text-field>
              </v-col>
              <v-col class="ptd-1 mt-1" cols="12" sm="6" md="4">
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
          <v-btn
            absolute
            left
            fab
            small
            dense
            color="primary"
            @click="confirmDeleteDialog = true"
            text
          >
            <v-icon class="mdi mdi-delete"></v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeModal">
            Cancel
          </v-btn>
          <v-btn type="submit" color="primary" :disabled="!categoryName" text>
            Enter
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <ConfirmDelete
      :confirmDeleteDialog="confirmDeleteDialog"
      @deny-delete="confirmDeleteDialog = false"
      @confirm-delete="deleteCategory"
    />
  </v-dialog>
</template>

<script>
import ConfirmDelete from './ConfirmDelete';

export default {
  name: 'EditCategoryModal',
  components: {
    ConfirmDelete,
  },
  props: {
    editCategoryDialog: Boolean,
    catIndex: Number,
    categories: Array,
  },
  data() {
    return {
      categoryExistsError: false,
      categoryName: null,
      originalCategoryName: null,
      confirmDeleteDialog: false,
    };
  },
  mounted() {
    this.setDefault();
  },
  methods: {
    deleteCategory() {
      this.confirmDeleteDialog = false;
      this.$emit('delete-category', this.catIndex);
      this.$emit('close-edit-cat-modal');
      console.log('Works');
    },
    editCategory(e) {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.originalCategoryName == this.categoryName) {
          this.categoryExistsError = false;
        } else if (this.categories[i].name == this.categoryName) {
          console.log('Category exists');
          this.categoryExistsError = true;
          break;
        } else {
          this.categoryExistsError = false;
        }
      }

      if (!this.categoryExistsError) {
        this.$emit('edit-category', {
          catIndex: this.catIndex,
          categoryName: this.categoryName,
        });
        console.log('test');
        this.categoryExistsError = false;
        this.$emit('close-edit-cat-modal');
      } else {
        this.categoryName = '';
      }
    },
    closeModal: function() {
      this.setDefault();
      this.categoryExistsError = false;
      this.$emit('close-edit-cat-modal');
    },
    setDefault() {
      this.categoryName = this.categories[this.catIndex].name;
      this.originalCategoryName = this.categories[this.catIndex].name;
    },
  },
  watch: {
    editCategoryDialog() {
      if (this.editCategoryDialog == true) {
        this.setDefault();
      }
    },
  },
};
</script>
