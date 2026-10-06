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


## Integração Brevo v2.3 — branch em validação

As verticais possuem uma captura inicial de material técnico, separada da triagem pelo WhatsApp. Os formulários adaptam o **HTML simples oficial** da Brevo: POST nativo ao endpoint do formulário existente, locale=pt, html_type=simple e campo antispam nativo. Não há banco próprio, API key pública, formulário simulado ou envio AJAX customizado. A resposta de envio vem da Brevo; a interface local não declara sucesso antecipadamente.

- Perfil: valores de categoria 1–4 preservados; somente os textos visíveis foram adaptados.
- Materiais: um único hidden INTERESSE_AREA assume SST=1 ou FORENSE=2 pela página. O checkbox opcional de guia adicional muda para AMBOS=3; desmarcar restaura a área principal. Sem JavaScript, o hidden mantém o guia da página. Essa escolha não é consentimento de marketing: CONSENTIMENTO_ENTREGA obrigatório e OPT_IN opcional permanecem independentes.
- Entrega obrigatória e OPT_IN opcional: ambos desmarcados inicialmente. Não há inscrição automática em campanhas/nutrição.
- DOI e entrega final continuam sob os formulários existentes da Brevo; não são reimplementados no site.
- HTML simples não possui as mensagens AJAX nem as páginas de confirmação padrão dependentes de JavaScript. O retorno real precisa ser conferido antes de aprovar a integração.
- O complemento local de rastreamento inclui apenas parâmetros presentes, não vazios, únicos, sem caracteres de controle e com até 200 caracteres. LANDING_PAGE é origin+pathname somente nos dois URLs públicos HTTPS aprovados, sem query/fragment. Ausências não são inventadas; nada é guardado em localStorage/sessionStorage.
- **Persistência do rastreamento após DOI ainda não comprovada.** Campos adicionais não constavam do editor Brevo; testar sua gravação e omitir o complemento se a plataforma os ignorar. Não usar essa informação como garantia de origem ou consentimento.
- **ORIGEM_PAGINA pendente**: um site estático não consegue impor atributo imutável no servidor. Não foi inserido campo oculto com falsa garantia. A alternativa é futura integração com validação no servidor ou configuração fixa suportada pela Brevo.
- **ESTAGIO_FUNIL permanece vazio**: não atribuir NOVO no submit (antes da confirmação/entrega) e não sobrescrever estágio de contato existente. A atualização pós-entrega exige recurso validado em etapa posterior; nenhuma automação comercial foi criada.

### Verificações reproduzíveis

Instale lxml, html5lib e tinycss2 em ambiente Python isolado. Execute na raiz:

~~~sh
python3 tests/validate_brevo.py --base acb253fc70d641b95ead662ef25dad41332b465e
node tests/brevo-tracking.test.cjs
~~~

Os testes cobrem parsing HTML5 sem novos erros, IDs e referências, campos/consentimentos, endpoints oficiais quando os arquivos de referência estão disponíveis, valores de categoria, caminhos, JS inline, CSS, preservação do WhatsApp/canonical/hardening/sitemap/PDFs e oito cenários de rastreamento. Não substituem um navegador, um teste Apache ou uma submissão real.

### Bloqueadores antes do merge

O navegador em nuvem não permite abrir arquivos locais. Não houve publicação de prévia nem deploy para contornar isso. Visual/teclado/mobile, CSP aplicada pelo Apache, submissão desde a integração, DOI, entrega e persistência de UTMs/LANDING_PAGE ainda precisam de teste em ambiente de homologação apropriado.

1. Servir esta branch localmente para revisão da interface; conferir as duas verticais em desktop/mobile e com teclado, erros nativos, consentimentos e WhatsApp. Um servidor estático simples não aplica .htaccess.
2. Validar os headers/regras em Apache isolado de produção, preservando HTTPS e os bloqueios administrativos; nenhum ajuste em Hostinger/DNS é necessário nesta fase.
3. Submeter SST e Forense usando **novos subendereços** do Outlook do responsável, sem reutilizar os contatos anteriores. Deixar OPT_IN desmarcado; usar UTMs claramente identificadas como teste.
4. Confirmar manualmente os DOIs e verificar contatos/lista/atributos, modelo 6, consentimentos e links nas mensagens recebidas. Não considerar a exibição do formulário como teste de envio.
5. Confirmar aceitação/gravação dos campos de rastreamento; LANDING_PAGE só é enviado nos URLs públicos aprovados, portanto prévia local não fabrica essa atribuição. Um teste fora do domínio público não comprova gravação de LANDING_PAGE em produção.
6. Se HTML simples tiver retorno incompatível ou mensagem enganosa, interromper aprovação e avaliar o HTML completo oficial em outra revisão, com allowlist justificada; não abrir CSP com curingas.

Não fazer merge, publicação ou deploy enquanto esses pontos não estiverem resolvidos. Nenhum workflow de deploy existe na main auditada; não foi criado workflow nesta branch. Os arquivos de testes são bloqueados no Apache, como os demais recursos administrativos.
