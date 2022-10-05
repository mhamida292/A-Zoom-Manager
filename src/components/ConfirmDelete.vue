<template>
  <v-dialog v-model="confirmDeleteDialog" width="320" dark>
    <v-card>
      <v-card-title>
        Are you sure?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('deny-delete')">
          No
        </v-btn>
        <v-btn color="primary" text @click="$emit('confirm-delete')">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ConfirmDeleteDialogModal',
  props: {
    confirmDeleteDialog: Boolean,
  },
};
</script>
