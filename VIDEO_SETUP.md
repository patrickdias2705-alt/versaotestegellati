# 🎆 Configuração do Vídeo de Fogos de Artifício

## 📥 Como Baixar e Configurar o Vídeo

### 1. Baixar o Vídeo
1. Acesse o link: https://pt.pikbest.com/video/4k-c%C3%A9u-noturno-florescendo-fogos-de-artif%C3%ADcio-lindo-v%C3%ADdeo-piscando_5711800.html
2. Faça o download do vídeo em formato MP4 (recomendado: resolução 4K ou 1080p)
3. Salve o arquivo como `fireworks-video.mp4` na pasta `assets/`

### 2. Otimizar o Vídeo (Opcional mas Recomendado)
Para melhor performance no site, recomendo:
- **Duração**: 10-30 segundos (loop infinito)
- **Resolução**: 1920x1080 (Full HD) ou 1280x720 (HD)
- **Formato**: MP4 (H.264)
- **Tamanho**: Máximo 10MB para carregamento rápido

### 3. Conversão para WebM (Opcional)
Para melhor compatibilidade com navegadores:
```bash
# Usando FFmpeg (se instalado)
ffmpeg -i fireworks-video.mp4 -c:v libvpx-vp9 -c:a libopus fireworks-video.webm
```

### 4. Estrutura de Arquivos
```
assets/
├── fireworks-video.mp4    # Vídeo principal (obrigatório)
├── fireworks-video.webm   # Vídeo alternativo (opcional)
├── logo.png
├── about-image.jpg
└── gallery-*.jpg
```

## 🎬 Características do Vídeo

### ✅ **Ideal para o Site:**
- **Céu noturno** com fogos de artifício
- **Cores vibrantes** (laranja, azul, verde, rosa)
- **Movimento suave** e contínuo
- **Sem texto ou logos** sobrepostos
- **Qualidade 4K ou HD**

### 🎯 **Efeito Visual:**
- O vídeo fica como **fundo da seção hero**
- **Overlay escuro** para melhor legibilidade do texto
- **Fogos de artifício animados** sobrepostos ao vídeo
- **Loop infinito** para experiência contínua

## 🚀 **Como Funciona no Site:**

1. **Vídeo de fundo** reproduz automaticamente (muted)
2. **Overlay com gradiente** escurece o vídeo para legibilidade
3. **Fogos de artifício animados** aparecem sobre o vídeo
4. **Fallback** para animação CSS caso o vídeo não carregue
5. **Responsivo** em todos os dispositivos

## 📱 **Compatibilidade:**
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Desktop, Tablet, Mobile
- ✅ iOS e Android
- ✅ Conexões lentas (com fallback)

## 🔧 **Personalização:**

### Alterar Vídeo:
1. Substitua `fireworks-video.mp4` na pasta `assets/`
2. Mantenha o mesmo nome do arquivo
3. O site detectará automaticamente

### Ajustar Overlay:
Edite o CSS em `styles.css`:
```css
.video-overlay {
    background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.4) 0%,    /* Transparência inicial */
        rgba(0, 0, 0, 0.2) 30%,   /* Meio da tela */
        rgba(0, 0, 0, 0.6) 70%,   /* Final da tela */
        rgba(0, 0, 0, 0.8) 100%   /* Transparência final */
    );
}
```

## ⚡ **Performance:**
- Vídeo otimizado para web
- Carregamento progressivo
- Fallback para animação CSS
- Compressão automática pelo navegador

---

**🎆 Após configurar o vídeo, o site terá um show espetacular de fogos de artifício reais como fundo!**

