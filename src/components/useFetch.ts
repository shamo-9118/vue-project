import { type Ref, ref, unref, watchEffect, watch } from 'vue'

type PostList = {
  userId: number
  id: number
  title: string
  body: string
}[]

const useFetch = <T>(url: string | Ref<string>) => {
  const unrefUrl = unref(url)
  const dataList = ref<PostList>()
  const userList = ref<number[]>()
  const loading = ref(true)
  const error = ref<unknown | null>(null)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(unrefUrl)
      dataList.value = await res.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }
  watch(dataList, (gottenDataList) => {
    if (gottenDataList != undefined) {
      regenerateUserList(gottenDataList)
    }
  })

  const regenerateUserList = (gottenDataList: PostList) => {
    const userDataList = gottenDataList.map((data) => data.userId)
    const uniqueUserData = Array.from(new Set(userDataList))
    userList.value = uniqueUserData
    return userList
  }

  watchEffect(() => {
    fetchData()
  })

  return {
    dataList,
    loading,
    error,
    userList
  }
}

export default useFetch
