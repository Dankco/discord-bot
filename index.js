const express = require("express");
const app = express()

require('dotenv').config()
app.listen(3000, () => {
  console.log("Project is running!")
})

app.get("/",(req,res) =>{
  res.send("Hello world!")
})

const { Client, GatewayIntentBits} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ]
})

man_bot = './public/4_man_bot.png'
subscribe = './public/subscribe.png'
const msgs = ["https://www.youtube.com/watch?v=Rpc-ZIRcUrA", "Yan of the Yulun Family", "Where's my Yanyulun?", 
"Yanyuliners for dinner!", "Yulun some Yulose some", "My name is Yanyulun!", "Pogyulun!", 
"This is true!", "Dao mei",  'in the psych ward, 13cs', "the mid lane doesn’t exist!", 
{ files: [man_bot] }, {content: "Subscribe to yanyulun's new Youtube channel!",files: [subscribe]}];
const feed_msgs = ["Dao Mei", "Wo De Yanyulun Mei Le", "Ai ya!"]

client.on('messageCreate', message => {
  if(message.author.bot)
  {
    return
  }
  const content = message.content.toLowerCase();
  const msg_number = msgs.length-1;
  const feed_msg_number = Math.floor(Math.random() * feed_msgs.length)
  const where_yanyulun = 'where is my yanyulun'
  if(content.match(where_yanyulun))
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
  } else if(content.match("feeding") || content.match("inting"))
  {
    message.channel.send(feed_msgs[feed_msg_number]);
  }
  else if(content.match('yanyulun'))
  {
    message.channel.send(msgs[msg_number]);
  }
});
client.login(process.env.token);
