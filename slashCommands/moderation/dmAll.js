const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'dmall',
    description: 'Envia uma mensagem para todos os membros do servidor',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'mensagem',
            type: ApplicationCommandOptionType.String,
            description: 'Mensagem que será enviada para todos os membros do servidor',
            required: true
        }
    ],
    run: async (client, interaction) => {
        const message = interaction.options.get('mensagem')?.value;
        removeBot = interaction.guild.members.cache.filter(member => !member.user.bot); 
        if(!message) {
            return interaction.reply({ content: 'Você precisa especificar uma mensagem para eu enviar!', ephemeral: true });
        }
        

        interaction.reply({
            content: `Você tem certeza que deseja enviar a mensagem para todos os membros do servidor? Isso pode causar danos irrevessiveis, ou perca de grande numero de membros`, 
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
                await i.update({ content: 'Enviando mensagem para todos os membros do servidor...', components: [] });
                await i.channel.send(`Mensagem enviada em todas DM's por ${interaction.user}`);
                await removeBot.forEach(member => {
                    member.send(message).catch(error => {
                        console.log(error)
                        interaction.channel.send(`Não consegui enviar a mensagem para o usuário ${member}`);
                    });
                });
            } else {
                i.update({ content: 'Mensagem não enviada!', components: [] });
            }
        });
    }
}