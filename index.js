var azure = require('azure');

var namespace = 'iotcloudeventhub';
var accessKey = 'Endpoint=sb://iotcloudeventhub.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=M+O/bZzxZPANa1Us5LzRXso5KMVzt/3j4iazUrmGUz4=';

var retryOperations = new azure.ExponentialRetryPolicyFilter();
var serviceBusService = azure.createServiceBusService(accessKey).withFilter(retryOperations);

var topicOptions = {
        MaxSizeInMegabytes: '5120',
        DefaultMessageTimeToLive: 'PT1M'
    };

serviceBusService.createTopicIfNotExists('MyTopic', topicOptions, function(error){
    if(!error){
        // topic was created or exists
        console.log('Topic created or exists');
    }
});

return;

data = {
  sensor_id: "5678",
  value : 78.65,
  timestamp : Date.now()
}
/*
serviceBusService.sendTopicMessage('MyTopic', data, function(error){
    if(!error){
        // Message sent
        console.log('msg sent');
    }
    else {
      console.log(error);
    }
});
*/


serviceBusService.createSubscription('MyTopic','AllMessages',function(error){
    if(!error){
        // subscription created
        serviceBusService.receiveSubscriptionMessage('MyTopic', subscription, function(error2, serverMessage){
           if(!error2){
               // Process message
               console.log(serverMessage);
           } else {
            //  console.log(error2);
             console.log(serverMessage);
           }
       });
    }
    else {
      console.log(error);
    }
});
