
//实现订阅者Watcher
function Watcher(vm,expOrFn,cb){
  this.cb = cb;
  this.vm = vm;
  this.expOrFn = expOrFn;
  this.depIds = {};

  if(typeof expOrFn === 'function'){
    this.getter = expOrFn;
  }else{
    this.getter = this.parseGetter(expOrFn);
  }
  this.value = this.get(); //将自己添加到订阅器的操作
}
Watcher.prototype = {
  update: function(){
    this.run();
  },
  run: function(){
    var value = this.get();
    var oldVal = this.value;
    if(value !== oldVal){
      this.value = value;
      this.cb.call(this.vm,value,oldVal);
    }
  },
  addDep: function(){
    if(!this.depIds.hasOwnProperty(dep.id)){
      dep.addSub(this);
      this.depId[dep.id] = dep;
    }
  },
  get: function(){
    Dep.target = this; //缓存自己
    var value = this.getter.call(this.vm,this.vm); //强制执行监听器里的get函数
    Dep.target = null; //释放自己
    return value;
  },
  parseGetter: function(exp){
    if(/[^\w.$]/.test(exp)) return;
    var exps = exp.split(',');

    return function(obj){
      for(var i=0,len=exps.length;i<len;i++){
        if(!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    }
  }
};