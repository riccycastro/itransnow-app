import { required, email, min } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

export const validationRuleMixin = {
  mounted: () => {
    extend('required', required);
    extend('email', email);
    extend('min', min);
  }
}
