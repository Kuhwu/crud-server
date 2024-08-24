const express = require("express");

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}))

const studentData = [];

port = 3000;
app.listen(port,() =>{
    console.log(`Successfully Connected to ${port}`)
});


//PostAPI

app.post("/api/add_student",(req,res)=>{


    console.log("Result", req.body);

    const sdata = {
        "id": studentData.length + 1,
        "firstName": req.body.fname,
        "lastName": req.body.lname,
        "course": req.body.course,
        "year": req.body.year,
        "enrolled": req.body.enrolled
    }

    studentData.push(sdata);
    console.log("Final Result", sdata);


    res.status(200).send({
        "Status Code": 200,
        "Message": "Student has been added successfully",
        "student":sdata
});

})

