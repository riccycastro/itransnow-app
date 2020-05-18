import Vue from 'vue';
import moment from 'moment';
import 'moment/locale/pt';

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('date', function(value) {
  if (!value) return ''
  moment.locale('pt');
  return moment.utc(value).local().format('Y-M-D H:mm')
})
