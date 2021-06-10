import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedData?._id;

        next();
    } catch (error) {
       return res.status(401).json({ message: "Authentication token missing or invalid!" });
    }
}

export default auth;