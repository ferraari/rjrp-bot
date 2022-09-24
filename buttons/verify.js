const { verifyRole } = require('../config.json');

module.exports = {
	id: 'verify_button',
	permissions: [],
	run: async (client, interaction) => {
		if (interaction.member.roles.cache.get(verifyRole)) return interaction.reply({ content: `${interaction.user}, Você já está verificado!`, ephemeral: true })
		await interaction.member.roles.add(verifyRole);
        return interaction.reply({ content: `✅ ${interaction.user}, Agora você está verificado`, ephemeral: true })
	}
};
