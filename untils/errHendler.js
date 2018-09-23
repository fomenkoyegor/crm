module.exports = (res, error) => {
    res.status(500).json({
        succes: false,
        message: error.message ? error.message : error
    })
}