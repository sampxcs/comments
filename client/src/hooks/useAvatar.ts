import { useCallback } from 'react'

import { defaultAvatars } from '../utils'
import getAvatar from '../services/avatar/getAvatar'

export default function useAvatar() {
  const generateAvatar = useCallback(() => {
    return getAvatar().then((avatar) => {
      if (avatar === 'Limit reached: 10 calls/min') avatar = defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)]
      return encodeURIComponent(avatar)
    })
  }, [])

  return { generateAvatar }
}
