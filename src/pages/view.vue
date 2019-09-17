<template>
  <f7-page>
    <contactForm :form-type="'view'" :data="contactsData" :page-title="'View'" />
  </f7-page>
</template>

<script>
import contactForm from '@/components/form.vue';

export default {
  components: {
    contactForm,
  },
  data() {
    return {
      title: '',
      contactsData: [
        {
          id: 0,
          name: 'Aaron',
          tel: 2345678,
          email: 'hemantsinghi@targa.com',
          favorite: true,
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
    this.title = this.$f7route.params.id && this.$f7route.params.id.length > 0 ? 'Edit' : 'Add';
  },
};
</script>
