# Penedo Reservas

Site estático (HTML, CSS e JavaScript puro, sem build) da Penedo Reservas, por Jussara Coutinho.

## Estrutura

- `index.html` — página única, marcação semântica
- `css/styles.css` — estilos (tema claro/escuro automático)
- `js/dados.js` — **hospedagens e categorias**; é aqui que se adiciona ou edita conteúdo
- `js/app.js` — renderização dos cards, filtro por categoria e galeria de fotos
- `fotos/<id>/` — fotos de cada hospedagem; `fotos/<id>/thumbs/` — miniaturas 144×108 em WebP

## Rodar localmente

```bash
npx serve .
```

(Os scripts são módulos ES, então é preciso um servidor HTTP; abrir o arquivo direto não funciona.)

## Adicionar uma hospedagem

1. Coloque as fotos em `fotos/<id>/` e gere as miniaturas em `fotos/<id>/thumbs/` (mesmo nome, `.webp`, 144×108).
2. Copie um bloco de `HOSPEDAGENS` em `js/dados.js` e troque os dados.
