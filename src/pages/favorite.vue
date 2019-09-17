<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-nav-title>Favorites</f7-nav-title>
      </f7-nav-left>
    </f7-navbar>
    <f7-list>
      <f7-list-group v-for="(contact, group) in contacts" :key="group">
        <f7-list-item :title="group" group-title />
        <template v-for="item in contact">
          <f7-list-item v-if="item.favorite" swipeout @swipeout:deleted="onDeleted" :title="item.name">
            <f7-swipeout-actions right>
              <f7-swipeout-button delete>Delete</f7-swipeout-button>
            </f7-swipeout-actions>
          </f7-list-item>
        </template>
      </f7-list-group>
    </f7-list>
    <f7-block-footer class="">
      <p>Swipe right to remove favorites.</p>
    </f7-block-footer>
  </f7-page>
</template>
<script>
import lodash from 'lodash';

export default {
  data() {
    return {
      contactsData: [
        {
          id: 0,
          name: 'Aaron',
          favorite: true
        },
        {
          id: 1,
          name: 'Aron',
          favorite: true
        },
        {
          id: 2,
          name: 'Baron',
        },
        {
          id: 3,
          name: 'Caron',
        },
      ],
    };
  },
  created() {
    this.contactsData = lodash.filter(this.contactsData, contact => {
      return contact.favorite;
    });
    this.contacts = lodash.groupBy(this.contactsData, contact => {
      return contact.name[0];
    });
    
  },
  methods: {
    onDeleted() {
      const app = this.$f7;
      app.dialog.alert('Favorite contact removed!');
    },
  },
};
</script>
<style scoped>
.block-footer {
  margin-top: var(--f7-block-footer-margin);
}
</style>
