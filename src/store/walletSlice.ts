import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

export interface WalletLocation {
  type?: string;
  continent?: string;
  continent_code?: string;
  country?: string;
  country_code?: string;
  region?: string;
  region_code?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
}

export interface WalletInfo {
  id: string;
  userId: string;
  currency: string;
  balance: number;
  reservedBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  userId: string;
  type: string;
  status: string;
  amount: number;
  processingFee: number;
  totalAmount: number;
  currency: string;
  balanceBefore: number;
  balanceAfter: number;
  reference: string;
  providerReference: string | null;
  description: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface TopupResult {
  paymentLink: string;
  accessCode: string;
  reference: string;
  amount: string;
  processingFee: number;
  totalAmount: number;
}

export interface DetectResult {
  message: string;
  success: boolean;
  details: WalletLocation | null;
}

interface WalletState {
  detect: DetectResult | null;
  detectLoading: boolean;
  detectError: string | null;
  wallet: WalletInfo | null;
  walletLoading: boolean;
  walletError: string | null;
  history: WalletTransaction[];
  historyLoading: boolean;
  historyError: string | null;
  createLoading: boolean;
  createError: string | null;
  topup: TopupResult | null;
  topupLoading: boolean;
  topupError: string | null;
}

const initialState: WalletState = {
  detect: null,
  detectLoading: false,
  detectError: null,
  wallet: null,
  walletLoading: false,
  walletError: null,
  history: [],
  historyLoading: false,
  historyError: null,
  createLoading: false,
  createError: null,
  topup: null,
  topupLoading: false,
  topupError: null,
};

function extractPendingOrError<T extends { message?: string }>(r: any): string {
  return r?.message || (typeof r === 'string' ? r : 'An error occurred');
}

export const detectWalletLocation = createAsyncThunk('wallet/detect', async (_, { rejectWithValue }) => {
  try {
    const r: any = await api.get('/wallet/detect');
    const inner = r?.data ?? r;
    return {
      message: inner?.message || '',
      success: inner?.success !== false,
      details: inner?.details ?? inner ?? null,
    } as DetectResult;
  } catch (e: any) { return rejectWithValue(extractPendingOrError(e)); }
});

export const createWallet = createAsyncThunk('wallet/create', async (_, { rejectWithValue }) => {
  try {
    const r: any = await api.post('/wallet/create');
    const inner = r?.data ?? r;
    return { message: inner?.message || '' };
  } catch (e: any) { return rejectWithValue(extractPendingOrError(e)); }
});

export const fetchWalletBalance = createAsyncThunk('wallet/balance', async (_, { rejectWithValue }) => {
  try {
    const r: any = await api.get('/wallet/balance');
    const inner = r?.data ?? r;
    return (inner?.details ?? inner ?? null) as WalletInfo | null;
  } catch (e: any) { return rejectWithValue(extractPendingOrError(e)); }
});

export const fetchWalletHistory = createAsyncThunk('wallet/history', async (_, { rejectWithValue }) => {
  try {
    const r: any = await api.get('/wallet/history');
    const inner = r?.data ?? r;
    const list = Array.isArray(inner) ? inner : Array.isArray(inner?.data) ? inner.data : (Array.isArray(r) ? r : []);
    return {
      transactions: list as WalletTransaction[],
      pagination: inner?.pagination ?? r?.pagination ?? null,
    };
  } catch (e: any) { return rejectWithValue(extractPendingOrError(e)); }
});

export const topUpWallet = createAsyncThunk('wallet/topup', async (amountInKobo: string, { rejectWithValue }) => {
  try {
    const r: any = await api.post('/wallet/topup', { amountInKobo });
    const inner = r?.data ?? r;
    return {
      paymentLink: inner?.paymentLink || '',
      accessCode: inner?.accessCode || '',
      reference: inner?.reference || '',
      amount: inner?.amount || '0',
      processingFee: Number(inner?.processingFee ?? 0),
      totalAmount: Number(inner?.totalAmount ?? 0),
    } as TopupResult;
  } catch (e: any) { return rejectWithValue(extractPendingOrError(e)); }
});

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    resetWallet() { return initialState; },
  },
  extraReducers: (b) => {
    b
      .addCase(detectWalletLocation.pending, (s) => { s.detectLoading = true; s.detectError = null; })
      .addCase(detectWalletLocation.fulfilled, (s, a) => { s.detectLoading = false; s.detect = a.payload; })
      .addCase(detectWalletLocation.rejected, (s, a) => { s.detectLoading = false; s.detectError = a.payload as string; })
      .addCase(createWallet.pending, (s) => { s.createLoading = true; s.createError = null; })
      .addCase(createWallet.fulfilled, (s) => { s.createLoading = false; })
      .addCase(createWallet.rejected, (s, a) => { s.createLoading = false; s.createError = a.payload as string; })
      .addCase(fetchWalletBalance.pending, (s) => { s.walletLoading = true; })
      .addCase(fetchWalletBalance.fulfilled, (s, a) => { s.walletLoading = false; s.wallet = a.payload; })
      .addCase(fetchWalletBalance.rejected, (s, a) => { s.walletLoading = false; s.walletError = a.payload as string; })
      .addCase(fetchWalletHistory.pending, (s) => { s.historyLoading = true; })
      .addCase(fetchWalletHistory.fulfilled, (s, a) => { s.historyLoading = false; s.history = a.payload.transactions; })
      .addCase(fetchWalletHistory.rejected, (s, a) => { s.historyLoading = false; s.historyError = a.payload as string; })
      .addCase(topUpWallet.pending, (s) => { s.topupLoading = true; s.topupError = null; })
      .addCase(topUpWallet.fulfilled, (s, a) => { s.topupLoading = false; s.topup = a.payload; })
      .addCase(topUpWallet.rejected, (s, a) => { s.topupLoading = false; s.topupError = a.payload as string; });
  },
});

export const { resetWallet } = walletSlice.actions;
export default walletSlice.reducer;