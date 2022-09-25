const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'dmall',
    description: 'Envia uma mensagem para todos os membros do servidor',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'mensagem',
            type: ApplicationCommandOptionType.String,
            description: 'Mensagem que será enviada para todos os membros do servidor',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const message = interaction.options.get('mensagem')?.value;
        removeBot = interaction.guild.members.cache.filter(member => !member.user.bot); 
        if(!message) {
            return interaction.reply({ content: 'Você precisa especificar uma mensagem para eu enviar!', ephemeral: true });
        }
        removeBot.forEach(member => {
            member.send(message).catch(error => {
                console.log(error)
                interaction.channel.send(`Não consegui enviar a mensagem para o usuário ${member}`);
            });
        });
        interaction.channel.send({ content: `Mensagem enviada para todos os membros do servidor! Por: ${interaction.user} `});
        interaction.reply({ content: `Concluido! `, ephemeral: true });
    }
}