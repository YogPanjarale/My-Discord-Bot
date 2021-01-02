const Discord = require('discord.js');
const fetch = require("node-fetch");
const querystring = require('querystring');
const { token, prefix } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // message.channel.send('I recived message')
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'cat') {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

        message.channel.send(file);
    }
    else if (command === 'urban') {
        if (!args.length) {
            return message.channel.send('You need to supply a search term!');
        }

        const query = querystring.stringify({ term: args.join(' ') });

        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        if (!list.length) {
            return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        message.channel.send(list[0].definition);
    }
    else if (command === 'ask') {
        if (!args.length) {
            return message.channel.send('Ask something , it can not be blank')
        }

        const query = querystring.stringify({ q: args.join(' ') });

        const { answers } = await fetch(`https://www.codegrepper.com/api/search.php?${query}`).then(response => response.json())
        if (!answers.length) {
            return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        var answermessage = ''
        answers.forEach((element, index) => {
            var answer = element.answer
            var language = element.language
            if (language === 'whatever') {
                answermessage += ((parseInt(index) + 1) + ":```\n" + answer + "```");
            }
            else {
                // var message;
                //console.log(language)
                answermessage += ((parseInt(index) + 1) + ":```" + language + "\n" + answer + "```");
            }
        });
        message.channel.send(answermessage);

    }
    else if (command === 'b') {
        if (!args.length) {
            return message.channel.send('Please provide Arguments')
        }
        var output = '';
        var input = args.join(' ');
        output.value = "";
        output=text2Binary(input)

        message.channel.send(output);

    }

    if (args.length > 0) {
        var msg = "args: `" + args + "`"
        message.channel.send(msg);

    }
    else {
        message.channel.send("You need to provide arguments")
    }
});

function text2Binary(text) {
    var length = text.length,
    output = [];
for (var i = 0;i < length; i++) {
  var bin = text[i].charCodeAt().toString(2);
  output.push(Array(8-bin.length+1).join("0") + bin);
} 
return output.join(" ");
}
client.login(token);