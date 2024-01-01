import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
// import { useEffect } from 'react';
// import { loginAsyncApi } from './features/common-slice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


// const useToken = () => {
// 	const dispatch = useAppDispatch()
// 	const { userLogin } = useAppSelector(state => state.authReducer)

// 	useEffect(() => {
// 		if (userLogin?.access) {
// 			dispatch(loginAsyncApi())
// 		}
// 	}, [admin, dispatch, token])

// 	return { token, admin }
// }

// export default useToken