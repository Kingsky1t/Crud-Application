var Userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
     if (!req.body) {
          res.status(400).send({ message: "Content can not be empty" });
          return;
     }
     const user = new Userdb({
          name: req.body.name,
          email: req.body.email,
          gender: req.body.gender,
          status: req.body.status,
     });

     user.save(user)
          .then((data) => {
               //res.send(data);
               res.redirect('/');
          })
          .catch((err) => {
               res.status(500).send({
                    message: err.message || "Some error occurred while creating new user",
               });
          });
};

//retrieve and return all users or a single user
exports.find = (req, res) => {
     if (req.query.id) {
          const id=req.query.id;
          Userdb.findById(id)
          .then((data)=> {
               if(!data) {
                    res.status(404).send({message:`Not found user by id: ${id}`});
               } else {
                    res.send(data);
               }
          })
          .catch(err=> {
               res.status(500).send({
                    message: err.message || "Some error occurred while retrieving data",
               });
          })
     } else {
          Userdb.find()
               .then((data) => {
                    res.send(data);
               })
               .catch((err) => {
                    res.status(500).send({
                         message: err.message || "Some error occurred while retrieving data",
                    });
               });
     }
};

// update a new identified user
exports.update = (req, res) => {
     if (!req.body) {
          return res.status(400).send({ message: "Content can not be empty" });
     }
     const id = req.params.id;
     Userdb.findByIdAndUpdate(id, req.body, { useCreateIndex: true })
          .then((data) => {
               if (!data) {
                    res.status(404).send({
                         message: `Cannot update user with ${id}. Maybe user not found`,
                    });
               } else {
                    res.send(data);
               }
          })
          .catch((err) => {
               res.status(500).send({
                    message: err.message || "Some error occurred while updating user data",
               });
          });
};

// delete a user with specified user id in the request
exports.delete = (req, res) => {
     const id = req.params.id;
     Userdb.findByIdAndDelete(id)
          .then((data) => {
               if (!data) {
                    res.status(404).send({
                         message: `Cannot Delete with id &{id}. Maybe wrong code`,
                    });
               } else {
                    res.send({ message: "user Deleted Successfully" });
               }
          })
          .catch((err) => {
               res.status(500).send({ message: "Some error occurred while deleting user" });
          });
};
