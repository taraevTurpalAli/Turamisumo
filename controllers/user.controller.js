const User = require("../models/User.model.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { subscribe } = require("../routes/room.route.js");
const RoomType = require("../Models/RoomType.model.js");
const Room = require("../Models/Room.model.js");
const Cart = require("../Models/Cart.model.js");

module.exports.userController = {
    addUser: async (req, res) => {
        try {
            const { name, surname, phone, age, login, password, startData, endData, card } = req.body;
            const { roomType } = req.params

            const setLogin = await User.findOne({
                login
            })

            if (setLogin) {
                return (res.json('Данный логин уже занят'))
            }

            const hash = await bcrypt.hash(
                password,
                Number(process.env.ROUNDS)
            );

            const setRoomType = await RoomType.findById(roomType)
            const setRoomTypeId = String(setRoomType._id)
            const setRoomTypeCash = Number(setRoomType.price)
            
            const setRooms = await Room.find({
                roomTypeId: setRoomTypeId
            })
            
            const setRoomsArr = setRooms.filter((el) => {
                return (!el.booking)
            })

            const setRoom = setRoomsArr[0]

            if (!setRoom) {
                return (res.json('Номеры данного типа уже заняты'))
            }

            const setRoomId = String(setRoom._id)
            
            await Room.findByIdAndUpdate(setRoomId, {
                booking: true
            })
            
            const setUser = await User.create({ 
                name, 
                surname, 
                phone, 
                age, 
                login, 
                password: hash, 
                cash: setRoomTypeCash,
                room: setRoomId, 
                startData, 
                endData,
                card
            });
            await Cart.create({
                userId: setUser._id,
            })
            const payload = {
                id: setUser._id,
                login: setUser.login,
            };
    
            const token = await jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "24h",
            })
            
            res.json({
                token,
                id: payload.id,
            });
            
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
        })
        

        return res.json({
            token,
            id: payload.id,
            login: payload.login
        });
    },

    // getProfile: async (req, res) => {
    //     try {
    //         const profile = await User.findById(req.params.id
    //         )
    //         res.json(profile)
    //     } catch (error) {
    //         res.json("error");
    //     }
    // },
    // getUsers: async (req, res) => {
    //     try {
    //         res.json(await User.find());
    //     } catch (error) {
    //         res.json("error");
    //     }
    // },

    // deleteUser: async (req, res) => {
    //     try {
    //         const dele = await User.findByIdAndRemove(req.params.id);
    //         res.json("Юзер удален");
    //     } catch (error) {
    //         res.json("error");
    //     }
    // },
};
