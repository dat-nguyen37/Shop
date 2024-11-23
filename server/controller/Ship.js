const Ship=require('../model/Ship')

exports.create=async(req,res)=>{
    try {
        let errors={}
        const {name,price}=req.body
        if(!name){
            errors.name="Tên loại vận chuyển không được để trống"
            return res.status(400).send({errors})
        }
        if(!price){
            errors.price="Nhập giá tiền cho loại vận chuyển"
            return res.status(400).send({errors})
        }
        const newShip=new Ship({
            name:name,
            price:price
        })
        await newShip.save()
        res.status(200).send('Thêm thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getAll=async(req,res)=>{
    try {
        const ships=await Ship.find()
        res.status(200).send(ships)
    } catch (err) {
        res.status(500).send(err)
    }
}