const Category=require('../model/Category')

exports.create=async(req,res)=>{
    try {
        let errors={}
        const {name,image}=req.body
        if(!name){
            errors.name="Nhập tên danh mục"
            return res.status(400).send({errors})
        }
        const newCategory=new Category({
            name:name,
            image:image
        })
        await newCategory.save()
        res.status(200).send('Tạo thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getAll=async(req,res)=>{
    try {
        const categories=await Category.find()
        res.status(200).send(categories)
    } catch (err) {
        res.status(200).send(err)
    }
}