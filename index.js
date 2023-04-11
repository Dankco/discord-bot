const express = require("express");
const app = express()
require('dotenv').config();

app.listen(3000, () => {
  console.log("Project is running!")
})

app.get("/",(req,res) =>{
  res.send("Hello world!")
})

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ]
})


const msgs = ["https://www.youtube.com/watch?v=Rpc-ZIRcUrA", "Yan of the Yulun Family", "Where's my Yanyulun?", "Yanyuliners for dinner!", "Yulun some Yulose some", "My name is Yanyulun!", "Pogyulun!", "This is true!", "Dao mei",  'in the psych ward, 13cs', "the mid lane doesn’t exist!"];

client.on('messageCreate', message => {
  if(message.author.bot)
  {
    return
  }
  const content = message.content;
  const msg_number = Math.floor(Math.random() * msgs.length);
  const where_yanyulun = 'where is my yanyulun'
  if(content.toLowerCase().match(where_yanyulun))
  {
    // First use guild.members.fetch to make sure all members are cached
    message.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
    	const totalOnline = fetchedMembers.filter(member => member.presence?.status === 'online');
      const id = '345656455031947264'
    	// Now you have a collection with all online member objects in the totalOnline variable
      const found = totalOnline.filter(item => item.id == id);
      const ids = found.map(user => user.id);
      if(ids.length > 0)
        message.channel.send("Yanyulun is here!");
      else
        message.channel.send("Yanyulun mei le!");
    });
  } else if(content.toLowerCase().match('yanyulun'))
  {
    message.channel.send(msgs[msg_number]);
  }
});
client.login(process.env.token);
