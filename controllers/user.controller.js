const User = require("../models/User.model.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { subscribe } = require("../routes/room.route.js");

module.exports.userController = {
    addUser: async (req, res) => {
        try {
            const { name, surname, phone, age, login, password, cash, room, startData, endData } = req.body;

            const hash = await bcrypt.hash(
                password,
                Number(process.env.ROUNDS)
            );

            const setUser = await User.create({ name, surname, phone, age, login, password: hash, cash, room, startData, endData });

            

            res.json(setUser);
        } catch (e) {
            res.json(e);
        }
    },
    login: async (req, res) => {
        const { login, password } = req.body;

        const candidate = await User.findOne({ login });

        if (!candidate) {
            return res.json("Неверный логин или пароль");
        }

        const valid = await bcrypt.compare(password, candidate.password);

        if (!valid) {
            return res.json("Неверный логин или пароль");
        }

        const payload = {
            id: candidate._id,
            login: login.login,
        };

        const token = await jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });

        return res.json({
            token,
            id: payload.id,
            login: payload.login
        });
    },

    getProfile: async (req, res) => {
        try {
            const profile = await User.findById(req.params.id
            )
            res.json(profile)
        } catch (error) {
            res.json("error");
        }
    },
    getUsers: async (req, res) => {
        try {
            res.json(await User.find());
        } catch (error) {
            res.json("error");
        }
    },

    deleteUser: async (req, res) => {
        try {
            const dele = await User.findByIdAndRemove(req.params.id);
            res.json("Юзер удален");
        } catch (error) {
            res.json("error");
        }
    },
};
