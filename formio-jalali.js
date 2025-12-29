(function() {
  // 1. Get the base class
  const Field = Formio.Components.components.field;

  // 2. Define the Component Class
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
        group: 'advanced', // This puts it in the 'Advanced' section of the builder
        icon: 'calendar',
        weight: 0,
        schema: JalaliComponent.schema()
      };
    }

    render() {
      return super.render(`
        <div class="input-group">
          <input ref="jalaliInput" class="form-control" placeholder="YYYY/MM/DD">
        </div>
      `);
    }

    attach(element) {
      this.loadRefs(element, { jalaliInput: 'single' });
      
      // Logic to trigger the Jalali Picker
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

  // 3. Define the Module
  const JalaliModule = {
    components: {
      jalali: JalaliComponent
    }
  };

  // 4. Register the Module globally
  Formio.use(JalaliModule);

})();
