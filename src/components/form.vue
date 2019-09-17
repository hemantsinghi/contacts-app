<template>
  <f7-page>
    <f7-navbar :title="title" back-link="Back" back-link-url="/" />
    <template v-if="type == 'add'">
      <f7-list no-hairlines-md inset>
        <f7-list-input
          outline
          label="Name"
          type="text"
          placeholder="Your name"
          @input="contactData.name = $event.target.value"
          :value="contactData.name"
          required
          validate
        />
        <f7-list-input
          outline
          label="E-mail"
          type="email"
          placeholder="Your e-mail"
          @input="contactData.email = $event.target.value"
          :value="contactData.email"
          required
          validate
        />
        <f7-list-input
          outline
          label="Phone number"
          type="tel"
          placeholder="Your phone number"
          @input="contactData.tel = $event.target.value"
          :value="contactData.tel"
          validate
          pattern="(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*"
        />
        <f7-list-item>
          <span>Favorite</span>
          <f7-toggle :checked="contactData ? contactData.favorite : false" />
        </f7-list-item>
      </f7-list>
      <f7-fab position="right-bottom" color="green" href="/add/">
        <f7-icon material="save" />
      </f7-fab>
      <f7-fab position="left-bottom" color="red" href="/">
        <f7-icon ios="f7:close" aurora="f7:close" md="material:close" />
      </f7-fab>
    </template>
    <template v-else>
      <f7-list>
        <f7-list-item header="Name" :title="contactData.name">
          <f7-icon slot="media" material="person" />
        </f7-list-item>
        <f7-list-item header="Email">
          <f7-link
            :prevent-router="true"
            :href="'mailto:' + contactData.email"
            slot="title"
            :external="true"
          >
            {{ contactData.email }}
          </f7-link>
          <f7-icon slot="media" material="email" />
        </f7-list-item>
        <f7-list-item header="Phone">
          <f7-link
            :prevent-router="true"
            :href="'tel:' + contactData.tel"
            slot="title"
            :external="true"
          >
            {{ contactData.tel }}
          </f7-link>
          <f7-icon slot="media" material="phone" />
        </f7-list-item>
      </f7-list>
      <f7-fab position="left-bottom" color="blue" :href="'/add/' + contactData.id">
        <f7-icon ios="f7:edit" aurora="f7:edit" md="material:edit" />
      </f7-fab>
    </template>
  </f7-page>
</template>

<script>
export default {
  props: ['pageTitle', 'data', 'formType'],
  data() {
    return {
      title: '',
      contactData: {
        id: '',
        name: '',
        email: '',
        tel: '',
        favorite: false,
      },
      type: 'add',
    };
  },
  mounted() {
    if (this.data && this.data.length > 0) {
      this.contactData = this.data[0];
    }
    this.title = this.pageTitle;
    this.type = this.formType;
  },
  methods: {
    addContact() {
      
    },
  },
};
</script>
