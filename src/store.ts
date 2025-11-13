import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";

import rootReducer from "@/slices";

const middleware = [
     createStateSyncMiddleware({}),
     ...getDefaultMiddleware({ serializableCheck: false }),
];

export const store = configureStore({
     reducer: rootReducer,
     middleware,
     enhancers: [],
     devTools: true,
});

initMessageListener(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
