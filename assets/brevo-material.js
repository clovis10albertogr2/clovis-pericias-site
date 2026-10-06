/* Complemento do HTML simples Brevo. Não intercepta nem simula o POST. */
(() => {
  'use strict';
  const parameters = {
    utm_source: 'UTM_SOURCE', utm_medium: 'UTM_MEDIUM',
    utm_campaign: 'UTM_CAMPAIGN', utm_term: 'UTM_TERM',
    utm_content: 'UTM_CONTENT', gclid: 'GCLID',
    gbraid: 'GBRAID', wbraid: 'WBRAID'
  };

  document.querySelectorAll('form[data-brevo-material]').forEach(form => {
    const addField = (name, value) => {
      const field = document.createElement('input');
      field.type = 'hidden';
      field.name = name;
      field.value = value;
      field.dataset.brevoTracking = '';
      form.appendChild(field);
    };
    const refreshTracking = () => {
      form.querySelectorAll('[data-brevo-tracking]').forEach(field => field.remove());
      const url = new URL(window.location.href);
      Object.entries(parameters).forEach(([parameter, attribute]) => {
        const values = url.searchParams.getAll(parameter);
        // Parâmetros ausentes, duplicados, vazios ou fora do limite são omitidos.
        if (values.length === 1 && values[0].length > 0 && values[0].length <= 200 &&
            !/[\u0000-\u001f\u007f]/u.test(values[0])) {
          addField(attribute, values[0]);
        }
      });
      // Nunca fabrica uma URL pública quando executado em arquivo/prévia local.
      if (url.origin === 'https://clovisribeiro.com' &&
          ['/sst/', '/computacao-forense/'].includes(url.pathname)) {
        addField('LANDING_PAGE', url.origin + url.pathname);
      }
    };
    refreshTracking();
    form.addEventListener('submit', refreshTracking);
  });
})();
