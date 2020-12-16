const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class users extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // salvar password em hash (criptografado)
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  // Verificação de password
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = users;
