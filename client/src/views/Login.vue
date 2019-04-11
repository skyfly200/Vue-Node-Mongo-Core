<template lang="pug">
  .login
    h1 Login
    form.login-form()
      .username-field
        label Username
        input(type="text" name="username")
      .password-field
        label Password
        input(type="password" name="password")
      .submit-button
        input(type="submit")
</template>
