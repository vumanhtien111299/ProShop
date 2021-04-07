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

export const keywordData = (data) => {
    const result = {}
    if (data.keyword) {
        result.keyword = { $regex: `.*${data.name}.*`, $options: 'i' };
    }
    if (data.brand) {
        result.brand = { $regex: `.*${data.brand}.*`, $options: 'i' };
    }
    if (data.rating) {
        result.rating = data.rating
    }
    return result
}
  // const keywordData = {
    //     keyword: req.query.keyword
    //         ? {
    //             name: {
    //                 $regex: req.query.keyword,
    //                 $options: 'i'
    //             }
    //         }
    //         : {}
    // }
