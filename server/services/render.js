const axios = require("axios");

exports.homeRoutes = (req, res) => {
     axios.get("https://crud-app-kingsky1t.onrender.com/api/users")
          .then(function (response) {
               console.log(response.data);
               res.render("index", { users: response.data });
          })
          .catch((err) => {
               res.send(err);
          });
};

exports.add_user = (req, res) => {
     res.render("add_user");
};

exports.update_user = (req, res) => {
     axios.get("https://crud-app-kingsky1t.onrender.com/api/users", { params: { id: req.query.id } })
          .then((userData) => {
               res.render("update_user", { user: userData.data });
          })
          .catch((err) => {
               res.send(err);
          });
};
