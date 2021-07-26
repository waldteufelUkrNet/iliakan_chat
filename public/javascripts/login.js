"use strict"

const form      = document.forms.regform,
      inputName = form.querySelector('input[name="name"]'),
      inputPass = form.querySelector('input[name="password"]');

// form.addEventListener('submit', function(event) {
//   event.preventDefault();
// });

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  if(!inputName.value || !inputPass.value) return;

    let body = {
      name: inputName.value,
      pass: inputPass.value
    };

    let response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        // 'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      window.location.href = '/chat';
    } else {
      // here error handler
      alert('LOGIN ERROR!  ' + response.status + ' : ' + response.statusText);
    }
});