const validation = (schema, data) => {
    // console.log(data);
    const { error } = schema.validate(data);

    return new Promise((resolve, reject) => {
        if (!(error && error.details && error.details.length >= 1))
            return resolve(null);

        const errors = error.details.reduce((oldObj, all) => {
            const {
                type,
                message,
                context: { label },
            } = all;
            console.log(all);
            if (oldObj[label] && Object.keys(oldObj[label]).length >= 1) {
                oldObj[label][type] = message;
            } else {
                // Descomentar para encontrar key de hapi joi
                // oldObj[label] = {};
                // oldObj[label][type] = message;

                oldObj[label] = [];
                oldObj[label].push(message);
            }
            return oldObj;
        }, {});

        reject({
            message: '¡Datos invalidos!',
            errors,
            status: 400,
        });
    });
};

module.exports = validation;
