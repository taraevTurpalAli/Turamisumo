const Room = require('../Models/Room.model.js')
const RoomType = require('../Models/RoomType.model.js')

module.exports.roomController = {
    // postAllRoom: async (req, res) => {
    //     try {
    //         // for (let i = 0; i < req.body.colv; i++) {
    //         //     for (let j = 0; j < 4; j++) {
    //         //         const { number, roomType, booking } = req.body
    //         //         const setRoomType = await RoomType.find({ name: roomType })
    //         //         const setRoomTypeId = setRoomType[0]._id
    //         //         const setRoom = await Room.create({
    //         //             number: (j * 15) + number + i,
    //         //             roomTypeId: setRoomTypeId,
    //         //             booking,
    //         //         })
    //         //     }
    //         // }
    //         // const setDelete = await Room.find()
    //         // setDelete.forEach(async(el) => {
    //         //     await Room.findByIdAndRemove(el._id)
    //         // })
    //         res.json('AAAAAAAA_AAAAAAAAA+AA_A+A_)_A_AAAAA)_A)_APA_PAA}_}AA_+AA{}A_A+_A}A{+A_+AAAA')
    //     }
    //     catch (e) {
    //         res.json(e)
    //     }
    // },
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
            const { name, images } = req.body
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