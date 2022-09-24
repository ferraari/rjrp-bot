const Canvas = require('canvas');
const Discord = require('discord.js');
const client = require('..');
const config = require('../config.json');
const path = require('path');


client.on("guildMemberAdd", async (member) => {

    if (!member) return;
    const memberNickname =
        member.user.username > 11 
            ? member.user.username.substring(0, 11) + "..."
            : member.user.username;
	
	const  memberAvatar  = await (member.user.displayAvatarURL({ extension: 'png', size: 1024 }));
        
    let bg = "https://media.discordapp.net/attachments/1022288552022781992/1023228439974649968/Boas_vindas.png"; // Coloque o link da foto que será utilizada na entrada do servidor.

    let box = {};

    box.create = Canvas.createCanvas(1024, 500);
    box.context = box.create.getContext('2d');
    box.context.font = '72px sans-serif';
    box.context.fillStyle = '#00001';

    Canvas.registerFont(path.resolve('C:/Users/conta/OneDrive/Desktop/Projetos/rjrp-main/fonts/phonkContrast.ttf'), { family: 'phonkContrast' });

    Canvas.loadImage(bg.then( async (i) => {

        var centerX = box.create.width / 5;
        var centerY = box.create.height / 2;
        var radius = 110;

        box.context.drawImage(i, 0, 0, box.create.width, box.create.height);
        box.context.beginPath();
        box.context.stroke();
        box.context.fill();

            

        box.context.font = '35px phonkContrast',
        box.context.textAlign = 'center';

        box.context.fillText(memberNickname, box.create.width / 1.5, box.create.height / 1.75);
        box.context.beginPath();
        box.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        box.context.closePath();
        box.context.clip();

        box.context.drawImage(await Canvas.loadImage(await memberAvatar), centerX - radius, centerY - radius, radius * 2, radius * 2);  

        let mensagem = new Discord.AttachmentBuilder(box.create.toBuffer(), `${member.user.tag}.png`)
        var roleID = 
            member.guild.roles.cache.find(
                role => role.id === config.roleID);


        client.channels.cache.get(config.welcomeChannel).send({ files: [mensagem] });
            
        member.roles.add(roleID);
    }));
});
