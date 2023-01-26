const express=require('express');
const Joi= require('joi');
const app=express();
app.use(express.json());
const Sequelize=require("sequelize");
const sequelizeConnection=new Sequelize("employee","postgres","password",{
    host:"localhost",
    dialect:"postgres"
});

/*
const db={};
sequelizeConnection=Sequelize;
sequelizeConnection=sequelize;
*/
app.listen(5000,()=>{
    console.log("Server is running...")
});

const emp=sequelizeConnection.define("employee",{
    eid:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    ename:{
        type:Sequelize.STRING
    },
    dept:{
        type:Sequelize.STRING
    },
    DOB:{
        type:Sequelize.DATE
    },

});

sequelizeConnection.sync().then(()=>{
    console.log("Syncing...");                                                        
}).catch((error)=>{
    console.log("Error in syncing!  "+error);
});




app.get('/',(req,res)=>{
    emp.findAll({}).then(data=>{
        console.log("Printing all the data...");
        res.send(data);
    }).catch((error)=>{
        res.send(error);
        console.log("ERROR! "+error);
        
    });
});






app.post('/',(req, res)=>{ 

  

      const {error}= validateCourse(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    
    };


    const empdata = {
        eid: req.body.eid,
        ename: req.body.ename,
        dept: req.body.dept,
        DOB:req.body.DOB
      };
    
      emp.create(empdata).then(data=>{
        console.log("Inserting the data...");
        res.send(data);
    }).catch((error)=>{
        res.status(400).send(error.message);
        console.log("ERROR! "+error);
    });
});





app.put('/:eid',(req, res)=>{
const eid = req.params.eid;

const {error}= validateCourse(req.body);

    if(error){
       return res.status(400).send(error.details[0].message);r
    };

emp.update(req.body, {
    where:{eid:eid}
}).then(()=> {
    res.send("Data is updated");
  }).catch(error=> {
    res.send(error);
  console.log("ERROR!   "+error);
  });


});




app.delete('/:eid',(req, res)=>{

    const eid = req.params.eid;
  
    emp.destroy({
      where: { eid: eid }
    })
      .then(()=> {
          res.send({message: "Data was deleted successfully!"});
      
      }).catch(error => {
        res.status(500).send({message: "Could not delete Tutorial with id=" + id});
      });
});
//Function for error checking
function validateCourse(empdata){

    const schema={
        eid:Joi.number().min(3).required(),
        ename:Joi.string().min(1).required(),
        dept:Joi.string().min(1).required(),
        DOB:Joi.date().min(6).required()
    };
    return Joi.validate(empdata,schema);

}

