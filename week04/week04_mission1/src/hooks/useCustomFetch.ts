interface ApiResponse {
  data: TemplateStringsArray;
  isPending: boolean;
  isError: boolean;
}

function useCustomFetch<T>(url: string): ApiResponse<T> {}

export default useCustomFetch;
