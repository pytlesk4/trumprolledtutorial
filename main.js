var finish = function(vm) {
  vm.submitted = true;
  vm.headerImg = 'https://slack-imgs.com/?c=1&url=https%3A%2F%2Fmedia0.giphy.com%2Fmedia%2F11F6daC0kgF0bu%2Fgiphy.gif';
};

new Vue({
  el: '#app',

  data: {
    phone: '',
    email: '',
    error: null,
    submitting: false,
    submitted: false,
    headerImg: 'https://slack-imgs.com/?c=1&url=http%3A%2F%2Fi.giphy.com%2Fm7BTtLWhjkEJa.gif',
  },

  methods: {
    send: function(event) {
      event.preventDefault(event);
      var vm = this;
      var phone = vm.phone;
      var email = vm.email;

      if (email === 'test') {
        finish(vm);
        return;
      }

      if (!email.match(/^\S+@\S+$/)) {
        alert('Please enter a valid email.');
        return;
      }

      vm.submitting = true;
      vm.error = null;

      var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open('POST', `https://conductor.stoplight.io/v1/conductor/fill/in`, true);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.onload = function() {
        if (xhr.status !== 200) {
          vm.submitting = false;
          try {
            error = JSON.parse(xhr.responseText);
            vm.error = error;
          } catch (e) {
            vm.error = 'An unknown error occurred.';
          }
        } else {
          finish(vm);
        }
      };

      xhr.send(JSON.stringify({phone, email}));
    }
  },
});
