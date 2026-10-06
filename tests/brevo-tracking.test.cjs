'use strict';
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const script = fs.readFileSync(path.join(__dirname, '../assets/brevo-material.js'), 'utf8');
function run(url) {
  const fields = [], handlers = {};
  const form = {
    appendChild(field) { fields.push(field); },
    querySelectorAll() { return fields.map(field => ({ remove() { fields.splice(fields.indexOf(field), 1); } })); },
    addEventListener(name, handler) { handlers[name] = handler; }
  };
  const window = { location: { href: url } };
  vm.runInNewContext(script, { URL, window, document: {
    querySelectorAll(selector) { assert.equal(selector, 'form[data-brevo-material]'); return [form]; },
    createElement(tag) { assert.equal(tag, 'input'); return { dataset: {} }; }
  } });
  return { values: () => Object.fromEntries(fields.map(f => [f.name, f.value])), fields, handlers, window };
}
assert.deepEqual(run('https://clovisribeiro.com/sst/').values(), { LANDING_PAGE: 'https://clovisribeiro.com/sst/' });
const all = run('https://clovisribeiro.com/computacao-forense/?utm_source=origem&utm_medium=email&utm_campaign=guia&utm_term=termo&utm_content=botao&gclid=g&gbraid=b&wbraid=w#segredo');
assert.deepEqual(all.values(), { UTM_SOURCE: 'origem', UTM_MEDIUM: 'email', UTM_CAMPAIGN: 'guia', UTM_TERM: 'termo', UTM_CONTENT: 'botao', GCLID: 'g', GBRAID: 'b', WBRAID: 'w', LANDING_PAGE: 'https://clovisribeiro.com/computacao-forense/' });
assert.deepEqual(run('https://clovisribeiro.com/sst/?utm_source=a&utm_source=b&utm_medium=&utm_term=%0A&utm_campaign=' + 'x'.repeat(201)).values(), { LANDING_PAGE: 'https://clovisribeiro.com/sst/' });
assert.deepEqual(run('https://preview.example/sst/?utm_source=teste').values(), { UTM_SOURCE: 'teste' });
assert.deepEqual(run('file:///tmp/sst/index.html').values(), {});
const untrusted = run('https://clovisribeiro.com/sst/?utm_content=%3Cscript%3E&OPT_IN=1&CONSENTIMENTO_ENTREGA=1&ORIGEM_PAGINA=FORENSE&ESTAGIO_FUNIL=QUALIFICADO');
assert.equal(untrusted.values().UTM_CONTENT, '<script>'); // Assigned as a value, never HTML.
assert.equal(untrusted.values().OPT_IN, undefined);
assert.equal(untrusted.values().CONSENTIMENTO_ENTREGA, undefined);
assert.equal(untrusted.values().ORIGEM_PAGINA, undefined);
assert.equal(untrusted.values().ESTAGIO_FUNIL, undefined);
untrusted.handlers.submit();
assert.equal(untrusted.fields.length, 2); // No duplicate attributes on subsequent submit.
untrusted.window.location.href = 'https://clovisribeiro.com/sst/?utm_source=novo';
untrusted.handlers.submit();
assert.deepEqual(untrusted.values(), { UTM_SOURCE: 'novo', LANDING_PAGE: 'https://clovisribeiro.com/sst/' });
assert.ok(!script.includes('preventDefault'));
assert.ok(!/localStorage|sessionStorage|fetch\(|innerHTML|generate_lead/.test(script));
console.log('PASS: 8 cenários de rastreamento/consentimento; POST nativo não interceptado.');
