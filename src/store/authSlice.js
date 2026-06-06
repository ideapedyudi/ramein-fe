import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiRequest } from '../lib/http'
import { clearTokens, getAccessToken, saveTokens } from '../lib/authStorage'

const initialState = {
  user: null,
  accessToken: getAccessToken(),
  status: 'idle',
  error: null,
  hasCheckedSession: !getAccessToken(),
}

function normalizeAuthResponse(response) {
  const data = response?.data ?? response ?? {}
  const accessToken = data.accessToken ?? data.access_token ?? data.token ?? null
  const refreshToken = data.refreshToken ?? data.refresh_token ?? null
  const user = data.user ?? data.profile ?? null

  return { user, accessToken, refreshToken }
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      const { user, accessToken, refreshToken } = response.data
      saveTokens({ accessToken, refreshToken })

      return { user, accessToken }
    } catch (error) {
      clearTokens()
      return rejectWithValue(error.message)
    }
  },
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, phone }, { rejectWithValue }) => {
    try {
      const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, phone }),
      })

      const { user, accessToken, refreshToken } = response.data
      if (accessToken) saveTokens({ accessToken, refreshToken })

      return { user, accessToken: accessToken ?? null }
    } catch (error) {
      clearTokens()
      return rejectWithValue(error.message)
    }
  },
)

export const googleAuthUser = createAsyncThunk(
  'auth/google',
  async ({ credential }, { rejectWithValue }) => {
    try {
      const response = await apiRequest('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential }),
      })

      const { user, accessToken, refreshToken } = normalizeAuthResponse(response)
      if (!user || !accessToken) {
        throw new Error('Response Google auth tidak lengkap.')
      }

      saveTokens({ accessToken, refreshToken })

      return { user, accessToken }
    } catch (error) {
      clearTokens()
      return rejectWithValue(error.message)
    }
  },
)

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiRequest('/users/me')
      return response.data
    } catch (error) {
      clearTokens()
      return rejectWithValue(error.message)
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.accessToken = null
      state.status = 'idle'
      state.error = null
      state.hasCheckedSession = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.status = 'authenticated'
        state.error = null
        state.hasCheckedSession = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null
        state.accessToken = null
        state.status = 'failed'
        state.error = action.payload || 'Login gagal.'
        state.hasCheckedSession = true
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.accessToken ? action.payload.user : null
        state.accessToken = action.payload.accessToken
        state.status = action.payload.accessToken ? 'authenticated' : 'idle'
        state.error = null
        state.hasCheckedSession = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null
        state.accessToken = null
        state.status = 'failed'
        state.error = action.payload || 'Registrasi gagal.'
        state.hasCheckedSession = true
      })
      .addCase(googleAuthUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(googleAuthUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.status = 'authenticated'
        state.error = null
        state.hasCheckedSession = true
      })
      .addCase(googleAuthUser.rejected, (state, action) => {
        state.user = null
        state.accessToken = null
        state.status = 'failed'
        state.error = action.payload || 'Login Google gagal.'
        state.hasCheckedSession = true
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.accessToken = getAccessToken()
        state.status = 'authenticated'
        state.error = null
        state.hasCheckedSession = true
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user = null
        state.accessToken = null
        state.status = 'idle'
        state.error = action.payload || null
        state.hasCheckedSession = true
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
