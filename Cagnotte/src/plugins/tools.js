export default {
    install(app, options = {}) {
        app.config.globalProperties.$toolsOptions = options;

        app.mixin({
            methods: {
                dateToDB(date) {
                    if (!date)
                      return '';
                    const [day, month, year] = date.split('/');
                    return `${year}-${month}-${day}`;
                },
                dbDateToFr(date) {
                    if (!date)
                      return '';
                    const [year, month, day] = date.split('T')[0].split('-');
                    return `${day}/${month}/${year}`;
                },
                dbDateHourToFr(date) {
                    if (!date)
                      return '';
                    const d = new Date(date);
                    return d.toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                },
                formatAmount(amount) {
                    if (amount === undefined || amount === null)
                      return '';
                    return new Intl.NumberFormat('fr-FR', {
                        style: 'currency',
                        currency: 'EUR'
                    }).format(amount);
                },
                cutText(text) {
                    const limit = options.cutLength || 20;
                    if (!text)
                      return '';
                    if (text.length <= limit)
                      return text;
                    return text.substring(0, limit) + '...';
                }
            }
        });

        app.directive('focus', {
            mounted:function (el) {
                el.focus();
            }
        });
    }
}
