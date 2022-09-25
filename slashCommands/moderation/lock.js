const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField, channelMention } = require('discord.js');

module.exports = {
    name: 'lock',
    description: 'Bloqueia um canal',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'canal',
            type: ApplicationCommandOptionType.Channel,
            description: 'Canal que será bloqueado',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const channel = interaction.options.get('canal')?.value;
        const channelMentioned = interaction.guild.channels.cache.get(channel);
        const guild = client.guilds.cache.get(interaction.guild.id);

        if(!channel) {
            return interaction.reply({ content: 'Você precisa especificar um canal para eu bloquear!', ephemeral: true });
        }
        interaction.reply({
            content: `Você tem certeza que deseja bloquear o canal ${channel}?`, 
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
                if  (channelMentioned.type === 0) {
                    await i.update({ content: `Canal bloqueado com sucesso!`, ephemeral: true, components: [] });
                    await i.channel.send(`Canal bloqueado por ${interaction.user}`);
                    await channelMentioned.permissionOverwrites.edit(guild.id, {
                        2048: false
                    });
                } else {
                    return i.update({ content: `Você não pode bloquear um canal de voz!`, ephemeral: true, components: [] });
                }
            }
            if(i.customId === 'nao') {
                await i.update({ content: 'Canal não bloqueado!', components: [] });
            }
        });
    }
}