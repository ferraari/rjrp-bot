const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Mostra o ping do bot',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        interaction.reply({ content: `Calculando...` });
        await interaction.fetchReply();
        const ping = interaction.createdTimestamp - interaction.createdTimestamp;
        setInterval(() => {
            interaction.editReply({ content: `🏓 Pong! O ping do bot é de ${ping}ms` });
        }, 2000);

    }
}