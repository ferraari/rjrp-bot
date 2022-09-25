const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');
const { permissions } = require('../../buttons/verify');
const config = require('../../config.json');
module.exports = {
    name: 'removetimeout',
    description: 'Remove o timeout de um usuário',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'usuário',
            description: 'O usuário que você deseja remover o timeout',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'motivo',
            description: 'O motivo do timeout',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.get('usuário')?.value;
        const guild = interaction.guild;
        const reason = interaction.options.get('motivo')?.value;
        const memberMentioned = guild.members.cache.get(user);
        const staffRoleID = config.staffRoleID;

       

        if (!memberMentioned) {
            return interaction.reply({ content: 'Você precisa mencionar um usuário válido!', ephemeral: true });
        }
        if (memberMentioned.permissions.has('Administrator')) {
            return interaction.reply({ content: 'Você não pode remover o timeout de um administrador!', ephemeral: true });
        }
        
        if (memberMentioned.roles.cache.has(staffRoleID)) {
            return interaction.reply({ content: 'Você não pode remover o timeout de um membro da staff!', ephemeral: true });
        }
        if (!user) {
            return interaction.reply({ content: 'Você precisa mencionar um usuário para desativar!', ephemeral: true });
        }

        memberMentioned.timeout(null, reason).then(() => {
            interaction.reply({ content: `O timeout de <@${user}> foi removido com sucesso!`, ephemeral: true });
            const embed = new EmbedBuilder()
            .setTitle('Timeout removido')
                .setDescription(`O timeout de <@${user}> foi removido por ${reason ? reason : 'nenhum motivo especificado'}`)
                .addFields(
                    {name: 'Usuário', value: `<@${user}>`, inline: true},
                    {name: 'Removido por', value: `${interaction.user}`, inline: true},
                    {name: 'Motivo', value: `${reason ? reason : 'nenhum motivo especificado'}`, inline: true}
                )
                .setTimestamp()
                .setColor('#8257E5')
                .setFooter({text: `ID: ${user}`, iconURL: memberMentioned.user.displayAvatarURL({ dynamic: true })});
            interaction.channel.send({ embeds: [embed] });
        });
        
    }
}