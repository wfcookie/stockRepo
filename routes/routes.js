var exports = module.exports = {};
exports.index=function(req,res){
  res.render('index');
  console.log('get index');
};
export.socketRoom=function(req,res) {
  res.send('socketRoom');
  console.log('get in socket room');
}
