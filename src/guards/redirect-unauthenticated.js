import UserService from '@/services/user'

export default async function (to, from, next) {
  try {
    await UserService.getUser()
  } catch (err) {
    return next({ name: 'login' })
  }

  next()
}
