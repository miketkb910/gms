const Membership= require('../modals/membership');

exports.addmembership = async (req,res) => {
    try {
        const {months,price} = req.body;
        const membership = await Membership.findOne({gym:req.gym._id,months});
        if(membership){
            membership.price = price;
            await membership.save();
            res.status(200).json({
                message:"updated successfully"
            });
        }else{
            const newmembership = new Membership({
                gym:req.gym._id,
                months,
                price
            });
            await newmembership.save();
            res.status(200).json({
                message:"added successfully"
            });
        }
    } catch (error) {
        res.status(500).json({error:"server error"});
    }
};

exports.getmemberships = async (req,res) => {
    try {
        const loggedinid = req.gym._id;
        const membership = await Membership.find({gym:loggedinid});
        res.status(200).json(membership);
    } catch (error) {
        res.status(500).json({error:"server error"});
    }
}

