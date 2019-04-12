$(window).ready(function() {
  // create connection
  const url = 'wss://qizjzebghf.execute-api.us-east-2.amazonaws.com/FirstStage?name=Cuong';
  var ws = new WebSocket(url);
  ws.onopen = (event) => console.log('connected');
  
  var message = $('#message'),
      username = $('#username'),
      btn = $('#send'),
      output = $('#output'),
      feedback = $('#feedback');

  // emit events
  btn.click(function() {
    const body = {
      action: 'sendmessage',
      data: {
        name: username.val(),
        message: message.val()
      },
    };
    ws.send(JSON.stringify(body));
    message.val('');
  });

  // message.on('')
  
  ws.onmessage = response => {
    let { data } = response;
    data = JSON.parse(data);
    feedback.text(data.message);
    output.append(`<p><strong>${data.username}: </strong>${data.message}</p>`);
  };

  ws.onclose = () => {
    console.log('disconnected');
    process.exit();
  };
  
  // readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // }).on('line', data => {
  //   ws.send(data);
  // });
});