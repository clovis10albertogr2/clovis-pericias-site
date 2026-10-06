"""Checks branch integration without submitting contacts or running a browser.
Dependencies: lxml, html5lib, tinycss2. Run from the repository root.
"""
from pathlib import Path
from collections import Counter
from urllib.parse import urlsplit, unquote
import argparse, hashlib, json, re, subprocess, tempfile
from lxml import html, etree
import html5lib, tinycss2

ROOT = Path(__file__).resolve().parents[1]
args = argparse.ArgumentParser()
args.add_argument('--base', default='acb253fc70d641b95ead662ef25dad41332b465e')
BASE = args.parse_args().base

def original(path):
    return subprocess.check_output(['git', 'show', BASE + ':' + path], cwd=ROOT)

def parse_errors(text):
    parser = html5lib.HTMLParser()
    parser.parse(text)
    return Counter((code, str(data)) for _, code, data in parser.errors)

checks = []
for page, area, values in [('sst/index.html', 'sst', ['1','3']), ('computacao-forense/index.html', 'computacao-forense', ['2','3'])]:
    text = (ROOT / page).read_text()
    old = original(page).decode()
    assert not (parse_errors(text) - parse_errors(old)), (page, 'New HTML5 parse errors')
    doc = html.fromstring(text)
    ids = doc.xpath('//*[@id]/@id')
    assert len(ids) == len(set(ids)), (page, 'Duplicate IDs')
    form, = doc.xpath('//form[@data-brevo-material]')
    assert form.get('method').lower() == 'post'
    assert urlsplit(form.get('action')).hostname == '4ec81289.sibforms.com'
    assert urlsplit(form.get('action')).path.startswith('/serve/')
    expected_export = ROOT.parent / ('brevo-sst-simple-current.html' if area == 'sst' else 'brevo-forense-simple-current.html')
    if expected_export.exists():
        reference = html.fromstring(expected_export.read_text()).xpath('//form')[0]
        assert form.get('action') == reference.get('action')
    fields = {e.get('name'): e for e in form.xpath('.//input[@name] | .//select[@name]')}
    for key in ['NOME', 'EMAIL', 'PERFIL', 'CONSENTIMENTO_ENTREGA']:
        assert fields[key].get('required') is not None
    assert fields['EMAIL'].get('type') == 'email'
    assert fields['CONSENTIMENTO_ENTREGA'].get('checked') is None
    assert fields['OPT_IN'].get('required') is None and fields['OPT_IN'].get('checked') is None
    assert fields['OPT_IN'].get('value') == '1'
    assert fields['html_type'].get('value') == 'simple'
    assert fields['locale'].get('value') == 'pt'
    assert 'ORIGEM_PAGINA' not in fields and 'ESTAGIO_FUNIL' not in fields
    assert form.xpath('.//input[@name="INTERESSE_AREA"]/@value') == values
    assert not form.xpath('.//input[@name="INTERESSE_AREA"][@checked]')
    assert form.xpath('.//select[@name="PERFIL"]/option[@value!=""]/@value') == ['1','2','3','4']
    assert [e.text.strip() for e in form.xpath('.//select[@name="PERFIL"]/option[@value!=""]')] == ['Advogado / Escritório','Empresa','Parte','Outro']
    for e in form.xpath('.//input[not(@type="hidden")] | .//select'):
        assert form.xpath('.//label[@for=$id]', id=e.get('id')), (page, e.get('name'), 'No label')
    for e in doc.xpath('//*[@aria-describedby] | //*[@aria-labelledby] | //*[@aria-controls]'):
        for ident in (e.get('aria-describedby') or e.get('aria-labelledby') or e.get('aria-controls')).split():
            assert ident in ids, (page, ident)
    baseline = html.fromstring(old)
    old_form_id = 'sst-contact-form' if area == 'sst' else 'ti-contact-form'
    assert etree.tostring(doc.get_element_by_id(old_form_id)) == etree.tostring(baseline.get_element_by_id(old_form_id)), 'WhatsApp form changed'
    assert doc.xpath('//link[@rel="canonical"]/@href') == baseline.xpath('//link[@rel="canonical"]/@href')
    assert re.findall(r'const (?:GA4_ID|ADS_ID) = "([^"]*)"',text) == ['', '']
    for e in doc.xpath('//*[@href] | //*[@src]'):
        value = e.get('href') or e.get('src')
        link = urlsplit(value)
        if link.scheme or link.netloc or not link.path and not link.fragment:
            continue
        target = (ROOT / link.path.lstrip('/')) if link.path.startswith('/') else (ROOT / page).parent / unquote(link.path)
        if target.is_dir(): target = target / 'index.html'
        assert target.exists(), (page, value, 'Broken local path')
        if link.fragment and target.suffix == '.html':
            other = doc if target.resolve() == (ROOT / page).resolve() else html.fromstring(target.read_text())
            assert other.xpath('//*[@id=$id]',id=link.fragment), (page, value, 'Broken fragment')
    for i, script in enumerate(doc.xpath('//script[not(@src)]')):
        content = script.text or ''
        if script.get('type') == 'application/ld+json': json.loads(content)
        else:
            with tempfile.NamedTemporaryFile(mode='w',suffix='.js') as temp:
                temp.write(content); temp.flush()
                subprocess.run(['node','--check',temp.name],check=True,capture_output=True)
    assert not re.search(r'localStorage|sessionStorage|generate_lead',text)
    checks.append(page + ': HTML5 sem novos erros; IDs/labels/caminhos/JS/WhatsApp/canonical OK')

css = (ROOT/'style.css').read_text()
parsed = tinycss2.parse_stylesheet(css, skip_comments=True, skip_whitespace=True)
assert not [r for r in parsed if r.type == 'error']
for rule in parsed:
    if rule.type == 'qualified-rule':
        assert not [d for d in tinycss2.parse_declaration_list(rule.content,skip_comments=True,skip_whitespace=True) if d.type == 'error']
assert 'grid-template-columns: 1fr;' in css and ':focus-visible' in css
ht = (ROOT/'.htaccess').read_text()
assert 'form-action \'self\' https://4ec81289.sibforms.com;' in ht
assert not re.search(r'(?:default|script|frame|connect)-src\s+\*|form-action\s+\*',ht)
for line in original('.htaccess').decode().splitlines():
    if 'Content-Security-Policy' not in line: assert line in ht, ('Hardening changed',line)
for name in ['index.html','sitemap.xml','robots.txt','404.html','assets/guia-sst.pdf','assets/guia-forense.pdf']:
    assert original(name) == (ROOT/name).read_bytes(), (name, 'Must be unchanged')
privacy = (ROOT/'privacidade.html').read_text()
assert not (parse_errors(privacy) - parse_errors(original('privacidade.html').decode()))
for phrase in ['Brevo','double opt-in','facultativa','mensuração','correção','exclusão','não constituem contratação']: assert phrase in privacy
subprocess.run(['node','tests/brevo-tracking.test.cjs'],cwd=ROOT,check=True)
subprocess.run(['git','diff','--check'],cwd=ROOT,check=True)
for message in checks: print('PASS:',message)
print('PASS: CSS, CSP, hardening, privacidade, arquivos preservados e hashes PDF.')
for name in ['assets/guia-sst.pdf','assets/guia-forense.pdf']: print('SHA256',name,hashlib.sha256((ROOT/name).read_bytes()).hexdigest())
print('NOT TESTED: visual/teclado/mobile, Apache e POST/DOI/entrega desde a branch.')
