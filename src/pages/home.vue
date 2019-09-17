<template>
  <f7-page>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-material="menu" panel-open="favorite" />
        <f7-nav-title>Contacts</f7-nav-title>
      </f7-nav-left>
    </f7-navbar>
    <f7-list>
      <f7-list-group v-for="(contact, group) in contacts" :key="group">
        <f7-list-item :title="group" group-title/>
        <template v-for="item in contact">
          <f7-list-item :link="'/view/' + item.id" :title="item.name" />
        </template>
      </f7-list-group>
    </f7-list>
    <f7-fab position="right-bottom" color="red" href="/add/">
      <f7-icon ios="f7:add" aurora="f7:add" md="material:add" />
    </f7-fab>
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
        },
        {
          id: 1,
          name: 'Aron',
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
    this.contacts = lodash.groupBy(this.contactsData, contact => {
      return contact.name[0];
    });
    // console.log(this.contacts);
  },
};
</script>
