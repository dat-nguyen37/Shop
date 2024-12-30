const Log=require("../model/Log")

exports.getAll=async(req,res)=>{
    try {
        const currentApiUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        const logs=await Log.find({ apiUrl: { $ne: currentApiUrl } }).sort({timestamp:-1})
        res.status(200).send(logs)
    } catch (err) {
        res.status(500).send(err)
    }
}