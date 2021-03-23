export const queryBuilder = (data) => {
    const filter = {}

    if (data.user) {
        filter.user = data.user
    }

    return filter
}
