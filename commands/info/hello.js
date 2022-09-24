const Discord = require('discord.js');
const Canvas = require('canvas');
const { request } = require('https');
const path = require('path');

module.exports = {
    name: 'canvas',
    description: 'Canvas',
    
    run: async (client, interaction) => {
        let member = interaction.member;

        const  memberAvatar  = await (member.user.displayAvatarURL({ extension: 'png', size: 1024 }));
        
        let foto = "https://media.discordapp.net/attachments/1022288552022781992/1023228439974649968/Boas_vindas.png"; // Coloque o link da foto que será utilizada na entrada do servidor.

        let chave = {};

        chave.create = Canvas.createCanvas(1024, 500);
        chave.context = chave.create.getContext('2d');
        chave.context.font = '72px sans-serif';
        chave.context.fillStyle = '#00001';
        Canvas.registerFont(path.resolve('C:/Users/conta/OneDrive/Desktop/Projetos/rjrp-main/fonts/phonkContrast.ttf'), { family: 'phonkContrast' });
        Canvas.loadImage(foto).then( async (i) => {

            var centerX = chave.create.width / 5;
            var centerY = chave.create.height / 2;
            var radius = 110;

            chave.context.drawImage(i, 0, 0, chave.create.width, chave.create.height);
            chave.context.beginPath();
            chave.context.stroke();
            chave.context.fill();

            let chat = client.guilds.cache.get(member.guild.id).channels.cache.get('1021937103933804577'); // Coloque o ID do canal de entrada.

            chave.context.font = '35px phonkContrast',
            chave.context.textAlign = 'center';

            chave.context.fillText(`${member.user.tag}`, chave.create.width / 1.5, chave.create.height / 1.75);
            chave.context.beginPath();
            chave.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            chave.context.closePath();
            chave.context.clip();

            chave.context.drawImage(await Canvas.loadImage(await memberAvatar), centerX - radius, centerY - radius, radius * 2, radius * 2);  

            let mensagem = new Discord.AttachmentBuilder(chave.create.toBuffer(), `${member.user.tag}.png`)

            chat.send({ files: [mensagem] });
        })
    }
}
        

    