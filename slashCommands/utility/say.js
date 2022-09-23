const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'say',
    description: 'Faça o bot falar algo!',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'mensagem',
            description: 'A mensagem que vai ser enviada',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const mensagem = interaction.options.get('mensagem')?.value;
        
        if (!mensagem) {
            return interaction.reply({ content: 'Você precisa digitar uma mensagem para eu enviar!', ephemeral: true });
        }
        if (mensagem.length > 2000) {
            return interaction.reply({ content: 'A mensagem não pode ter mais de 2000 caracteres!', ephemeral: true });
        }
        if (interaction.member.permissions.has('MANAGE_MESSAGES')) {
            interaction.channel.send({ content: mensagem });
            interaction.reply({ content: 'Mensagem enviada com sucesso!', ephemeral: true });
        } else {
            interaction.reply({ content: 'Você não tem permissão para usar esse comando!', ephemeral: true });
        }
    }


}