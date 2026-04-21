# 📁 Pasta Public - Arquivos Estáticos

Esta pasta contém arquivos estáticos que são servidos diretamente pelo Next.js.

## 📄 Arquivos que você deve adicionar aqui:

### 1. favicon.ico (ícone do navegador)
- **Tamanho:** 32x32 pixels ou 64x64 pixels
- **Formato:** .ico
- **Onde conseguir:**
  - Crie em: https://favicon.io/
  - Ou use um emoji: https://favicon.io/emoji-favicons/
  - Sugestão: 📊 (gráfico) ou 🎯 (alvo)

**Como adicionar:**
1. Gere seu favicon.ico
2. Coloque nesta pasta: `/frontend/public/favicon.ico`
3. Pronto! O ícone aparecerá nas abas do navegador

### 2. Imagens (opcional)
Se você quiser adicionar imagens ao dashboard:
- `logo.png` - Logo do dashboard
- `avatar.png` - Sua foto de perfil
- `og-image.png` - Imagem para compartilhar (1200x630)

**Como usar no código:**
```jsx
import Image from 'next/image';

<Image src="/logo.png" alt="Logo" width={200} height={50} />
```

### 3. manifest.json (PWA - opcional)
Para transformar em Progressive Web App:

```json
{
  "name": "KPI Dashboard",
  "short_name": "KPI",
  "description": "Dashboard de KPIs Full Stack",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 4. robots.txt (SEO - opcional)
```txt
User-agent: *
Allow: /

Sitemap: https://seu-dominio.com/sitemap.xml
```

## 🌐 Como acessar arquivos públicos

Qualquer arquivo aqui fica disponível em:
```
http://localhost:3000/nome-do-arquivo.extensao
```

**Exemplos:**
- `/favicon.ico` → `http://localhost:3000/favicon.ico`
- `/logo.png` → `http://localhost:3000/logo.png`
- `/images/avatar.jpg` → `http://localhost:3000/images/avatar.jpg`

## ⚠️ Importante

- ❌ NÃO coloque arquivos sensíveis aqui (tokens, senhas, etc)
- ✅ Apenas arquivos públicos (imagens, ícones, fonts)
- ✅ Otimize imagens antes de adicionar (use TinyPNG, Squoosh)
- ✅ Use nomes descritivos (logo.png, não img1.png)

## 🎨 Geradores de Favicons Recomendados

1. **Favicon.io** - https://favicon.io/
   - Cria de texto, emoji ou imagem
   - Gera todos os tamanhos necessários

2. **RealFaviconGenerator** - https://realfavicongenerator.net/
   - Mais completo
   - Testa em todos navegadores

3. **Figma/Canva**
   - Crie logo 512x512
   - Exporte como PNG
   - Converta para .ico

## 📱 Tamanhos Recomendados

Para suporte completo em todos dispositivos:

```
favicon.ico       - 32x32 ou 64x64
favicon-16x16.png - 16x16
favicon-32x32.png - 32x32
apple-touch-icon.png - 180x180 (iOS)
icon-192.png      - 192x192 (Android)
icon-512.png      - 512x512 (Android)
```

---

**Por enquanto, o projeto funciona sem favicon. Adicione quando quiser personalizar!** ✨
