const express=require('express');
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
}).catch((err)=>{
    console.log("Error in syncing!  "+err);
});




app.get('/',(req,res)=>{
    emp.findAll({}).then(data=>{
        console.log("Printing all the data...");
        res.send(data);
    }).catch((err)=>{
        res.send(err);
        console.log("ERROR! "+err);
        
    });
});






app.post('/',(req, res)=>{

  const empdata = {
        eid: req.body.eid,
        ename: req.body.ename,
        dept: req.body.dept,
        DOB:req.body.DOB
      };
    
      emp.create(empdata).then(data=>{
        console.log("Inserting the data...");
        res.send(data);
    }).catch((err)=>{
        res.status(400).send(err.message);
        console.log("ERROR! "+err);
    });
});





app.put('/:eid',(req, res)=>{
const eid = req.params.eid;

emp.update(req.body, {
    where:{eid:eid}
}).then(()=> {
    res.send("Data is updated");
  }).catch(err=> {
    res.send(err);
  console.log("ERROR!   "+err);
  });


});




app.delete('/:eid',(req, res)=>{

    const eid = req.params.eid;
  
    emp.destroy({
      where: { eid: eid }
    })
      .then(()=> {
          res.send({message: "Data was deleted successfully!"});
      
      }).catch(err => {
        res.status(500).send({message: "Could not delete Tutorial with id=" + id});
      });
});


// completed!








