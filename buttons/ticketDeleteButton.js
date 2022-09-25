const config = require('../config.json');

module.exports = {
    id: 'ticket_delete_button',
    permissions: [],
    run: async (client, interaction) => {
        const channel = interaction.channel;
        const date = new Date();
        interaction.reply({ content: 'Deseja realmente fechar o ticket?', components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 4,
                        label: 'Sim',
                        custom_id: 'ticket_delete_confirm'
                    },
                    {
                        type: 2,
                        style: 4,
                        label: 'Não',
                        custom_id: 'ticket_delete_cancel'
                    }
                ]
            }
        ]});

        const filter = (i) => i.customId === 'ticket_delete_confirm' || i.customId === 'ticket_delete_cancel';
        const collector = channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async (i) => {
            if (i.customId === 'ticket_delete_confirm') {
                let messageColletion = await channel.messages.fetch({ limit: 100 });
                channelLog = client.channels.cache.get(config.logTicketsID);

                await channelLog.send({ content: `Ticket fechado por ${interaction.user} em ${date.toLocaleDateString('pt-BR')} às ${date.toLocaleTimeString('pt-BR')}`, 
                files: [{ attachment: Buffer.from(messageColletion.map(m => `${m.author.tag}: ${m.content}`).join('\n')), 
                name: 'ticket.txt' }] });

                await interaction.member.send({ 
                    content: `Ticket fechado em ${date.toLocaleDateString()} às ${date.toLocaleTimeString()}`, 
                    files: [{ attachment: Buffer.from(messageColletion.map(m => `[${m.author.tag}]: ${m.content}`).join('\n')), 
                    name: 'ticket.txt' }] })
                    .catch(error => {
                        console.log(error);
                    });
                i.update({ content: 'Ticket fechado com sucesso!', components: [] });
               
                return await channel.delete();
                
            } else {
                await i.update({ content: 'Ticket não fechado!', components: [] });
            }
        });
        
    }
};