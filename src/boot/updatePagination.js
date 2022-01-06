
function updatePagination (paginationBefore, paginationAfter) {
  paginationBefore.sortBy = paginationAfter.sortBy
  paginationBefore.descending = paginationAfter.descending
  paginationBefore.page = paginationAfter.page
  paginationBefore.rowsPerPage = paginationAfter.rowsPerPage
  paginationBefore.rowsNumber = paginationAfter.rowsNumber
  paginationBefore.filter = paginationAfter.filter
}

export default ({ Vue }) => {
  Vue.prototype.$updatePagination = updatePagination
}

export { updatePagination }
