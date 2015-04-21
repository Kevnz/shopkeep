'use strict';

import forms from 'newforms';

var CheckoutForm = forms.Form.extend({
  name: forms.CharField(),
  street: forms.CharField(),
  city: forms.CharField(),
  state: forms.CharField(),
  acceptTerms: forms.BooleanField({required: true})
});

export default CheckoutForm;