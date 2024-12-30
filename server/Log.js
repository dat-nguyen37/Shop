const Log=require('./model/Log')


const createLog = async(req, res, next) => {
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    res.on('finish', async () => {
        const statusCode = res.statusCode;
        try {
            const newLog = new Log({ apiUrl: fullUrl, statusCode: statusCode });
            await newLog.save();
            console.log('Log saved successfully:', fullUrl, 'Status Code:', statusCode);
        } catch (err) {
            console.error('Error saving log:', err);
        }
    });

    next()
}


module.exports=createLog