const Members = require('../modals/user');
const Membership = require('../modals/membership');
const { request } = require('express');

exports.getallmembers = async(req,res) =>{
    try {
        const {skip,limit} = req.query;
        const members = await Members.find({gym:req.gym._id}).sort({_id: -1});
        const totalmember = members.length;
        const limitedmember = members.length;
        const members1 = members;

        res.status(200).json({
            message:members.length?"fetched members succesfully ":" no any members registered yet ",
            members:limitedmember,
            totalmembers:totalmember,
            members2:members1
        });
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    }
};

exports.delmember = async(req,res) => {
    try {
        const {id} = req.params;
        const member = await Members.findByIdAndDelete(id);
        if(!member) {
            return res.status(404).json({ message: 'member not found',member:member });
        }
        res.status(200).json({ message: 'member deleted succesfully' });
    } catch(error) {
        res.status(500).json({error: 'server error'});   
    }
}; 

exports.createnewmember = async(req,res) => {
    try {
        const {name,mobile,address,membership,date} = req.body;
        const member = await Members.findOne({gym:req.gym._id,mobile});
        if (member) {
            return res.status(409).json({ error: 'member already exist' });
        }      
        const memberShip = await Membership.findOne({_id:membership,gym:req.gym._id});
        const membershipmonth = memberShip.months;
        if(memberShip){
            let jndate = new Date(date);
            const nextbilldate = addMonthsToDate(membershipmonth,jndate);
            let newmember = new Members({name,mobile,address,membership,gym:req.gym._id,nextbilldate});
            await newmember.save();
            res.status(200).json({ message: 'member created successfully',newmember});
        }else{
            return res.status(409).json({ error: 'membership not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'server error ' });
    }
};

exports.getsearchedmembers= async (req,res)=>{
    try {
        const {searchterm} = req.query;
        const member = await Members.find({gym:req.gym._id, 
            $or:[{name:{$regex: '^' + searchterm, $options:'i'}} , {mobile:{$regex: '^' + searchterm, $options:'i'}}]
        });
        res.status(200).json({
            message:member.length?"fetched members succesfully ":" no any members found",
            members:member,
            totalmembers:member.length
        });
    } catch (error) {
        res.status(500).json({ error:'server error' });
    }
}

exports.monthlymember= async (req,res)=>{
    try {
    const now = new Date();
    const startofmonth = new Date(now.getFullYear(),now.getMonth(),1);
    const endofmonth = new Date(now.getFullYear(),now.getMonth() + 1,0,23,59,59,999);  
    const member = await Members.find({gym:req.gym._id,
        createdAt:{
            $gte: startofmonth,
            $lte: endofmonth
        }
    }).sort({ createdAt: -1 });  
    res.status(200).json({
        message:member.length?"fetched members succesfully ":" no any members found",
        members:member,
        totalmembers:member.length
    });
    }
    catch (error) {
        res.status(500).json({ error:'server error' });
    }
}

exports.expiringwithin3days = async(req,res)=>{
 try {
    const today = new Date();
    const nexthreedays = new Date();
    nexthreedays.setDate(today.getDate() + 3);
    const member = await Members.find({gym:req.gym._id,     
        nextbilldate:{
            $gte: today,
            $lte: nexthreedays
        }
    }).sort({ createdAt: -1 });
    res.status(200).json({
        message:member.length?"fetched members succesfully ":" no members found expiring in 3 days",
        members:member,
        totalmembers:member.length
    });
 } catch (error) {
    res.status(500).json({error:'server error'});      
 }
}

exports.expiremember = async(req,res)=>{
    try {
        const today = new Date();
        const member = await Members.find({gym:req.gym._id,status:"active",
            nextbilldate:{
                $lt: today
            }
        });
        res.status(200).json({
            message:member.length?"fetched members succesfully ":" no members found expired",
            members:member,
            totalmembers:member.length
        });
    } catch (error) {
        res.status(500).json({error:'server error'});
    }
};

exports.inactive = async(req,res)=>{
    try {
        const member = await Members.find({gym:req.gym._id,status:"pending"});   
        res.status(200).json({
            message:member.length?"fetched members succesfully ":" no members found inactive",
            members:member,
            totalmembers:member.length
        });
    } catch (error) {
        res.status(500).json({error:'server error'});
    }
}

exports.getindmember = async(req,res) => {
    try {
        const {id} = req.params;
        const member = await Members.findOne({_id:id, gym:req.gym._id});
        const mems = await Membership.findOne({_id:member.membership});
        if(!member){
            return res.status(400).json({ error: 'member not found' });
        }
        res.status(200).json({
            message: 'fetched member succesfully',
            member: member,
            mems:mems
        });
    } catch (error) {
        res.status(500).json({error:'server error'});
    }
}

exports.changestatus= async(req,res)=>{
    try {
        const {id}= req.params;
        const {status}= req.body;
        const member = await Members.findOne({_id:id, gym:req.gym._id});
        if(!member){
            return res.status(400).json({ error: 'member not found' });
        }
        member.status = status;
        await member.save();
        res.status(200).json({
            message: 'changed status successfully',  
            member: member
        });
    } catch (error) {
        res.status(500).json({error:'server error'});
    }
}

exports.updatememplan=async(req,res)=>{
    try {
        const {id} = req.params;
        const {membership} = req.body;
        const memberShip = await Membership.findOne({gym:req.gym._id,_id:membership});
        if(memberShip){
            let getmonth = memberShip.months;
            let today = new Date();
            let nextbilldate = addMonthsToDate(getmonth, today);
            const member = await Members.findOne({gym:req.gym._id,_id:id})
            if(!member){
                return res.status(409).json({ error:'member not found' });
            }
            member.nextbilldate = nextbilldate;
            member.lastpayment = today;
            await member.save();
            res.status(200).json({
                message: 'updated membership successfully',  
                member: member,
                memshipid:membership._id,
                mems1:membership,
                membership: memberShip,
                id:id
            });
        }else{
            return res.status(409).json({ error: 'membership not found' });
        }
    } catch (error) {
        res.status(500).json({error:'server error'});
    }
}

function addMonthsToDate(months,joiningDate) { 
    let today = joiningDate;
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); 
    const currentDay = today.getDate();
  
    const futureMonth = currentMonth + months;
    const futureYear = currentYear + Math.floor(futureMonth / 12);
    const adjustedMonth = futureMonth % 12;  
    const futureDate = new Date(futureYear, adjustedMonth, 1);  
    const lastDayOfFutureMonth = new Date(futureYear, adjustedMonth + 1, 0).getDate();  
    const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);
   
    futureDate.setDate(adjustedDay);
    return futureDate;
  }

  