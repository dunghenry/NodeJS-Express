const pageNotFound = (req, res, next) => {
    res.status(404);
    return res.json({
        status: 404,
        message: "Page Not Found",
    });
}

module.exports = pageNotFound;