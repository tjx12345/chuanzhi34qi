export default {
    state:{
        name:'jack'
    },
    getters:{
        getName(state){
            return state.name;
        }
    },
    actions:{
        rename(store,newName){
            store.commit('update',newName);
        }
    },
    mutations:{
        update(state,updateName){
            state.name = updateName;
        }
    },
    //也可以包含模块
}