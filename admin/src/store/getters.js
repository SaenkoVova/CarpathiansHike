export default {
    authorized: state => !!state.token,
    authstatus: state => state.authStatus,
    tableList: state => state.tableList
}