function php_email_form_submit(thisForm, action, formData) {
  fetch(action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }  // 👈 This is key for Formspree
  })
  .then(response => response.json())
  .then(data => {
    thisForm.querySelector('.loading').classList.remove('d-block');

    if (data.ok || data.next) {
      thisForm.querySelector('.sent-message').classList.add('d-block');
      thisForm.reset();
    } else {
      throw new Error(data.error || 'Form submission failed.');
    }
  })
  .catch((error) => {
    displayError(thisForm, error.message);
  });
}
