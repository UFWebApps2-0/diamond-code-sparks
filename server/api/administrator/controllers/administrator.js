'use strict';

const { sanitizeEntity } = require('strapi-utils/lib');

module.exports = {
    async me(ctx) {
        // Check if user exists in the context
        if (!ctx.state.user) {
            console.log('No user in context');
            return ctx.badRequest('No user in context');
        }

        const { id } = ctx.state.user;

        console.log('This is the controller!');
        console.log(`User ID: ${id}`);
        console.log(`User's administrator property:`, ctx.state.user.administrator);

        try {
            // Get the administrator
            const administrator = await strapi.services.administrator.findById(id);

            // Check if administrator exists
            if (!administrator) {
                console.log('Administrator not found for the given ID:', id);
                return ctx.notFound('Administrator not found');
            }

            console.log('This is the administrator:', administrator);

            // Remove private fields and return the admin
            return sanitizeEntity(administrator, { model: strapi.models.administrator });
        } catch (error) {
            console.error('Error in fetching administrator:', error);
            return ctx.internalServerError('Internal Server Error');
        }
    }
};