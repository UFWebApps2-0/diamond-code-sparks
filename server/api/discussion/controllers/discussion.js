'use strict';

// const { sanitizeEntity } = require('strapi-utils/lib');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // update discussion description and objective
    // async update(ctx) {
    //     const { id } = ctx.params;
    //     console.log(ctx.request.body);

    //     // ensure request was not sent as formdata
    //     if (ctx.is('multipart'))
    //         return ctx.badRequest('Multipart requests are not accepted!', {
    //         id: 'activity.update.format.invalid',
    //         error: 'ValidationError',
    //         });

    //     // validate the request
    //     const {
    //         title,
    //         description
    //     } = ctx.request.body;
    //     if (!title || !description) // maybe get rid of
    //         return ctx.badRequest('A description, Standards must be provided!', {
    //         id: 'activity.update.body.invalid',
    //         error: 'ValidationError',
    //         });

    //     const updatedDiscussion = await strapi.services.discussion.update(
    //         { id },
    //         { title, description }
    //     );
    //     return sanitizeEntity(updatedDiscussion, { model: strapi.models.discussion });
    // },
};
