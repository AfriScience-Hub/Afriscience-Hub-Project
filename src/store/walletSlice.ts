import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@/lib/api';

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

interface WalletState {
  wallet: WalletInfo | null;
  walletLoading: boolean;
  walletError: string | null;
  history: WalletTransaction[];
  historyLoading: boolean;
  historyError: string | null;
  topup: TopupResult | null;
  topupLoading: boolean;
  topupError: string | null;
}

const initialState: WalletState = {
  wallet: null,
  walletLoading: false,
  walletError: null,
  history: [],
  historyLoading: false,
  historyError: null,
  topup: null,
  topupLoading: false,
  topupError: null,
};

function extractPendingOrError<T extends { message?: string }>(r: any): string {
  return r?.message || (typeof r === 'string' ? r : 'An error occurred');
}

// The backend multiplies every monetary figure by 100, so divide it back out
// to get the actual value (balance, reserved, before/after, fees, totals).
function toActual(v: unknown): number {
  const n = Number(v ?? 0);
  return Number.isFinite(n) ? n / 100 : 0;
}

function normalizeWallet(w: any): WalletInfo | null {
  if (!w) return null;
  return { ...w, balance: toActual(w.balance), reservedBalance: toActual(w.reservedBalance) } as WalletInfo;
}

function normalizeTransaction(t: any): WalletTransaction {
  return {
    ...t,
    amount: toActual(t.amount),
    processingFee: toActual(t.processingFee),
    totalAmount: toActual(t.totalAmount),
    balanceBefore: toActual(t.balanceBefore),
    balanceAfter: toActual(t.balanceAfter),
  } as WalletTransaction;
}

// The wallet is created automatically once the user completes their personal
// information, so there is no create/detect-location call anymore.
export const fetchWalletBalance = createAsyncThunk('wallet/balance', async (_, { rejectWithValue }) => {
  try {
    const r: any = await api.get('/wallet/balance');
    const inner = r?.data ?? r;
    return normalizeWallet(inner?.details ?? inner ?? null);
  } catch (e: any) { return rejectWithValue(extractPendingOrError(e)); }
});

export const fetchWalletHistory = createAsyncThunk('wallet/history', async (_, { rejectWithValue }) => {
  try {
    const r: any = await api.get('/wallet/history');
    const inner = r?.data ?? r;
    const list = Array.isArray(inner) ? inner : Array.isArray(inner?.data) ? inner.data : (Array.isArray(r) ? r : []);
    return {
      transactions: (list as WalletTransaction[]).map(normalizeTransaction),
      pagination: inner?.pagination ?? r?.pagination ?? null,
    };
  } catch (e: any) { return rejectWithValue(extractPendingOrError(e)); }
});

export const topUpWallet = createAsyncThunk('wallet/topup', async (amount: string, { rejectWithValue }) => {
  try {
    // Send the plain amount (e.g. "100"), never kobo/cents. Max is 5000.
    const r: any = await api.post('/wallet/topup', { amount });
    const inner = r?.data ?? r;
    return {
      paymentLink: inner?.paymentLink || '',
      accessCode: inner?.accessCode || '',
      reference: inner?.reference || '',
      amount: String(toActual(inner?.amount)),
      processingFee: toActual(inner?.processingFee),
      totalAmount: toActual(inner?.totalAmount),
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
