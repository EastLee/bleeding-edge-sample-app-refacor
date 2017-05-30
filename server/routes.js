import {Router} from "express";
import question from "../db/modelQ";
import answer from "../db/modelA";
var router = Router();

router.post("/addquestion",function(req,res){
    question.create(req.body).then(function(){
        res.status(200).send("ok");
    }).catch(function(err){
        res.status(500).send(error.message)
    })
});
router.post("/updatequestion",function(req,res){
    question.update(req.body).then(function(){
        res.status(200).send("ok");
    }).catch(function(err){
        res.status(500).send(error.message)
    })
});
router.post("/addanswer",function(req,res){
    answer.create(req.body).then(function(){
        res.status(200).send("ok");
    }).catch(function(err){
        res.status(500).send(error.message)
    })
});
router.post("/delete",function(req,res){
    console.info(req.body.id);
    var id = req.body.id;
    var p1 = question.remove(id);
    var p2 = answer.remove(id);
    p1.then(function(){
        res.status(200).send("ok");
        // return p2.then(function(){
        //     res.status(200).send("ok");
        // })
    }).catch(function(err){
        res.status(500).send(err.message)
    })
})

export default router;