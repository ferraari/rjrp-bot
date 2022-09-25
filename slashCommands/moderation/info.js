const { messageLink } = require('discord.js');
const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'info',
    description: 'Informações sobre o bot',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,


    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
        .setTitle('Informações')
        .setDescription('Informações sobre o bot')
        .setColor('#FF0000')
        .addFields(
            { name: '🤓Autor', value: '[ferrari](https://discord.com/users/794887769612222497) ', inline: true },
            { name: '⭐Linguagem', value: 'Javascript', inline: true },
            { name: '📚Framework', value: 'Discord.js', inline: true },
            { name: '📚Github', value: '[Github Source](https://github.com/ferraari/rjrp-main)', inline: true },
            { name: '🎉Host', value: '[SquareCloud](https://squarecloud.app)', inline: true }
        )
        .setTimestamp()
        .setFooter({ text: interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL() });
        interaction.reply({ embeds: [embed] });
    }
}