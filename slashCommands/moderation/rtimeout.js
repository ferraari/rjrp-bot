const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'rtimeout',
    description: 'Remove o timeout de um usuário',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'usuário',
            description: 'O usuário que vai ser removido o timeout',
            type: ApplicationCommandOptionType.User,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.get('usuário')?.value;
        const member = interaction.guild.members.cache.get(user.id);
        if(!user) {
            return interaction.reply({ content: 'Você precisa mencionar um usuário para eu remover o timeout!', ephemeral: true });
        }
        if(member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: 'Você não pode remover o timeout de um administrador!', ephemeral: true });
        }
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const embed = new EmbedBuilder()
            .setTitle('Timeout removido')
            .setDescription(`O timeout do usuário ${user} foi removido com sucesso!`)
            .addFields(
                {name: 'Usuário', value: `${user}`, inline: true},
                {name: 'Moderador', value: `${interaction.member}`, inline: true}
            )
            .setColor('#00ff00')
            .setTimestamp()
            .setFooter({ text: `Comando executado por: ${interaction.member.nickname}`, iconURL: interaction.member.user.displayAvatarURL() });
            
            member.timeout(null)
        }

    }
}