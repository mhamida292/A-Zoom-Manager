<template>
  <v-footer dark padless app absolute>
    <v-card class="flex" tile>
      <v-speed-dial
        id="speedDial"
        class="mx-auto"
        v-model="fab"
        absolute
        elevation="5"
        style="z-index: 5"
      >
        <template v-slot:activator>
          <v-btn color="primary" dark fab>
            <v-icon class="mdi mdi-close" color="black" v-if="fab"></v-icon>
            <v-icon class="mdi mdi-plus" color="black" v-else></v-icon>
          </v-btn>
        </template>

        <!--ADD CATEGORY BUTTON IN SPEED DIAL -->
        <v-btn
          small
          dark
          rounded
          color="primary"
          class="black--text"
          @click.stop="categoryDialog = true"
        >
          <span color="black"> Add Category </span>
        </v-btn>

        <!--ADD MEETING BUTTON IN SPEED DIAL -->
        <v-btn
          dark
          small
          rounded
          color="primary"
          class="black--text"
          @click.stop="meetingDialog = true"
          >Add Meeting
        </v-btn>
      </v-speed-dial>
      <v-bottom-nav id="bottomNav" absolute horizontal fixed>
        <v-card-title color="#242424">
          <InfoModal />
          <!--DIALOG FOR ADD CATEGORY-->
          <!--:addCategory="addCategory"-->
          <AddCategoryModal
            :categoryDialog="categoryDialog"
            :categories="categories"
            @close-add-cat-modal="categoryDialog = false"
            @add-category="submitCategory"
          />

          <!--DIALOG FOR ADD MEETING -->
          <AddMeetingModal
            :meetingDialog="meetingDialog"
            :categories="categories"
            @close-add-meeting-modal="meetingDialog = false"
            @add-meeting="submitMeeting"
          />

          <v-btn
            absolute
            right
            @click.stop="toggleEditCategory"
            color="#979797"
            fab
            x-small
            dark
          >
            <v-icon class="mdi mdi-pencil" color="secondary"></v-icon>
          </v-btn>
        </v-card-title>
      </v-bottom-nav>
    </v-card>
  </v-footer>
</template>

<script>
import InfoModal from './InfoModal';
import AddCategoryModal from './AddCategoryModal';
import AddMeetingModal from './AddMeetingModal';

export default {
  components: {
    InfoModal,
    AddCategoryModal,
    AddMeetingModal,
  },
  props: {
    categories: Array,
  },
  data() {
    return {
      categoryDialog: false,
      meetingDialog: false,
      editCategoryTog: false,
      fab: false,
    };
  },
  methods: {
    toggleEditCategory() {
      this.editCategoryTog = !this.editCategoryTog;
      this.$emit('edit-category-toggle', this.editCategoryTog);
    },
    submitCategory(categoryObj) {
      this.$emit('add-category', categoryObj);
    },
    submitMeeting({ indexName: index, meeting: newMeeting }) {
      this.$emit('add-meeting', {
        indexName: index,
        meeting: newMeeting,
      });
    },
  },
  emits: ['add-meeting', 'add-category'],
};
</script>
<style scoped>
#speedDial {
  transform: translate(-50%, -50%);
  border: 6px solid rgb(18, 18, 18);
  border-radius: 100%;
  left: 50%;
  bottom: 5%;
}
#bottomNav {
  display: flex;
  justify-content: space-between !important;
}
</style>
