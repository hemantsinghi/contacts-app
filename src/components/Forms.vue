<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Name(*):"
        label-for="input-1"
        :class="getClass()"
        >
        <ValidationProvider name="Name" rules="required" ref="nameProvider">
          <div slot-scope="{ errors, classes }">
            <b-form-input
              id="input-1"
              name="Name"
              v-model.trim="form.name"
              type="text"
              placeholder="Enter name"
              :class="classes"
              :disabled="checkDisableFields"
            />
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Email address(*):"
        label-for="input-2"
        :class="getClass()"
      >
        <ValidationProvider name="Email" rules="required|email" ref="emailProvider">
          <div slot-scope="{ errors, classes }">
            <b-form-input
              id="input-2"
              v-model.trim="form.email"
              placeholder="Enter email"
              :class="classes"
              :disabled="checkDisableFields"
            ></b-form-input>
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Phone:"
        label-for="input-3"
        :class="getClass()"
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
              :disabled="checkDisableFields"
            />
            <p>{{ errors[0] }}</p>
          </div>
        </ValidationProvider>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Favorite:"
        label-for="input-4"
        label-cols="2"
        label-cols-sm="8"
        :class="getClass()"
      >
        <b-form-checkbox
          id="input-4"
          v-model="form.favorite"
          name="check-button"
          switch
          size="lg"
          :disabled="checkDisableFields"/>
      </b-form-group>
      <template v-if="!checkDisableFields">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </template>
    </b-form>
</template>

<script>

export default {
  props: ['inputClass', 'disableFields'],
  data() {
    return {
      form: {
        email: '',
        name: '',
        tel: '',
        favorite: false,
      },
      show: true,
    };
  },
  computed: {
    checkDisableFields() {
      return this.disableFields;
    },
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      const validationResult = await this.validateAll();
      if (validationResult) {
        
        alert(JSON.stringify(this.form));
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
      this.form.email = '';
      this.form.name = '';
      this.form.tel = '';
      this.form.favorite = false;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    getClass() {
      return this.inputClass.input_class;
    },
  },
};
</script>
<style>
  button[type="submit"] {
    margin-right: 8px;
  }
</style>
