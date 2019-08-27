<template>
  <b-container class="mt-2">
    <b-alert v-if="formSubmit" :variant="alertVariant" show dismissible>{{ alertMessage }}</b-alert>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Name(*):"
        label-for="input-1">
        <ValidationProvider name="Name" rules="required" ref="nameProvider">
          <div slot-scope="{ errors, classes }">
            <b-form-input
              id="input-1"
              name="Name"
              v-model.trim="form.name"
              type="text"
              placeholder="Enter name"
              :class="classes"
            />
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Email address(*):"
        label-for="input-2"
      >
        <ValidationProvider name="Email" rules="required|email" ref="emailProvider">
          <div slot-scope="{ errors, classes }">
            <b-form-input
              id="input-2"
              v-model.trim="form.email"
              placeholder="Enter email"
              :class="classes"
            ></b-form-input>
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Phone:"
        label-for="input-3"
      >
        <ValidationProvider name="Phone number"
          ref="telProvider"
          :rules="{ regex: /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/ }">
          <div slot-scope="{ errors, classes }">
            <b-form-input
              id="input-3"
              type="tel"
              v-model.trim="form.tel"
              placeholder="Enter phone numer"
              :class="classes"
            />
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Favorite:"
        label-for="input-4"
        label-cols-sm="1"
        label-cols-lg="1"
      >
        <b-form-checkbox
          id="input-4"
          v-model="form.favorite"
          name="check-button"
          switch
          size="lg"/>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </b-container>
</template>
<script>
import lodash from 'lodash';

export default {
  data() {
    return {
      form: {
        id: 0,
        name: '',
        email: '',
        tel: '',
        favorite: false,
      },
      show: true,
      formSubmit: false,
      alertVariant: '',
      alertMessage: '',
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      this.formSubmit = true;
      const validationResult = await this.validateAll();
      if (validationResult) {
        let formsArray = [];
        if (localStorage.getItem('storedFormData') !== null) {
          formsArray = JSON.parse(localStorage.getItem('storedFormData'));
        }
        if (formsArray.length > 0) {
          const foundForm = formsArray.find(formArray => formArray.name === this.form.name
          && formArray.email === this.form.email
          && formArray.tel === this.form.tel);
          if (!foundForm) {
            const lastForm = lodash.maxBy(formsArray, function (formArray) {
              return formArray.id;
            });
            this.form.id = lastForm.id + 1;
            formsArray.push(this.form);
            localStorage.setItem('storedFormData', JSON.stringify(formsArray));
            this.alertVariant = 'success';
            this.alertMessage = 'Contact added.';
          } else {
            this.alertVariant = 'danger';
            this.alertMessage = 'Duplicate contact.';
          }
        } else {
          formsArray.push(this.form);
          localStorage.setItem('storedFormData', JSON.stringify(formsArray));
          this.alertVariant = 'success';
          this.alertMessage = 'Contact added.';
        }
      }
    },
    async validateAll() {
      const nameValidate = await this.$refs.nameProvider.validate();
      const emailValidate = await this.$refs.emailProvider.validate();
      const telValidate = await this.$refs.telProvider.validate();
      return nameValidate.valid && emailValidate.valid && telValidate.valid;
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.name = '';
      this.form.email = '';
      this.form.tel = '';
      this.form.favorite = false;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
<style>
  button[type="submit"] {
    margin-right: 8px;
  }
</style>
