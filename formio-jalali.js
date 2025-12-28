(function() {
  const TextFieldComponent = Formio.Components.components.textfield;

  class MyCustomComponent extends TextFieldComponent {
    static schema(...extend) {
      return TextFieldComponent.schema({
        type: 'mycustom',
        label: 'My Custom Field',
        key: 'mycustom'
      }, ...extend);
    }

    static get builderInfo() {
      return {
        title: 'My Custom Component',
        group: 'basic',
        icon: 'star',
        weight: 100,
        schema: MyCustomComponent.schema()
      };
    }
  }

  Formio.Components.addComponent('mycustom', MyCustomComponent);
  
  console.log('Custom component registered!');
})();
