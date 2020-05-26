<template>
    <div class="tw-flex tw-content-center tw-flex-wrap tw-bg-gray-200 tw-h-screen">
        <loading :show-loading="showLoading"></loading>
        <notification></notification>
        <!--       tw-p-6 -->
        <div class="
        tw-mx-auto tw-h-125 tw-w-11/12 sm:tw-w-3/5 md:tw-w-1/2 lg:tw-w-3/4 xl:tw-w-3/5
        tw-bg-white tw-shadow-xl">
            <div class="tw-hidden lg:tw-inline-block lg:tw-w-3/5 tw-float-left">
                <img class="" src="@/assets/img/login_form.png">
            </div>
            <div class="
            h-112 lg:tw-w-2/5
            tw-inline-block tw-float-right tw-p-6 lg:tw-p-3">

                <ValidationObserver v-slot="{ invalid }" ref="form">
                    <form @submit.prevent="loginJWT">
                        <h1 class="tw-font-bold tw-text-2xl">Login</h1>
                        <p class="tw-text-base">Welcome back, please login to your account.</p>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <validation-provider name="email" mode="eager"
                                                         rules="min:3|required|email"
                                                         v-slot="{ errors }">
                                        <v-text-field
                                                v-model="email"
                                                label="Email"
                                                type="email"
                                                :error="!!errors.length"
                                                :rules="[errors[0]]"
                                                hide-details="auto"></v-text-field>
                                    </validation-provider>
                                </v-col>
                                <v-col cols="12">
                                    <validation-provider mode="aggressive" name="password"
                                                         rules="min:6|required"
                                                         v-slot="{ errors }">
                                        <v-text-field
                                                v-model="password"
                                                label="Password"
                                                :rules="[errors[0]]"
                                                :error="!!errors.length"
                                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="showPassword ? 'text' : 'password'"
                                                @click:append="showPassword = !showPassword"
                                                hide-details="auto"></v-text-field>
                                    </validation-provider>
                                </v-col>
                                <v-col cols="6">
                                    <v-checkbox class="tw-mt-0"
                                                v-model="rememberMe"
                                                label="Remember Me"></v-checkbox>
                                </v-col>
                                <v-col cols="6" class="tw-text-right">
                                    <a href="#">
                                        Forgot Password?
                                    </a>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn class="tw-mr-2 tw-w-24" outlined color="primary">
                                        Register
                                    </v-btn>
                                    <v-btn
                                            class="tw-w-24"
                                            color="primary"
                                            :disabled="invalid"
                                            type="submit">
                                        Login
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex'
  import {ValidationObserver, ValidationProvider} from 'vee-validate';
  import {validationRuleMixin} from "../../mixins/validationRulesMixin";
  import {loaderMixin} from '../../mixins/loaderMixin'
  import Loading from "../../components/loading/loading";
  import Notification from "../../components/notification/notification";

  export default {
    name: "login",
    components: {
      Notification,
      Loading,
      ValidationProvider,
      ValidationObserver,
    },
    mixins: [
      validationRuleMixin,
      loaderMixin,
    ],
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
        hasMessages: true,
        showLoading: false,
        showPassword: false,
      }
    },
    computed: {
      ...mapGetters({
        hasError: 'security/hasError',
        error: 'security/error'
      }),
      messageClass() {
        return {
          'md-invalid': this.hasMessages
        }
      }
    },
    methods: {
      ...mapActions({
        doLogin: 'security/login',
        getCurrentUserData: 'user/currentUserData',
        authenticationReset: 'security/authenticationReset',
      }),
      loginJWT() {
        this.$refs.form.validate().then(async (success) => {
          if (!success) {
            return;
          }

          this.showLoading = true;

          const payload = {
            email: this.email,
            password: this.password,
          }
          const redirect = this.$route.query.redirect

          await this.doLogin(payload)

          if (!this.hasError) {
            await this.getCurrentUserData()
          }

          if (!this.hasError) {
            if (redirect !== undefined) {
              await this.$router.push({path: redirect})
            } else {
              await this.$router.push({name: 'applications'})
            }
          } else if (this.error.response.status === 401) {
            // since we just want to highlight this two fields
            // we are passing empty error messages
            this.$refs.form.setErrors({
              email: [''],
              password: [''],
            })
          }

          this.showLoading = false;
        })
      },
    }
  }
</script>
