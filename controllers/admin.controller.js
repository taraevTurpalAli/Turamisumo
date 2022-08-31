const Admin = require('../Models/Admin.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const config = require('config')
module.exports.adminController = {
  createAdmin: async (req, res) => {
    try {
      const { name, surname, login, password } = req.body
      const candidateLogin = await Admin.findOne({ login })
      const errors = validationResult(req)

      if (candidateLogin) {
        return res
          .status(400)
          .json({ error: 'Пользователь с такими данными уже существует' })
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: 'пароль не может быть меньше 6 символов' })
      }

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          error: 'Некоректные данные при регистрации',
        })
      }
      
      const hash = await bcrypt.hash(password, config.get('bcrypt'))
      await Admin.create({
        name,
        surname,
        login,
        password: hash,
      })
      
      const candidate = await Admin.findOne({ login })
      const payload = {
        id: candidate._id,
        login: candidate.login,
      }
      const token = await jwt.sign(payload, config.get('SecretKay'), {
        expiresIn: '24h',
      })

      res.json({ token })
    } catch (err) {
      res
        .status(404)
        .json({ error: 'что-то пошло не так, повторите попытку!', err })
    }
  },

  loginUser: async (req, res) => {
    try {
      const { login, password } = req.body
      const candidate = await Admin.findOne({ login })

      if (!candidate) {
        return res.status(401).json({ error: 'Некорректныe данные' })
      }
    
      const valid = await bcrypt.compare(password, candidate.password)

      if (!valid) {
        return res.status(401).json({ error: 'Некорректныe данные' })
      }

      const payload = {
        id: candidate._id,
        login: candidate.login,
      }

      const token = await jwt.sign(payload, config.get('SecretKay'), {
        expiresIn: '24h',
      })

      return res.json({ token })
    } catch (err) {
      res.status(404).json({ error: 'что-то пошло не так, повторите попытку!' })
    }
  },
}
