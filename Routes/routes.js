const express = require("express");
const fetch = require("node-fetch");

let router = express.Router();

router.route("/").get((req,res)=>{
    res.render("index",{name:null,party:null,constituency:null,title:null,date:null,vote:null});
 });

 router.route("/").post((req,res)=>{
    const memberSearch = req.body.firstSearch;
    const surnameSearch = req.body.surnameSearch;
    const memberUrl = `https://members-api.parliament.uk/api/Members/Search?Name=${memberSearch}%20${surnameSearch}&House=Commons&skip=0&take=20`;
    const votesURL = `https://commonsvotes-api.parliament.uk/data/divisions.json/membervoting?queryParameters.memberId=`;
    
    fetch(memberUrl)
    .then(res=>res.json())
    .then(data=>{
        const memberName = data.items[0].value.nameDisplayAs;
        const memberID = data.items[0].value.id;
        const memberParty = data.items[0].value.latestParty.name;
        const memberConstit = data.items[0].value.latestHouseMembership.membershipFrom;
        fetch(votesURL + `${memberID}`)
        .then(response=>response.json())
        .then(member=>{
            for(let i = 0; i<member.length;i++){
                let voteTitle = member[i].PublishedDivision.Title;
                let date = member[i].PublishedDivision.Date;
                let commonsVote = member[i].MemberVotedAye;
                res.render("index", {name:memberName, party:memberParty, constituency: memberConstit, title:voteTitle,date,vote:commonsVote});
            }
                 
        })
    });
})

module.exports = router;