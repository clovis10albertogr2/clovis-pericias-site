'use strict';
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const script = fs.readFileSync(path.join(__dirname, '../assets/brevo-material.js'), 'utf8');
for (const [area, primary] of [['sst', '1'], ['computacao-forense', '2']]) {
  const html = fs.readFileSync(path.join(__dirname, '..', area, 'index.html'), 'utf8');
  const markup = html.match(/<form[^>]*data-brevo-material[^>]*>([\s\S]*?)<\/form>/)[0];
  const interestInputs = markup.match(/<input\b[^>]*name="INTERESSE_AREA"[^>]*>/g);
  assert.equal(interestInputs.length, 1);
  assert.match(interestInputs[0], new RegExp(`type="hidden".*value="${primary}"`));
  assert.match(markup, new RegExp(`data-primary-interest="${primary}"`));
  const interest = { value: primary };
  const handlers = {}, secondaryHandlers = {}, fields = [], deferred = [];
  const secondary = {
    checked: false,
    addEventListener(event, callback) { secondaryHandlers[event] = callback; }
  };
  const form = {
    dataset: { primaryInterest: primary },
    querySelector(selector) { return selector === 'input[name="INTERESSE_AREA"]' ? interest : secondary; },
    querySelectorAll() { return fields.map(field => ({ remove() { fields.splice(fields.indexOf(field), 1); } })); },
    appendChild(field) { fields.push(field); },
    addEventListener(event, callback) { (handlers[event] ||= []).push(callback); }
  };
  const dispatch = event => handlers[event].forEach(callback => callback());
  vm.runInNewContext(script, {
    URL, queueMicrotask: callback => deferred.push(callback),
    window: { location: { href: `https://clovisribeiro.com/${area}/?utm_source=teste` } },
    document: { querySelectorAll: () => [form], createElement: () => ({ dataset: {} }) }
  });
  assert.equal(interest.value, primary);
  secondary.checked = true;
  secondaryHandlers.change();
  assert.equal(interest.value, '3');
  secondary.checked = false;
  secondaryHandlers.change();
  assert.equal(interest.value, primary);
  interest.value = '99'; // DOM inconsistency must not reach native POST.
  dispatch('submit');
  assert.equal(interest.value, primary);
  secondary.checked = true;
  interest.value = primary;
  dispatch('submit');
  assert.equal(interest.value, '3');
  dispatch('submit');
  assert.equal(fields.filter(field => field.name === 'LANDING_PAGE').length, 1);
  assert.equal(fields.filter(field => field.name === 'UTM_SOURCE').length, 1);
  assert.ok(!fields.some(field => ['INTERESSE_AREA', 'OPT_IN', 'CONSENTIMENTO_ENTREGA'].includes(field.name)));
  dispatch('reset');
  secondary.checked = false; // native reset completes after the event.
  deferred.forEach(callback => callback());
  assert.equal(interest.value, primary);
}
console.log('PASS: SST/Forense, toggle, submit inconsistente, reset, campo único e tracking independente.');
