const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');
const config = require('../config.json');
module.exports = {
    id: 'ticket_button',
    permissions: [],
    run: async (client, interaction) => {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = interaction.guild.members.cache.get(interaction.member.user.id);
        const existTicket = guild.channels.cache.find(channel => channel.name === `ticket-${member.user.username}`);
        if(existTicket) {
            return interaction.reply({ content: 'Você já possui um ticket aberto!', ephemeral: true });
        }
        const ticketChannel = await guild.channels.create({
            name: `ticket-${member.user.username}`,
            type: '0',
            parent: config.ticketCategoryID,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: ['ViewChannel']
                },
                {
                    id: member.user.id,
                    allow: ['ViewChannel', 'SendMessages']
                },
                {
                    id: config.staffRoleID,
                    allow: ['ViewChannel', 'SendMessages']
                }
            ]

        });

        const embed = new EmbedBuilder()
                .setTitle('Ticket')
                .setDescription('Seu ticket foi criado com sucesso! Clique abaixo para fechar o ticket.')
                .setColor('Green')
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Fechar ticket')
                    .setStyle('Danger')
                    .setCustomId('ticket_delete_button')
                );
        
        await ticketChannel.send({ embeds: [embed], components: [buttons] });
        return interaction.reply({ content: `Concluido!`, ephemeral: true });
    }
};