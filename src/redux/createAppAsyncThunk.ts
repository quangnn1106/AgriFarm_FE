/* Core */
import { createAsyncThunk } from '@reduxjs/toolkit'

/* Instruments */
import type { RootState,  AppDispatch } from './store'

/**
 * ? A utility function to create a typed Async Thunk Actions.
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
}>()
