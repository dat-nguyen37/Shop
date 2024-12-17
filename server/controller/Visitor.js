const Visitor=require('../model/Visitor')
const User=require('../model/User')


exports.create=async(req,res)=>{
    try {
        await newShip.save()
        res.status(200).send('Thêm thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}