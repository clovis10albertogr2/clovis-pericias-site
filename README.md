# Clóvis Ribeiro — Site Profissional

Site estático profissional com arquitetura por verticais de serviço.

## Arquitetura

```
/
├── index.html                  # Hub profissional
├── sst/
│   └── index.html              # Assistência Técnica em Segurança do Trabalho
├── computacao-forense/
│   └── index.html              # Computação Forense e Evidência Digital
├── privacidade.html            # Aviso de Privacidade
├── assets/
├── style.css
├── robots.txt
├── sitemap.xml
├── 404.html
└── .htaccess
```

## Posicionamento

A página principal apresenta as duas formações de engenharia e encaminha o visitante para a vertical correta.

### Segurança do Trabalho
- Insalubridade e periculosidade
- Ergonomia e condições de trabalho
- Acidentes de trabalho
- Quesitos, pareceres e análise crítica da prova pericial
- Atendimento remoto nacional quando compatível com análise documental
- Atuação presencial em Belém e Região Metropolitana conforme escopo

### Computação Forense e Evidência Digital
- Logs e registros de sistemas
- Documentos e metadados digitais
- Autenticação, assinaturas eletrônicas e mecanismos de aceite
- Evidências digitais e análise crítica de laudos de informática
- Atendimento remoto nacional quando tecnicamente compatível
- Atuação presencial em Belém e Região Metropolitana conforme necessidade

## Integridade do funil

O pré-qualificador da página inicial usa regras de aderência às áreas técnicas, sem pontuação por valor da causa, urgência ou perfil comercial. As respostas servem para classificar a demanda como aderente, sujeita a revisão ou sem aderência identificada pelo pré-filtro, e o contexto selecionado é levado para a mensagem preparada no WhatsApp.

Os formulários das verticais não registram lead por simples preenchimento. Eles preparam a mensagem para o WhatsApp, e o envio efetivo depende de confirmação do usuário no aplicativo. Os eventos de analytics, quando ativados, devem distinguir intenção/clique no WhatsApp de lead qualificado, proposta e contratação.

## Performance, acessibilidade e segurança

- Meta de desempenho: Lighthouse 90+; deve ser confirmada por auditoria após versões relevantes.
- Cache diferenciado por tipo de recurso.
- Imagem principal do hero priorizada.
- Foco visível, suporte à preferência por redução de movimento e contraste reforçado em textos pequenos.
- Estrutura orientada a boas práticas de acessibilidade; conformidade WCAG depende de auditoria específica.
- Metadados Git e arquivos administrativos são bloqueados no webroot.
- HSTS ativo sem `includeSubDomains` ou `preload`; a CSP mantém scripts e estilos inline por compatibilidade com a arquitetura atual.

## Tecnologias

HTML5, CSS3 e JavaScript sem framework ou etapa de build.
