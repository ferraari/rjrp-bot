const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');
const { text } = require('stream/consumers');

module.exports = {
    name: 'unlock',
    description: 'Desbloqueia um canal',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'canal',
            type: ApplicationCommandOptionType.Channel,
            description: 'Canal que será desbloqueado',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const channel = interaction.options.get('canal')?.value;
        const channelMentioned = interaction.guild.channels.cache.get(channel);
        const guild = client.guilds.cache.get(interaction.guild.id);
        
        if(!channel) {
            return interaction.reply({ content: 'Você precisa especificar um canal para eu desbloquear!', ephemeral: true });
        }
        interaction.reply({
            content: `Você tem certeza que deseja desbloquear o canal ${channel}?`, 
            ephemeral: true, 
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            style: 1,
                            label: 'Sim, eu assumo os riscos!',
                            custom_id: 'sim'
                        },
                        {
                            type: 2,
                            style: 4,
                            label: 'Não, eu não quero!',
                            custom_id: 'nao'
                        }
                    ]
                }
            
                ]})
        const filter = (i) => i.customId === 'sim' || i.customId === 'nao';
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (i) => {
            if(i.customId === 'sim') {
                if (channelMentioned.type === 0) {
                    await i.update({ content: `Canal desbloqueado com sucesso!`, ephemeral: true, components: [] });
                    await i.channel.send(`Canal desbloqueado por ${interaction.user}`);
                    await channelMentioned.permissionOverwrites.edit(guild.id, {
                        2048: true
                    });
                } else {
                    return i.update({ content: `Você não pode desbloquear um canal de voz!`, ephemeral: true, components: [] });
                }
            }
            if(i.customId === 'nao') {
                await i.update({ content: 'Canal não desbloqueado!', components: [] });
            }
        })

    }
}