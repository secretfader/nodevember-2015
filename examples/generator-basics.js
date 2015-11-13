const messages = [
  "Hello, Nodevember.",
  "It's time to talk about generators...",
  "Generators are part of the ES2015 specification,",
  "and they allow us to handle variable length sequences with ease."
];

function* sendMessages() {
  var index = 0;
  
  while (index <= messages.length - 1) {
    yield messages[index++];
  }
}

for (var value of sendMessages()) {
  console.log(value)
}

