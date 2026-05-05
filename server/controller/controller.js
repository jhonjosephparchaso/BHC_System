var Userdb = require('../model/model');

exports.create = (req,res) => {
    if(!req.body) {
        res.status(400).send({ message: "Content Must be Filled" });
            return;
    }
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        status: req.body.status
    })

    user
        .save(user)
        .then(data => {
            res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({ message: "An Error Occured" });
        });
}

exports.find = (req, res) => {

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({ message: `Cannot Find the Patient: ${id}`})
                }else{
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "An Error Occured" });
            })
    }else{
        Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message: "An Error Occured" });
        })   
    }
}

exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send ({ message: "Content Must be Filled" });
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if(!data) {
            res.status(404).send({ message: `Cannot Find the Patient: ${id}`})
        }else{
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Update Error"})
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data) {
            res.status(404).send({ message: `Cannot Find the Patient: ${id}`})
        }else{
            res.send({
                message: "Patient Successfully Deleted"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Cannot Delete Patient"
        });
    });
}