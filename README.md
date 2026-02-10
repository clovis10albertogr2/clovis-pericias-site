# 🏛️ Clovis Ribeiro - Engenharia Forense & Perícias Técnicas

> Landing page profissional para captação B2B de alto valor em Assistência Técnica Judicial, Perícia Forense e Consultoria especializada em TI & Segurança do Trabalho.

[![Status](https://img.shields.io/badge/status-production-success)](https://www.clovisribeiro.com)
[![License](https://img.shields.io/badge/license-Proprietary-red)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

## 📋 Sobre o Projeto

Site institucional de **Clovis Alberto Galvão Ribeiro**, Engenheiro de Computação e Engenheiro de Segurança do Trabalho, com atuação remota nacional e presencial em Belém/PA:

- ⚖️ Assistência Técnica Judicial
- 🔍 Perícia Extrajudicial
- 💻 Consultoria TI & Segurança do Trabalho
- 📋 Auditoria ISO (9001, 14001, 45001, 27001, 27701)

**Público-alvo primário:** Escritórios de advocacia e departamentos jurídicos.

---

## 🎯 Características Técnicas

### ✅ Performance
- ⚡ Lighthouse Score: 95+ (Performance, SEO, Accessibility)
- 🗜️ Compressão Gzip ativada
- 📦 Cache estratégico de recursos estáticos
- 🖼️ Lazy loading de imagens

### ✅ SEO & Indexação
- 🔍 Meta tags completas (Open Graph, Twitter Cards)
- 🏷️ Schema.org (ProfessionalService)
- 🗺️ Sitemap.xml otimizado
- 🤖 robots.txt com diretivas de crawlers de IA
- 📊 Google Analytics 4 integrado

### ✅ Segurança
- 🔒 HTTPS forçado via .htaccess
- 🛡️ Headers de segurança (CSP, X-Frame-Options, HSTS)
- 🚫 Proteção contra hotlinking
- 🔐 Bloqueio de arquivos sensíveis

### ✅ Experiência do Usuário
- 📱 Design responsivo mobile-first
- ♿ Acessibilidade WCAG 2.1 (AA)
- 🎨 Glassmorphism e animações sutis
- 🧭 Navegação intuitiva com scroll suave

---

## 🗂️ Estrutura do Projeto

```
clovis-pericias-site/
│
├── index.html              # Página principal
├── 404.html                # Página de erro personalizada
├── style.css               # Estilos principais
├── .htaccess               # Configurações Apache
├── robots.txt              # Diretivas para crawlers
├── sitemap.xml             # Mapa do site
├── README.md               # Documentação
│
└── assets/
    ├── logo.png            # Logo principal
    ├── favicon-16x16.png   # Favicon 16x16
    ├── favicon-32x32.png   # Favicon 32x32
    ├── apple-touch-icon.png # Ícone iOS
    └── ClovisProfissional.png # Foto profissional
```

---

## 🚀 Implementação

### Pré-requisitos
- Servidor web Apache com `mod_rewrite`, `mod_deflate`, `mod_expires` e `mod_headers`
- Certificado SSL/TLS válido
- Domínio configurado: `clovisribeiro.com`

### Instalação

1. **Clone ou faça upload dos arquivos** para o diretório raiz do servidor:
```bash
git clone https://github.com/clovis10albertogr2/clovis-pericias-site.git
```

2. **Configure o Google Analytics 4**:
   - Crie uma propriedade GA4 em https://analytics.google.com
   - Substitua `G-XXXXXXXXXX` no `index.html` pelo seu ID real (2 ocorrências - linhas ~75 e ~78)

3. **Gere os favicons**:
   - Acesse https://realfavicongenerator.net
   - Faça upload do `logo.png`
   - Baixe e extraia os favicons na pasta `assets/`

4. **Valide a instalação**:
   - Acesse `https://www.clovisribeiro.com`
   - Teste responsividade em diferentes dispositivos
   - Valide SSL em https://www.ssllabs.com/ssltest/

5. **Configure Google Search Console**:
   - Adicione a propriedade em https://search.google.com/search-console
   - Envie o `sitemap.xml`
   - Solicite indexação da página principal

---

## 📊 KPIs e Monitoramento

### Métricas Primárias (Google Analytics 4)
- **Taxa de Conversão Formulário**: Meta 5-8%
- **Tempo Médio na Página**: Meta >4min
- **Taxa de Rejeição**: Meta <50%
- **Leads Qualificados/Mês**: Meta 8-12

### Eventos Customizados Rastreados
- `form_submit` - Envio do formulário de contato
- `contact_whatsapp_click` - Clique em WhatsApp
- `contact_email_click` - Clique em e-mail
- `contact_phone_click` - Clique em telefone
- `faq_expand` - Expansão de pergunta no FAQ
- `section_view` - Visualização de seção (Intersection Observer)
- `nav_click` - Navegação por menu

---

## 🔧 Manutenção

### Atualizações Recomendadas

#### Mensais
- [ ] Revisar meta description e keywords
- [ ] Atualizar `lastmod` no sitemap.xml
- [ ] Verificar broken links
- [ ] Analisar relatórios GA4

#### Trimestrais
- [ ] Audit de performance (Lighthouse)
- [ ] Revisão de segurança (headers, SSL)
- [ ] Backup completo do site
- [ ] Atualizar conteúdo FAQ se necessário

#### Anuais
- [ ] Renovação de certificado SSL
- [ ] Revisão completa de SEO
- [ ] A/B testing de headlines
- [ ] Redesign parcial (se necessário)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| HTML5 | - | Estrutura semântica |
| CSS3 | - | Estilização responsiva |
| JavaScript (Vanilla) | ES6+ | Interatividade e tracking |
| Google Analytics | GA4 | Análise de comportamento |
| Google Fonts | - | Tipografia (Inter, Montserrat) |
| Apache | 2.4+ | Servidor web |
| Schema.org | - | Rich Snippets |

---

## 📞 Suporte e Contato

**Profissional:** Clovis Alberto Galvão Ribeiro  
**E-mail:** contato@clovisribeiro.com  
**WhatsApp:** (91) 99287-9843  
**CREA-PA:** 1523383151  
**Localização:** Belém/PA (Presencial) • Brasil (Atuação Remota)

---

## 📄 Licença

© 2026 Clovis Alberto Galvão Ribeiro. Todos os direitos reservados.

Este projeto é **propriedade privada** e não possui licença de código aberto. O uso, cópia, modificação ou distribuição não autorizada é estritamente proibida.

---

## 🏆 Créditos

- **Concepção técnica e direção do projeto:** Clovis Ribeiro
- **Estratégia Digital:** Consultoria interna
- **Otimização SEO:** Implementação própria
- **Hospedagem:** Hostinger

---

**Última atualização:** 10/02/2026  
**Versão:** 2.1.0 (Final - Produção)