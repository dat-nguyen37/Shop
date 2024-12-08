const Category=require('../model/Category')

exports.create=async(req,res)=>{
    try {
        let errors={}
        const {name,image,subcategories}=req.body
        if(!name){
            errors.name="Nhập tên danh mục"
            return res.status(400).send({errors})
        }
        const newCategory=new Category({
            name:name,
            image:image,
            subcategories
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
        const {name,image,subcategories}=req.body
        if(!name){
            errors.name="Nhập tên danh mục"
            return res.status(400).send({errors})
        }
        await Category.findByIdAndUpdate(req.params.id,{$set:{name:name,image:image,subcategories:subcategories}},{new:true})
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
        await Category.findByIdAndDelete(req.params.id,{new:true})
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
exports.getOne=async(req,res)=>{
    try {
        const category=await Category.findById(req.params.id)
        res.status(200).send(category)
    } catch (err) {
        res.status(200).send(err)
    }
}

exports.getSubcategories=async(req,res)=>{
    try {
        const categories=await Category.findById(req.params.id)
        const subCategories=categories.subcategories
        res.status(200).send(subCategories)
    } catch (err) {
        res.status(200).send(err)
    }
}
exports.addSubcategories=async(req,res)=>{
    try {
        const categories=await Category.findByIdAndUpdate(req.params.id,{$push:{subcategories:{name:req.body.subcategory}}},{new:true})
        res.status(200).send(categories)
    } catch (err) {
        res.status(500).send(err)
    }
}

// exports.deleteSubcategories=async(req,res)=>{
//     try {
//         const categories=await Category.findByIdAndDelete(req.params.id,{$pull:{subcategories:{name:req.body.subcategory}}},{new:true})
//         res.status(200).send(categories)
//     } catch (err) {
//         res.status(500).send(err)
//     }
// }