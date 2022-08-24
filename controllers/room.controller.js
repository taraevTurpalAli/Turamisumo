const Room = require('../Models/Room.model.js')
const RoomType = require('../Models/RoomType.model.js')

module.exports.roomController = {
    postRoom: async (req, res) => {
        try {
            const {number, roomTypeId, booking} = req.body
            const setRoom = await Room.create({
                number,
                roomTypeId,
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
            const {name, images} = req.body
            const setRoomType = await RoomType.create({
                name,
                images,
            })
            res.json(setRoomType)
        }
        catch (e) {
            res.json(e)
        }
    },
    getRoomType: async (req, res) => {
        try {
            const {type} = req.params
            if (type === 'all') {
                res.json(await RoomType.find())
            } else {
                res.json(await RoomType.find({name: type}))
            }
        }
        catch (e) {
            res.json(e)
        }
    }
}