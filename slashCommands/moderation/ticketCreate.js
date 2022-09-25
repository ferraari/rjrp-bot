const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Cria um ticket',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    options: [
        {
            name: 'canal',
            description: 'Canal de tickets',
            type: ApplicationCommandOptionType.Channel,
            required: true
        },
    ],
    run: async (client, interaction) => {
        const channel = interaction.options.get('canal').channel;
        const embed = new EmbedBuilder()
        .setTitle('Tickets')
        .setDescription('Clique no botão para criar um ticket!')
        .setColor('Purple')
        .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Criar ticket')
            .setStyle('Success')
            .setCustomId('ticket_button')
        );
        
        await channel.send({ embeds: [embed], components: [buttons] });
        return interaction.reply({ content: `Concluido!`, ephemeral: true });
    }
}