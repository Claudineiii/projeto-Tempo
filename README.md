# 🌤️ Central do Clima

> Uma aplicação web completa de previsão do tempo desenvolvida para consultar condições meteorológicas atuais, previsões detalhadas e visualização em mapa interativo de forma simples e intuitiva.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## 📖 Sobre o projeto

O **Central do Clima** foi desenvolvido com o objetivo de aplicar conceitos avançados de desenvolvimento Front-end utilizando TypeScript e manipulação nativa do DOM.

A aplicação consome a API da **OpenWeather** para obter dados meteorológicos precisos e utiliza a biblioteca **Leaflet** com **OpenStreetMap** para apresentar a localização exata da cidade pesquisada em um mapa interativo.

Além disso, a aplicação trata o fuso horário (`timezone`) diretamente da API para garantir que a exibição dos horários de previsão e do nascer/pôr do sol seja precisa para qualquer lugar do mundo, independentemente do horário local da máquina do usuário.

---

# ✨ Funcionalidades

### 🌡️ Clima Atual

- Exibição da temperatura atual e sensação térmica
- Indicador visual da condição climática com ícone dinâmico
- Umidade do ar, pressão atmosférica e visibilidade
- Velocidade e direção do vento
- Horários do nascer e pôr do sol ajustados ao fuso horário da cidade

---

### 🔎 Pesquisa e Geolocalização

- Pesquisa de cidades com validação prévia de dados
- Serviço de geocodificação (conversão de nome em coordenadas)
- Geolocalização nativa pelo navegador
- Centralização automática do mapa na cidade selecionada
- Otimização de chamadas à API (geocodificação executada apenas uma vez por busca)

---

### 🕐 Previsões

- **Previsão Horária:** Detalhamento das próximas horas com ícones e temperaturas
- **Previsão Diária:** Agrupamento dos próximos dias com ajuste automático de fuso horário
- Alternância rápida entre visualizações de horas e dias

---

### ⭐ Favoritos e Histórico

- Adição e remoção de cidades favoritas
- Armazenamento de histórico de pesquisas recentes
- Identificação única por chave composta (`nome + país`) para evitar ambiguidades

---

### 🎨 Interface e Usabilidade

- Alternância entre Tema Claro e Tema Escuro (Dark Mode)
- Visualização do mapa em tela cheia/expandido
- Interface 100% responsiva para dispositivos móveis e desktop

---

# 🏗 Arquitetura

O projeto utiliza uma organização modular estruturada pela responsabilidade de cada módulo.

```text
src/
├── api/
│   ├── config.ts
│   ├── fetchforecast.ts
│   ├── fetchweather.ts
│   ├── geocoding.ts
│   └── validators.ts
│
├── css/
│   ├── base.css
│   ├── components.css
│   ├── dark-mode.css
│   ├── favorites.css
│   ├── forecast.css
│   ├── layout.css
│   ├── reset.css
│   └── variables.css
│
├── dom/
│   ├── elementos.ts
│   ├── renderfavorites.ts
│   ├── renderforecast.ts
│   ├── renderhistory.ts
│   └── renderprevisao.ts
│
├── map/
│   └── map.ts
│
├── storage/
│   ├── loadfavorites.ts
│   ├── loadhistory.ts
│   ├── savefavorite.ts
│   └── savehistory.ts
│
├── tests/
│   ├── forecast.test.ts
│   ├── geocoding.test.ts
│   └── storage.test.ts
│
├── types/
│   └── weather.ts
│
├── utils/
│   ├── convertTemp.ts
│   ├── formatDate.ts
│   └── iconWeather.ts
│
└── app.ts
```
---

## 🧠 Organização da lógica

A aplicação foi organizada separando responsabilidades entre os módulos:

``` text
API
│
├── Comunicação com serviços externos
└── Validação dos dados

DOM
│
├── Elementos
├── Renderização do clima
├── Renderização da previsão
├── Renderização dos favoritos
└── Renderização do histórico

MAP
│
└── Inicialização e atualização do Leaflet

STORAGE
│
└── Persistência local

TYPES
│
└── Contratos TypeScript

UTILS
│
└── Funções auxiliares

TESTS
│
└── Testes automatizados
```
---
## 🔄 Fluxo principal da aplicação

``` text

Usuário
  ├── Pesquisa por cidade
  ├── Seleciona favorito
  └── Usa localização atual
        │
        ▼
Identificação da cidade (nome + país + latitude + longitude)
        │
        ▼
carregarCidade() ──► buscarClima() / buscarPrevisao()
        │
        ▼
Dados meteorológicos / Estado climaAtual
        │
        ▼
Interface / Mapa / Histórico / Favoritos

```
---
# 🚀 Tecnologias

| Tecnologia | Utilização |
| :--- | :--- |
| **TypeScript** | Tipagem e desenvolvimento da aplicação |
| **Vite** | Build e servidor de desenvolvimento |
| **HTML5** | Estrutura da aplicação |
| **CSS3** | Interface, temas e responsividade |
| **DOM API** | Manipulação da interface |
| **OpenWeather API** | Dados meteorológicos |
| **Leaflet** | Mapa interativo |
| **OpenStreetMap** | Dados cartográficos |
| **Vitest** | Testes automatizados |
| **Zod** | Validação dos dados |
| **LocalStorage** | Persistência local |

---

# 🎯 Objetivos do projeto

Durante o desenvolvimento foram praticados diversos conceitos importantes:

- Manipulação do DOM
- Eventos e escutadores
- Arrays e Objetos em TypeScript
- LocalStorage e persistência local
- Organização modular de código
- Estruturação de projetos Front-end
- Consumo de APIs RESTful
- Programação assíncrona (`async/await`)
- Validação de dados com Zod
- Tratamento de fusos horários (`timezone`)
- Integração de bibliotecas de mapas interativos
- Testes automatizados com Vitest
- Design responsivo e Dark Mode

---
## 📷 Preview

# Interface:

<img width="1141" height="939" alt="image" src="https://github.com/user-attachments/assets/2c6ec5b5-8a80-48ab-bd29-735f72609be2" />

### Previsão por horas

<img width="683" height="284" alt="image" src="https://github.com/user-attachments/assets/0f7b54e2-a8a6-4f84-b2ee-89c5f44f0873" />

### Previsão dos próximos dias

<img width="665" height="279" alt="image" src="https://github.com/user-attachments/assets/93fc189b-e6f5-4187-aace-fd99eec627fa" />

### Tema claro

<img width="1081" height="930" alt="image" src="https://github.com/user-attachments/assets/8cdca846-650d-4738-aaab-2749850579b3" />

### Mapa e favoritos

<img width="400" height="573" alt="image" src="https://github.com/user-attachments/assets/67529135-963c-4e43-97b7-7ed1ff1936f5" />

---

## 🌐 APIs e Bibliotecas
OpenWeather
Responsável pelos dados meteorológicos. Utilizada para:

Geocodificação

Clima atual

Previsão meteorológica

Coordenadas

Fuso horário

🔗 Documentação: https://openweathermap.org/api

---
# Leaflet
Biblioteca utilizada para criar o mapa interativo.

🔗 Documentação: https://leafletjs.com/

---
# OpenStreetMap
Fornece as camadas de mapa (tiles) utilizadas pelo Leaflet.

🔗 Documentação: https://www.openstreetmap.org/

---

## 🌐 Deploy
Projeto publicado na Vercel.

🔗 Aplicação Online

[https://seu-projeto-clima.vercel.app/](https://projeto-tempo-alpha.vercel.app/)

## 💻 Repositório

[https://github.com/Claudineiii?tab=repositories](https://github.com/Claudineiii/projeto-Tempo)

---
# 👨‍💻 Autor

Claudinei da Costa Correa

Estudante de Análise e Desenvolvimento de Sistemas.

Este projeto faz parte da minha evolução prática como desenvolvedor Full-Stack / Front-End.

GitHub:

(https://github.com/Claudineiii)

LinkedIn:

[Claudinei-linkedin](https://www.linkedin.com/in/claudinei-correa-5852311b7/)

⭐ Se este projeto foi útil
Deixe uma ⭐ no repositório.






