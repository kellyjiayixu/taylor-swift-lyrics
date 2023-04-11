const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var fs = require("fs");
const neatCsv = require("neat-csv");
var taylor;

fs.readFile(__dirname + "/taylor_swift_lyrics.csv", async (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  taylor = await neatCsv(data);
  console.log(data);
  console.log("lyrics lines: " + taylor.length);
});

const min = 0; //最小值
const max = 4849; //最大值
const range = max - min; //取值范围差

var index;

var corsOptions = {
  origin: "*",
};

// app.get("/getLyric", function (req, res) {
//   var random = Math.random(); //小于1的随机数
//   index = min + Math.round(random * range); //最小数加随机数*范围差
//   var s = "";
//   console.log(index + " : " + taylor[index].lyric);
//   var s = JSON.stringify(taylor[index]);
//   res.end(s);
// });

app.get("/getLyric", function (req, res) {
  var random = Math.random(); //小于1的随机数
  index = min + Math.round(random * range); //最小数加随机数*范围差
  var s = "";
  console.log(index + " : " + taylor[index].lyric);

  var year = taylor[index].year;
  var track_title = taylor[index].track_title;
  var i = index - taylor[index].line + 1;
  console.assert(
    taylor[i].track_title == track_title && taylor[i].year == year,
    "The line should be the same song"
  );

  while (taylor[i].track_title == track_title && taylor[i].year == year) {
    s += taylor[i].line + ". " + taylor[i].lyric + "<br />";
    i++;
  }

  var t = {...taylor[index]};
  t.lyric = s;
  console.log(s);
  var s = JSON.stringify(t);
  res.end(s);
});

app.use(cors(corsOptions));

// content-type：application/json
app.use(bodyParser.json());

// content-type：application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// 简单路由
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kelly's server." });
});

// 设置监听端口
const PORT = process.env.PORT || 28282;
app.listen(PORT, () => {
  console.log(`Kelly's lyric server runs on port ： ${PORT}.`);
});
