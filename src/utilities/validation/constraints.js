const constraints = {
    email: {
        presence: {
            allowEmpty: false,
            message: '^Please enter an email address'
        },
        email: {
            message: '^Please enter a valid email address'
        }
    },

    password: {
        presence: {
            allowEmpty: false,
            message: '^Please enter a password'
        },
        length: {
            minimum: 4,
            message: '^Your password must be at least 4 characters'
        }
    },

    passwordRepeat: {
        type: {
            type: function (values) {
                const rules = JSON.parse(values);
                return JSON.stringify(rules[0]) === JSON.stringify(rules[1]);
            },
            message: '^Passwords don\'t match'
        }
    },

    phone: {
        presence: {
            allowEmpty: false,
            message: '^Please enter a phone number'
        },
        length: {
            minimum: 12,
            message: '^Your phone number must be at least 10 characters'
        }
    },

    confirmPassword: {
        equality: "password"
    },

    firstName: {
        presence: {
            allowEmpty: false,
            message: '^Please enter your first name'
        },
        length: {
            minimum: 2,
            message: '^Your name must be at least 2 characters'
        }
    },

    otherNames: {
        presence: {
            allowEmpty: false,
            message: "Other names is a required field"
        },
        length: {
            minimum: 2,
            message: '^Your name must be at least 2 characters'
        }
    },

    companyName: {
        presence: {
            allowEmpty: false,
            message: "Company name is a required field"
        },
        length: {
            minimum: 3,
            message: '^Company name should be more than 3'
        }
    },

    location: {
        presence: {
            allowEmpty: false,
            message: "Location is a required field"
        },
        length: {
            minimum: 2,
            message: '^Location should be more than 2'
        }
    },

    businessCategoryId: {
        type: {
            type : function (value) {
                return value !== 0;
            },
            message: "Store category is a required field"
        }
    }
};

export default constraints
