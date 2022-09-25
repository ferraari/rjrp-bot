const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');
const { createGunzip } = require('zlib');

module.exports = {
    name: 'manutencao',
    description: 'Ativa ou desativa o modo manutenção',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'modo',
            type: ApplicationCommandOptionType.String,
            description: 'Ativa ou desativa o modo manutenção',
            required: true,
            choices: [
                {
                    name: 'Ativar',
                    value: 'ativar'
                },
                {
                    name: 'Desativar',
                    value: 'desativar'
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        const modo = interaction.options.get('modo')?.value;
       
        if(modo === 'ativar') {
            const embed = new EmbedBuilder()
            .setTitle('Modo manutenção')
            .setDescription('O modo manutenção foi ativado, você não poderá enviar mensagens no servidor!')
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({ text: interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL() });
            interaction.reply({ embeds: [embed] });
            interaction.guild.channels.cache.forEach(channel => {
                channel.permissionOverwrites.edit(interaction.guild.id, {
                    2048: false
                });
            });
           
        } else if(modo === 'desativar') {
            const embed = new EmbedBuilder()
            .setTitle('Modo manutenção')
            .setDescription('O modo manutenção foi desativado, você poderá enviar mensagens no servidor!')
            .setColor('#00FF00')
            .setTimestamp()
            .setFooter({ text: interaction.member.user.tag, iconURL: interaction.member.user.displayAvatarURL() });
            interaction.reply({ embeds: [embed] });

            interaction.guild.channels.cache.forEach(channel => {
                channel.permissionOverwrites.edit(interaction.guild.id, {
                    2048: true
                });
                
            });
    }
}







}