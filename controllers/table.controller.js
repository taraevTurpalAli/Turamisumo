const Table = require("../Models/Table.model")

module.exports.tableController = {
    bookingTable: async (req, res) => {
        try {
            
        } catch (e) {
            res.json(e)
        }
    },
    postTable: async (req, res) => {
        try {
            for (let i = 15; i < 16; i++) {
                console.log(i)
                await Table.create({
                    number: i,
                    booking: false,
                })
            }
            res.json('готово')
        }
        catch (e) {
            res.json(e)
        }
    },
    getTable: async (req, res) => {
        try {
            res.json(await Table.find())
        } catch (e) {
            res.json(e)
        }
    }
    // postRoomType: async (req, res) => {
    //     try {
    //         const { name, images, price } = req.body
    //         const setRoomType = await RoomType.create({
    //             name,
    //             images,
    //             price
    //         })
    //         res.json(setRoomType)
    //     }
    //     catch (e) {
    //         res.json(e)
    //     }
    // },
    // getRoomType: async (req, res) => {
    //     try {
    //         const { type } = req.params
    //         if (type === 'all') {
    //             res.json(await RoomType.find())
    //         } else {
    //             res.json(await RoomType.find({ name: type }))
    //         }
    //     }
    //     catch (e) {
    //         res.json(e)
    //     }
    // }
}