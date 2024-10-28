import router from '@/router/router'
import { defineStore } from 'pinia'
import { TABS_BLACK_LIST } from '@/config/config'

interface TabsOptions {
  title: string
  path: string
  icon?: string
  close: boolean
}

interface TabsSroteState {
  tabsMenuValue: string
  tabsMenuList: Array<TabsOptions>
}

export const TabsStore = defineStore('TabState', {
  state: (): TabsSroteState => ({
    tabsMenuValue: '/wallet/wallet',
    tabsMenuList: [
      // { title: '首页', path: '/home/index', icon: 'HomeFilled', close: false }
    ]
  }),
  getters: {},
  actions: {
    addTabs(tabItem: TabsOptions) {
      if (TABS_BLACK_LIST.includes(tabItem.path)) return
      const tabInfo: TabsOptions = {
        title: tabItem.title,
        path: tabItem.path,
        close: tabItem.close
      }
      if (
        this.tabsMenuList.every(
          (item: TabsOptions) => item.path !== tabItem.path
        )
      ) {
        this.tabsMenuList.push(tabInfo)
      }
      this.setTabsMenuValue(tabItem.path)
    },
    removeTabs(tabPath: string) {
      if (this.tabsMenuValue === tabPath) {
        this.tabsMenuList.forEach((item: TabsOptions, index: number) => {
          if (item.path !== tabPath) return
          const nextTab =
            this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1]
          if (!nextTab) return
          this.tabsMenuValue = nextTab.path
          router.push(nextTab.path)
        })
      }
      this.tabsMenuList = this.tabsMenuList.filter(
        (item: TabsOptions) => item.path !== tabPath
      )
    },
    removeRightTabs(tabPath: string) {
      const index = this.tabsMenuList.findIndex(
        (item: TabsOptions) => item.path === tabPath
      )
      this.tabsMenuList = this.tabsMenuList.filter(
        (f: TabsOptions, i: number) => i <= index
      )
      const lastIndex = this.tabsMenuList.findIndex(
        (item: TabsOptions) => item.path === this.tabsMenuValue
      )
      if (lastIndex === -1) {
        const nextPath = this.tabsMenuList[this.tabsMenuList.length - 1].path
        router.push(nextPath)
      }
    },
    removeOtherTabs(tabPath: string) {
      const currentIndex = this.tabsMenuList.findIndex(
        (item: TabsOptions) => item.path === tabPath
      )
      this.tabsMenuList = [this.tabsMenuList[currentIndex]]
      if (
        currentIndex !==
        this.tabsMenuList.findIndex(
          (item: TabsOptions) => item.path === this.tabsMenuValue
        )
      ) {
        router.push(this.tabsMenuList[0].path)
      }
      /* console.log('删除其他标签', tabPath) */
    },
    closeAll() {
      this.tabsMenuList = [
        {
          title: 'Wallet',
          path: '/wallet/wallet',
          icon: 'HomeFilled',
          close: false
        }
      ]
      this.setTabsMenuValue('/wallet/wallet')
      router.push('/wallet/wallet')
    },
    setTabsMenuValue(tabsMenuValue: string) {
      this.tabsMenuValue = tabsMenuValue
    }
  }
})
