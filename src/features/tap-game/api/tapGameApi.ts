import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Custom baseQuery to handle 401 globally
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
  }
  return result;
};

export const tapGameApi = createApi({
  reducerPath: "tapGameApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Round"],
  endpoints: (builder) => ({
    getRounds: builder.query<any, void>({
      query: () => ({
        url: "/tap-game/get-all-rounds",
        method: "GET",
      }),
      providesTags: ["Round"],
    }),
    getRoundById: builder.query<any, string>({
      query: (id) => ({
        url: `/tap-game/get-round/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Round", id }],
    }),
    createRound: builder.mutation<any, void>({
      query: () => ({
        url: "/tap-game/create-round",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Round"],
    }),
    tap: builder.mutation<any, { roundId: string }>({
      query: ({ roundId }) => ({
        url: `/tap-game/tap/${roundId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetRoundsQuery,
  useGetRoundByIdQuery,
  useCreateRoundMutation,
  useTapMutation,
} = tapGameApi;
export const { reducerPath, reducer, middleware } = tapGameApi;
