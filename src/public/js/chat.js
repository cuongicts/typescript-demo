$(window).ready(function() {
  // create connection
  const url = 'wss://qizjzebghf.execute-api.us-east-2.amazonaws.com/FirstStage?name=Cuong';
  var ws = new WebSocket(url);
  
  var message = $('#message');
  
  ws.onopen = (event) => console.log('connected');
  
  ws.onmessage = data => {
    console.log(`From server: ${data}`);
  };
  ws.onclose = () => {
    console.log('disconnected');
    process.exit();
  };
  
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }).on('line', data => {
    ws.send(data);
  });
});