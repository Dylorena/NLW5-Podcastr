## Executar projeto
1 - Instalar dependências
 ````js
$ npm install
````
2 - Executar a fake API que alimenta o front-end
````js
$ npm run server
````
3 - Executar o front-end
````js
$ npm run dev
````

## Stacks utilizadas
* NEXTJS
* ReactJS
* SCSS
* Typescript
## Resultado visual
Página inicial/ geral:
![](https://github.com/Dylorena/NLW5-Podcastr/blob/main/public/PaginaGeral.png?raw=true)

Episódio selecionado:
![](https://github.com/Dylorena/NLW5-Podcastr/blob/main/public/EpSelecionado.png?raw=true)
## Anotações gerais
"server": "json-server server.json -w -d 750" (arquivo package.json) - significa: -w: ficar em modo watch -d 750: demorará 750 milissigundos para responder com as infos da api fake -p 3333: porta 3333

Dentro do React a key é uma questão performance. Se ele não tem acesso ao key que irá re-renderizar então ele redenriza tudo.

Existe um roteamento automático dos arquivos dentro da pasta pages onde o nome do arquivo fica sendo o nome da rota. Neste projeto foi usado um arquivo cujo nome vai mudar pois assume o nome do posdcast selecionado. No caminho /src/pages/episode  , foi criado um arquivo cujo nome tem um colchetes em volta. O nome dentro desse colchetes é usado dentro do arquivo como o nome que irá variar, neste exemplo, o nome dos podcasts.

Quando queremos manipular um elemento empirico (um exemplo é o áudio, uma tag nativa do html no arquivo Player) com o react precisamos usar o conceito de Ref. Todo elemento html recebe o atributo ref.
