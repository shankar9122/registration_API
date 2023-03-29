
const sendToken = (user, statusCode, res) => {
    const token = `Bearer ${user.getJWTToken()}`;

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "dev" ? "lax" : "none",
        secure: process.env.NODE_ENV === "dev" ? false : true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}


module.exports = sendToken;