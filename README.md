# Pack de Gestao - Landing page

Site estatico (HTML e CSS, sem build) da landing page do Pack de Gestao.

## Arquivos

- `index.html` - pagina de vendas completa, CSS inline
- `termos.html` - termos de uso e condicoes de compra
- `privacidade.html` - politica de privacidade (LGPD)
- `og.png` - imagem de compartilhamento 1200x630
- `favicon.svg`, `robots.txt`, `sitemap.xml`, `vercel.json`

## Deploy

Vercel, preset Other, sem build command e sem output directory.

## Antes de escalar trafego

1. Trocar a URL do canonical, og:image, robots.txt e sitemap.xml pelo dominio final.
2. Colar o pixel do Meta dentro da funcao `loadPixels()` no fim do index.html. Ele so dispara apos o aceite de cookies.
3. Os CTAs tem `data-cta` para medir qual converte.
