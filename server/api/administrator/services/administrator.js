'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports.findById = async (id) => {
    // Subtract 10 from the Id because I can't figure out how to get the administrator ID to line up with the user
    id = id - 10;
    const administrator = await strapi.query('administrator').findOne({ id });
    return administrator;
};

module.exports.findOrganizationsById = async (id) => {
    const administrator = await strapi.services.administrator.findOne({ id });
    const organizations = administrator.organizations;

    const orgList = await Promise.all(
        organizations.map(async (org) => {
            const model = await strapi
                .query('organization')
                .findOne({ id: org.id });
            return model ? model.toJSON() : undefined;
        })
    );

    return orgList;
}
