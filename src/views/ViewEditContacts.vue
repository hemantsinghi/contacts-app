<template>
  <b-container>
    <template v-for="(item, index) in items">
      <b-row :key="index" class="mt-2">
        <b-col sm="3">
          {{ item.name }}
          <i v-if="item.favorite" class="fas fa-star mr-4 golden"/>
        </b-col>
        <b-col sm="5" md="4">{{ item.email }}</b-col>
        <b-col sm="2" md="3">{{ item.tel }}</b-col>
        <b-col sm="2" class="pr-0">
          <i class="fas fa-user-edit mr-4" v-b-toggle="'accordion-'+index"/>
          <i class="fas fa-user-minus"/>
        </b-col>
      </b-row>
      <b-row :key="item.name + index">
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
            class="col-sm-4 float-left">
            <ValidationProvider name="Name" rules="required" ref="nameProvider">
              <div slot-scope="{ errors, classes }">
                <b-form-input
                  :id="'name-' + index"
                  name="Name"
                  v-model.trim="form[index].name"
                  type="text"
                  placeholder="Enter name"
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
            class="col-sm-4 float-left"
          >
            <ValidationProvider name="Email" rules="required|email" ref="emailProvider">
              <div slot-scope="{ errors, classes }">
                <b-form-input
                  :id="'email-' + index"
                  v-model.trim="form[index].email"
                  placeholder="Enter email"
                  :class="classes"
                ></b-form-input>
                <p>{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
          </b-form-group>
          <b-form-group
            :id="'phone-group-' + index"
            label="Phone:"
            :label-for="'phone-' + index"
            class="col-sm-4 float-left"
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
              size="lg"/>
          </b-form-group>
          <b-form-group
            class="col-sm-6 float-left mt-2"
          >
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form-group>
          </b-form>
        </b-collapse>
        </b-row>
    </template>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      form: [{
        name: '',
        email: '',
        tel: '',
        favorite: false,
      }],
      items: [],
      show: true,
    };
  },
  created() {
    this.items = JSON.parse(localStorage.getItem('storedFormData'));
    this.form = this.items;
  },
  methods: {
    async onSubmit(index, evt) {
      evt.preventDefault();
      const validationResult = await this.validateAll(index);
      if (validationResult) {
        let formsArray = [];
        if (localStorage.getItem('storedFormData') !== null) {
          formsArray = JSON.parse(localStorage.getItem('storedFormData'));
        }
        if (formsArray.length > 0) {
          const foundForm = formsArray.find(x => x.name === this.form[index].name)
          || formsArray.find(x => x.email === this.form[index].email);
          const foundTelForm = formsArray.find(x => x.tel !== this.form[index].tel);
          if (!foundForm && foundForm.length === 0) {
            console.log(foundForm);
            formsArray.push(this.form[index]);
            // localStorage.setItem('storedFormData', JSON.stringify(formsArray));
          } else if (foundTelForm) {
            const filtered = formsArray.filter((value, idx) => idx !== index);
            filtered.push(this.form[index]);
            localStorage.removeItem('storedFormData');
            localStorage.setItem('storedFormData', JSON.stringify(filtered));
          }
        } else {
          formsArray.push(this.form[index]);
          localStorage.setItem('storedFormData', JSON.stringify(formsArray));
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
      this.form[index].name = this.items[index].name;
      this.form[index].email = this.items[index].email;
      this.form[index].tel = this.items[index].tel;
      this.form[index].favorite = this.items[index].favorite;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
<style scoped>
  .golden {
    color: #FFD700
  }
  .row {
    border: 1px black solid;
  }
</style>
