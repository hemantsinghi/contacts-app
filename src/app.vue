<template>
  <!-- App -->
  <f7-app :params="f7params">
    <!-- Left Panel -->
    <f7-panel left resizable reveal theme-dark>
      <f7-view url="/favorite/" />
    </f7-panel>
    <!-- Main View -->
    <f7-view id="main-view" url="/" main class="safe-areas" />
  </f7-app>
</template>

<script>
// Import Routes
import routes from './routes.js';

export default {
  data() {
    return {
      // Framework7 parameters here
      f7params: {
        id: 'io.framework7.contactsapp', // App bundle ID
        name: 'Contacts', // App name
        theme: 'auto',
        // App routes
        routes,
      },
    };
  },
};
</script>
