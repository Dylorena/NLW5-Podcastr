"server": "json-server server.json -w -d 750" - significa: -w: ficar em modo watch
-d 750: demorará 750 milissigundos para responder com as infos da api fake
-p 3333: porta 3333

Dentro do React a key é uma questão performance. Se ele não tem acesso ao key que irá re-renderizar então ele redenriza tudo.

Existe um roteamento automático dos arquivos dentro da pasta pages onde o nome do arquivo fica sendo o nome da rota. Neste projeto foi usado um arquivo cujo nome vai mudar pois assume o nome do posdcast selecionado. 
No caminho /src/pages/episode, foi criado um arquivo cujo nome tem um colchetes em volta. O nome dentro desse colchetes é usado dentro do arquivo como o nome que irá variar, neste exemplo, o nome dos podcasts.