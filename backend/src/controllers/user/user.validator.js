export const queryBuilder = (query) => {
    const result = {}
    if (query.isAdmin) {
        result.isAdmin = query.isAdmin
    }
    return result
}
