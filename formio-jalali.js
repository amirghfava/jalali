(function(Formio) {
    const checkFormio = setInterval(() => {
        if (window.Formio) {
            clearInterval(checkFormio);
            registerComponent(window.Formio);
        }
    }, 100);

    function registerComponent(Formio) {
        const DateTimeComponent = Formio.Components.components.datetime;

        class JalaliComponent extends DateTimeComponent {
            static schema(...extend) {
                return DateTimeComponent.schema({
                    type: 'jalali',
                    label: 'Jalali Date',
                    key: 'jalaliDate'
                }, ...extend);
            }

            static get builderInfo() {
                return {
                    title: 'Jalali Calendar',
                    group: 'advanced',
                    icon: 'calendar',
                    weight: 10,
                    schema: JalaliComponent.schema()
                };
            }
        }

        Formio.use({
            components: {
                jalali: JalaliComponent
            }
        });
        console.log("Jalali Component Registered Successfully!");
    }
})(window.Formio);
