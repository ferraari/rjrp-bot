const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'banir',
    description: 'Bane um usuário do servidor',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'usuário',
            type: ApplicationCommandOptionType.User,
            description: 'Usuário que será banido',
            required: true
        },
        {
            name: 'motivo',
            type: ApplicationCommandOptionType.String,
            description: 'Motivo do banimento',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.get('usuário')?.value;
        const reason = interaction.options.get('motivo')?.value;
        const member = interaction.guild.members.cache.get(user);
        const staffRoleID = config.staffRoleID;

        if(!user) {
            return interaction.reply({ content: 'Você precisa especificar um usuário para eu banir!', ephemeral: true });
        }
        if(!member) {
            return interaction.reply({ content: 'Você precisa especificar um usuário para eu banir!', ephemeral: true });
        }
        if (member.permissions.has('Administrator')) {
            return interaction.reply({ content: 'Você não pode dar timeout de um administrador!', ephemeral: true });
        }
        
        if (member.roles.cache.has(staffRoleID)) {
            return interaction.reply({ content: 'Você não pode dar timeout de um membro da staff!', ephemeral: true });
        }
        if(!reason) {
            return interaction.reply({ content: 'Você precisa especificar um motivo para eu banir o usuário!', ephemeral: true });
        }
    
        member.ban({ reason: reason });

        interaction.reply({ content: `O usuário ${member} foi banido do servidor!`, ephemeral: false });

    }

}