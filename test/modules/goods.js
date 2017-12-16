  //所有商品数据
  export default {
    state: { //全局数据
        count: 0, //初始值
    },
    //改变数据  ,类似于db.js
    mutations: { 
        increment(state, num) { //增加的功能
            //操作1
            state.count += num;
            //操作2
        }
    },
    //业务如何做，类似controller
    actions: {
        incrementGoodsNum(store, a_num) { //store等于是store
            //存在相关业务的操作
            store.commit('increment', a_num);
        }
    },
    //获取数据
    getters:{
        //获取count的值
        getTotalCount(state){
            return state.count;
        }
    }
  }