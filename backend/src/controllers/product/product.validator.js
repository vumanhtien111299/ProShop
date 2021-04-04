export const sanitizeUpdateData = (data) => {
    const result = {}
    if (data.name) {
        result.name = data.name
    }

    if (data.description) {
        result.description = data.description
    }

    if (data.brand) {
        result.brand = data.brand
    }

    if (data.image) {
        result.image = data.image
    }

    if (data.category) {
        result.category = data.category
    }

    if (data.countInStock) {
        result.countInStock = data.countInStock
    }

    if (data.price) {
        result.price = data.price
    }
    return result
}
