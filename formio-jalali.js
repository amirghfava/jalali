(function() {
  // 1. Define your Custom Component Class
  const Field = Formio.Components.components.field;
  class JalaliComponent extends Field {
     // ... (your Jalali class logic as written before)
  }

  // 2. Define the Module Object with all Plugin Hooks
  const JalaliModule = {
    // Custom Components
    components: {
      jalali: JalaliComponent
    },

    // New Templates or CSS Framework overrides
    templates: {
      bootstrap: {
        // You can override the HTML of any component here
        // Example: overriding how a 'well' looks
        well: {
          form: (ctx) => `<div class="custom-well-style">${ctx.content}</div>`
        }
      }
    },

    // Custom File Storage Providers
    providers: {
      storage: {
        // Example: a custom local storage provider
        myLocal: function(formio) {
          return {
            uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId) {
               console.log("Custom Upload Logic Here");
            },
            downloadFile(file) {
               console.log("Custom Download Logic Here");
            }
          };
        }
      }
    },

    // New or Overridden Display modes
    displays: {
      // You could define a 'pdf' or 'mobile' specific display override
      pdf: function(formio) { /* ... */ }
    },

    // Form Builder overrides
    builders: {
      // Logic to override the way the builder itself behaves
    },

    // Global Options for Renderer and Builder
    options: {
      builder: {
        custom: {
          title: "My Custom Components",
          weight: 5,
          components: {
            jalali: true,
            checkmatrix: true
          }
        }
      },
      form: {
        evalContext: {
          validatePhone: function(input) {
            return input.match(/^[2-9]\d{2}-\d{3}-\d{4}$/);
          }
        }
      }
    },

    // Intercept API Requests
    fetch: {
      priority: 0,
      onSend: (request) => {
        // Add custom headers to every API call
        request.headers['X-Custom-Header'] = 'Formio-Module-Active';
        return request;
      }
    },

    // Force a CSS Framework (e.g., 'bootstrap', 'semantic', 'tailwind')
    framework: 'bootstrap'
  };

  // 3. Register the Module so Form.io executes it
  if (typeof Formio !== 'undefined') {
    Formio.use(JalaliModule);
  }
})();
