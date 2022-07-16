export const resolvePagination = data => {
  return {
    total: data.total,
    lastPage: data.last_page,
    to: data.to,
    current: data.current_page,
    perPage: data.per_page,
  }
}
