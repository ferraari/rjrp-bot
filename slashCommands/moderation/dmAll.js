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
        if(!message) {
            return interaction.reply({ content: 'Você precisa especificar uma mensagem para eu enviar!', ephemeral: true });
        }
        interaction.guild.members.cache.forEach(member => {
            member.send(message).catch(e => {
                interaction.channel.send(`Não consegui enviar a mensagem para alguns membros!!`);
            });
        });
        interaction.reply({ content: 'Mensagem enviada para todos os membros do servidor!', ephemeral: true });
    }
}