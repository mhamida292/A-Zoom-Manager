<template>
  <v-dialog v-model="meetingDialog" max-height="550" max-width="320" persistent>
    <form @submit.prevent="submitMeeting" autocomplete="off">
      <v-card dark>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  class="pt-1 mt-1"
                  v-model="addMeetingName"
                  label="Meeting Name"
                  clearable
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="addMeetingID"
                  class="pt-1 mt-1"
                  clearable
                  background-color="light-red"
                  label="Meeting Link or ID"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="addMeetingPasscode"
                  clearable
                  class="pt-1 mt-1"
                  label="Meeting Passcode (optional)"
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
          <v-btn color="primary" text @click="closeModal">
            Cancel
          </v-btn>

          <v-btn color="primary" type="submit" text>
            Enter
          </v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddMeetingModal',
  props: {
    meetingDialog: Boolean,
    categories: Array,
  },
  data() {
    return {
      addMeetingName: '',
      addMeetingID: '',
      addMeetingPasscode: null,
      categorySelect: null,
      passwordEnabled: false,
      inputError: false,

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

      submitMeeting() {
        let indexName = this.categorySelect;
        console.log(this.addMeetingID.length);

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

          this.addMeetingName = '';
          this.addMeetingID = '';
          this.addMeetingPasscode = '';
          this.inputError = false;
          this.categorySelect = null;
          this.$emit('close-add-meeting-modal');
        }
      },
    };
  },
  methods: {
    closeModal: function() {
      this.addMeetingName = null;
      this.categorySelect = null;
      this.addMeetingPasscode = null;
      this.addMeetingID = '';
      this.inputError = false;
      this.addMeetingID;
      this.$emit('close-add-meeting-modal');
    },
  },
};
</script>
