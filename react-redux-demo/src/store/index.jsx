import { createStore } from 'redux';


//action
const changeTextAction = {
  type:'CHANGE_TEXT'
}
const buttonClickAction = {
  type:'BUTTON_CLICK'
}

//reducer
const initialState = {
  text: 'Hello'
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
      case 'CHANGE_TEXT':
          return {
              text: state.text=='Hello' ? 'world':'Hello'
          }
      case 'BUTTON_CLICK':
          return {
              text: 'Hello world'
          }
      default:
          return initialState;
  }
}

//映射Redux state到组件的属性
export function mapStateToProps(state) {
    return { text: state.text }
}
 
//映射Redux actions到组件的属性
export function mapDispatchToProps(dispatch){
    return{
        onButtonClick:()=>dispatch(buttonClickAction),
        onChangeText:()=>dispatch(changeTextAction)
    }
}

//store
export let store = createStore(reducer);
 