## Descrição do porjeto. 

A ideia do projeto é enviar uma notificação para o sqs fifo através do sns.
A queue têm uma função lambda trigada a ela, então automaticamente o sqs chamará a função lambda que processará a mensagem e salvará a mesma da database.

Foi criada uma outra fila chamada SQS Dead messages, ela serve para enfileirar as mensagens que por algum motivo tiveram um erro. Também está trigada ao lambda para tentar processar a mesma novamente.

O cloudwatch servirá para vermos os log da aplicação, caso haja algum erro.

![image](https://user-images.githubusercontent.com/37625040/103598072-77886380-4ee0-11eb-8335-e0489ef06de8.png)

## :rocket: Tecnologias 

-  [Node.js](https://nodejs.org)
-  [Lambda](https://aws.amazon.com/pt/lambda/)
-  [SNS](https://docs.aws.amazon.com/pt_br/sdk-for-javascript/v2/developer-guide/sns-examples.html)
-  [SQS](https://aws.amazon.com/pt/sqs/)
-  [Cloudwatch](https://aws.amazon.com/pt/cloudwatch/)
-  [MongoDB](https://www.mongodb.com/)
-  [serverless-offline](https://github.com/dherault/serverless-offline)
