const messages = [
  "Hello, Nodevember.",
  "It's time to talk about generators...",
  "Generators are part of the ES2015 specification,",
  "and they allow us to handle variable length sequences with ease."
];

function getMessage(index) {
  return new Promise(function(resolve, reject) {
    resolve(messages[index]);
  });
}

function* sendMessages() {
  var index = 0;

  while (index <= messages.length - 1) {
    return yield getMessage(index++);
  }
}

for (var value of sendMessages()) {
  value.then(v => { console.log(v) });
}

