<template>
    <div class="flex content-center flex-wrap bg-gray-200 h-screen">
        <div class="h-125 mx-auto flex p-6 bg-white shadow-xl grid grid-cols-1 lg:grid-cols-2 w-11/12 sm:w-3/5 md:w-1/2 lg:w-3/4 xl:w-3/5">
            <div class="hidden lg:block">
                <img class="mt-20" src="@/assets/img/login_form.png" alt="ChitChat Logo">
            </div>
            <div class="h-112">
                <ValidationObserver v-slot="{ invalid }" ref="form">
                    <form @submit.prevent="loginJWT">
                        <h1 class="font-bold text-2xl">Login</h1>
                        <p class="text-base">Welcome back, please login to your account.</p>
                        <md-field class="mt-10" :class="messageClass">
                            <label>Email</label>
                            <validation-provider class="w-full" name="email" mode="eager" rules="min:3|required|email"
                                                 v-slot="{ errors }">
                                <md-input class="w-full" v-model="email" type="email" required></md-input>
                                <span class="md-error text-sm">{{ errors[0] }}</span>
                            </validation-provider>
                        </md-field>
                        <md-field :class="messageClass">
                            <label>Password</label>
                            <validation-provider class="w-full" mode="aggressive" name="password" rules="min:6|required"
                                                 v-slot="{ errors }">
                                <md-input class="w-full" v-model="password" type="password" required></md-input>
                                <span class="md-error text-sm">{{ errors[0] }}</span>
                            </validation-provider>
                        </md-field>
                        <div class="flex flex-wrap justify-between">
                            <md-checkbox class="mt-0" v-model="rememberMe">Remember Me</md-checkbox>
                            <a href="/demo/vuexy-vuejs-admin-dashboard-template/demo-2/pages/forgot-password">
                                Forgot Password?</a>
                        </div>
                        <div class="flex flex-wrap justify-between mt-6">
                            <vs-button class="w-24" color="primary" type="border">Register</vs-button>
                            <vs-button class="w-24" color="primary" type="filled" @click="loginJWT()"
                                       :disabled="invalid">
                                Login
                            </vs-button>
                        </div>
                        <md-snackbar md-position="center" :md-duration="4000" :md-active.sync="showSnackbar"
                                     md-persistent>
                            <span>{{snackBarText}}</span>
                            <md-button class="md-primary" @click="showSnackbar = false">close</md-button>
                        </md-snackbar>
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

  export default {
    name: "login",
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    mixins: [
      validationRuleMixin,
      loaderMixin,
    ],
    data() {
      return {
        email: 'rcastro@cenas.pt',
        password: '123456',
        rememberMe: false,
        showSnackbar: false,
        snackBarText: '',
        hasMessages: true,
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

          this.$_loaderMixin_loaderStart('.full-page')

          const payload = {
            email: this.email,
            password: this.password,
          }
          const redirect = this.$route.query.redirect

          await this.doLogin(payload)

          if (!this.hasError) {
            this.getCurrentUserData()
          }

          this.$_loaderMixin_loaderStop('.full-page')

          if (!this.hasError) {
            if (redirect !== undefined) {
              await this.$router.push({path: redirect})
            } else {
              await this.$router.push({name: 'applications'})
            }
          } else {
            if (this.error.response.status === 401) {
              this.snackBarText = 'Invalid username or password!';
              this.showSnackbar = true;
            }
          }
        })
      },
    }
  }
</script>
