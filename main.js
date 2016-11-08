var finish = function(vm, selected) {
  vm.submitted = true;

  if (selected === 'hillary') {
    vm.headerImg = 'http://i.perezhilton.com/wp-content/uploads/2016/04/hillary-clinton-bernie-sanders-bad-lip-reading-1.gif';
  } else {
    vm.headerImg = 'https://media.giphy.com/media/3o6Zt8zdGRjQYz8sQ8/source.gif';
  }
};

new Vue({
  el: '#app',

  data: {
    phone: '',
    email: '',
    selected: 'donald',
    error: null,
    audio: document.getElementById('dead'),
    audio2: document.getElementById('reroll'),
    submitting: false,
    submitted: false,
    headerImg: 'https://slack-imgs.com/?c=1&url=http%3A%2F%2Fi.giphy.com%2Fm7BTtLWhjkEJa.gif',
  },

  methods: {
    reroll: function() {
      var vm = this;
      vm.submitting = false;
      vm.submitted = false;
      vm.error = null;
      vm.audio2.currentTime = 0;
      vm.audio2.play();
      vm.headerImg = 'https://slack-imgs.com/?c=1&url=http%3A%2F%2Fi.giphy.com%2Fm7BTtLWhjkEJa.gif'
    },

    send: function() {
      event.preventDefault(event);
      var vm = this;
      var phone = _.replace(vm.phone, / |-|\(|\)/g, '');
      var email = vm.email;
      var selected = vm.selected;

      if (!phone) {
        alert('Please enter a valid phone.');
        return;
      }

      if (phone === '911') {
        alert('Prank calling the police is illegal!');
        return;
      }

      if (email === 'test') {
        finish(vm, selected);
        return;
      }

      if (!email || !email.match(/^\S+@\S+$/)) {
        email = 'none@email.com'
      }

      vm.submitting = true;
      vm.error = null;

      vm.audio.currentTime = 0;
      vm.audio.play();

      var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      xhr.open('POST', `https://conductor.stoplight.io/v1/flows/run/TCwxvCLqeAuu7FCYQ?__alias=production`, true);
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
          finish(vm, selected);
        }
      };

      xhr.send(JSON.stringify({twilioPhoneTo: phone, trumpRollToEmail: email, selected: selected}));
    }
  },
});
