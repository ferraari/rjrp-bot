const { Discord, ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, Embed, PermissionsBitField } = require('discord.js');
const verifyButton = require('../../buttons/verify')

module.exports = {
    name: 'verificar',
	description: "Crie uma mensagem de verificação!",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'Administrator',
	options: [
        {
            name: 'criar',
            description: 'Add role to a user.',
            type: 1,
            options: [
                {
                    name: 'canal',
                    description: 'Canal de verificação',
                    type: ApplicationCommandOptionType.Channel,
                    required: true
                },
                {
                    name: 'embed_titulo',
                    description: 'Título do embed',
                    type: ApplicationCommandOptionType.String,
                    required: false
                },
                {
                    name: 'embed_descricao',
                    description: 'Descrição do embed',
                    type: ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        }
    ],
	run: async (client, interaction) => {
        if(interaction.options._subcommand === 'criar') {
            try {
                const title = interaction.options.get('embed_titulo').value;
                const description = interaction.options.get('embed_descricao').value;
                const channel = interaction.options.get('canal').channel;
    
                const embed = new EmbedBuilder()
                .setTitle(title || 'Verificação')
                .setDescription(description || `Clique no botão para se verificar!`)
                .setColor('Green')
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setLabel('Verificar')
                    .setStyle('Success')
                    .setCustomId('verify_button')
                );
        
                await channel.send({ embeds: [embed], components: [buttons] });
                return interaction.reply({ content: `Concluido!`, ephemeral: true });

            } catch {
                return interaction.reply({ content: `Desculpe, aconteceu uma falha!.`, ephemeral: true });
            }

        }
	}
        
}
        
