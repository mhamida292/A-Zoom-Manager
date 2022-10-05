<template>
  <div>
    <v-btn @click.stop="infoDialog = true" color="#979797" fab x-small dark>
      <v-icon class="mdi mdi-exclamation-thick" color="secondary"></v-icon>
    </v-btn>
    <v-dialog v-model="infoDialog" max-width="320" dark>
      <v-card>
        <v-card-title class="headline">
          Information
        </v-card-title>

        <v-card-text>
          This application was developed by Aceris! Contact us for feedback:
          acerisdev@gmail.com
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        <v-btn color="primary" text @click="buyCoffee">
            BUY US A COFFEE
          </v-btn>
          <v-btn color="primary" text @click="infoDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'infoModal',
  data() {
    return {
      infoDialog: false,
    };
  },
  methods: {
    buyCoffee(){
      window.open("https://www.buymeacoffee.com/aceris")
    }
  },
};
</script>
