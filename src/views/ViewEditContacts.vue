<template>
  <b-container class="mt-2">
    <b-alert v-if="formSubmit" :variant="alertVariant" show dismissible>{{ alertMessage }}</b-alert>
    <b-card v-if="favoriteContacts.length > 0" no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block
          href="#"
          v-b-toggle.favorite-contacts
          variant="info" class="text-left">Favorites ({{ favoriteContacts.length }})</b-button>
      </b-card-header>
      <b-collapse id="favorite-contacts" visible accordion="favorite-contacts" role="tabpanel">
        <b-card-body>
          <b-row v-for="favorite in favoriteContacts" :key="favorite.id">
            {{ favorite.name }}
          </b-row>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-card v-if="form" no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block
          href="#"
          v-b-toggle.all-contacts
          variant="info" class="text-left">All Contacts ({{ form.length }})</b-button>
      </b-card-header>
      <b-collapse id="all-contacts" visible accordion="all-contacts" role="tabpanel">
        <b-card-body>
          <div v-for="(item, index) in form"  :key="item.id">
      <b-row class="mt-2">
        <b-col cols="6" v-b-toggle="'accordion-'+index" @click="toggleEditForm(index, 'show')">
          {{ item.name }}
          <i v-if="item.favorite" class="fas fa-star mr-4 golden"/>
        </b-col>
        <b-col cols="6" class="mb-2">
          <b-button variant="primary" @click="toggleEditForm(index, 'edit')" class="mr-2">
            Edit
          </b-button>
          <b-button variant="danger">Delete</b-button>
        </b-col>
      </b-row>
      <b-row>
      <b-collapse
        :id="'accordion-'+index"
        accordion="my-accordion"
        role="tabpanel"
        class="col-12">
        <b-form @submit="onSubmit(index, $event)" @reset="onReset(index, $event)">
          <b-form-group
            :id="'name-group-' + index"
            label="Name(*)"
            :label-for="'name-' + index"
            class="col-sm-3 float-left">
            <ValidationProvider name="Name" rules="required" ref="nameProvider">
              <div slot-scope="{ errors, classes }">
                <b-form-input
                  :id="'name-' + index"
                  name="Name"
                  v-model.trim="form[index].name"
                  type="text"
                  placeholder="Enter name"
                  :disabled="disabledForm[index]"
                  :class="classes"
                />
                <p>{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group
            :id="'email-group-' + index"
            label="Email address(*):"
            :label-for="'email-' + index"
            class="col-sm-3 float-left"
          >
            <ValidationProvider name="Email" rules="required|email" ref="emailProvider">
              <div slot-scope="{ errors, classes }">
                <b-form-input
                  :id="'email-' + index"
                  v-model.trim="form[index].email"
                  placeholder="Enter email"
                  :class="classes"
                  :disabled="disabledForm[index]"
                ></b-form-input>
                <p>{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group
            :id="'phone-group-' + index"
            label="Phone:"
            :label-for="'phone-' + index"
            class="col-sm-3 float-left"
          >
            <ValidationProvider name="Phone number"
              ref="telProvider"
              :rules="{ regex: /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/ }">
              <div slot-scope="{ errors, classes }">
                <b-form-input
                  :id="'phone-' + index"
                  type="tel"
                  v-model.trim="form[index].tel"
                  placeholder="Enter phone numer"
                  :class="classes"
                  :disabled="disabledForm[index]"
                />
                <p>{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group
            :id="'favorite-group-' + index"
            label="Favorite:"
            :label-for="'favorite-' + index"
            class="col-sm-2 float-left"
          >
            <b-form-checkbox
              :id="'favorite-' + index"
              v-model="form[index].favorite"
              name="check-button"
              switch
              @change="changeFavoriteStatus(index, $event)"
              :disabled="disabledForm[index]"
              size="lg"/>
          </b-form-group>
          <b-form-group v-if="!disabledForm[index]" class="col-sm-6 float-left mt-2">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <br>
            <span class="text-danger">(*) Press Submit for confirming changes.</span>
          </b-form-group>
          </b-form>
        </b-collapse>
        </b-row>
    </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </b-container>
</template>
<script>
import lodash from 'lodash';

export default {
  data() {
    return {
      form: [{
        id: 0,
        name: '',
        email: '',
        tel: '',
        favorite: false,
      }],
      items: [],
      formSubmit: false,
      alertVariant: '',
      alertMessage: '',
      favoriteContacts: [],
      disabledForm: [],
    };
  },
  created() {
    this.items = JSON.parse(localStorage.getItem('storedFormData'));
    if (this.items) {
      this.items = lodash.sortBy(this.items, ['id']);
      this.form = this.items;
      this.items.forEach((item, index) => {
        this.disabledForm[index] = true;
        if (item.favorite) {
          this.favoriteContacts.push(item);
        }
      });
    }
  },
  methods: {
    async onSubmit(index, evt) {
      evt.preventDefault();
      this.formSubmit = true;
      const validationResult = await this.validateAll(index);
      if (validationResult) {
        let formsArray = [];
        if (localStorage.getItem('storedFormData') !== null) {
          formsArray = JSON.parse(localStorage.getItem('storedFormData'));
          formsArray = lodash.sortBy(formsArray, ['id']);
        }
        if (formsArray.length > 0) {
          const foundForm = formsArray.find(x => (x.name === this.form[index].name));
          const foundTelForm = formsArray.find(x => x.tel !== this.form[index].tel);
          if (!foundForm) {
            formsArray.push(this.form[index]);
            formsArray = lodash.sortBy(formsArray, ['id']);
            localStorage.setItem('storedFormData', JSON.stringify(formsArray));
            this.alertVariant = 'success';
            this.alertMessage = 'Contact updated.';
          } else if (foundForm || foundTelForm) {
            if (foundForm.name !== this.form[index].name) {
              let filtered = formsArray.filter((value, idx) => idx !== index);
              filtered.push(this.form[index]);
              filtered = lodash.sortBy(filtered, ['id']);
              localStorage.removeItem('storedFormData');
              localStorage.setItem('storedFormData', JSON.stringify(filtered));
              this.alertVariant = 'success';
              this.alertMessage = 'Contact updated.';
            } else {
              this.alertVariant = 'danger';
              this.alertMessage = 'Duplicate contact.';
            }
          }
        } else {
          formsArray.push(this.form[index]);
          formsArray = lodash.sortBy(formsArray, ['id']);
          localStorage.setItem('storedFormData', JSON.stringify(formsArray));
          this.alertVariant = 'success';
          this.alertMessage = 'Contact updated.';
        }
      }
    },
    async validateAll(index) {
      const nameValidate = await this.$refs.nameProvider[index].validate();
      const emailValidate = await this.$refs.emailProvider[index].validate();
      const telValidate = await this.$refs.telProvider[index].validate();
      return nameValidate.valid && emailValidate.valid && telValidate.valid;
    },
    onReset(index, evt) {
      evt.preventDefault();
      // Reset our form values
      this.items = JSON.parse(localStorage.getItem('storedFormData'));
      this.form[index].name = this.items[index].name;
      this.form[index].email = this.items[index].email;
      this.form[index].tel = this.items[index].tel;
      this.form[index].favorite = this.items[index].favorite;
    },
    changeFavoriteStatus(index, event) {
      if (this.favoriteContacts.length > 0) {
        if (event && (this.favoriteContacts[index])
        && (this.favoriteContacts[index].favorite !== event)) {
          this.favoriteContacts[index].favorite = event;
        } else if (!event && (!this.favoriteContacts[index])) {
          this.favoriteContacts = lodash.filter(this.favoriteContacts, (favoriteContact) => {
            if (favoriteContact.id !== index) {
              return favoriteContact;
            }
          });
        } else if (event && (!this.favoriteContacts[index])) {
          this.favoriteContacts.splice(index, 0, this.form[index]);
        } else if (!event && this.favoriteContacts[index]) {
          this.favoriteContacts[index].favorite = event;
          this.favoriteContacts = lodash.filter(this.favoriteContacts, (favoriteContact) => {
            if (favoriteContact.id !== index) {
              return favoriteContact;
            }
          });
        } else {
          this.favoriteContacts.splice(index, 0, this.form[index]);
        }
      } else {
        this.favoriteContacts.push(this.form[index]);
      }
      this.favoriteContacts = lodash.sortBy(this.favoriteContacts, ['id']);
    },
    toggleEditForm(index, type) {
      this.disabledForm[index] = type === 'show';
      document.getElementById('accordion-0').className += ' show';
      document.getElementById('accordion-0').style = '';
      this.favoriteContacts = lodash.sortBy(this.favoriteContacts, ['id']);
    },
  },
};
</script>
<style scoped>
  .golden {
    color: #FFD700
  }
  .row {
    border-bottom: 1px black solid;
  }
</style>
