const Category=require('../model/Category')

exports.create=async(req,res)=>{
    try {
        let errors={}
        const {name,image}=req.body
        console.log(image)
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
exports.update=async(req,res)=>{
    try {
        let errors={}
        const {name,image}=req.body
        if(!name){
            errors.name="Nhập tên danh mục"
            return res.status(400).send({errors})
        }
        await Category.findByIdAndUpdate(req.params.id,{$set:{name:name,image:image}})
        res.status(200).send('Cập nhật thành công')
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.delete=async(req,res)=>{
    try {
        const category=await Category.findById(req.params.id)
        if(!category){
            return res.status(404).send({errors:'Không tìm thấy danh mục'})
        }
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).send('Xóa thành công')
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