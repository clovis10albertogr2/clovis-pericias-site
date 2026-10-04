# Deploy Hostinger

O deploy de produção é executado manualmente pelo GitHub Actions e nunca ocorre automaticamente por um simples push.

## Secrets obrigatórios

No GitHub, abra:

`Settings → Secrets and variables → Actions → New repository secret`

Cadastre:

- `HOSTINGER_PROTOCOL`: `ftp`, `ftps` ou `sftp`
- `HOSTINGER_HOST`: hostname/IP fornecido pela Hostinger
- `HOSTINGER_PORT`: porta da conexão
- `HOSTINGER_USERNAME`: usuário da hospedagem
- `HOSTINGER_PASSWORD`: senha da conexão
- `HOSTINGER_REMOTE_DIR`: diretório que serve o domínio, por exemplo `/public_html` quando aplicável

Não coloque essas credenciais em arquivos versionados nem em mensagens públicas.

## Fluxo seguro

1. Abra `Actions → Deploy Hostinger → Run workflow`.
2. Rode primeiro com `mode = dry-run`.
3. Revise o log. O dry-run não altera o servidor.
4. Rode novamente com `mode = publish` e `confirm = PUBLICAR`.
5. O workflow cria um backup remoto antes da publicação.
6. O backup fica disponível como artefato do GitHub Actions por 30 dias.
7. Somente depois do backup o conteúdo da `main` é sincronizado com o diretório remoto.

## Observações

- O workflow preserva `.well-known` no destino.
- `.git`, `.github`, `README.md` e este documento não são publicados.
- O diretório remoto deve apontar somente para a raiz pública do site.
- Em VPS, confirme o diretório real servido pelo domínio antes da primeira publicação.
