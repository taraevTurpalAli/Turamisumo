const Room = require('../Models/Room.model.js')
const RoomType = require('../Models/RoomType.model.js')
const User = require('../models/User.model.js')

module.exports.roomController = {
    postRoom: async (req, res) => {
        try {
            const { number, roomType, booking, price } = req.body
            const setRoomType = await RoomType.find({ name: roomType })
            const setRoomTypeId = setRoomType[0]._id
            const setRoom = await Room.create({
                number,
                price,
                roomTypeId: setRoomTypeId,
                booking,
            })
            res.json(setRoom)
        }
        catch (e) {
            res.json(e)
        }
    },
    postRoomType: async (req, res) => {
        try {
            const { name, images, price } = req.body
            const setRoomType = await RoomType.create({
                name,
                images,
                price
            })
            res.json(setRoomType)
        }
        catch (e) {
            res.json(e)
        }
    },
    getRoomType: async (req, res) => {
        try {
            const { type } = req.params
            if (type === 'all') {
                res.json(await RoomType.find())
            } else {
                res.json(await RoomType.find({ name: type }))
            }
        }
        catch (e) {
            res.json(e)
        }
    }
}