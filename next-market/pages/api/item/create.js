const createItem = (req, res) => {
    console.log(req.body.title)
    return res.status(200).json({message:"Create a new item"})
}

export default createItem