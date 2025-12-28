(function() {
    // 1. Load the Jalali Date library dynamically
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/persian-date@1.1.0/dist/persian-date.min.js';
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = 'https://unpkg.com/persian-datepicker@1.2.0/dist/js/persian-datepicker.min.js';
    document.head.appendChild(script2);

    // 2. Define the Component
    const DateTimeComponent = Formio.Components.components.datetime;

    class JalaliComponent extends DateTimeComponent {
        static schema(...extend) {
            return DateTimeComponent.schema({
                type: 'jalali',
                label: 'Jalali Date',
                key: 'jalaliDate',
            });
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

        // Attach logic to trigger the Persian Datepicker when the field is clicked
        attach(element) {
            const superAttach = super.attach(element);
            const input = element.querySelector('input');
            if (input && $.fn.persianDatepicker) {
                $(input).persianDatepicker({
                    format: 'YYYY/MM/DD',
                    autoClose: true,
                    calendar:{
                        persian: { locale: 'fa' }
                    }
                });
            }
            return superAttach;
        }
    }

    // 3. Register it
    Formio.use({
        components: {
            jalali: JalaliComponent
        }
    });
})();