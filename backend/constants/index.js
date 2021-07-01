module.exports = {
    defaultServerResponse:{
        status: 400,
        message: '',
        body: {}
    },
    userMessage: {
        SIGNUP_SUCCESS: "User Created Successfully",
        DUPLICATE_EMAIL: "User already exist with email",
        LOGIN_SUCCESS: "Login Successfulll",
        USER_NOT_FOUND: "User not found",
        INVALID_PASSWORD: "Password is incorrect",
        USER_FOUND_ADDRESS_FETCHED:"USER ADDRESS FETCH",
        USER_ADDRESS_CREATED:'USER ADDRESS SAVED'
    },
    productMessage: {
        PRODUCT_CREATED: "PRODUCT created successfully",
        PRODUCT_FETCHED: "PRODUCT feteched successfully",
        PRODUCT_NOT_FOUND: "Sorry the PRODUCT was not found",
        PRODUCT_UPDATED: "PRODUCT Updated Successfully",
        PRODUCT_DELETED: "Chllenge Deleted Successfully"
    }, cartMessage: {
        CART_CREATED: "CART created successfully",
        CART_FETCHED: "CART feteched successfully",
        CART_NOT_FOUND: "Sorry the CART was not found",
        CART_UPDATED: "CART Updated Successfully",
        CART_DELETED: "CART Deleted Successfully"
    },
    orderMessage: {
        ORDER_CREATED: "ORDER created successfully",
        ORDER_FETCHED: "ORDER feteched successfully",
        ORDER_NOT_FOUND: "Sorry the ORDER was not found",
        ORDER_UPDATED: "ORDER Updated Successfully",
        ORDER_DELETED: "ORDER Deleted Successfully"
    },
    requestValidationMessage: {
        BAD_REQUEST:"Invalid fields",
        TOKEN_MISSING: "token missing from header"
    },
    databaseMessage: {
        INVALID_ID: "Invalid id found"
    }
}