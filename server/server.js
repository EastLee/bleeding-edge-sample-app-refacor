import express from 'express'
import serialize from 'serialize-javascript'
import fs from "fs"
import rewrite from 'express-urlrewrite'
import {json} from "body-parser"
import {fromJS} from "immutable"

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { configureStore } from '../src/store/store'
import routes from '../src/routes/routes'
import question from "../db/modelQ";
import answer from "../db/modelA";
import handleData from "../src/data/handleData";
import Router from "./routes";

const app = express();

app.use(json())

app.use("/",Router);

// app.post("/addquestion",function(req,res){
//     question.create(req.body).then(function(){
//         res.status(200).send("ok");
//     }).catch(function(err){
//         res.status(500).send(error.message)
//     })
// });
// app.post("/updatequestion",function(req,res){
//     question.update(req.body).then(function(){
//         res.status(200).send("ok");
//     }).catch(function(err){
//         res.status(500).send(error.message)
//     })
// });
// app.post("/addanswer",function(req,res){
//     answer.create(req.body).then(function(){
//         res.status(200).send("ok");
//     }).catch(function(err){
//         res.status(500).send(error.message)
//     })
// });
// app.post("/delete",function(req,res){
//     console.info(req.body.id);
//     var id = req.body.id;
//     var p1 = question.remove(id);
//     var p2 = answer.remove(id);
//     p1.then(function(){
//         res.status(200).send("ok");
//         // return p2.then(function(){
//         //     res.status(200).send("ok");
//         // })
//     }).catch(function(err){
//         res.status(500).send(err.message)
//     })
// })

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: '/__build__/',
  stats: {
    colors: true
  }
}))

//测试java模板
// app.use(rewrite('/', '/html/index.html'))
// app.use(rewrite('/surveys(/)?**', '/html/index.html'))
// app.use(rewrite('/about(/)?', '/html/index.html'))

app.use(express.static('public'));

const HTML = ({ content, store }) => (
  <html>
    <head lang='en'>
      <meta charset='utf-8'/>
      <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"/>
      <link href='http://fonts.googleapis.com/css?family=Glegoo' rel='stylesheet' type='text/css'/>
      <link rel="stylesheet" type="text/css" href="/css/app.css"/>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <div id="devtools"/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initial__=${JSON.stringify(store)}` }} />
      <script src="/__build__/bundle.js"/>
    </body>
  </html>
)



app.use(function (req, res) {
    Promise.all([question.find(),answer.find()]).then(function(arr){
        var __initialSate__ = {
            questions:handleData(arr[0]),
            answers:handleData(arr[1])
        };
        const memoryHistory = createMemoryHistory(req.url)//就是生成一个history对象
        const store = configureStore(memoryHistory,__initialSate__);
        const history = syncHistoryWithStore(memoryHistory, store)
        match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
            if (error) {
              res.status(500).send(error.message)
            } else if (redirectLocation) {
              res.redirect(302, redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
              const content = renderToString(
                <Provider store={store}>
                  <RouterContext {...renderProps}/>
                </Provider>
              )
              var ____html = '<!doctype html>\n' + renderToString(<HTML content={content} store={arr}/>);
              // fs.writeFile("public/html/index.html", ____html, function(err){
              //     console.info(err);
              // })
              res.send(____html);
            }
        })
    });
});



const port = process.env.PORT || 8081;
app.listen(port, function () {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
