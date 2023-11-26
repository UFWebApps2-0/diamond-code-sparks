//
// Check if the current user is a classroom manager
//
module.exports = async (ctx, next) => {
  // TODO: check if admin belongs to same school as classroom
  if (
    ctx.state.user && (ctx.state.user.role.name === 'Classroom Manager' ||
    ctx.state.user.role.name === 'Researcher' || ctx.state.user.role.name === 'Administrator')
  ) {
    // Go to next policy or controller
    return await next();
  }

  ctx.unauthorized(`You're not allowed to perform this action!`);
};
