# Central do Clima — documentação de manutenção

## Validação

Execute `npx tsc --noEmit`, `npm test -- --run` e `npm run build` antes de publicar mudanças.

## Fluxo de dados

`pesquisarCidade` converte um nome em coordenadas uma única vez. `carregarCidade` busca clima e previsão em paralelo, atualiza mapa, interface e histórico. Favoritos e geolocalização também usam esse mesmo fluxo.

`buscarClima` e `buscarPrevisao` recebem um `City` com nome, país, latitude e longitude. Preserve esse contrato ao alterar a API.

## Dados locais

- `tema`: `claro` ou `escuro`.
- `favoritos`: identificados por nome + país.
- `historico`: uma entrada por nome + país; a pesquisa mais recente vai para o topo.

Essas chaves ficam no `localStorage` e podem ser limpas pelas ferramentas do navegador durante o desenvolvimento.

## Tema, mapa e previsão

O tema padrão é escuro; `tema-claro` no `body` ativa as regras em `src/css/dark-mode.css`. O mapa é uma base OpenStreetMap, sem camada de radar. Para adicionar radar real no futuro, integre uma camada meteorológica compatível com Leaflet e altere o rótulo “Mapa da cidade”.

A previsão usa `city.timezone` retornado pela OpenWeather antes de agrupar dias. Não remova essa conversão: ela impede que o fuso do navegador desloque horários e datas da cidade consultada.

## Testes

- `storage.test.ts`: favoritos, histórico e deduplicação.
- `geocoding.test.ts`: `fetch` simulado, sem rede nem consumo de cota.
- `forecast.test.ts`: conversão do fuso na previsão horária e diária.

## Segurança

Uma variável `VITE_OPENWEATHER_API_KEY` vai para o navegador. Restrinja a chave por domínio no painel da OpenWeather. Para ocultá-la completamente, será necessário um backend/proxy.

## Limpeza estrutural — 15/09/2026

### Arquivos e pastas

- Removido `src/utils/tempCodeRunnerFile.ts`, arquivo temporário sem importações ou uso no projeto.
- Removida a pasta vazia `src/assets`.
- Mantidas as pastas de API, DOM, mapa, armazenamento, testes, tipos e utilitários porque possuem arquivos usados pelo fluxo da aplicação.

### TypeScript

- Removidos comentários redundantes dos módulos de API, validação, aplicação, renderização, armazenamento e utilitários.
- Removidos os registros duplicados de erro em `validarDadosPrevisao`; os erros continuam sendo propagados para o fluxo principal, que apresenta a mensagem ao usuário.
- Removido o `console.log` de `salvarHistorico`, que não acrescentava contexto ao tratamento da falha.
- Mantidos os `console.error` associados a falhas de rede, geolocalização, armazenamento e interação com favoritos, pois ainda são úteis para diagnóstico.
- Removidos emojis de mensagens de diagnóstico e confirmação.

### CSS

- Removidos cabeçalhos decorativos, divisores repetidos e comentários que apenas descreviam declarações autoexplicativas.
- Mantidos comentários somente em componentes ou áreas relevantes, como tags de cidades, colunas do card principal, radar, expansão do mapa, Leaflet e regras responsivas.
- Removidos comentários com referência a emojis.

### Validação da limpeza

- `npm run build`: concluído com sucesso.
- `npm test -- --run`: 3 arquivos de teste e 8 testes aprovados.
