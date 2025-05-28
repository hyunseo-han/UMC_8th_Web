// 1. 저장소 생성
// pnpm install @reduxjs/toolkit
// pnpm install react-redux

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlices";
import modalReducer from "../slices/modalSlice";

function createStore() {
  const store = configureStore({
    // 2. 리듀서 설정
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });

  return store;
}

// store를 활용할 수 있도록 export 해야 함
// 여기서 실행해서 스토어를 빼준다
// 이런것들이 싱글톤 패턴
const store = createStore();
export default store;

// 타입을 받아 볼 수 있다
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
