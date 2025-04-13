
// import 'jquery'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// export default defineNuxtPlugin(() => {

// })


import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  if (process.client) {
    // Dynamically load jQuery
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.3.1.min.js';
    jqueryScript.onload = () => {
      console.log('jQuery loaded');

      // Dynamically load Bootstrap JS (after jQuery)
      const bootstrapScript = document.createElement('script');
      bootstrapScript.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js';
      bootstrapScript.onload = () => {
        console.log('Bootstrap JS loaded');
      };
      document.body.appendChild(bootstrapScript);
    };
    document.body.appendChild(jqueryScript);
  }
});
