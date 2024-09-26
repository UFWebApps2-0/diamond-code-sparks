/**
 * Check if the current user is an administrator
 */
module.exports = async (ctx, next) => {
    if (ctx.state.user && ctx.state.user.role.name == 'Organization Administrator')
    {
        // Go to next policy or controller
        return await next();
    }

    ctx.unathorized(`You're not allowed to perform this action!`);
};