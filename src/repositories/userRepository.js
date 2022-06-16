import { getAuth, updateProfile } from 'firebase/auth'

export const updateUser = (data = {}) => updateProfile(getAuth().currentUser, data)
