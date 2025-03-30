const Membership= require('../modals/membership');

exports.addmembership = async (req,res) => {
    try {
        const {months,price} = req.body;
        const membership = await Membership.findOne({gym:req.gym._id,months});
        if(membership){
            membership.price = price;
            await membership.save();
            res.status(200).json({
                message:`updated successfully ${req}`
            });
        }else{
            const newmembership = new Membership({
                gym:req.gym._id,
                months,
                price
            });
            await newmembership.save();
            res.status(200).json({
                message:`added successfully ${req}`
            });
        }
    } catch (error) {
        res.status(500).json({error:"server error"});
    }
};

exports.remove = async (req, res) => {
    try {
        const {month}  = req.body; 
        const membership = await Membership.findOne({ gym: req.gym._id, months: month });

        if (!membership) {
            return res.status(404).json({ message: `Membership not found ${req.gym._id} ${month} ${membership} ` });
        }
        const yesno = await Membership.deleteOne({ _id: membership._id });
        if (yesno.deletedCount === 0) {
            return res.status(500).json({ message: "Failed to delete membership" });
        }
        res.status(200).json({ message: "Membership deleted successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Server error ${req.body}` });
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

