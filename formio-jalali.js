// We use the global Formio object provided by the portal/renderer
(function() {
  const Field = Formio.Components.components.field;

  class JalaliComponent extends Field {
    static schema(...extend) {
      return Field.schema({
        type: 'jalali',
        label: 'Jalali Date',
        key: 'jalaliDate',
      }, ...extend);
    }

    static get builderInfo() {
      return {
        title: 'Jalali Calendar',
        group: 'advanced',
        icon: 'calendar',
        weight: 0,
        schema: JalaliComponent.schema()
      };
    }

    // Define the HTML of your component
    render() {
      return super.render(`
        <div class="input-group">
          <input ref="jalaliInput" class="form-control" placeholder="YYYY/MM/DD">
        </div>
      `);
    }

    // This runs when the component appears on the screen
    attach(element) {
      this.loadRefs(element, { jalaliInput: 'single' });

      // Note: This assumes you have loaded a Jalali library 
      // (like persian-datepicker) in your project's Custom CSS/JS section too.
      if (this.refs.jalaliInput && window.jQuery && jQuery.fn.persianDatepicker) {
        jQuery(this.refs.jalaliInput).persianDatepicker({
          format: 'YYYY/MM/DD',
          autoClose: true,
          onSelect: (unix) => {
            this.updateValue(unix); 
          }
        });
      }
      return super.attach(element);
    }
  }

  // Register the component so it shows up in your Builder
  Formio.use({
    components: {
      jalali: JalaliComponent
    }
  });
})();
