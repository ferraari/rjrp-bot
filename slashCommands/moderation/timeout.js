const { DiscordAPIError } = require('@discordjs/rest');
const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');
const ms = require('ms');
const config = require('../../config.json');

module.exports = {
    name: 'timeout',
    description: 'Temporariamente desative um usuário do servidor',
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
    cooldown: 3000,
    options: [
        {
            name: 'usuário',
            description: 'O usuário que você deseja desativar',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'tempo',
            description: 'O tempo que o usuário ficará desativado',
            type: 4,
            required: true
        },
        {
            name: 'motivo',
            description: 'O motivo pelo qual o usuário está sendo desativado',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    run: async (client, interaction) => {
        let user = interaction.options.get('usuário')?.value;
        const member = interaction.guild.members.cache.get(user);
        let time = Number(interaction.options.get('tempo')?.value);
        let duration = ms(time);
        let reason = interaction.options.get('motivo')?.value;
        let staffRoleID = config.staffRoleID;

        if (!member) {
            return interaction.reply({ content: 'Você precisa mencionar um usuário válido!', ephemeral: true });
        }
        if (member.permissions.has('Administrator')) {
            return interaction.reply({ content: 'Você não pode dar timeout de um administrador!', ephemeral: true });
        }
        
        if (member.roles.cache.has(staffRoleID)) {
            return interaction.reply({ content: 'Você não pode dar timeout de um membro da staff!', ephemeral: true });
        }
        if (!user) {
            return interaction.reply({ content: 'Você precisa mencionar um usuário para desativar!', ephemeral: true });
        }
        if (!time) {
            return interaction.reply({ content: 'Você precisa digitar um tempo para desativar o usuário!', ephemeral: true });
        }
        const embed = new EmbedBuilder()
            .setTitle('Temporariamente desativado')
            .setDescription(`Um usuário foi temporariamente desativado do servidor por ${time} segundos, por ${reason ? reason : 'nenhum motivo especificado'}`)
            .addFields(
                {name: 'Usuário desativado', value: `<@${user}>`, inline: true},
                {name: 'Desativado por', value: `${interaction.user}`, inline: true},
                {name: 'Tempo', value: `${time}`, inline: false},
            )
            .setColor('#8257E5')
            .setTimestamp()
            .setFooter({text: `Desativado por ID: ${interaction.user}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
            .setThumbnail("https://images-ext-2.discordapp.net/external/Qtj8JaD6bwxKVpKYCst5Of1FVn-vcJrrO6dpXDXry-0/%3Fsize%3D2048/https/cdn.discordapp.com/icons/640206150142525460/cbcccc12ed85f277a56cd46ed5428db7.png");

        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            interaction.channel.send({ embeds: [embed] });
            member.timeout( 1000 * time, reason ? reason : 'nenhum motivo especificado' );
            interaction.reply({ content: 'Usuário desativado com sucesso!', ephemeral: true });
        } else {
            interaction.reply({ content: 'Você não tem permissão para usar esse comando!', ephemeral: true });
        }


            
    
    }
}