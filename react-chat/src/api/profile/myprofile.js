import { getLocalStorage, setLocalStorage } from "../localSrorage";
import myProfile from "../../mockData/myProfile.json"

const MY_PROFILE_LOCALSTORAGE_KEY = 'MY_PROFILE';

export const getProfileFromLocalStorage = () => {
  let profile = getLocalStorage(MY_PROFILE_LOCALSTORAGE_KEY)
  if (!profile) {
    profile = myProfile
    setProfileToLocalStorage(profile)
  }
  return profile
}

export const setProfileToLocalStorage = (profile) => {
  setLocalStorage(MY_PROFILE_LOCALSTORAGE_KEY, profile)
}