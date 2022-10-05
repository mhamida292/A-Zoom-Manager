<template>
  <v-dialog
    v-model="editMeetingDialog"
    max-height="550"
    max-width="320"
    persistent
  >
    <form @submit.prevent="checkCategoryChange" autocomplete="off">
      <v-card dark>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  class="pt-1 mt-1"
                  label="Meeting Name"
                  v-model="addMeetingName"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  class="pt-1 mt-1"
                  clearable
                  label="Meeting Link or ID"
                  v-model="addMeetingID"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  clearable
                  class="pt-1 mt-1"
                  label="Meeting Passcode (optional)"
                  v-model="addMeetingPasscode"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="categorySelect"
                  class="pt-1 mt-1"
                  :items="categories"
                  item-text="name"
                  label="Category"
                  dense
                  dark
                ></v-select>
              </v-col>

              <v-col v-if="inputError" cols="12" sm="6" md="4">
                <v-alert dense color="primary" type="error">
                  Something's wrong!
                </v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

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
          <v-btn color="primary" text @click="closeModal">
            Cancel
          </v-btn>

          <v-btn color="primary" type="submit" text>
            Enter
          </v-btn>
        </v-card-actions>
      </v-card>
      <ConfirmDelete
        :confirmDeleteDialog="confirmDeleteDialog"
        @deny-delete="confirmDeleteDialog = false"
        @confirm-delete="deleteMeeting"
      />
    </form>
  </v-dialog>
</template>

<script>
import ConfirmDelete from './ConfirmDelete';

export default {
  name: 'EditMeetingDialog',
  components: {
    ConfirmDelete,
  },
  props: {
    editMeetingDialog: Boolean,
    catIndex: Number,
    meetingIndex: Number,
    categories: Array,
  },
  data() {
    return {
      addMeetingName: null,
      addMeetingID: null,
      addMeetingPasscode: null,
      categorySelect: null,
      inputError: false,
      confirmDeleteDialog: false,
      originalCatIndex: null,
    };
  },
  mounted() {
    this.setDefault();
  },
  methods: {
    closeModal: function() {
      this.inputError = false;
      this.$emit('close-edit-meeting-modal');
    },
    isValidMeetingID(str) {
      let isValid = true;
      if (
        isNaN(str) ||
        !(str.length == 11 || str.length == 10 || str.length == 9)
      ) {
        if (!str.startsWith('http')) {
          isValid = false;
          this.inputError = true;
        }
      } else {
        
        this.addMeetingID = 'https://zoom.us/j/' + this.addMeetingID;
      }
      return isValid;
    },

    isMeetingNameValid(str) {
      let isValid = true;
      if (str.length == 0) {
        isValid = false;
        this.inputError = true;
      }
      return isValid;
    },

    isValidCategorySelect() {
      let isValid = true;
      if (this.categorySelect == null) {
        isValid = false;
        this.inputError = true;
      }
      return isValid;
    },

    checkCategoryChange() {
      if (this.categorySelect == this.categories[this.originalCatIndex].name) {
        this.submitMeeting();
      } else {
        this.submitMeetingNewCat();
        this.deleteMeeting();
      }
    },

    submitMeeting() {
      let indexName = this.categorySelect;

      if (
        this.isValidCategorySelect() &&
        this.isValidMeetingID(this.addMeetingID) &&
        this.isMeetingNameValid(this.addMeetingName)
      ) {
        const editedMeeting = {
          zoomName: this.addMeetingName,
          zoomLink: this.addMeetingID,
          zoomPass: this.addMeetingPasscode,
        };

        this.$emit('edit-meeting', {
          catIndex: this.catIndex,
          meetingIndex: this.meetingIndex,
          editedMeeting: editedMeeting,
        });
        this.inputError = false;
        this.$emit('close-edit-meeting-modal');
      }
    },

    deleteMeeting() {
      this.confirmDeleteDialog = false;
      this.$emit('delete-meeting', {
        catIndex: this.catIndex,
        meetingIndex: this.meetingIndex,
      });
      this.$emit('close-edit-meeting-modal');
    },

    submitMeetingNewCat() {
      let indexName = this.categorySelect;

      if (
        this.isValidCategorySelect() &&
        this.isValidMeetingID(this.addMeetingID) &&
        this.isMeetingNameValid(this.addMeetingName)
      ) {
        const newMeeting = {
          zoomName: this.addMeetingName,
          zoomLink: this.addMeetingID,
          zoomPass: this.addMeetingPasscode,
        };

        this.$emit('add-meeting', {
          indexName: indexName,
          meeting: newMeeting,
        });
        this.inputError = false;
        this.$emit('close-edit-meeting-modal');
      }
    },

    setDefault() {
      this.addMeetingName = this.categories[this.catIndex].meetings[
        this.meetingIndex
      ].zoomName;
      this.addMeetingID = this.categories[this.catIndex].meetings[
        this.meetingIndex
      ].zoomLink;
      this.addMeetingPasscode = this.categories[this.catIndex].meetings[
        this.meetingIndex
      ].zoomPass;
      this.categorySelect = this.categories[this.catIndex].name;
      this.originalCatIndex = this.catIndex;
    },
  },
  watch: {
    editMeetingDialog() {
      if (this.editMeetingDialog == true) {
        this.setDefault();
      }
    },
  },
};
</script>
