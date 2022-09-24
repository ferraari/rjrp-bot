const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'limpar',
    description: 'Remove o timeout de um usuário',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'quantidade',
            type: ApplicationCommandOptionType.Integer,
            description: 'Quantidade de mensagens apagadas',

        }
    ],
    run: async (client, interaction) => {
        const amount = interaction.options.get('quantidade')?.value;
        if(!amount) {
            return interaction.reply({ content: 'Você precisa especificar uma quantidade de mensagens para eu apagar!', ephemeral: true });
        }
        if(amount > 100) {
            return interaction.reply({ content: 'Você não pode apagar mais de 100 mensagens!', ephemeral: true });
        }
        if(amount < 1) {
            return interaction.reply({ content: 'Você não pode apagar menos de 1 mensagem!', ephemeral: true });
        }
        await interaction.channel.bulkDelete(amount, true);
        interaction.reply({ content: `Foram apagadas ${amount} mensagens!`, ephemeral: true });

    }



}