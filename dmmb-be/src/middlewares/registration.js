module.exports = () => {
  return async (ctx, next) => {
    await next();
    // only if path was register with newsletter param and it was successfull. Then we will put user in the mailing list.
    
    if (ctx.request.url === '/api/auth/local/register' && ctx.response.status === 200) {
      console.log("Registration midd")
      const email = ctx.response.body.user.email;
      const name = ctx.response.body.user.nickname;
    }
  };
}