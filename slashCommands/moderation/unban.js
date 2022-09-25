const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: 'desbanir',
    description: 'Desbane um usuário do servidor',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'usuario',
            type: ApplicationCommandOptionType.String,
            description: 'Usuário que será desbanido',
            required: true
        },
        {
            name: 'motivo',
            type: ApplicationCommandOptionType.String,
            description: 'Motivo do desbanimento',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.get('usuario')?.value;
        const reason = interaction.options.get('motivo')?.value;
        
        if(!user) {
            return interaction.reply({ content: 'Você precisa especificar um usuário para eu desbanir!', ephemeral: true });
        }
        if(!reason) {
            return interaction.reply({ content: 'Você precisa especificar um motivo para eu desbanir o usuário!', ephemeral: true });
        }

        interaction.guild.members.unban(user);
        interaction.reply({ content: `O usuário ${user} foi desbanido do servidor!`, ephemeral: false });
    }

    
}