
//监听器
function defineReactive(data,key,val){
  observe(val); //递归遍历所有子属性

  var dep = new Dep();

  Object.defineProperty(data,key,{
    enumerable: true,
    configurable: true,
    set: function(newVal){
      if(val === newVal){
        return;
      }
      val = newVal;
      console.log(key + '的值是：' + newVal.toString());
      dep.notify(); //如果数据变化，通知所有订阅者
    },
    get: function(){
      if(Dep.target){ //是否需要添加订阅者
        dep.addSub(Dep.target); //在这里添加一个订阅者
      }
      return val;
    }
  });
}
function observe(data){
  if(!data || typeof data !== 'object'){
    return;
  }
  Object.keys(data).forEach(function(key){
    defineReactive(data,key,data[key]);
  });
}