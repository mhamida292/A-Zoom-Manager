<template>
  <v-app app>
    <v-main style="max-height: 575px">
      <v-card :height="575" :width="400" app color="#121212" dark shaped>
        <v-list id = "list" subheader tile style="max-height: 500px" color="#121212" app>
          <v-list-group
            expand
            prepend-icon=""
            color="white"
            no-action
            sub-group
            :value="true"
            v-for="(category, catIndex) in categories"
            :key="category.name"
            v-model="category.active"
            absolute
          >
            <template v-slot:appendIcon>
              <v-icon class="mdi mdi-chevron-down"></v-icon>
            </template>

            <template v-slot:activator>
              <v-list-item-title
                class="font-weight-medium title"
                color="primary"
                v-text="category.name"
              ></v-list-item-title>

              <!--opens edit category modal-->
              <v-btn
                @click.stop="editCategoryDialogOpen(catIndex)"
                v-if="togEditCategory"
                icon
                ><v-icon class="mdi mdi-pencil"></v-icon
              ></v-btn>
              <v-spacer></v-spacer>
            </template>

            <v-list-item
              v-for="(meeting, meetingIndex) in category.meetings"
              :key="meeting.zoomName"
              class="ma-1 pl-10"
              app
            >
            <v-tooltip max-width:10 bottom >
      <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="primary"
                v-bind="attrs"
                v-on="on"
                class = "copy"
                data-clipboard-text="meeting.zoomPass"
                @click="openLink(meeting.zoomLink, meeting.zoomPass)"
                v-text="meeting.zoomName"
              >
              </v-btn>
      </template>
              <span>Open link and copy password</span>
  </v-tooltip>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon
                  @click.stop="updateIndex(catIndex, meetingIndex)"
                  light
                  color="primary"
                  >mdi-pencil</v-icon
                >
              </v-btn>
            </v-list-item>
          </v-list-group>
        </v-list>

        <Footer
          :categories="categories"
          @add-category="pushCategory"
          @edit-category-toggle="toggleEditCategory"
          @add-meeting="pushMeeting"
        />

        <EditMeetingModal
          :meetingIndex="meetIndexGlob"
          :catIndex="catIndexGlob"
          :categories="categories"
          :editMeetingDialog="editMeetingDialog"
          @edit-meeting="editMeeting"
          @delete-meeting="deleteMeeting"
          @close-edit-meeting-modal="editMeetingDialog = false"
          @add-meeting="pushMeeting"
        />

        <EditCategoryModal
          :editCategoryDialog="editCategoryDialog"
          :catIndex="catIndexGlob"
          :categories="categories"
          @delete-category="deleteCategory"
          @edit-category="editCategory"
          @close-edit-cat-modal="editCategoryDialog = false"
        />

        <v-list/>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Footer from '../components/Footer';
import EditMeetingModal from '../components/EditMeetingModal';
import EditCategoryModal from '../components/EditCategoryModal';

export default {
  name: 'App',
  components: {
    Footer,
    EditMeetingModal,
    EditCategoryModal,
  },
  data() {
    return {
      categories: [],
      catIndexGlob: 0,
      meetIndexGlob: 0,
      editMeetingDialog: false,
      togEditCategory: false,
      editCategoryDialog: false,
    };
  },
  methods: {
    editCategoryDialogOpen(catIndex) {
      this.editCategoryDialog = true;
      this.catIndexGlob = catIndex;
    },
    toggleEditCategory(editCategoryTog) {
      this.togEditCategory = editCategoryTog;
      console.log(this.togEditCategory);
    },
    updateIndex(catIndex, meetIndex) {
      this.catIndexGlob = catIndex;
      this.meetIndexGlob = meetIndex;
      this.editMeetingDialog = true;
    },
    deleteCategory(catIndex) {
      this.categories.splice(catIndex, 1);
    },
    editCategory({ catIndex, categoryName }) {
      this.categories[catIndex].name = categoryName;
    },
    editMeeting({ catIndex, meetingIndex, editedMeeting }) {
      console.log(catIndex);
      console.log(meetingIndex);
      console.log(editedMeeting);
      this.categories[catIndex].meetings[meetingIndex].zoomName =
        editedMeeting.zoomName;
      this.categories[catIndex].meetings[meetingIndex].zoomPass =
        editedMeeting.zoomPass;
      this.categories[catIndex].meetings[meetingIndex].zoomLink =
        editedMeeting.zoomLink;
      //STILL NEED TO FIGURE OUT CATEGORY SELECT.
    },
    deleteMeeting({ catIndex, meetingIndex }) {
      console.log(catIndex);
      console.log(meetingIndex);
      this.categories[catIndex].meetings.splice(meetingIndex, 1);
    },
    pushMeeting({ indexName, meeting }) {
      let index;
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].name == indexName) {
          index = i;
          break;
        }
      }
      this.categories[index].meetings = [
        ...this.categories[index].meetings,
        meeting,
      ];
    },
    pushCategory(categoryObj) {
      this.categories = [...this.categories, categoryObj];
    },
    openLink(zoomLink,zoomPass) {
      const el = document.createElement('textarea');
      let pass = zoomPass
      el.value = pass;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      window.open(zoomLink);
    },
  },
    mounted(){
      console.log('App Mounted');
        if (localStorage.getItem('categories'))
            this.categories = JSON.parse(localStorage.getItem('categories'));
    },
  // This is the array for all the links.
  created() {
     this.categories = [
      {
        name: 'My Meetings',
        meetings: [
          {
            zoomName: 'Example Meeting',
            zoomLink: 'https://zoom.us/j/123456789',
            zoomPass: 'copied',
          }
        ],
      },
    ];
  },
  emits: [
    'delete-meeting',
    'delete-category',
    'add-meeting',
    'add-category',
    'open-edit-meeting-dialog',
  ],
   watch: {
        categories: {
            handler() {
                console.log('Todo Items array changed!');
                // key and value are the two parameters!
                localStorage.setItem('categories', JSON.stringify(this.categories));
            },
            deep: true,
        },
    },
};
</script>

<style scoped>
#list{
  overflow-y: auto;
  height: 500px;
}
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #BB86FC;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #c9a5f6;
}
</style>